import electron from 'electron'
import AddToCart from '../../Logic/sites/Amazon/flow/atc/atc';
import GETProduct from '../../Logic/sites/Amazon/flow/atc/GETProduct';
import POSTAddToCart from '../../Logic/sites/Amazon/flow/atc/POSTAmazonATC';
import timestampLogger from '../../Logic/logger';
import { AxiosResponse } from 'axios';
import {
    accumulateCookies,
    returnParsedCookies,
    convertCookieArrayToObject,
    getValueByDelimiters,
} from '../../Logic/requestFunctions';
import CookieObject from '../../Logic/interfaces/CookieObject';

const atcIpc = () => {
    electron.ipcMain.handle('AmazonATC', async (event, ...args) => {
        // args:
        // allCookies, product, proxy
        const allCookies = args[0];
        const product = args[1];
        const proxy = args[2];
 
    
        // res is cookies
        const res = await AddToCart(allCookies, product, proxy);

        return res;
    })

    electron.ipcMain.handle('AmazonGETProduct', async (event, ...args) => {
        // args:
        // allCookies, product, proxy
        let allCookies = args[0];
        const product = args[1];
        const proxy = args[2];

    
        let allCookiesObject : CookieObject = {}; 

        const GETAmazonProductRes : AxiosResponse = await GETProduct(allCookies, product, proxy)

        const FindCSRFData : string= GETAmazonProductRes.data;
        const CSRFDelimiter : string = '<input type="hidden" name="CSRF" value="';

        // wtf
        const CSRFToken : string =  getValueByDelimiters(FindCSRFData, CSRFDelimiter, '"/>');

        console.log('csrf') 
        console.log(CSRFToken)

        const offerListingIDDelimiter = '<input type="hidden" id="offerListingID" name="offerListingID" value="';
        const offerListingID = getValueByDelimiters(FindCSRFData, offerListingIDDelimiter, '">');

        let productTitle : string = getValueByDelimiters(FindCSRFData, '<span id="productTitle" class="a-size-large product-title-word-break">', '</span>')
        productTitle = productTitle.trim();
        console.log(`productTitle: ${productTitle}`)
        const ASIN = getValueByDelimiters(FindCSRFData, '<input type="hidden" id="attach-baseAsin" value="', '" />');
        console.log(`ASIN: ${ASIN}`)

        allCookiesObject = convertCookieArrayToObject(allCookies);

        return {
            allCookies: allCookies,
            storage: {
                CSRFToken,
                offerListingID,
                ASIN,
                productTitle
            },
            productTitle
        }
    })

    electron.ipcMain.handle('AmazonPOSTAddToCart', async (event, ...args) => {

        const {
            CSRFToken,
            ASIN,
            sessionId,
            offerListingID,
            productTitle
        } = args[1];

        let allCookies = args[0]
        let proxy = args[2];

        const POSTAmazonATC : any = await POSTAddToCart(
            allCookies,
            CSRFToken,
            offerListingID,
            sessionId,
            ASIN, // this needs to be the ASIN
            sessionId,
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
    
        })();

        return {
            allCookies: allCookies,
        };
    })

}

export default atcIpc;