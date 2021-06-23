import signIn from "./signin";
import {
    returnParsedCookies,
    joinCookies,
    accumulateCookies,
    convertCookieArrayToObject,
    getValueByDelimiters
} from './requestFunctions';
import qs from 'qs';
import axios, { AxiosResponse } from 'axios';
import CookieObject from './interfaces/CookieObject';
import { AmazonUser, AmazonPass } from "./sensitive/logins";
import requestRetryWrapper from './requestRetryWrapper';
import tsLogger from './logger';
import justinIsCracked from './genMetadata';
import genShippingPayload, {
    genShippingPayloadParams
} from "./genShippingPayload";
import testProfile from "./sensitive/testProfile";

//https://www.amazon.com/gp/cart/desktop/go-to-checkout.html/ref=ox_sc_proceed?partialCheckoutCart=1&isToBeGiftWrappedBefore=0&proceedToRetailCheckout=Proceed+to+checkout&proceedToCheckout=1&cartInitiateId=1624396027218
//https://www.amazon.com/gp/buy/addressselect/handlers/display.html?hasWorkingJavascript=1


// contains the cartInitiateId
// https://www.amazon.com/gp/cart/view.html?ref_=nav_cart

const GETCart = async (allCookies : string[]) : Promise<AxiosResponse>=> {
    const GETCartUrl = "https://www.amazon.com/gp/cart/view.html?ref_=nav_cart";
    const GETCartResponse : AxiosResponse = await axios({
        method: 'get',
        url: GETCartUrl,
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9",
            // "downlink": "7.5",
            "ect": "4g",
            "rtt": "50",
            "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "referrer": "https://www.amazon.com/gp/cart/view.html?ref_=nav_cart",
            cookie: joinCookies(allCookies)
        }
    });

    return GETCartResponse;
}

const GETCartRetry : (allCookies : string[]) => Promise<AxiosResponse> = requestRetryWrapper(GETCart, {
    baseDelay: 3000,
    numberOfTries: 3,
    consoleRun: 'Getting checkout screen',
    consoleError: 'Error getting checkout screen'
})

const GETCheckoutScreen = async (allCookies : string[], email : string, password : string) : Promise<AxiosResponse> => {
    const cartInitiateId = (new Date).getTime();
    const CartUrlBeforeRedirect = `https://www.amazon.com/gp/cart/desktop/go-to-checkout.html/ref=ox_sc_proceed?partialCheckoutCart=1&isToBeGiftWrappedBefore=0&proceedToRetailCheckout=Proceed+to+checkout&proceedToCheckout=1&cartInitiateId=${cartInitiateId}`
    const GETCheckoutScreenResponse : AxiosResponse = await axios({
        method: 'get',
        url: CartUrlBeforeRedirect,
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9",
            // "downlink": "7.5",
            "ect": "4g",
            "rtt": "50",
            "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "referrer": "https://www.amazon.com/gp/cart/view.html?ref_=nav_cart",
            cookie: joinCookies(allCookies)
        }
    });

    const needsToResignIn = GETCheckoutScreenResponse.request.res.responseUrl.includes('/ap/signin')

    if (needsToResignIn) {
        tsLogger('Error: Redirected, logging in again')
        throw "Redirect error";
    }
    else {
        tsLogger("Successfully got checkout screen without redirect")
        return GETCheckoutScreenResponse;
    }
}

const GETCheckoutScreenRetry : (allCookies : string[], username : string, password : string) => Promise<AxiosResponse> = requestRetryWrapper(GETCheckoutScreen, {
    baseDelay: 3000,
    numberOfTries: 3,
    consoleRun: 'Getting checkout screen',
    consoleError: 'Error getting checkout screen'
})

// https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript
function replaceAll(str : string, find : string, replace : string) {
    return str.replace(new RegExp(find, 'g'), replace);
}

//https://www.amazon.com/gp/identity/address/widgets/form/handlers/create-address-form-handler.html
const POSTAddShippingAddressFormHandler = async (allCookies : string[], shippingPayload : genShippingPayloadParams) : Promise<any>=> {
    const POSTAddShippingUrl = 'https://www.amazon.com/gp/identity/address/widgets/form/handlers/create-address-form-handler.html';

    // let POSTAddShippingConfigData : string = replaceAll(qs.stringify({payLoad: JSON.stringify(shippingPayload)}), '%20', '+');
    let POSTAddShippingConfigData : string = JSON.stringify(shippingPayload)
    // console.log(POSTAddShippingConfigData)
    // console.log(qs.stringify(shippingPayload))
    // console.log(encodeURIComponent(POSTAddShippingConfigData));

    POSTAddShippingConfigData = replaceAll(POSTAddShippingConfigData, '{"deliveryInstructionsDisplayMode":"CDP_ONLY","deliveryInstructionsClientName":"RetailWebsite","deliveryInstructionsDeviceType":"desktop","deliveryInstructionsIsEditAddressFlow":"false"}', '"{\\"deliveryInstructionsDisplayMode\\" : \\"CDP_ONLY\\", \\"deliveryInstructionsClientName\\" : \\"RetailWebsite\\", \\"deliveryInstructionsDeviceType\\" : \\"desktop\\", \\"deliveryInstructionsIsEditAddressFlow\\" : \\"false\\"}"')
    POSTAddShippingConfigData = replaceAll(POSTAddShippingConfigData, '{"initialCountryCode":"US"}', '"{\\"initialCountryCode\\":\\"US\\"}"')

    console.log(POSTAddShippingConfigData)
    console.log(encodeURIComponent(POSTAddShippingConfigData))


    //"{\"initialCountryCode\":\"US\"}"
    // const fuccThis = 'payLoad=%7B%22address-ui-widgets-countryCode%22%3A%22US%22%2C%22address-ui-widgets-enterAddressFullName%22%3A%22Ian+Brash1%22%2C%22address-ui-widgets-enterAddressPhoneNumber%22%3A%22%2B16158922385%22%2C%22address-ui-widgets-enterAddressLine1%22%3A%221105+Holly+Tree+Farms+Rd%22%2C%22address-ui-widgets-enterAddressLine2%22%3A%22%22%2C%22address-ui-widgets-enterAddressCity%22%3A%22Brentwood%22%2C%22address-ui-widgets-enterAddressStateOrRegion%22%3A%22TN%22%2C%22address-ui-widgets-enterAddressPostalCode%22%3A%2237027%22%2C%22address-ui-widgets-previous-address-form-state-token%22%3A%22eyJ6aXAiOiJERUYiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiQTI1NktXIn0.MbTuU02WgjAVC9DM0q4iO7YDjrP6NvefeJPlH_cU_wqDTUPDULsp1w.wY0qqatjSrfznvLy.e7Q4N5tUX8YlHA_TIMW660Ym6WW-_Mp8yRPRQzNE0cD90XcnHoKicEpOE1mUgQ5hsmnCCUsXNgzOZHFzWhsFYwV5p7stmvHQHy5rtcqFSe0kO6oiAKNCA5i9PoEg0R2_yaLhQ7O3zyFmw7QNRx43obs5PlnU8of2DIM3Dm-UA1l69gfLwhmUd6Y0PtvcDbXgWupFynRTWR8Bj27eGXcjLGoaR4H6ODXY6dB0zdREGg621Az-aVAufalTSFSd60wjKDkS1wCRxiASNhinVI9aZdNNPkYb4EWVn2rff5_QdDGtaJalhacyFdEivmKkrHx6AHuGbVBavThs8Mwh2Sp4ziBdwEzBctlFz8OBwsSYXvcpj7i7hGT0gBrNTMAesbJBlJ7AQoq9ZeEx7ktpWj2hwPxl_EVWu4d6-N5nf4DV20foKcu6JlP6TbbAPoeq6A.slpcEIFcUJ8ZNNYXSle7fA%22%2C%22address-ui-widgets-delivery-instructions-desktop-expander-context%22%3A%22%7B%5C%22deliveryInstructionsDisplayMode%5C%22+%3A+%5C%22CDP_ONLY%5C%22%2C+%5C%22deliveryInstructionsClientName%5C%22+%3A+%5C%22RetailWebsite%5C%22%2C+%5C%22deliveryInstructionsDeviceType%5C%22+%3A+%5C%22desktop%5C%22%2C+%5C%22deliveryInstructionsIsEditAddressFlow%5C%22+%3A+%5C%22false%5C%22%7D%22%2C%22address-ui-widgets-addressFormButtonText%22%3A%22useThisAddress%22%2C%22address-ui-widgets-addressFormHideHeading%22%3A%22false%22%2C%22address-ui-widgets-addressFormHideSubmitButton%22%3A%22false%22%2C%22address-ui-widgets-enableImportContact%22%3A%22false%22%2C%22address-ui-widgets-enableAddressDetails%22%3A%22true%22%2C%22address-ui-widgets-returnLegacyAddressID%22%3A%22false%22%2C%22address-ui-widgets-enableDeliveryInstructions%22%3A%22true%22%2C%22address-ui-widgets-enableAddressWizardInlineSuggestions%22%3A%22true%22%2C%22address-ui-widgets-enableEmailAddress%22%3A%22false%22%2C%22address-ui-widgets-enableAddressTips%22%3A%22false%22%2C%22address-ui-widgets-amazonBusinessGroupId%22%3A%22%22%2C%22address-ui-widgets-enableAddressWizardForm%22%3A%22true%22%2C%22address-ui-widgets-delivery-instructions-data%22%3A%22%7B%5C%22initialCountryCode%5C%22%3A%5C%22US%5C%22%7D%22%2C%22address-ui-widgets-address-wizard-interaction-id%22%3A%229728dd1d-fc68-41c9-abe8-04df7dcdb6ab%22%2C%22address-ui-widgets-obfuscated-customerId%22%3A%22A25HA1HE1RD42U%22%2C%22address-ui-widgets-locationData%22%3A%22%22%2C%22address-ui-widgets-locale%22%3A%22%22%2C%22hasWorkingJavascript%22%3A%221%22%2C%22purchaseId%22%3A%22106-0143442-5597860%22%7D'


    // return;
    // return;
    // replaces ":{" with ":{\" (including the ""s)
    // POSTAddShippingConfigData = replaceAll(POSTAddShippingConfigData, '%22%3A%7B%22', '%22%3A%22%7B%5C%22')

    // // replaces ":" with \" : \"
    // POSTAddShippingConfigData = replaceAll(POSTAddShippingConfigData, '%22%3A%22', '%5C%22+%3A+%5C%22')

    // POSTAddShippingConfigData = replaceAll(POSTAddShippingConfigData, '%22%3A%22', '%5C%22+%3A+%5C%22')
    // POSTAddShippingConfigData = replaceAll(POSTAddShippingConfigData, '%22%3A%22', '%5C%22+%3A+%5C%22')

    // console.log(POSTAddShippingConfigData);

    // return undefined;

    const POSTAddShippingAddressFormHandlerResponse = await axios({
        method: 'post',
        url: POSTAddShippingUrl,
        headers: {
            "accept": "text/html;charset=UTF-8",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/x-www-form-urlencoded",
            "downlink": "9.1",
            "ect": "4g",
            "rtt": "50",
            "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            referrer: 'https://www.amazon.com/gp/buy/addressselect/handlers/display.html?hasWorkingJavascript=1',
            cookie: joinCookies(allCookies)
        },
        data : 'payLoad=' + encodeURIComponent(POSTAddShippingConfigData)
    })

    if (POSTAddShippingAddressFormHandlerResponse.data.createOrEditAddressResponse.addressId !== null) {
        tsLogger("Successfully added shipping address")
        return POSTAddShippingAddressFormHandlerResponse;
    }
    else {
        tsLogger("Error adding shipping address")
        throw "Error adding shipping address";
    }
}

const POSTAddShippingAddressFormHandlerRetry : (allCookies : string[], shippingPayload : genShippingPayloadParams) => Promise<AxiosResponse> = requestRetryWrapper(POSTAddShippingAddressFormHandler, {
    baseDelay: 3000,
    numberOfTries: 3,
    consoleRun: 'Adding shipping information',
    consoleError: 'Error adding shipping information'
})

// x-amz-id-1: YZB2GTVGYTXEKX7MDMEC
// x-amz-rid: YZB2GTVGYTXEKX7MDMEC
// x-amz-cf-id: E6Nt_4c1UKLSPvJYlahZIWwbUtWOzpbGc-EcFWHHtPf_sZdbMyObcQ==
// x-amz-cf-pop: ATL56-C4
const checkout = async (allCookies : string[]) => {


    const GETCheckoutScreenResponse = await GETCheckoutScreenRetry(allCookies, AmazonUser, AmazonPass);

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
        shippingPayload
    );

    const addressId = POSTAddShippingAddressFormHandlerResponse.data.createOrEditAddressResponse.addressId;
    console.log(`addressId: ${addressId}`)

    // console.log(POSTAddShippingAddressFormHandlerResponse);

}

(async () => {
    let allCookies = await signIn(AmazonUser, AmazonPass);
    
    await checkout(allCookies);
})();