import axios, { AxiosResponse } from 'axios';
import { Proxy } from '../../../../interfaces/ProxyList';
import {
    joinCookies
} from '../../../../requestFunctions';

// @ts-ignore
import HttpsProxyAgent from 'https-proxy-agent'

const WalmartATC = async (allCookies : string[], productUrl : string, offerId : string, storeIds : number[] | string[], proxy : Proxy) : Promise<AxiosResponse> => {
    
    let data : any = {
        "offerId": offerId,
        "quantity": 1,
        "location": {
            "postalCode": "29928",
            "city": "Hilton Head Island",
            "state": "SC",
            "isZipLocated": true
        },
        // "storeIds": [
        //     728,
        //     6395,
        //     2832,
        //     606,
        //     1383
        // ],
        storeIds: storeIds,
        "shipMethodDefaultRule": "SHIP_RULE_1",
    };

    console.log(storeIds)

    data = JSON.stringify(data);

    // 400 = offerId is invalid
    const ATCResponse = await axios({
        method: 'post',
        url: 'https://www.walmart.com/api/v3/cart/guest/:CID/items',
        headers: { 
            'authority': 'www.walmart.com', 
            'pragma': 'no-cache', 
            'cache-control': 'no-cache', 
            'accept': 'application/json', 
            'dnt': '1', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36', 
            'content-type': 'application/json', 
            'origin': 'https://www.walmart.com', 
            'sec-fetch-site': 'same-origin', 
            'sec-fetch-mode': 'cors', 
            'sec-fetch-dest': 'empty', 
            'referer': productUrl, 
            'accept-language': 'en-US,en;q=0.9', 
            cookie: joinCookies(allCookies)
        },
        data : data,
        proxy: {
            host: proxy.ip,
            port: proxy.port,
            auth: {
                username: proxy.username,
                password: proxy.password
            },
        }
        // proxy: false,
        // httpsAgent: HttpsProxyAgent(`http://${proxy.ip}:${proxy.port}:${proxy.username}:${proxy.password}`),
        // httpsAgent: new (HttpsProxyAgent as any)({host: proxy.ip , port: proxy.port, auth: `${proxy.username}:${proxy.password}`}),
    });

    return ATCResponse;
}


export default WalmartATC;