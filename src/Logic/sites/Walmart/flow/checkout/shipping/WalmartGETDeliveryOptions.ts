import axios, { AxiosResponse } from 'axios';
import { Proxy } from '../../../../../interfaces/ProxyList';
import {
    joinCookies
} from '../../../../../requestFunctions';
import HttpsProxyAgent from 'https-proxy-agent'

const WalmartGETDeliveryOptions = async (allCookies : string[], storeIds : string[], proxy : Proxy) : Promise<AxiosResponse> => {

    const GETDeliveryOptionsResponse = await axios({
        method: 'get',
        url: `https://www.walmart.com/api/checkout/v3/contract/:PCID?page=CHECKOUT_VIEW&storeList=${storeIds.join(',')}&postalCode=37215&city=Nashville&state=TN&isZipLocated=true`,
        headers: {
            'authority': 'www.walmart.com', 
            'pragma': 'no-cache', 
            'cache-control': 'no-cache', 
            'accept': 'application/json, text/javascript, */*; q=0.01', 
            'dnt': '1', 
            'inkiru_precedence': 'false', 
            'wm_cvv_in_session': 'true', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36', 
            'wm_vertical_id': '0', 
            'sec-fetch-site': 'same-origin', 
            'sec-fetch-mode': 'cors', 
            'sec-fetch-dest': 'empty', 
            'referer': 'https://www.walmart.com/checkout/', 
            'accept-language': 'en-US,en;q=0.9', 
            cookie: joinCookies(allCookies)
        },
        httpsAgent: new (HttpsProxyAgent as any)({host: proxy.ip , port: proxy.port, auth: `${proxy.username}:${proxy.password}`}),
    })

    return GETDeliveryOptionsResponse;
}


export default WalmartGETDeliveryOptions;