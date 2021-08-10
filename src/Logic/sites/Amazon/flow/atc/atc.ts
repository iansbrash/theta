import { AxiosResponse } from 'axios';
import {
    returnParsedCookies,
    // joinCookies,
    accumulateCookies,
    convertCookieArrayToObject,
    getValueByDelimiters
} from '../../../../requestFunctions';
import CookieObject from '../../../../interfaces/CookieObject';
import {
    GETProductRetry
} from './GETProduct';
import POSTAddToCart from './POSTAmazonATC';
import timestampLogger from '../../../../logger';
import { Proxy } from '../../../../interfaces/ProxyList';

const AddToCart = async (allCookies : string[], product : string = 'https://www.amazon.com/Mkeke-Compatible-iPhone-11-Clear/dp/B07W4FMQ5Y/', proxy : Proxy) : Promise<string[]> => {
    let allCookiesObject : CookieObject = {}; 

    const GETAmazonProductRes : AxiosResponse = await GETProductRetry(allCookies, product, proxy)

    const FindCSRFData : string= GETAmazonProductRes.data;
    const CSRFDelimiter : string = '<input type="hidden" name="CSRF" value="';

    // wtf
    const CSRFToken : string =  getValueByDelimiters(FindCSRFData, CSRFDelimiter, '"/>');

    console.log('csrf') 
    console.log(CSRFToken)

    const offerListingIDDelimiter = '<input type="hidden" id="offerListingID" name="offerListingID" value="';
    const offerListingID = getValueByDelimiters(FindCSRFData, offerListingIDDelimiter, '">');


    allCookiesObject = convertCookieArrayToObject(allCookies);

    
 

    const POSTAmazonATC : any = await POSTAddToCart(
        allCookies,
        CSRFToken,
        offerListingID,
        allCookiesObject['session-id'],
        'B07W4FMQ5Y', // this needs to be the ASIN
        allCookiesObject['session-id'],
        proxy
    )

    allCookies = accumulateCookies(
        allCookies,
        returnParsedCookies( POSTAmazonATC.headers['set-cookie'] )
    );

    (() => {
        const d : string = POSTAmazonATC.data;
        if (d.indexOf('Not added') !== -1) {
            timestampLogger('Add to cart error')
            throw "'Not added' add to cart error'";
        }
        else if (d.indexOf('Added to Cart') !== -1) {
            timestampLogger('Successfully Added to Cart')
        }
        else {
            timestampLogger('Add to cart error')
            throw "Unknown add to cart error";
        }

        // console.log(`<b>Cart subtotal</b>: ${d.substr(d.indexOf('<b>Cart subtotal</b>') + '<b>Cart subtotal</b>'.length, 10)}`)
    })();


    // error is 'Not added'

    return allCookies;
}

export default AddToCart;