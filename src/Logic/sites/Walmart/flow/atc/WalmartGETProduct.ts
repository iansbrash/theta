import axios, { AxiosResponse } from 'axios';
import { Proxy } from '../../../../interfaces/ProxyList';
import {
    joinCookies
} from '../../../../requestFunctions';

// @ts-ignore
import HttpsProxyAgent from 'https-proxy-agent'

const WalmartGETProduct = async (allCookies : string[], productUrl : string, proxy : Proxy) : Promise<AxiosResponse> => {
    
    const WalmartGETProductResponse = await axios({
        method: 'get',
        url: productUrl,
        headers: {
            'authority': 'www.walmart.com', 
            'pragma': 'no-cache', 
            'cache-control': 'no-cache', 
            'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"', 
            'sec-ch-ua-mobile': '?0', 
            'dnt': '1', 
            'upgrade-insecure-requests': '1', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36', 
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
            'sec-fetch-site': 'none', 
            'sec-fetch-mode': 'navigate', 
            'sec-fetch-user': '?1', 
            'sec-fetch-dest': 'document', 
            'accept-language': 'en-US,en;q=0.9',
            
            // Not really neccesary lmao
            // Actually might be good for waiting for product
            cookie: joinCookies(allCookies)
        },
        // httpsAgent: new (HttpsProxyAgent as any)({host: proxy.ip , port: proxy.port, auth: `${proxy.username}:${proxy.password}`}),
        proxy: {
            protocol: 'http',
            host: proxy.ip,
            port: proxy.port,
            auth: {
                username: proxy.username,
                password: proxy.password
            },
        }
    })

    return WalmartGETProductResponse;
}


export default WalmartGETProduct;