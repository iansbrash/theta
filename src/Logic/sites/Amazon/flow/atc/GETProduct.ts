import axios, { AxiosResponse } from 'axios';
import { Proxy } from '../../../../interfaces/ProxyList';
import timestampLogger from '../../../../logger';
import {
    joinCookies
} from '../../../../requestFunctions';
import requestRetryWrapper from '../../../../requestRetryWrapper';
import HttpsProxyAgent from 'https-proxy-agent'

const GETProduct = async (allCookies : string[], product : string, proxy : Proxy) : Promise<AxiosResponse> => {
    
    timestampLogger(`ProductURL: ${product}`)
    
    const GETAmazonProductRes : any = await axios({
        method: 'get',
        url: product,
        headers: {
            // 'authority': 'www.amazon.com', 
            // 'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"', 
            // 'sec-ch-ua-mobile': '?0', 
            // 'dnt': '1', 
            // 'upgrade-insecure-requests': '1', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36', 
            // 'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
            // 'sec-fetch-site': 'none', 
            // 'sec-fetch-mode': 'navigate', 
            // 'sec-fetch-user': '?1', 
            // 'sec-fetch-dest': 'document', 
            // 'accept-language': 'en-US,en;q=0.9', 
            cookie: joinCookies(allCookies)
        },
        // withCredentials: true,
        httpsAgent: new (HttpsProxyAgent as any)({host: proxy.ip , port: proxy.port, auth: `${proxy.username}:${proxy.password}`}),

        // httpsAgent: {rejectUnathored: false}
        // httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });

    return GETAmazonProductRes;
}

export const GETProductRetry : (allCookies : string[], product : string, proxy : Proxy) => Promise<AxiosResponse> = requestRetryWrapper(GETProduct, {
    baseDelay: 3000,
    numberOfTries: 3,
    consoleRun: `Retrieving product`,
    consoleError: 'Error retrieving product'
})

export default GETProduct;