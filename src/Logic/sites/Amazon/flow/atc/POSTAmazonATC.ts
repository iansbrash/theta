import axios, { AxiosResponse } from "axios";
import qs from 'qs';
import { Proxy } from "../../../../interfaces/ProxyList";
import {
    joinCookies
} from '../../../../requestFunctions';
import requestRetryWrapper from '../../../../requestRetryWrapper';

// @ts-ignore
import HttpsProxyAgent from 'https-proxy-agent'

const POSTAddToCart = async (
    allCookies : string[], 
    CSRFToken : string, 
    offerListingID: string,
    sessionId: string, //@ts-ignore
    ASIN: string,
    rsid: string,
    proxy : Proxy
) : Promise<AxiosResponse>=> {

    // console.log('CSRF: ' + CSRFToken)

    let data2 = {
        'CSRF': CSRFToken,
        'offerListingID': offerListingID,
        'session-id': sessionId,
        'ASIN': ASIN, //ASIN,
        'isMerchantExclusive': '0',
        'merchantID': 'A21PKQFL36SWD', // should change this lmao
        'isAddon': '0',
        'nodeID': '',
        'sellingCustomerID': '',
        'qid': '',
        'sr': '',
        'storeID': '',
        'tagActionCode': '',
        'viewID': 'glance',
        'rebateId': '',
        'ctaDeviceType': 'desktop',
        'ctaPageType': 'detail',
        'usePrimeHandler': '0',
        'rsid': rsid, // same thing as sessionId
        'sourceCustomerOrgListID': '',
        'sourceCustomerOrgListItemID': '',
        'wlPopCommand': '',
        'quantity': '1',
        // 'dropdown-selection': 'add-new',
        // 'dropdown-selection-ubb': 'add-new',


        // 'itemCount': '2' ,
        // 'CSRF': 'g32lwhcdSioK4aikfK2koZ6ntbXwmgsZhE+A076Rbg7YAAAADAAAAABhEZtHcmF3AAAAABVX8CwXqz4nuL9RKX///w==',
        // 'offerListingID': 'tz0qsRzghtRI1g5QLnrq%2Bb0cetmoU3B3Uzz5zdZTnZ1iAx%2BjNpjWb%2F%2BCdcEmUTK13p5Zy4kmaOfOBcVMNrXxffI6oqCgiZyTiB%2Bs7ev0K3KKbJxKf%2Bw%2FabLGVUr5kx%2F8vlxNv6VNiurXaqC7fjkKZBHv29IWbP5KcJDmaB0OOAKZKy1F1QwsnK%2F4vw%2FyGSxD',
        // 'session-id': '143-4440045-8974266',
        // 'ASIN': 'B07W4FMQ5Y',
        // 'isMerchantExclusive': '0',
        // 'merchantID': 'A21PKQFL36SWD',
        // 'isAddon': '0',
        // 'nodeID': '',
        // 'sellingCustomerID': '',
        // 'qid': '',
        // 'sr': '',
        // 'storeID': '',
        // 'tagActionCode': '',
        // 'viewID': 'glance',
        // 'rebateId': '',
        // 'ctaDeviceType': 'desktop',
        // 'ctaPageType': 'detail',
        // 'usePrimeHandler': '0',
        // 'rsid': '143-4440045-8974266',
        // 'sourceCustomerOrgListID': '',
        // 'sourceCustomerOrgListItemID': '',
        // 'wlPopCommand': '',
        // 'quantity': '1',
        'triggerTurboWeblab': 'T2',
        'triggerTurboWeblabName': 'RCX_CHECKOUT_TURBO_DESKTOP_PRIME_87783',
        'turboPageRequestId': '',
        'turboPageSessionId': '',
        'dropdown-selection': 'njsosvkplikq',
        'dropdown-selection-ubb': 'njsosvkplikq',
        'itemCount': '2',
        'isDSSAjax': '1' 
    };
    console.log(data2)

    var data = qs.stringify(data2);

    const POSTAmazonATCResponse : any = await axios({
        method: 'post',
        url: 'https://www.amazon.com/gp/product/handle-buy-box/ref=dp_start-bbf_1_glance',
        headers: {
            'authority': 'www.amazon.com', 
            'pragma': 'no-cache', 
            'cache-control': 'no-cache', 
            'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"', 
            'dnt': '1', 
            'rtt': '50', 
            'sec-ch-ua-mobile': '?0', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36', 
            'content-type': 'application/x-www-form-urlencoded', 
            'accept': '*/*', 
            'x-requested-with': 'XMLHttpRequest', 
            'downlink': '10', 
            'ect': '4g', 
            'origin': 'https://www.amazon.com', 
            'sec-fetch-site': 'same-origin', 
            'sec-fetch-mode': 'cors', 
            'sec-fetch-dest': 'empty', 
            'referer': '', //'https://www.amazon.com/Mkeke-Compatible-iPhone-11-Clear/dp/B07W4FMQ5Y/', 
            'accept-language': 'en-US,en;q=0.9', 
            cookie: joinCookies(allCookies)
        },
        // httpsAgent: new (HttpsProxyAgent as any)({host: proxy.ip , port: proxy.port, auth: `${proxy.username}:${proxy.password}`}),
        proxy: {
            // protocol: 'http',
            host: proxy.ip,
            port: proxy.port,
            auth: {
                username: proxy.username,
                password: proxy.password
            },
        },
        data : data
    });

    return POSTAmazonATCResponse;
}

export const POSTAddToCartRetry : (
    allCookies : string[], 
    CSRFToken : string, 
    offerListingID: string,
    sessionId: string,
    ASIN: string,
    rsid: string,
    proxy : Proxy
) => Promise<AxiosResponse> = requestRetryWrapper(POSTAddToCart, {
    baseDelay: 3000,
    numberOfTries: 3,
    consoleRun: `Adding to cart`,
    consoleError: 'Error adding to cart'
})

export default POSTAddToCart;