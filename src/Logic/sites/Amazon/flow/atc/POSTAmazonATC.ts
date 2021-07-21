import axios, { AxiosResponse } from "axios";
import qs from 'qs';
import { Proxy } from "../../../../interfaces/ProxyList";
import {
    joinCookies
} from '../../../../requestFunctions';
import requestRetryWrapper from '../../../../requestRetryWrapper';
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
        'ASIN': 'B07W4FMQ5Y', //ASIN,
        'isMerchantExclusive': '0',
        'merchantID': 'A36MCMZ9LZTDGA', // should change this lmao
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
        'dropdown-selection': 'add-new',
        'dropdown-selection-ubb': 'add-new',
        // 'itemCount': '2' 
    };
    console.log(data2)

    var data = qs.stringify(data2);

    const POSTAmazonATCResponse : any = await axios({
        method: 'post',
        url: 'https://www.amazon.com/gp/product/handle-buy-box/ref=dp_start-bbf_1_glance',
        headers: {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/x-www-form-urlencoded",
            "downlink": "5.45",
            "ect": "4g",
            "rtt": "100",
            "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            cookie: joinCookies(allCookies)
        },
        httpsAgent: new (HttpsProxyAgent as any)({host: proxy.ip , port: proxy.port, auth: `${proxy.username}:${proxy.password}`}),
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