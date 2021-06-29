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
        let offerListingID = '';
        if (FindCSRFData.indexOf('<input type="hidden" id="session-id" name="session-id" value="140-8342675-4089119">') === -1) {
            offerListingID = getValueByDelimiters(FindCSRFData, offerListingIDDelimiter, '">');
        }

        let productTitle : string = getValueByDelimiters(FindCSRFData, '<span id="productTitle" class="a-size-large product-title-word-break">', '</span>')
        productTitle = productTitle.trim();
        console.log(`productTitle: ${productTitle}`)
        let ASIN = getValueByDelimiters(FindCSRFData, '<input type="hidden" id="attach-baseAsin" value="', '" />');
        if (ASIN.length !== 10) {
            ASIN = getValueByDelimiters(FindCSRFData, '<input type="hidden" id="ASIN" name="ASIN" value="', '">');
        }
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

        let {
            CSRFToken,
            ASIN,
            sessionId,
            offerListingID,
            productTitle
        } = args[1];

        let allCookies = args[0]
        let proxy = args[2];

        // if (ASIN === 'B08FC6MR62') {
        //     offerListingID = 'EhI%2Bg%2BUmGWsHOvVkLPNic%2FU6IllHdZdr89rnc0IuLIGgbJQXO9tp5PAqaRhsvhgkijQ3YSTM0dC1sCPsOuMpcWW%2FWNsnsltIp3h31C8JrsfM5%2Fy8WTDQGbxSgkzzgrbYAOoTj94boWL9KOW7i4rPWSslkdpSwE6Q6iNfgsRN9Hq%2B1kE%2BI26gRANsoVd8B9d0'
        // }

        if (offerListingID === '') {
            console.log("Offerlisting ID is null, product is OOS")
            return {allCookies: allCookies, status: "OOS"}
        }

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

        let status;
    
        (() => {
            const d : string = POSTAmazonATC.data;
            if (d.indexOf('These items are currently unavailable') !== -1) {
                timestampLogger('OOS')
                status = 'OOS';
            }
            else if (d.indexOf('Not added') !== -1) {
                timestampLogger('Add to cart error')
                status = "Error"
                // throw "'Not added' add to cart error'";
            }
            else if (d.indexOf('Added to Cart') !== -1) {
                timestampLogger('Successfully Added to Cart')
                status = "Success"
            }
            else {
                timestampLogger('Add to cart error')
                status = "Error"
                // console.log(POSTAmazonATC.data)
                // throw "Error";
            }
    
        })();

        console.log('here')

        return {
            status: status,
            allCookies: allCookies,
        };
    })

}

export default atcIpc;