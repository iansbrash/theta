import axios, { AxiosResponse } from 'axios';
import { Proxy } from '../../../../../interfaces/ProxyList';
import {
    joinCookies
} from '../../../../../requestFunctions';
import HttpsProxyAgent from 'https-proxy-agent'

const WalmartGETCheckout = async (allCookies : string[], proxy : Proxy) : Promise<AxiosResponse> => {

    var GETCheckoutResponseData = JSON.stringify({
        "crt:CRT": "",
        "customerId:CID": "",
        "customerType:type": "",
        "affiliateInfo:com.wm.reflector": ""
    });

    const GETCheckoutResponse = await axios({
        method: 'post',
        url: 'https://www.walmart.com/api/checkout/v3/contract?page=CHECKOUT_VIEW',
        headers: {
            'authority': 'www.walmart.com', 
            'pragma': 'no-cache', 
            'cache-control': 'no-cache', 
            'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"', 
            'dnt': '1', 
            'sec-ch-ua-mobile': '?0', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36', 
            'content-type': 'application/json', 
            'accept': 'application/json, text/javascript, */*; q=0.01', 
            'wm_cvv_in_session': 'true', 
            'wm_vertical_id': '0', 
            'origin': 'https://www.walmart.com', 
            'sec-fetch-site': 'same-origin', 
            'sec-fetch-mode': 'cors', 
            'sec-fetch-dest': 'empty', 
            'referer': 'https://www.walmart.com/checkout/', 
            'accept-language': 'en-US,en;q=0.9', 
            cookie: joinCookies(allCookies)
        },
        data : GETCheckoutResponseData,
        httpsAgent: new (HttpsProxyAgent as any)({host: proxy.ip , port: proxy.port, auth: `${proxy.username}:${proxy.password}`}),
    })

    return GETCheckoutResponse;
}


export default WalmartGETCheckout;