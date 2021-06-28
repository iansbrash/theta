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