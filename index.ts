import axios from 'axios';
import {
    returnParsedCookies,
    joinCookies,
    accumulateCookies,
    convertCookieArrayToObject
} from './requestFunctions';
import qs from 'qs';

const world = 'world';

export function hello(world: string = 'world'): string {
  return `Hello ${world}! `;
};

// console.log(hello());

(async () => {
    
    let allCookies : string[] = [];

    const GETAmazonRes : any = await axios({
        method: 'get',
        url: 'https://amazon.com/',
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
            "upgrade-insecure-requests": "1"
        }
    });

    allCookies = accumulateCookies(allCookies, 
        returnParsedCookies( GETAmazonRes.headers['set-cookie'] ) 
    );

    console.log(allCookies);


    var data = qs.stringify({
        'CSRF': 'g0z/RTe3sRIm3ojX1Tdvl/MoHa13GmQYKH9VKSFkS5jFAAAADAAAAABgzQzgcmF3AAAAABVX8CwXqz4nuL9RKX///w==',
        'offerListingID': '3SpeuU2iTwj3ehtt7yK5zgVh1XL8mL6U8EaPJ%2BwNO1v2Zo3GM7mVv46GVbl%2BFCFK0d7qm398PlfbsJIHuKVfWlfuzETqqgoKMIKBLdBaIc3yr6YoJkDjFS7uJynjH4Micj9NAZPpiwJPciLNYCUDEVN86naDEf6%2B%2F%2B3y2Nmv%2B8cTM1ETWHVEe9Zh1fKRZOvC',
        'session-id': '141-4964882-9605900',
        'ASIN': 'B07W4FMQ5Y',
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
        'rsid': '141-4964882-9605900',
        'sourceCustomerOrgListID': '',
        'sourceCustomerOrgListItemID': '',
        'wlPopCommand': '',
        'quantity': '1',
        'dropdown-selection': 'add-new',
        'dropdown-selection-ubb': 'add-new',
        'itemCount': '2' 
      });
    // FormData that is included in the request
    //      CSRF
    //      offerListingID          (cDls9SQtrQSwplRb1WIpdIsKF6dFLX2Qk%2Fpp9nlzNAKAANNBSHuG9jLu7t%2BsyC6tPaxAXwnGJYMS7PuS8VVrigwNHIZoLDodE09go2qd8TAEDaCjiZpthIuuhN1b3BT%2B2VqhVDpE9EvypawweL0ifMNKMKmwahR2jzyJXAITAp%2FU4o3l8mHKNJBnzrNTueaa)
    //      session-id              (same as the cookie)
    //      ASIN                    (the product ID in the url)
    //      isMerchantExclusive     (0)
    //      isAddon                 (0)
    //      merchantID              (A17RGBHHDMOPR5 for phone case)
    //      nodeID                  blank
    //      sellingCustomerID       blank
    //      qid
    //      sr
    //      storeID
    //      tagActionCode
    //      viewID                  (glance)
    //      rebateId                
    //      ctaDeviceType           (desktop)
    //      ctaPageType             (detail)
    //      usePrimeHandler         (0)
    //      rsid                    (seems to be the same as session-id)
    //      sourceCustomerOrgListID blank
    //      sourceCustomerOrgListItemID     blank
    //      wlPopCommand                    blank
    //      quantity:               (1)
    //      dropdown-selection:     (add-new)
    //      dropdown-selection-ubb  (add-new)
    //      itemCount: 2
    //        
    //
    //

    const POSTAmazonATC : any = await axios({
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
        }
    })

})();