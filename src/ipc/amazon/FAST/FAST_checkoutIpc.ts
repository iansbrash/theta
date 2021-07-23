import electron from 'electron'
import {
    getValueByDelimiters,
    accumulateCookies,
    returnParsedCookies
} from '../../../Logic/requestFunctions';
import timestampLogger from '../../../Logic/logger';
import FAST_AsyncContinue1 from '../../../Logic/sites/Amazon/flow/FAST/checkout/FAST_AsyncContinue1';
import FAST_GETCheckoutScreen from '../../../Logic/sites/Amazon/flow/FAST/checkout/FAST_GETCheckoutScreen';

// https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript
export const replaceAll = (str : string, find : string, replace : string) => {
    return str.replace(new RegExp(find, 'g'), replace);
}


const FAST_checkoutIpc = () => {

    electron.ipcMain.handle('FAST_GETCheckoutScreen', async (event, ...args) => {
        // args:
        // allCookies, proxy
        let allCookies = args[0];
        const proxy = args[1];

    
        const FAST_GETCheckoutScreenResponse = await FAST_GETCheckoutScreen(allCookies, proxy);

        allCookies = accumulateCookies(
            allCookies,
            returnParsedCookies(FAST_GETCheckoutScreenResponse.headers['set-cookie'])
        )

        console.log(FAST_GETCheckoutScreenResponse.data)
        let addressBookId = getValueByDelimiters(FAST_GETCheckoutScreenResponse.data, '<input type="hidden" name="addressBookId" value="', '"');
        let purchaseId = getValueByDelimiters(FAST_GETCheckoutScreenResponse.data, '<input type="hidden" name="purchaseId" value="', '"')
        let firstAddressID = getValueByDelimiters(FAST_GETCheckoutScreenResponse.data, 'action=select-shipping&amp;addressID=', '&amp;')

        return {
            allCookies,
            storage: {
                addressBookId,
                purchaseId,
                addressID: firstAddressID
            }
        };
    })

    electron.ipcMain.handle('FAST_AsyncContinue1', async (event, ...args) => {
        // args:
        // allCookies, proxy
        let allCookies = args[0];
        let storage = args[1]
        const proxy = args[2];

        // addressBookId, purchaseId addressID
    
        const FAST_AsyncContinue1Response = await FAST_AsyncContinue1(allCookies,{
            addressBookId: storage.addressBookId,
            purchaseId: storage.purchaseId,
            addressID: storage.addressID
        }, proxy);

        allCookies = accumulateCookies(
            allCookies,
            returnParsedCookies(FAST_AsyncContinue1Response.headers['set-cookie'])
        )

        console.log(FAST_AsyncContinue1Response.data)

        // let ppwWidgetState = getValueByDelimiters(FAST_AsyncContinue1Response.data , '<input type="hidden" name="ppw-widgetState" value="', '">');
        // const iFrameName = 'ApxSecureIframe-' + getValueByDelimiters(FAST_AsyncContinue1Response.data, '<iframe id="', '"')
        // const parentWidgetInstanceId = getValueByDelimiters(FAST_AsyncContinue1Response.data, '"parentWidgetInstanceId":"', '"');

        // return {
        //     allCookies,
        //     storage: {
        //         ppwWidgetState,
        //         iFrameName,
        //         parentWidgetInstanceId
        //     }
        // };
    })

    // electron.ipcMain.handle('FAST_AsyncContinue2', async (event, ...args) => {
    //     // args:
    //     // allCookies, proxy
    //     let allCookies = args[0];
    //     let storage = args[1];
    //     const proxy = args[2];

    //     const {
    //         superDynamicParams,
    //         ppwWidgetState,
    //     } = storage;

    
    //     // res is cookies
    //     const POSTAsyncContinueAfterSelectionResponse = await FAST_AsyncContinue2(allCookies, {
    //         superDynamicParams,
    //         "ppw-widgetState": ppwWidgetState
    //     }, proxy);

    //     const fuckData = POSTAsyncContinueAfterSelectionResponse.data;

    // const POSTAsyncContinueAfterSelectionResponseCollectedData = fuckData.panels.map((panel : object) => JSON.stringify(panel)).join(' ')

    // const finalData = {
    //     // 'purchaseLevelMessageIds': 'saveDefaults',
    //     // 'purchaseLevelMessageIds': 'shopWithPoints',
    //     'submitFromSPC': '1',
    //     'fasttrackExpiration': '2472',
    //     'countdownThreshold': '86400',
    //     'showSimplifiedCountdown': '0',
    //     'countdownId': 'countdownId-0',
    //     // 'quantity.A07053882I1E1NHCOX9GE:': '1',
    //     'gift-message-text': '',
    //     'dupOrderCheckArgs': 'B07W4FMQ5Y|1|mhnntomnsqkq|A17RGBHHDMOPR5',
    //     'order0': 'next-1dc',
    //     'shippingofferingid0.0': 'A181EEEPOJBEKQ',
    //     'guaranteetype0.0': 'GUARANTEED',
    //     'issss0.0': '0',
    //     'shipsplitpriority0.0': 'shipWhenever',
    //     'isShipWhenCompleteValid0.0': '0',
    //     'isShipWheneverValid0.0': '1',
    //     'shippingofferingid0.1': 'A2SO0K7H8Q0UM',
    //     'guaranteetype0.1': 'GUARANTEED',
    //     'issss0.1': '0',
    //     'shipsplitpriority0.1': 'shipWhenComplete',
    //     'isShipWhenCompleteValid0.1': '1',
    //     'isShipWheneverValid0.1': '0',
    //     'previousshippingofferingid0': 'A181EEEPOJBEKQ',
    //     'previousguaranteetype0': 'GUARANTEED',
    //     'previousissss0': '0',
    //     'previousshippriority0': 'shipWhenever',
    //     'lineitemids0': 'A07053882I1E1NHCOX9GE:',
    //     'currentshippingspeed': 'next-1dc',
    //     'previousShippingSpeed0': 'next-1dc',
    //     'currentshipsplitpreference': 'shipWhenever',
    //     'shippriority.0.shipWhenever': 'shipWhenever',
    //     'groupcount': '1',
    //     'shiptrialprefix': 'H4TE1S1QDTHHHAJFM2HZ',
    //     // 'csrfToken': 'gMA5XFXSaQsurAt4xeYYEQjv+oFp0qXICxgsOjoAAAAMAAAAAGDUB6hyYXcAAAAA',
    //     'fromAnywhere': '0',
    //     'redirectOnSuccess': '0',
    //     'purchaseTotal': '15.35',
    //     'purchaseTotalCurrency': 'USD',
    //     'purchaseID': '106-8763314-3328239',
    //     'purchaseCustomerId': 'A25HA1HE1RD42U',
    //     'useCtb': '1',
    //     'scopeId': 'H4TE1S1QDTHHHAJFM2HZ',
    //     // 'isQuantityInvariant': '',

    //     'promiseTime-0': '1624950000',
    //     'promiseAsin-0': 'B07W4FMQ5Y',

    //     // 'selectedPaymentPaystationId': 'amzn1.pm.wallet.MGhfUFVfQ1VTXzExMDA4ZDM0LTQ1ZjQtNDlkYy1hN2VlLWI4MDU0Yzc3MjIyNQ.QTI1SEExSEUxUkQ0MlU',
    //     'hasWorkingJavascript': '1',
    //     // 'placeYourOrder1': '1',
    //     // 'isfirsttimecustomer': '0',
    //     // 'isTFXEligible': '',
    //     // 'isFxEnabled': '',
    //     // 'isFXTncShown': '' 
    // }

    // interface newFinalDataType {
    //     [key: string]: string
    // }

    // let newFinalData : newFinalDataType = {};

    // Object.keys(finalData).forEach((key : string) => {
    //     let toAppend = getValueByDelimiters(POSTAsyncContinueAfterSelectionResponseCollectedData, 'name=\\"' + key + '\\" value=\\"', '\\"')
    //     newFinalData[key] = toAppend;
    // })

    // // dynamic qty
    // const dynamicQuantity = 'quantity.' + getValueByDelimiters(POSTAsyncContinueAfterSelectionResponseCollectedData, 'name=\\"quantity.', '\\"')
    // const purchaseQty = 1;
    // newFinalData[dynamicQuantity] = purchaseQty + '';

    // // csrf
    // newFinalData['csrfToken'] = getValueByDelimiters(POSTAsyncContinueAfterSelectionResponseCollectedData, 'name=\\"csrfToken\\" value=\\"', '\\"').split('/').join('')

    // // rest
    // newFinalData['isQuantityInvariant'] = "1";
    // newFinalData['placeYourOrder1'] = "1";
    // newFinalData['isfirsttimecustomer'] = "0";
    // newFinalData['isTFXEligible'] = "";
    // newFinalData['isFxEnabled'] = "";
    // newFinalData['isFXTncShown'] = "";


    // // console.log(newFinalData);
    // // console.log(POSTAsyncContinueAfterSelectionResponseCollectedData);

    // return {
    //     allCookies,
    //     storage: {newFinalData}
    // }

    // })

    // electron.ipcMain.handle('FAST_POSTSubmitOrder', async (event, ...args) => {
    //     // args:
    //     // allCookies, proxy
    //     let allCookies = args[0];
    //     let storage = args[1];
    //     const proxy = args[2];


    //     const POSTSubmitOrderResponse = await FAST_POSTSubmitOrder(
    //         allCookies,
    //         storage.newFinalData,
    //         proxy
    //     )

    //     console.log(storage.newFinalData);
    
    //     if (POSTSubmitOrderResponse.headers['x-amz-checkout-page-type'] === 'CheckoutThankYou') {
    //         timestampLogger("Successfully checked out the product")
    //         return "Success"
    //     }
    //     else if (POSTSubmitOrderResponse.headers['x-amz-checkout-page-type'] === 'CheckoutError') {
    //         console.log('CheckoutError AMZ Page')
    //         // tsLogger("Error while checking out")
    //         // console.log(POSTSubmitOrderResponse)

    //         return "Error"
    //     }
    //     else if (POSTSubmitOrderResponse.data.indexOf('An error occurred when we tried to process your request.') !== -1 ){
    //         console.log('An error occurred when we tried to process your request.')
    //         // tsLogger("Even worse error")
    //         // console.log(POSTSubmitOrderResponse)
    //         return "Error"
    //     }
    //     else {
    //         console.log('some OTHER ERROR')
    //         // console.log(POSTSubmitOrderResponse)
    //         return "Error"
    //     }
    // })
}

export default FAST_checkoutIpc;