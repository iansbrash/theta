import axios, { AxiosResponse } from 'axios';
import { Proxy } from '../../../../interfaces/ProxyList';
import {
    joinCookies
} from '../../../../requestFunctions';
import HttpsProxyAgent from 'https-proxy-agent'

const WalmartATC = async (allCookies : string[], productUrl : string, offerId : string, storeIds : string[], proxy : Proxy) : Promise<AxiosResponse> => {
    
    var data = JSON.stringify({
        "offerId": offerId,
        "quantity": 1,
        "location": {
            "postalCode": "37215",
            "city": "Nashville",
            "state": "TN",
            "isZipLocated": true
        },
        "shipMethodDefaultRule": "SHIP_RULE_1",
        storeIds: storeIds
        // "storeIds": [
        //     5616,
        //     5119,
        //     659,
        //     3717,
        //     688
        // ]
    });
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
        httpsAgent: new (HttpsProxyAgent as any)({host: proxy.ip , port: proxy.port, auth: `${proxy.username}:${proxy.password}`}),
    });

    return ATCResponse;
}


export default WalmartATC;