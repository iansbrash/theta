import {
    returnParsedCookies,
    accumulateCookies,
    getValueByDelimiters
} from '../../../../requestFunctions';
import tsLogger from '../../../../logger';
import genShippingPayload from "../../logic/genShippingPayload";
import testProfile from "../../../../sensitive/testInterfaces/testProfile";
import { GETCheckoutScreenRetry } from './initialize/GETCheckoutScreen';
import { POSTAddShippingAddressFormHandlerRetry } from './shipping/POSTAddShippingAddressFormHandler';
import { POSTSelectShippingAddressRetry } from './shipping/POSTSelectShippingAddress';
import { GETAddPaymentPageRetry } from './payment/GETAddPaymentPageResponse';
import { POSTRegisterRetry } from './payment/POSTRegister';
import { POSTAddPaymentMethodRetry } from './payment/POSTAddPaymentMethod';
import { POSTSelectPaymentMethodRetry } from './payment/POSTSelectPaymentMethod';
import { POSTSubmitOrderRetry } from './payment/POSTSubmitOrder';
import { Proxy } from '../../../../interfaces/ProxyList';
import { 
    POSTAsyncContinueAfterSelectionRetry,
    POSTAsyncContinueSuperDynamicParams
} from './payment/POSTAsyncContinueAfterSelection';

// https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript
export const replaceAll = (str : string, find : string, replace : string) => {
    return str.replace(new RegExp(find, 'g'), replace);
}

const Checkout = async (allCookies : string[], proxy : Proxy) => {

    const GETCheckoutScreenResponse = await GETCheckoutScreenRetry(allCookies, proxy);

    allCookies = accumulateCookies(
        allCookies,
        returnParsedCookies(GETCheckoutScreenResponse.headers['set-cookie'])
    )

    const needsToResignIn = GETCheckoutScreenResponse.request.res.responseUrl.includes('/ap/signin')

    if (needsToResignIn) {
        throw "Needs to sign in again. F";
    }

    const GETCheckoutScreenResponseData = GETCheckoutScreenResponse.data;

    let purchaseId, addressUIWidgetsObfuscatedCustomerId, addressUIWidgetsAddressWizardInteractionId, addressUIWidgetsPreviousAddressFormStateToken;
    addressUIWidgetsObfuscatedCustomerId = getValueByDelimiters(GETCheckoutScreenResponseData, '<input type="hidden" name="address-ui-widgets-previous-address-form-state-token" value="', '">');
    addressUIWidgetsAddressWizardInteractionId = getValueByDelimiters(GETCheckoutScreenResponseData, '<input type="hidden" name="address-ui-widgets-address-wizard-interaction-id" value="', '">');
    addressUIWidgetsPreviousAddressFormStateToken = getValueByDelimiters(GETCheckoutScreenResponseData, '<input type="hidden" name="address-ui-widgets-obfuscated-customerId" value="', '">');
    purchaseId = getValueByDelimiters(GETCheckoutScreenResponseData, '<input type="hidden" name="purchaseId" value="', '">');

    let GETCheckoutScreenResponseCIDData = GETCheckoutScreenResponseData.substring(GETCheckoutScreenResponseData.indexOf('if (!window.fwcimData) {'))
    const customerId = getValueByDelimiters(GETCheckoutScreenResponseCIDData, "customerId: '", "'")

    const shippingPayload = genShippingPayload(
        testProfile.information, 
        testProfile.shipping, {
            "address-ui-widgets-previous-address-form-state-token": addressUIWidgetsObfuscatedCustomerId, 
            "address-ui-widgets-address-wizard-interaction-id": addressUIWidgetsAddressWizardInteractionId, 
            "address-ui-widgets-obfuscated-customerId": addressUIWidgetsPreviousAddressFormStateToken,
            "purchaseId": purchaseId,
        }
    );

    const POSTAddShippingAddressFormHandlerResponse = await POSTAddShippingAddressFormHandlerRetry(
        allCookies,
        shippingPayload,
        proxy
    );

    const addressId = POSTAddShippingAddressFormHandlerResponse.data.createOrEditAddressResponse.addressId;
    // const addressBookId = getValueByDelimiters(GETCheckoutScreenResponseData , '<input type="hidden" name="addressBookId" value="', '">')

    allCookies = accumulateCookies(
        allCookies,
        returnParsedCookies(POSTAddShippingAddressFormHandlerResponse.headers['set-cookie'])
    )


    const POSTSelectShippingAddressResponse = await POSTSelectShippingAddressRetry(allCookies, addressId, purchaseId, proxy)

    allCookies = accumulateCookies(
        allCookies,
        returnParsedCookies(POSTSelectShippingAddressResponse.headers['set-cookie'])
    )


    const GETAddPaymentPageResponse = await GETAddPaymentPageRetry(allCookies, proxy);

    allCookies = accumulateCookies(
        allCookies,
        returnParsedCookies(GETAddPaymentPageResponse.headers['set-cookie'])
    )


    // console.log(GETAddPaymentPageResponse.data);
    // return;

    //<input type="hidden" name="ppw-widgetState" value="
    let ppwWidgetState = getValueByDelimiters(GETAddPaymentPageResponse.data , '<input type="hidden" name="ppw-widgetState" value="', '">');
    const iFrameName = 'ApxSecureIframe-' + getValueByDelimiters(GETAddPaymentPageResponse.data, '<iframe id="', '"')
    const parentWidgetInstanceId = getValueByDelimiters(GETAddPaymentPageResponse.data, '"parentWidgetInstanceId":"', '"');

    // console.log(`ppwWidgetState: ${ppwWidgetState}`);
    // console.log(`iFrameName: ${iFrameName}`)
    // console.log(`parentWidgetInstanceId: ${parentWidgetInstanceId}`)
    // console.log(GETAddPaymentPageResponse.data);


    // now we need to get register

    const POSTRegisterResponse = await POSTRegisterRetry(
        allCookies, {
            widgetState: ppwWidgetState,
            iFrameName: iFrameName,
            parentWidgetInstanceId: parentWidgetInstanceId
        },
        proxy
    )

    // console.log(POSTRegisterResponse)

        // need ubid-main and at-main for auth
    let ppwWidgetState2 = getValueByDelimiters(POSTRegisterResponse.data, '<input type="hidden" name="ppw-widgetState" value="', '">')
    // return;

    // return;

    allCookies = accumulateCookies(
        allCookies,
        returnParsedCookies(POSTRegisterResponse.headers['set-cookie'])
    )
    // console.log(ppwWidgetState)

    // console.log(joinCookies(allCookies))
    // return;

    // DO WE NEED THIS
    // const POSTContinueWidgetResponse = await POSTContinueWidget(allCookies, {
    //     "ppw-widgetState": ppwWidgetState2,
    //     addCreditCardNumber: testProfile.payment.number,
    //     customerId: customerId
    // });

    // console.log(POSTContinueWidgetResponse);

    // return;


    const POSTAddPaymentMethodResponse = await POSTAddPaymentMethodRetry(allCookies, customerId, {
        'ppw-widgetEvent:AddCreditCardEvent': '',
        'ppw-jsEnabled': true,
        'ppw-widgetState': ppwWidgetState2
    }, testProfile.payment, proxy);

    // console.log(POSTAddPaymentMethodResponse.data.additionalWidgetResponseData.additionalData);

    const ppwPaymentMethodId = POSTAddPaymentMethodResponse.data.additionalWidgetResponseData.additionalData.paymentInstrumentId;

    // this contains all the ppw information we need
    const POSTSelectPaymentMethodResponse = await POSTSelectPaymentMethodRetry(
        allCookies,
        customerId, {
            "ppw-widgetState": ppwWidgetState,
            "ppw-paymentMethodId": ppwPaymentMethodId
        },
        proxy
    )

    allCookies = accumulateCookies(
        allCookies,
        returnParsedCookies(POSTSelectPaymentMethodResponse.headers['set-cookie'])
    )

    const SelectPaymentHTML = POSTSelectPaymentMethodResponse.data.htmlContent;
    // const paymentInstrumentId = POSTSelectPaymentMethodResponse.data.additionalWidgetResponseData.additionalData.paymentInstrumentId
    
    // console.log(SelectPaymentHTML)
    // console.log(paymentInstrumentId)

    // const ppwLength = 46;

    const ppw_instrumentRowSelection = getValueByDelimiters(SelectPaymentHTML, '" type="radio" name="ppw-instrumentRowSelection" value="', '">');
    const _rewardsAccountSelection_customAmountValue = getValueByDelimiters(SelectPaymentHTML, '_rewardsAccountSelection_rewardsApplied" value="', '"');
    const _rewardsAccountSelection_maxAmountValueHiddenInput = getValueByDelimiters(SelectPaymentHTML, '_rewardsAccountSelection_maxAmountValueHiddenInput" value="', '"');
    const _rewardsAccountSelection_currencyUnitHiddenInput = getValueByDelimiters(SelectPaymentHTML, '_rewardsAccountSelection_currencyUnitHiddenInput" value="', '"');
    const _rewardsAccountSelection_instrumentIdHiddenInput = getValueByDelimiters(SelectPaymentHTML, '_rewardsAccountSelection_instrumentIdHiddenInput" value="', '"');
    const _rewardsAccountSelection_parentInstrumentIdHiddenInput = getValueByDelimiters(SelectPaymentHTML, '_rewardsAccountSelection_parentInstrumentIdHiddenInput" value="', '"');
    const _rewardsAccountSelection_currencyToPointsConversionRatioHiddenInput = getValueByDelimiters(SelectPaymentHTML, '_rewardsAccountSelection_currencyToPointsConversionRatioHiddenInput" value="', '"');
    
    // note: this has a different ppw id
    const _childRewardsAccountInstrumentId = getValueByDelimiters(SelectPaymentHTML, '_childRewardsAccountInstrumentId" value="', '"');
    
    // console.log(ppw_instrumentRowSelection)
    // console.log(_rewardsAccountSelection_customAmountValue)
    // console.log(_rewardsAccountSelection_instrumentIdHiddenInput) // ppw-_rewardsAccountSelection_instrumentIdHiddenInput
    // console.log(_rewardsAccountSelection_maxAmountValueHiddenInput)
    // console.log(_rewardsAccountSelection_currencyUnitHiddenInput)
    // console.log(_rewardsAccountSelection_parentInstrumentIdHiddenInput)
    // console.log(_rewardsAccountSelection_currencyToPointsConversionRatioHiddenInput)
    // console.log(_childRewardsAccountInstrumentId);

    const superDynamicParams : POSTAsyncContinueSuperDynamicParams = {
        'ppw-instrumentRowSelection': replaceAll( ppw_instrumentRowSelection, '&amp;', '&' ),
        [`ppw-${_rewardsAccountSelection_instrumentIdHiddenInput}_rewardsAccountSelection_customAmountValue`]: _rewardsAccountSelection_customAmountValue,
        [`ppw-${_rewardsAccountSelection_instrumentIdHiddenInput}_rewardsAccountSelection_instrumentIdHiddenInput`]: _rewardsAccountSelection_instrumentIdHiddenInput,
        [`ppw-${_rewardsAccountSelection_instrumentIdHiddenInput}_rewardsAccountSelection_maxAmountValueHiddenInput`]: _rewardsAccountSelection_maxAmountValueHiddenInput,
        [`ppw-${_rewardsAccountSelection_instrumentIdHiddenInput}_rewardsAccountSelection_currencyUnitHiddenInput`]: _rewardsAccountSelection_currencyUnitHiddenInput,
        [`ppw-${_rewardsAccountSelection_instrumentIdHiddenInput}_rewardsAccountSelection_parentInstrumentIdHiddenInput`]: _rewardsAccountSelection_parentInstrumentIdHiddenInput,
        [`ppw-${_rewardsAccountSelection_instrumentIdHiddenInput}_rewardsAccountSelection_currencyToPointsConversionRatioHiddenInput`]: _rewardsAccountSelection_currencyToPointsConversionRatioHiddenInput,
        [`ppw-${_rewardsAccountSelection_instrumentIdHiddenInput}_childRewardsAccountInstrumentId`]: _childRewardsAccountInstrumentId,
    }

    const POSTAsyncContinueAfterSelectionResponse = await POSTAsyncContinueAfterSelectionRetry(
        allCookies, {
            "ppw-widgetState": ppwWidgetState,
            superDynamicParams: superDynamicParams
        },
        proxy
    )


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
        'selectedPaymentPaystationId': 'amzn1.pm.wallet.MGhfUFVfQ1VTXzExMDA4ZDM0LTQ1ZjQtNDlkYy1hN2VlLWI4MDU0Yzc3MjIyNQ.QTI1SEExSEUxUkQ0MlU',
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

    const POSTSubmitOrderResponse = await POSTSubmitOrderRetry(
        allCookies,
        newFinalData,
        proxy
    )

    console.log(newFinalData)

    if (POSTSubmitOrderResponse.headers['x-amz-checkout-page-type'] === 'CheckoutThankYou') {
        tsLogger("Successfully checked out the product")
    }
    else if (POSTSubmitOrderResponse.headers['x-amz-checkout-page-type'] === 'CheckoutError') {
        tsLogger("Error while checking out")
        // console.log(POSTSubmitOrderResponse)
    }
    else {
        tsLogger("Even worse error")
        // console.log(POSTSubmitOrderResponse)
    }

    return;
}

export default Checkout;