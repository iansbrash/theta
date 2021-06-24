import axios, { AxiosResponse } from "axios";
import qs from 'qs';
import {
    joinCookies
} from '../../../../requestFunctions';
import requestRetryWrapper from '../../../../requestRetryWrapper';

const POSTAddToCart = async (
    allCookies : string[], 
    CSRFToken : string, 
    offerListingID: string,
    sessionId: string,
    ASIN: string,
    rsid: string
) : Promise<AxiosResponse>=> {

    var data = qs.stringify({
        'CSRF': CSRFToken,
        'offerListingID': offerListingID,
        'session-id': sessionId,
        'ASIN': ASIN,
        'isMerchantExclusive': '0',
        'merchantID': 'A17RGBHHDMOPR5',
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
    });

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
    rsid: string
) => Promise<AxiosResponse> = requestRetryWrapper(POSTAddToCart, {
    baseDelay: 3000,
    numberOfTries: 3,
    consoleRun: `Adding to cart`,
    consoleError: 'Error adding to cart'
})

export default POSTAddToCart;