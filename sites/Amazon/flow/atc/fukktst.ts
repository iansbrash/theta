import timestampLogger from "../../../../logger";
import { Proxy } from "../../../../interfaces/ProxyList";
import axios, {AxiosResponse} from "axios";
import { joinCookies } from "../../../../requestFunctions";
import testProxyList from "../../../../sensitive/testInterfaces/testProxyList";
import https from 'https';
import HttpsProxyAgent from 'https-proxy-agent'


const GETProduct = async (allCookies : string[], product : string, proxy : Proxy) : Promise<AxiosResponse> => {
    
    timestampLogger(`ProductURL: ${`https://amazon.com/dp/${product}`}`)

    const httpsAgent = new (HttpsProxyAgent as any)({host: proxy.ip , port: proxy.port, auth: `${proxy.username}:${proxy.password}`})

    const GETAmazonProductRes : any = await axios({
        method: 'get',
        url: `https://amazon.com/dp/${product}`,
        withCredentials: true,
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9",
            "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            cookie: joinCookies(allCookies)
        },
        // proxy: {
        //     protocol: 'http',
        //     host: proxy.ip,
        //     port: proxy.port,
        //     auth: {
        //         username: proxy.username,
        //         password: proxy.password,
        //     }
        // },
        proxy: new (HttpsProxyAgent as any)({host: proxy.ip , port: proxy.port, auth: `${proxy.username}:${proxy.password}`}),
        // httpsAgent: new https.Agent({ rejectUnauthorized: false })
        // httpsAgent: httpsAgent
        // httpsAgent: {rejectUnathorized: false}
    });

    return GETAmazonProductRes;
};

(async () => {

    try {
        const res = await GETProduct([], 'B07W4FMQ5Y', testProxyList.proxies[0]);
        console.log(res);
    }
    catch (err) {
        console.log(err)
    }


})();