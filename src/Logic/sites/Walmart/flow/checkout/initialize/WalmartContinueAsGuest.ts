import axios, { AxiosResponse } from 'axios';
import { Proxy } from '../../../../../interfaces/ProxyList';
import {
    joinCookies
} from '../../../../../requestFunctions';
import HttpsProxyAgent from 'https-proxy-agent'

const WalmartContinueAsGuest = async (allCookies : string[], proxy : Proxy) : Promise<AxiosResponse> => {

    const ContinueAsGuestData = JSON.stringify({
        "responseGroup": "BASICPLUS",
        "includePickUpLocation": true,
        "clientName": "Web-Checkout-FetchContract",
        "storeMeta": false,
        "plus": true
    });

    const ContinueAsGuestResponse = await axios({
        method: 'post',
        url: 'https://www.walmart.com/account/api/location',
        headers: {
            'authority': 'www.walmart.com', 
            'pragma': 'no-cache', 
            'cache-control': 'no-cache', 
            'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"', 
            'accept': 'application/json', 
            'dnt': '1', 
            'sec-ch-ua-mobile': '?0', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36', 
            'content-type': 'application/json', 
            'origin': 'https://www.walmart.com', 
            'sec-fetch-site': 'same-origin', 
            'sec-fetch-mode': 'cors', 
            'sec-fetch-dest': 'empty', 
            'referer': 'https://www.walmart.com/checkout/', 
            'accept-language': 'en-US,en;q=0.9', 
            cookie: joinCookies(allCookies)
        },
        httpsAgent: new (HttpsProxyAgent as any)({host: proxy.ip , port: proxy.port, auth: `${proxy.username}:${proxy.password}`}),
        data : ContinueAsGuestData,

    })

    return ContinueAsGuestResponse;
}


export default WalmartContinueAsGuest;