import { Proxy } from "../src/Logic/interfaces/ProxyList";
// @ts-ignore
import fse from 'fs-extra'
// @ts-ignore
import path from 'path'
// @ts-ignore
import timestampLogger from "../src/Logic/logger";
// @ts-ignore
import axios from 'axios'

// @ts-ignore
import HttpsProxyAgent from "https-proxy-agent";

import {
    getValueByDelimiters
} from '../src/Logic/requestFunctions'

// @ts-ignore
const stringToProxy = (s : string) : Proxy => {

    const ip = s.substring(0, s.indexOf(':'));
    s = s.substring(ip.length + 1);
    let port, user, pass;
    if (s.indexOf(':') === -1) {

        port = parseInt(s);

        return {
            ip,
            port,
            username: '',
            password: ''
        }
    }
    else {
        port = s.substring(0, s.indexOf(':'))
        s = s.substring(port.length + 1)
        user = s.substring(0, s.indexOf(':'));
        s = s.substring(user.length + 1);
        pass = s;

        return {
            ip,
            port: parseInt(port),
            username: user,
            password: pass
        }
    }
}


const grN = (n : number) : string => {
    if (n === 0) return '';
    return grN(n - 1) + Math.floor( Math.random() * 10 );
}
// @ts-ignore
const grN2 = () : number => {
    return Math.floor( Math.random() * 10 ) + 4;
}




(async () => {
    let proxies = fse.readFileSync(path.join( __dirname, 'proxies.txt' ), "utf-8")
    // let names = fse.readFileSync(path.join( __dirname, 'names.txt' ), "utf-8")

    const newProxies : Proxy[] = proxies.split(/\r?\n/).map(pro => {
        return stringToProxy(pro)
    })

    let proxyIndex = 0;
    let totalSubmitted = 0;

// let names = fse.readFileSync(path.join( __dirname, 'Components 2', 'Tasks', 'names.txt' ), "utf-8")
//     console.log(names);
    // let namesArray = names.split('\n')
    // let namesArray2 = namesArray.map(n => n.split(' '))
    // return;

    for (;;) {
        let fetchNamesRes;
        
        for (;;) {
            try {
                fetchNamesRes = await axios({
                    method: 'get',
                    url: 'http://random-name-generator.info/index.php?n=100&g=1&st=2',
                    headers: { 
                      'Connection': 'keep-alive', 
                      'Pragma': 'no-cache', 
                      'Cache-Control': 'no-cache', 
                      'Upgrade-Insecure-Requests': '1', 
                      'DNT': '1', 
                      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36', 
                      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
                      'Referer': 'http://random-name-generator.info/', 
                      'Accept-Language': 'en-US,en;q=0.9'
                    },
                    httpsAgent: new (HttpsProxyAgent as any)({host: newProxies[proxyIndex].ip , port: newProxies[proxyIndex].port, auth: `${newProxies[proxyIndex].username}:${newProxies[proxyIndex].password}`}),
                });
                break;
            }
            catch (err) {
                timestampLogger("ERROR Fetching names. Retrying...")
            }
        }
        
        
    
        let fetchNames : any = getValueByDelimiters(fetchNamesRes.data, `<ol class="nameList">`, '</ol>')
        fetchNames = fetchNames.split('<li>').map((str : string) => str.replace(/[\r\n\t]/g, ""))
        fetchNames = fetchNames.slice(1)
        fetchNames = fetchNames.slice(0, -1)
        fetchNames = fetchNames.map((nameString : any) => nameString.split(' '))
        
        for (let i = 0; i < fetchNames.length; totalSubmitted++, proxyIndex = (proxyIndex + 1) % newProxies.length, i++) {
            let email, first, last, zip, telephone, product_id, kind, size;
            zip = 37027;
            telephone = 615 + grN(7)
            product_id = 6731916411007
            size = grN2();
            kind = 'shoe';
        
            first = fetchNames[i][0]
            last = fetchNames[i][1]
            email = first + last + grN(4) + "@gullmail.com"
            // timestampLogger(`SUCCESS #${totalSubmitted}... Email: ${email}, size: ${size}, tele: ${telephone}, f: ${first}, l: ${last}`)
            // sleep(1000)
            // continue;
            for (let tr = 0; tr < 3; tr++) {
                try {
                    const res = await axios({
                        method: 'get',
                        url: `https://phr51lvaef.execute-api.us-east-1.amazonaws.com/form/submit?a=m&email=${email}&first=${first}&last=${last}&zip=${zip}&telephone=${telephone}&product_id=${product_id}&kind=${kind}&size=${size}`,
                        headers: { 
                            'authority': 'phr51lvaef.execute-api.us-east-1.amazonaws.com', 
                            'pragma': 'no-cache', 
                            'cache-control': 'no-cache', 
                            'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"', 
                            'accept': 'application/json, text/plain, */*', 
                            'dnt': '1', 
                            'sec-ch-ua-mobile': '?0', 
                            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36', 
                            'origin': 'https://shop.travisscott.com', 
                            'sec-fetch-site': 'cross-site', 
                            'sec-fetch-mode': 'cors', 
                            'sec-fetch-dest': 'empty', 
                            'referer': 'https://shop.travisscott.com/', 
                            'accept-language': 'en-US,en;q=0.9'
                    },
                        httpsAgent: new (HttpsProxyAgent as any)({host: newProxies[i].ip , port: newProxies[i].port, auth: `${newProxies[i].username}:${newProxies[i].password}`}),
                    });
                    timestampLogger(`SUCCESS #${totalSubmitted}... Email: ${email}, size: ${size}, tele: ${telephone}, f: ${first}, l: ${last}`)
                    timestampLogger(res.data)
                    break;
    
                }
                catch (err) {
                    timestampLogger(`ERROR on #${totalSubmitted}, try #${tr}, retrying...`)
                    // sleep(250)
                }
            }
        }
    }
})();

// @ts-ignore
function sleep(delay : number) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}