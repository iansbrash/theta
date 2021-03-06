import axios, { AxiosResponse } from 'axios';
import { joinCookies } from '../../../../../requestFunctions';
import requestRetryWrapper from '../../../../../requestRetryWrapper';
import { Proxy } from '../../../../../interfaces/ProxyList';

// @ts-ignore
import HttpsProxyAgent from 'https-proxy-agent'


const GETAddPaymentPage = async (allCookies : string[], proxy : Proxy) : Promise<AxiosResponse> => {
    const GETAddPaymentPageResponse = await axios({
        method: 'get',
        url: 'https://www.amazon.com/gp/buy/payselect/handlers/display.html?hasWorkingJavascript=1',
        headers: {
            'authority': 'www.amazon.com', 
            'rtt': '50', 
            'downlink': '10', 
            'ect': '4g', 
            'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"', 
            'sec-ch-ua-mobile': '?0', 
            'dnt': '1', 
            'upgrade-insecure-requests': '1', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36', 
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
            'sec-fetch-site': 'none', 
            'sec-fetch-mode': 'navigate', 
            'sec-fetch-user': '?1', 
            'sec-fetch-dest': 'document', 
            'accept-language': 'en-US,en;q=0.9', 
            cookie: joinCookies(allCookies)
        },
        httpAgent: new (HttpsProxyAgent as any)({host: proxy.ip , port: proxy.port, auth: `${proxy.username}:${proxy.password}`}),
        // proxy: {
        //     protocol: 'http',
        //     host: proxy.ip,
        //     port: proxy.port,
        //     auth: {
        //         username: proxy.username,
        //         password: proxy.password
        //     }
        // },
        maxRedirects: 0,
        validateStatus: () => {return true;}
    })

    return GETAddPaymentPageResponse;
}

export const GETAddPaymentPageRetry : (allCookies : string[], proxy : Proxy) => Promise<AxiosResponse> = requestRetryWrapper(GETAddPaymentPage, {
    baseDelay: 3000,
    numberOfTries: 3,
    consoleRun: 'Getting add payment page',
    consoleError: 'Error getting add payment page'
})

export default GETAddPaymentPage;