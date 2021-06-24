import axios, { AxiosResponse } from 'axios';
import { Proxy } from '../../../../interfaces/ProxyList';
import {
    joinCookies
} from '../../../../requestFunctions';
import requestRetryWrapper from '../../../../requestRetryWrapper';

const GETProduct = async (allCookies : string[], product : string, proxy : Proxy) : Promise<AxiosResponse> => {
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
        proxy: {
            protocol: 'https',
            host: proxy.ip,
            port: proxy.port,
            auth: {
                username: proxy.username,
                password: proxy.password,
            }
        }
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