import axios from 'axios';
import {
    returnParsedCookies,
    joinCookies,
    accumulateCookies,
    convertCookieArrayToObject
} from './requestFunctions';
import qs from 'qs';

import CookieObject from './interfaces/CookieObject';

// takes the string to parse, and strings to delimit the value we want to find
const getValueByDelimiters = (data: string, start : string, end : string) : string => {
    const delimiterStartLength = start.length;
    const delimiterStartIndex = data.indexOf(start);
    const dataStartSubstring = data.substring(delimiterStartIndex + delimiterStartLength);
    const delimiterDifference = dataStartSubstring.indexOf(end);

    return dataStartSubstring.substring(0, delimiterDifference);

}

(async () => {
    
    let allCookies : string[] = [];
    let allCookiesObject : CookieObject = {}; 

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

    const product = 'B07W4FMQ5Y';

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
        }
    });

    const FindCSRFData : string= GETAmazonProductRes.data;
    const CSRFDelimiter : string = '<input type="hidden" name="CSRF" value="';
    const CSRFToken : string =  getValueByDelimiters(FindCSRFData, CSRFDelimiter, '">');
    console.log(`CSRF: ${CSRFToken}`)

    const offerListingIDDelimiter = '<input type="hidden" id="offerListingID" name="offerListingID" value="';
    const offerListingID = getValueByDelimiters(FindCSRFData, offerListingIDDelimiter, '">');
    console.log(`offerListingID: ${offerListingID}`)


    allCookiesObject = convertCookieArrayToObject(allCookies);

    console.log(allCookiesObject)

    var data = qs.stringify({
        'CSRF': CSRFToken,
        'offerListingID': offerListingID,
        'session-id': allCookiesObject['session-id'],
        'ASIN': product,
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
        'rsid': allCookiesObject['session-id'],
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
        },
        data : data
    });

    delete POSTAmazonATC['data'];

    console.log(POSTAmazonATC)

})();