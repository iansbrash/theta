import electron from 'electron'
import Checkout from '../../Logic/sites/Amazon/flow/checkout/checkout';
import GETCheckoutScreen from '../../Logic/sites/Amazon/flow/checkout/initialize/GETCheckoutScreen';
import genShippingPayload from '../../Logic/sites/Amazon/logic/genShippingPayload';
import POSTAddShippingAddressFormHandler from '../../Logic/sites/Amazon/flow/checkout/shipping/POSTAddShippingAddressFormHandler';
import POSTSelectShippingAddress from '../../Logic/sites/Amazon/flow/checkout/shipping/POSTSelectShippingAddress';
import GETAddPaymentPage from '../../Logic/sites/Amazon/flow/checkout/payment/GETAddPaymentPageResponse';
import POSTRegister from '../../Logic/sites/Amazon/flow/checkout/payment/POSTRegister';
import timestampLogger from '../../Logic/logger';
import {
    accumulateCookies,
    returnParsedCookies,
    getValueByDelimiters,
} from '../../Logic/requestFunctions';
import POSTAddPaymentMethod from '../../Logic/sites/Amazon/flow/checkout/payment/POSTAddPaymentMethod';
import POSTSelectPaymentMethod from '../../Logic/sites/Amazon/flow/checkout/payment/POSTSelectPaymentMethod';
import POSTAsyncContinueAfterSelection from '../../Logic/sites/Amazon/flow/checkout/payment/POSTAsyncContinueAfterSelection';
import POSTSubmitOrder from '../../Logic/sites/Amazon/flow/checkout/payment/POSTSubmitOrder';

// https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript
export const replaceAll = (str : string, find : string, replace : string) => {
    return str.replace(new RegExp(find, 'g'), replace);
}


const checkoutIpc = () => {

    electron.ipcMain.handle('AmazonCheckout', async (event, ...args) => {
        // args:
        // allCookies, proxy
        const allCookies = args[0];
        const proxy = args[1];

    
        // res is cookies
        const res = await Checkout(allCookies, proxy);

        return res;
    })

    electron.ipcMain.handle('GETCheckoutScreen', async (event, ...args) => {
        // args:
        // allCookies, proxy
        let allCookies = args[0];
        const proxy = args[1];

    
        const GETCheckoutScreenResponse = await GETCheckoutScreen(allCookies, proxy);

        allCookies = accumulateCookies(
            allCookies,
            returnParsedCookies(GETCheckoutScreenResponse.headers['set-cookie'])
        )

        const needsToResignIn = GETCheckoutScreenResponse.request.res.responseUrl.includes('/ap/signin')
        if (needsToResignIn) {
            throw "Needs to resign in, task failed"
        }

        const GETCheckoutScreenResponseData = GETCheckoutScreenResponse.data;

        let purchaseId, addressUIWidgetsObfuscatedCustomerId, addressUIWidgetsAddressWizardInteractionId, addressUIWidgetsPreviousAddressFormStateToken;
        addressUIWidgetsObfuscatedCustomerId = getValueByDelimiters(GETCheckoutScreenResponseData, '<input type="hidden" name="address-ui-widgets-previous-address-form-state-token" value="', '">');
        addressUIWidgetsAddressWizardInteractionId = getValueByDelimiters(GETCheckoutScreenResponseData, '<input type="hidden" name="address-ui-widgets-address-wizard-interaction-id" value="', '">');
        addressUIWidgetsPreviousAddressFormStateToken = getValueByDelimiters(GETCheckoutScreenResponseData, '<input type="hidden" name="address-ui-widgets-obfuscated-customerId" value="', '">');
        purchaseId = getValueByDelimiters(GETCheckoutScreenResponseData, '<input type="hidden" name="purchaseId" value="', '">');

        let GETCheckoutScreenResponseCIDData = GETCheckoutScreenResponseData.substring(GETCheckoutScreenResponseData.indexOf('if (!window.fwcimData) {'))
        const customerId = getValueByDelimiters(GETCheckoutScreenResponseCIDData, "customerId: '", "'")

        return {
            allCookies: allCookies,
            storage: {
                purchaseId,
                addressUIWidgetsObfuscatedCustomerId,
                addressUIWidgetsAddressWizardInteractionId,
                addressUIWidgetsPreviousAddressFormStateToken,
                customerId
            }
        };
    })

    electron.ipcMain.handle('POSTAddShippingAddressFormHandler', async (event, ...args) => {
        // args:
        // allCookies, proxy
        let allCookies = args[0];
        let information = args[1];
        let shipping = args[2];
        let storage = args[3];
        const proxy = args[4];

        const {
            addressUIWidgetsObfuscatedCustomerId,
            addressUIWidgetsAddressWizardInteractionId,
            addressUIWidgetsPreviousAddressFormStateToken,
            purchaseId
        } = storage;

        const shippingPayload = genShippingPayload(
            information, 
            shipping, {
                "address-ui-widgets-previous-address-form-state-token": addressUIWidgetsObfuscatedCustomerId, 
                "address-ui-widgets-address-wizard-interaction-id": addressUIWidgetsAddressWizardInteractionId, 
                "address-ui-widgets-obfuscated-customerId": addressUIWidgetsPreviousAddressFormStateToken,
                "purchaseId": purchaseId,
            }
        );

        const POSTAddShippingAddressFormHandlerResponse = await POSTAddShippingAddressFormHandler(
            allCookies,
            shippingPayload,
            proxy
        );

        const addressId = POSTAddShippingAddressFormHandlerResponse.data.createOrEditAddressResponse.addressId;

        allCookies = accumulateCookies(
            allCookies,
            returnParsedCookies(POSTAddShippingAddressFormHandlerResponse.headers['set-cookie'])
        )

        return {
            allCookies,
            storage: {
                addressId,
                purchaseId,
                customerId: storage.customerId
            }
        };
    })

    electron.ipcMain.handle('POSTSelectShippingAddress', async (event, ...args) => {
        // args:
        // allCookies, proxy
        let allCookies = args[0];
        let storage = args[1];
        const proxy = args[2];

        const {
            addressId,
            purchaseId
        } = storage;

    
        // res is cookies
        const POSTSelectShippingAddressResponse = await POSTSelectShippingAddress(allCookies, addressId, purchaseId, proxy);

        allCookies = accumulateCookies(
            allCookies,
            returnParsedCookies(POSTSelectShippingAddressResponse.headers['set-cookie'])
        )

        return {
            allCookies: allCookies
        };
    })

    electron.ipcMain.handle('GETAddPaymentPage', async (event, ...args) => {
        // args:
        // allCookies, proxy
        let allCookies = args[0];
        const proxy = args[1];

    
        const GETAddPaymentPageResponse = await GETAddPaymentPage(allCookies, proxy);

        allCookies = accumulateCookies(
            allCookies,
            returnParsedCookies(GETAddPaymentPageResponse.headers['set-cookie'])
        )

        let ppwWidgetState = getValueByDelimiters(GETAddPaymentPageResponse.data , '<input type="hidden" name="ppw-widgetState" value="', '">');
        const iFrameName = 'ApxSecureIframe-' + getValueByDelimiters(GETAddPaymentPageResponse.data, '<iframe id="', '"')
        const parentWidgetInstanceId = getValueByDelimiters(GETAddPaymentPageResponse.data, '"parentWidgetInstanceId":"', '"');

        return {
            allCookies,
            storage: {
                ppwWidgetState,
                iFrameName,
                parentWidgetInstanceId
            }
        };
    })

    electron.ipcMain.handle('POSTRegister', async (event, ...args) => {
        // args:
        // allCookies, proxy
        let allCookies = args[0];
        let storage = args[1];
        const proxy = args[2];

        const {
            ppwWidgetState,
            iFrameName,
            parentWidgetInstanceId
        } = storage;

    
        // res is cookies
        const POSTRegisterResponse = await POSTRegister(allCookies, {
            widgetState: ppwWidgetState,
            iFrameName: iFrameName,
            parentWidgetInstanceId: parentWidgetInstanceId
        }, proxy);

        let ppwWidgetState2 = getValueByDelimiters(POSTRegisterResponse.data, '<input type="hidden" name="ppw-widgetState" value="', '">')
 

        allCookies = accumulateCookies(
            allCookies,
            returnParsedCookies(POSTRegisterResponse.headers['set-cookie'])
        )

        return {
            allCookies,
            storage: {
                ppwWidgetState,
                ppwWidgetState2,
                customerId: storage.customerId
            }
        };
    })

    electron.ipcMain.handle('POSTAddPaymentMethod', async (event, ...args) => {
        // args:
        // allCookies, proxy
        let allCookies = args[0];
        let storage = args[1];
        let payment = args[2];
        const proxy = args[3];

        const {
            customerId,
            ppwWidgetState2
        } = storage;

        // console.log(storage);

    
        // res is cookies
        const POSTAddPaymentMethodResponse = await POSTAddPaymentMethod(allCookies, customerId, {
            'ppw-widgetEvent:AddCreditCardEvent': '',
            'ppw-jsEnabled': true,
            'ppw-widgetState': ppwWidgetState2
        }, payment, proxy);

        const ppwPaymentMethodId = POSTAddPaymentMethodResponse.data.additionalWidgetResponseData.additionalData.paymentInstrumentId;


        return {
            allCookies,
            storage: {
                ppwPaymentMethodId
            }
        };
    })

    electron.ipcMain.handle('POSTSelectPaymentMethod', async (event, ...args) => {
        // args:
        // allCookies, proxy
        let allCookies = args[0];
        let storage = args[1];
        const proxy = args[2];

        console.log(storage);

        const {
            customerId,
            ppwWidgetState,
            ppwPaymentMethodId
        } = storage;

    
        const POSTSelectPaymentMethodResponse = await POSTSelectPaymentMethod(allCookies, customerId, {
            "ppw-widgetState": ppwWidgetState,
            "ppw-paymentMethodId": ppwPaymentMethodId
        }, proxy);

        allCookies = accumulateCookies(
            allCookies,
            returnParsedCookies(POSTSelectPaymentMethodResponse.headers['set-cookie'])
        )

        const SelectPaymentHTML = POSTSelectPaymentMethodResponse.data.htmlContent;

        const ppw_instrumentRowSelection = getValueByDelimiters(SelectPaymentHTML, '" type="radio" name="ppw-instrumentRowSelection" value="', '">');
        const _rewardsAccountSelection_customAmountValue = getValueByDelimiters(SelectPaymentHTML, '_rewardsAccountSelection_rewardsApplied" value="', '"');
        const _rewardsAccountSelection_maxAmountValueHiddenInput = getValueByDelimiters(SelectPaymentHTML, '_rewardsAccountSelection_maxAmountValueHiddenInput" value="', '"');
        const _rewardsAccountSelection_currencyUnitHiddenInput = getValueByDelimiters(SelectPaymentHTML, '_rewardsAccountSelection_currencyUnitHiddenInput" value="', '"');
        const _rewardsAccountSelection_instrumentIdHiddenInput = getValueByDelimiters(SelectPaymentHTML, '_rewardsAccountSelection_instrumentIdHiddenInput" value="', '"');
        const _rewardsAccountSelection_parentInstrumentIdHiddenInput = getValueByDelimiters(SelectPaymentHTML, '_rewardsAccountSelection_parentInstrumentIdHiddenInput" value="', '"');
        const _rewardsAccountSelection_currencyToPointsConversionRatioHiddenInput = getValueByDelimiters(SelectPaymentHTML, '_rewardsAccountSelection_currencyToPointsConversionRatioHiddenInput" value="', '"');
        const _childRewardsAccountInstrumentId = getValueByDelimiters(SelectPaymentHTML, '_childRewardsAccountInstrumentId" value="', '"');
    
        const superDynamicParams = {
            'ppw-instrumentRowSelection': replaceAll( ppw_instrumentRowSelection, '&amp;', '&' ),
            [`ppw-${_rewardsAccountSelection_instrumentIdHiddenInput}_rewardsAccountSelection_customAmountValue`]: _rewardsAccountSelection_customAmountValue,
            [`ppw-${_rewardsAccountSelection_instrumentIdHiddenInput}_rewardsAccountSelection_instrumentIdHiddenInput`]: _rewardsAccountSelection_instrumentIdHiddenInput,
            [`ppw-${_rewardsAccountSelection_instrumentIdHiddenInput}_rewardsAccountSelection_maxAmountValueHiddenInput`]: _rewardsAccountSelection_maxAmountValueHiddenInput,
            [`ppw-${_rewardsAccountSelection_instrumentIdHiddenInput}_rewardsAccountSelection_currencyUnitHiddenInput`]: _rewardsAccountSelection_currencyUnitHiddenInput,
            [`ppw-${_rewardsAccountSelection_instrumentIdHiddenInput}_rewardsAccountSelection_parentInstrumentIdHiddenInput`]: _rewardsAccountSelection_parentInstrumentIdHiddenInput,
            [`ppw-${_rewardsAccountSelection_instrumentIdHiddenInput}_rewardsAccountSelection_currencyToPointsConversionRatioHiddenInput`]: _rewardsAccountSelection_currencyToPointsConversionRatioHiddenInput,
            [`ppw-${_rewardsAccountSelection_instrumentIdHiddenInput}_childRewardsAccountInstrumentId`]: _childRewardsAccountInstrumentId,
        }

        return {
            allCookies,
            storage: {
                ppwWidgetState,
                superDynamicParams
            }
        };
    })

    electron.ipcMain.handle('POSTAsyncContinueAfterSelection', async (event, ...args) => {
        // args:
        // allCookies, proxy
        let allCookies = args[0];
        let storage = args[1];
        const proxy = args[2];

        const {
            superDynamicParams,
            ppwWidgetState,
        } = storage;

    
        // res is cookies
        const POSTAsyncContinueAfterSelectionResponse = await POSTAsyncContinueAfterSelection(allCookies, {
            superDynamicParams,
            "ppw-widgetState": ppwWidgetState
        }, proxy);

        const fuckData = POSTAsyncContinueAfterSelectionResponse.data;

    const POSTAsyncContinueAfterSelectionResponseCollectedData = fuckData.panels.map((panel : object) => JSON.stringify(panel)).join(' ')

    const finalData = {
        // 'purchaseLevelMessageIds': 'saveDefaults',
        // 'purchaseLevelMessageIds': 'shopWithPoints',
        'submitFromSPC': '1',
        'fasttrackExpiration': '2472',
        'countdownThreshold': '86400',
        'showSimplifiedCountdown': '0',
        'countdownId': 'countdownId-0',
        // 'quantity.A07053882I1E1NHCOX9GE:': '1',
        'gift-message-text': '',
        'dupOrderCheckArgs': 'B07W4FMQ5Y|1|mhnntomnsqkq|A17RGBHHDMOPR5',
        'order0': 'next-1dc',
        'shippingofferingid0.0': 'A181EEEPOJBEKQ',
        'guaranteetype0.0': 'GUARANTEED',
        'issss0.0': '0',
        'shipsplitpriority0.0': 'shipWhenever',
        'isShipWhenCompleteValid0.0': '0',
        'isShipWheneverValid0.0': '1',
        'shippingofferingid0.1': 'A2SO0K7H8Q0UM',
        'guaranteetype0.1': 'GUARANTEED',
        'issss0.1': '0',
        'shipsplitpriority0.1': 'shipWhenComplete',
        'isShipWhenCompleteValid0.1': '1',
        'isShipWheneverValid0.1': '0',
        'previousshippingofferingid0': 'A181EEEPOJBEKQ',
        'previousguaranteetype0': 'GUARANTEED',
        'previousissss0': '0',
        'previousshippriority0': 'shipWhenever',
        'lineitemids0': 'A07053882I1E1NHCOX9GE:',
        'currentshippingspeed': 'next-1dc',
        'previousShippingSpeed0': 'next-1dc',
        'currentshipsplitpreference': 'shipWhenever',
        'shippriority.0.shipWhenever': 'shipWhenever',
        'groupcount': '1',
        'shiptrialprefix': 'H4TE1S1QDTHHHAJFM2HZ',
        // 'csrfToken': 'gMA5XFXSaQsurAt4xeYYEQjv+oFp0qXICxgsOjoAAAAMAAAAAGDUB6hyYXcAAAAA',
        'fromAnywhere': '0',
        'redirectOnSuccess': '0',
        'purchaseTotal': '15.35',
        'purchaseTotalCurrency': 'USD',
        'purchaseID': '106-8763314-3328239',
        'purchaseCustomerId': 'A25HA1HE1RD42U',
        'useCtb': '1',
        'scopeId': 'H4TE1S1QDTHHHAJFM2HZ',
        // 'isQuantityInvariant': '',

        'promiseTime-0': '1624950000',
        'promiseAsin-0': 'B07W4FMQ5Y',

        // 'selectedPaymentPaystationId': 'amzn1.pm.wallet.MGhfUFVfQ1VTXzExMDA4ZDM0LTQ1ZjQtNDlkYy1hN2VlLWI4MDU0Yzc3MjIyNQ.QTI1SEExSEUxUkQ0MlU',
        'hasWorkingJavascript': '1',
        // 'placeYourOrder1': '1',
        // 'isfirsttimecustomer': '0',
        // 'isTFXEligible': '',
        // 'isFxEnabled': '',
        // 'isFXTncShown': '' 
    }

    interface newFinalDataType {
        [key: string]: string
    }

    let newFinalData : newFinalDataType = {};

    Object.keys(finalData).forEach((key : string) => {
        let toAppend = getValueByDelimiters(POSTAsyncContinueAfterSelectionResponseCollectedData, 'name=\\"' + key + '\\" value=\\"', '\\"')
        newFinalData[key] = toAppend;
    })

    // dynamic qty
    const dynamicQuantity = 'quantity.' + getValueByDelimiters(POSTAsyncContinueAfterSelectionResponseCollectedData, 'name=\\"quantity.', '\\"')
    const purchaseQty = 1;
    newFinalData[dynamicQuantity] = purchaseQty + '';

    // csrf
    newFinalData['csrfToken'] = getValueByDelimiters(POSTAsyncContinueAfterSelectionResponseCollectedData, 'name=\\"csrfToken\\" value=\\"', '\\"').split('/').join('')

    // rest
    newFinalData['isQuantityInvariant'] = "1";
    newFinalData['placeYourOrder1'] = "1";
    newFinalData['isfirsttimecustomer'] = "0";
    newFinalData['isTFXEligible'] = "";
    newFinalData['isFxEnabled'] = "";
    newFinalData['isFXTncShown'] = "";


    // console.log(newFinalData);
    // console.log(POSTAsyncContinueAfterSelectionResponseCollectedData);

    return {
        allCookies,
        storage: {newFinalData}
    }

    })

    electron.ipcMain.handle('POSTSubmitOrder', async (event, ...args) => {
        // args:
        // allCookies, proxy
        let allCookies = args[0];
        let storage = args[1];
        const proxy = args[2];


        const POSTSubmitOrderResponse = await POSTSubmitOrder(
            allCookies,
            storage.newFinalData,
            proxy
        )

        console.log(storage.newFinalData);
    
        if (POSTSubmitOrderResponse.headers['x-amz-checkout-page-type'] === 'CheckoutThankYou') {
            timestampLogger("Successfully checked out the product")
            return "Success"
        }
        else if (POSTSubmitOrderResponse.headers['x-amz-checkout-page-type'] === 'CheckoutError') {
            console.log('CheckoutError AMZ Page')
            // tsLogger("Error while checking out")
            // console.log(POSTSubmitOrderResponse)

            return "Error"
        }
        else if (POSTSubmitOrderResponse.data.indexOf('An error occurred when we tried to process your request.') !== -1 ){
            console.log('An error occurred when we tried to process your request.')
            // tsLogger("Even worse error")
            // console.log(POSTSubmitOrderResponse)
            return "Error"
        }
        else {
            console.log('some OTHER ERROR')
            // console.log(POSTSubmitOrderResponse)
            return "Error"
        }
    })
}

export default checkoutIpc;