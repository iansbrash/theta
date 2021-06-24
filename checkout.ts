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
import { ProfileBilling, ProfilePayment } from "./interfaces/ProfileObject";

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

    let POSTAddShippingConfigData : string = JSON.stringify(shippingPayload)
    
    // does big replace... should make a function to do this automatically instead of manually
    // amazon parsing sucks
    POSTAddShippingConfigData = replaceAll(POSTAddShippingConfigData, '{"deliveryInstructionsDisplayMode":"CDP_ONLY","deliveryInstructionsClientName":"RetailWebsite","deliveryInstructionsDeviceType":"desktop","deliveryInstructionsIsEditAddressFlow":"false"}', '"{\\"deliveryInstructionsDisplayMode\\" : \\"CDP_ONLY\\", \\"deliveryInstructionsClientName\\" : \\"RetailWebsite\\", \\"deliveryInstructionsDeviceType\\" : \\"desktop\\", \\"deliveryInstructionsIsEditAddressFlow\\" : \\"false\\"}"')
    POSTAddShippingConfigData = replaceAll(POSTAddShippingConfigData, '{"initialCountryCode":"US"}', '"{\\"initialCountryCode\\":\\"US\\"}"')

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

interface SelectShippingAddressDynamicParams {
    addressBookId: string,
    storeCountry: string,
    addressID: string,
    purchaseId: string
}

const POSTSelectShippingAddress = async (allCookies : string[], params : SelectShippingAddressDynamicParams) : Promise<AxiosResponse> => {
    const POSTSelectShippingAddress = 'https://www.amazon.com/gp/buy/shared/handlers/async-continue.html/ref=chk_addr_select_2_customer';

    const {
        addressBookId,
        storeCountry,
        addressID,
        purchaseId
    } = params;

    console.log(params)

    const POSTSelectShippingAddressDataConfig = {
        submissionURL: `/gp/buy/addressselect/handlers/continue.html/ref=chk_addr_select_2_customer?ie=UTF8&action=select-shipping&addressID=${addressID}&enableDeliveryPreferences=1&fromAnywhere=0&isCurrentAddress=0&numberOfDistinctItems=1&purchaseId=${purchaseId}&requestToken=`,
        pickupUrl: '/gp/buy/storeaddress/handlers/popover/search.html/ref=chk_addr_locker_search_sec',
        usecase: 'checkout',
        hasWorkingJavascript: 1,
        addressBookId: addressBookId,
        pickupType: 'All',
        storeCountry: storeCountry,
        searchCriterion: 'storeZip',
        isAsync: 1,
        isClientTimeBased: 1,
        ie: 'UTF8',
        action: 'select-shipping',
        addressID: addressID,
        enableDeliveryPreferences: 1,
        fromAnywhere: 0,
        isCurrentAddress: 0,
        numberOfDistinctItems: 1,
        purchaseId: purchaseId,
        requestToken: '',
    }


    const POSTSelectShippingAddressData = qs.stringify(POSTSelectShippingAddressDataConfig) + `&handler=/gp/buy/addressselect/handlers/continue.html`;

    console.log(POSTSelectShippingAddressData);

    const POSTSelectShippingAddressResponse = await axios({
        method: 'post',
        url: POSTSelectShippingAddress,
        headers: {
            "accept": "text/plain, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8;",
            "downlink": "10",
            "ect": "4g",
            "rtt": "100",
            "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-amz-checkout-transition": "ajax",
            "x-amz-checkout-type": "spp",
            "x-requested-with": "XMLHttpRequest",
            referrer: 'https://www.amazon.com/gp/buy/addressselect/handlers/display.html?hasWorkingJavascript=1',
            cookie: joinCookies(allCookies)
        }
    })

    return POSTSelectShippingAddressResponse;
}

const POSTContinueToPayment = async (allCookies : string[], addressId : string, purchaseId : string) : Promise<AxiosResponse> => {
    const POSTContinueToPaymentUrl = 'https://www.amazon.com/gp/buy/shared/handlers/async-continue.html/ref=ox_shipaddress_add_new_addr';

    const POSTContinueToPaymentConfig = {
        action: 'select-shipping',
        addressID: addressId,
        purchaseId: purchaseId,
        isClientTimeBased: 1,
    }
    
    const POSTContinueToPaymentData = qs.stringify(POSTContinueToPaymentConfig) + `&handler=/gp/buy/addressselect/handlers/continue.html`;

    const POSTContinueToPaymentResponse = await axios({
        method: 'post',
        url: POSTContinueToPaymentUrl,
        headers: {
            'authority': 'www.amazon.com', 
            'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"', 
            'x-amz-checkout-type': 'spp', 
            'dnt': '1', 
            'rtt': '50', 
            'sec-ch-ua-mobile': '?0', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36', 
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8;', 
            'accept': 'text/plain, */*; q=0.01', 
            'x-requested-with': 'XMLHttpRequest', 
            'downlink': '10', 
            'ect': '4g', 
            'x-amz-checkout-transition': 'ajax', 
            'origin': 'https://www.amazon.com', 
            'sec-fetch-site': 'same-origin', 
            'sec-fetch-mode': 'cors', 
            'sec-fetch-dest': 'empty', 
            'referer': 'https://www.amazon.com/gp/buy/addressselect/handlers/display.html?hasWorkingJavascript=1', 
            'accept-language': 'en-US,en;q=0.9', 
            cookies: joinCookies(allCookies)
        },
        data : `action=select-shipping&addressID=${addressId}&purchaseId=${purchaseId}&isClientTimeBased=1&handler=/gp/buy/addressselect/handlers/continue.html` //POSTContinueToPaymentData,
        // maxRedirects: 0,
        // validateStatus: function (a) {return true;}
    });

    return POSTContinueToPaymentResponse;
};

const POSTContinueToPaymentRetry : (allCookies : string[], addressId : string, purchaseId : string) => Promise<AxiosResponse> = requestRetryWrapper(POSTContinueToPayment, {
    baseDelay: 3000,
    numberOfTries: 3,
    consoleRun: 'Getting payment page',
    consoleError: 'Error getting payment page'
})

interface POSTAddPaymentMethodDynamicParams {
    'ppw-widgetEvent:AddCreditCardEvent': string,
    'ppw-jsEnabled': boolean,
    'ppw-widgetState': string
}

const splitCC = (cc : string) : string[] => {
    return cc.match(/.{1,4}/g)!;
}

const POSTAddPaymentMethod = async (allCookies : string[], customerId : string, params : POSTAddPaymentMethodDynamicParams, payment : ProfilePayment) => {

    const url = `https://apx-security.amazon.com/payments-portal/data/f1/widgets2/v1/customer/${customerId}/continueWidget?sif_profile=APX-Encrypt-All-NA`

    console.log(url);

    const POSTAddPaymentMethodConfig : POSTAddPaymentMethodDynamicParams = params
    
    // also needs CC name expm expy
    const POSTAddPaymentMethodData = qs.stringify(POSTAddPaymentMethodConfig) + '&ie=UTF-8&addCreditCardNumber=4355+4607+0658+5964&ppw-accountHolderName=Ian+brash&ppw-expirationDate_month=6&ppw-expirationDate_year=2023' // `&ie=${'UTF-8'}&addCreditCardNumber=${splitCC(payment.number).join('+')}&ppw-accountHolderName=${payment.name.split(' ').join('+')}&ppw-expirationDate_month=${6}&ppw-expirationDate_year=${payment.expiryYear}`;

    console.log(POSTAddPaymentMethodData)

    try {

        const POSTAddPaymentMethodResponse = await axios({
            method: 'post',
            url: url,
            headers: {
                'Connection': 'keep-alive', 
                'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"', 
                'DNT': '1', 
                'Widget-Ajax-Attempt-Count': '0', 
                'sec-ch-ua-mobile': '?0', 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36', 
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 
                'Accept': 'application/json, text/javascript, */*; q=0.01', 
                'X-Requested-With': 'XMLHttpRequest', 
                // 'APX-Widget-Info': 'Checkout/desktop/hDkCr7y4s2Y4', 
                'Origin': 'https://apx-security.amazon.com', 
                'Sec-Fetch-Site': 'same-origin', 
                'Sec-Fetch-Mode': 'cors', 
                'Sec-Fetch-Dest': 'empty', 
                'Referer': 'https://apx-security.amazon.com/cpe/pm/register', 
                'Accept-Language': 'en-US,en;q=0.9', 
                cookies: joinCookies(allCookies)
            },
            data : POSTAddPaymentMethodData
            // maxRedirects: 0,
            // validateStatus: function (a) {return true;}
        });
        return POSTAddPaymentMethodResponse;

    } catch (err) {
        throw err;
    }


}

const POSTRegister = async (allCookies : string[], ppwWidgetState : string) => {

    const POSTRegisterUrl = 'https://apx-security.amazon.com/cpe/pm/register';

    const POSTRegisterResponse = await axios({
        method: 'post',
        url: POSTRegisterUrl,
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "max-age=0",
            "content-type": "application/x-www-form-urlencoded",
            "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "iframe",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-site",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            referrer: 'https://www.amazon.com/',
            cookie: joinCookies(allCookies)
        }
    })

    return POSTRegisterResponse;

}

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
        shippingPayload
    );

    const addressId = POSTAddShippingAddressFormHandlerResponse.data.createOrEditAddressResponse.addressId;
    const addressBookId = getValueByDelimiters(GETCheckoutScreenResponseData , '<input type="hidden" name="addressBookId" value="', '">')

    allCookies = accumulateCookies(
        allCookies,
        returnParsedCookies(POSTAddShippingAddressFormHandlerResponse.headers['set-cookie'])
    )


    const fuckThis = await axios({
        method: 'post',
        url: 'https://www.amazon.com/gp/buy/shared/handlers/async-continue.html/ref=ox_shipaddress_add_new_addr',
        headers: {
            "accept": "text/plain, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8;",
            "downlink": "6.1",
            "ect": "4g",
            "rtt": "50",
            "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-amz-checkout-transition": "ajax",
            "x-amz-checkout-type": "spp",
            "x-requested-with": "XMLHttpRequest",
            referrer: 'https://www.amazon.com/gp/buy/addressselect/handlers/display.html?hasWorkingJavascript=1',
            cookie: joinCookies(allCookies)
        },

        data : `action=select-shipping&addressID=${addressId}&purchaseId=${purchaseId}&isClientTimeBased=1&handler=/gp/buy/addressselect/handlers/continue.html`
    })

    allCookies = accumulateCookies(
        allCookies,
        returnParsedCookies(fuckThis.headers['set-cookie'])
    )

    // console.log(fuckThis)
// return;


    // const POSTSelectShippingAddressResponse = await POSTSelectShippingAddress(
    //     allCookies, {
    //         addressBookId: addressBookId,
    //         addressID: addressId,
    //         storeCountry: 'US',
    //         purchaseId: purchaseId
    //     }
    // )

    // console.log(POSTSelectShippingAddressResponse);


    // return;

    
    //   return;

    // console.log(POSTAddShippingAddressFormHandlerResponse.data)
// return; 
    console.log(`addressId: ${addressId}`)


    // console.log(convertCookieArrayToObject(allCookies));

    const testRes = await axios({
        method: 'get',
        url: 'https://www.amazon.com/gp/buy/payselect/handlers/display.html?hasWorkingJavascript=1',
        headers: {
            'authority': 'www.amazon.com', 
            'rtt': '50', 
            'downlink': '10', 
            'ect': '4g', 
            'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"', 
            'sec-ch-ua-mobile': '?0', 
            'dnt': '1', 
            'upgrade-insecure-requests': '1', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36', 
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
            'sec-fetch-site': 'none', 
            'sec-fetch-mode': 'navigate', 
            'sec-fetch-user': '?1', 
            'sec-fetch-dest': 'document', 
            'accept-language': 'en-US,en;q=0.9', 
            cookie: joinCookies(allCookies)
        },
        maxRedirects: 0,
        validateStatus: () => {return true;}
    })

    allCookies = accumulateCookies(
        allCookies,
        returnParsedCookies(testRes.headers['set-cookie'])
    )

    //<input type="hidden" name="ppw-widgetState" value="
    let ppwWidgetState = getValueByDelimiters(testRes.data , '<input type="hidden" name="ppw-widgetState" value="', '">');

    // console.log(testRes.data);

    // return;

    // console.log(testRes)
    // return;

    const POSTRegisterResponse = await POSTRegister(
        allCookies,
        ppwWidgetState
    );

    console.log(POSTRegisterResponse);


    return;


    const POSTAddPaymentMethodResponse = await POSTAddPaymentMethod(allCookies, customerId, {
        'ppw-widgetEvent:AddCreditCardEvent': '',
        'ppw-jsEnabled': true,
        'ppw-widgetState': ppwWidgetState
    }, testProfile.payment);

    console.log(POSTAddPaymentMethodResponse);

    // const POSTContinueToPaymentResponse = await POSTContinueToPaymentRetry(allCookies, addressId, purchaseId);

    // console.log(POSTContinueToPaymentResponse);

    // console.log(POSTAddShippingAddressFormHandlerResponse);

}

(async () => {
    let allCookies = await signIn(AmazonUser, AmazonPass);
    
    await checkout(allCookies);
})();