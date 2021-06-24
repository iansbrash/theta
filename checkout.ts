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

    const POSTAddPaymentMethodConfig : POSTAddPaymentMethodDynamicParams = params;
    
    // also needs CC name expm expy
    const POSTAddPaymentMethodData = qs.stringify(POSTAddPaymentMethodConfig) + `&ie=${'UTF-8'}&addCreditCardNumber=${splitCC(payment.number).join('+')}&ppw-accountHolderName=${payment.name.split(' ').join('+')}&ppw-expirationDate_month=${6}&ppw-expirationDate_year=${payment.expiryYear}`;

    console.log(POSTAddPaymentMethodData)

    const tempData = `ppw-widgetEvent%3AAddCreditCardEvent=&ppw-jsEnabled=true&ppw-widgetState=${params["ppw-widgetState"]}&ie=UTF-8&addCreditCardNumber=4355+4607+0658+5964&ppw-accountHolderName=Ian+brash&ppw-expirationDate_month=11&ppw-expirationDate_year=2023`

// var data = `ppw-widgetEvent%3AAddCreditCardEvent=&ppw-jsEnabled=true&ppw-widgetState=${params["ppw-widgetState"]}&ie=UTF-8&addCreditCardNumber=4355+4607+0658+5964&ppw-accountHolderName=Ian+brash&ppw-expirationDate_month=11&ppw-expirationDate_year=2025`;

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
            // 'APX-Widget-Info': 'Checkout/desktop/LNW3iP46cz8f', 
            'Origin': 'https://apx-security.amazon.com', 
            'Sec-Fetch-Site': 'same-origin', 
            'Sec-Fetch-Mode': 'cors', 
            'Sec-Fetch-Dest': 'empty', 
            'Referer': 'https://apx-security.amazon.com/cpe/pm/register', 
            'Accept-Language': 'en-US,en;q=0.9',
            cookie: joinCookies(allCookies)
        },
        data : tempData,
        // maxRedirects: 0,
        // validateStatus: function (a) {return true;}
    });
    return POSTAddPaymentMethodResponse;


}

interface POSTRegisterDynamicParams {
    widgetState: string,
    iFrameName: string,
    parentWidgetInstanceId: string
}

const POSTRegister = async (allCookies : string[], params : POSTRegisterDynamicParams) => {

    const POSTRegisterUrl = 'https://apx-security.amazon.com/cpe/pm/register';

    const {
        widgetState,
        iFrameName,
        parentWidgetInstanceId
    } = params;

    const POSTRegisterDataConfig = {
        widgetState: widgetState,
        returnUrl: '/gp/buy/payselect/handlers/apx-submit-continue.html',
        clientId: 'Checkout',
        usePopover: true,
        maxAgeSeconds: 7200,
        iFrameName: iFrameName,
        parentWidgetInstanceId: parentWidgetInstanceId,
        hideAddPaymentInstrumentHeader: true,
        creatablePaymentMethods: 'CC'
    }

    // const testData = `widgetState=4-MS23fwxRpYfUypX4fXeanbxzSKE5cb_pPjtkOjkx8TiK6OxqsdDtuJ5V1xqy5Ie7C7zEGePU4FeKzq7XCIhSAGFRspBSABmWgMGm39YR7M15Y_brVD4J55BESX3ng60tABerX4B2MqJe67rUtDf3sT7rg0tmWFn-Jz-1SG-y9qdUinsspE0ELZwPAfbCyKhgQ8ygf9L-4MCKRdM33-hRPvOO3I8viCBqfrpro-gT9HyU9YEwE8Z5fB1s_pPhnvvibJ4uvXy3muHlfFWWPYZtsiRFQNCfJVSo4EJNub-gW8La4TbamxjXhPdumfoQcw8x0LahRBCTP6zSkgGhaMpFi1nDSGn3cdcU5K74zo-TIR-Cgnf47G6rjn1tHfNbUKkbWSN8GhA8X4rN8BkPoejK7cRdxU6jLS1ljqpNzk5kJH-TKFT6vJXZ78Yd7EGqINzjF6EljyyEghaRuIxbXq0BKYcGoAZnHR-1kr5BY0PxWcXHyZ0z0jSO9iKRwHwml65VKaRfG9sy8idYrfxKW8tEGQyBmf07OcpO7GgMhQG6JIrcPkK5NcNbPtceQXKrp-hudWraN5dOhLWlh54FEAi_zhALj1lcVMMpY-8Q_IEdlLDoY66FsTAEl-J68yr3XoGNXLk6AjnEy1eSR1sKHNaa9IFPH7gD2ezC1awb9h4vTdRuOxtY29xOFZwt6JMtCjodz50gsurZykdR9LEITKhB5YUa13wASytB-tQ4TUEFW6cmex7zZP1LZxn3w4HRoAJrws5CHvlWMx9MMidVf040gAsBUX_v1CITlRWfr_0JA2bpfdVGJV-volc83a0YGbCsPPHUw7YJwR2my_I3fkrwuKpttjaX6A_8n2u6_-KFJ0UPWeS-r8bVYIHZfgErYPa4ance-YnDXqCctpszTu6xuvStBiT8tl0XbW-0G4SspySP_-0r8kSEQMnb-oWMYTogzcg4QzNaFRozLq8a14G34sepnKm-3MCjlFFDK5eUYPi1IOpx6PX5T5Vg_lLvgVGsACvKBpr5dttOWqXuojYH1AZ6RMK2iNbnTQjUzeCEi_l5YOYsPJgrxMaush8TIxXrSqPBU7uftbMMOOiNBq7mRGwQRS6Zitv2oFtvd4Ye3Jres0Nkt0pQqyBKheHKWHLtjz0e1wfJUisg57BPisIgf8mhGlQtkCUM4lntMgfF16zAdVIPd09DAvw1pmTkGDBAQRNHtz0KiiTZ82YHu2w0E1c0gvMEFyWEWzUA-vvMQytXo7Oxoyc8I6QMWsj0gMiHPrbRYWlXJK7MRG-AbB-F6tuI5_gyPqAg04LrpsUaUcMzBjiHjAoKzs8AFIU3lNFXnUuP1U4MulOIiRgbTkFtXiCiJnKNI7TzV0QTZJPHnVNcaaQHzi_tWi-xHyOubLY0GG_DHY9TH7WM6hOejZhIKVnUD7bA2Af0qNXtLIerCJwljOWCLCGpYHORrORZjZk3WNfDahvEM99T26IdduhIlDfClFskfCuZIbVoWoXcYVRY6qPRoP3F7vC5rjvWlXE2ypkuWvYYRbEymbYrEEg9O9SiESimrZRtCZveuMyFXKWrsoO1SFk12Y1cGxMcJNn3o_hOn6TcrzVB34BAvRZ65Qtq7dvTGibxLyEnhJv8CcpwC7YfN3KMUJwFu5gBZzuQNrWmIG-Ms4QoFamRr3NsfRRmz0aUbhSigLKL7QDa5HPQpROn3NWhII2Guk_lNy15-8rcX29-UktBzq87BkcayJBhn5F7SNtsJivd7STGEVBkAesLQPKdUqhNNsEltHE730FXhLaJxkB5JYc3M0XMDUwOuk8oZWTpRSwmXVejm2jr4dAnfas32UL-dQcbnztptUEr0s31p8kvrTPffrJDyKhQS6ho2FW39Vfl5nBFZBfa8g7jIeqzHzSwHXzPXb2B73GEjF8wS0Wf39C2a6eNRB5l5aMM8HubMokGLM8p3KRdYLgFGpJGSr3PTOhrI2JfTym9SfoTQYM9wbJiAkkPcQN76FUUMF5cAWIESDmkscVHoBkGU2UlFbJV7qxR-Dn5adNNXOH73d82JUOe60zuacnOYR88HcfGtGwjyqPeqcc7GtBNtGLSLBRHdOjAEF5lXZbKNHCrxvQloDm4sJfeyDWCXpGmij4GJCZA5ZOTdQK66WoJAIOUyHQ-djiNHahGsPQceXBV0aEFO3PAlq3MUYm-XFbtNcVKxT1XoTJx-LiV2TdLaokqVZQMR2RAAl823gBQlgpaDLDPAYtSQtdJFvPisiHbkCQSLM2-nKpoDwjk5MD9nLuJQbvndcIaCSH-wVQIUeu80_7KzHWaGOsYjc1W_DY2e21D1AOU85gYx4llAVsHvQqZjfuc8TSCjfs95z1--lpWJHjrqjgDJK3cuQj0fHV5b50IT-_qgeE254W0hcH1X_nh2dImqjpQy4gw-uySYIhXLu7G1AeVfUV6e3265dNjAGVeiXlWF8BtYoJ5QotZ6JNIP6VJ0f8AjZZW2_N8I46n_fVgGnAa54l7CbK96NB1H-IffihEnMPhVxA4y1Qx37oqMdMJ9ERjPO1QBcwCNBxfzHfmwyRuB8HJ2ewkRbL_PjSnJ1O-mqp5rBZ0hfMu9ubuGY1jLVs6f0h3Dxffv7EN86b-cmDBiw3w6dHTFJ19MTeIRiD32ZCn7XOtXlX20UYwiX5A7b5e3tzTmLDjoSDaPDiUjHTU-QhRyqK_-cSU4l2ZDh-uDBvLLmEapNFu9ypkrW7eQk3C36Q4ZlQyIZ11rZIaeZ-LQamaeQ_-9eJskX0wjy6J-dOWwIhLlJJb4w12YL0ryyhmv-92eWQSdN_CH_8NGvM1T3X5RdWP-kO6wqOMsp890d0fzgkE22UXDsCwJYhy-8Vm_liVvLiLRcThhsKcRRB72UldMIOeUw0bHtd-q7LERn_xlaMpLbku0KcFGHq4Xe9ujYEcOaBzTuC5ucxRJ6WNNb5JjgRSJwOExGCjMSihqvLb1zo-8SMZ5m-qkwVWYbz6-Oq9ChC13dgnefK6llbjy-clW2W0l4hpXdiAlWLjZdOihCmNffyLPFVrDpxl2Y-RYEwO47E0-dPCZPFFf6iKKp75Ea4K7gB5c3SW02-QU4KusOQnE832JmybTzNng2QVshRlSdbNvECIH_kiRpDdU5GeBsPYiRQK1qYHjK6ilWs1PUoLITmxutcW3avYZS4aPcgAatpV7DaYOkN8Q_wcbqVvIEFrnKOo38M4whvishsqMiZ_fQ4Cd4Ef3VaCDt9u95ElpKtDCxf7a42k32FqVAy8r3KaJuaqn7ds9gGG_1NQXrZck2wG4h7qp0QLmIPyFEUYoUJ0EOpXL1KfqeJvdITfXs4BAqpl5hweUDY5zPlAfOu6nS6LY6nBDZ_pbrSeLKvXEc4N56KEo9fgZ0CgrDkNk_VHpvqaHMK9FxC8cgw4QAer6RkCQqzV2M2giruJH9embnIaqFKNQ3ppI_ELONn_zcXZ4Wk_9wi7fXbdRdYY7CdGdsK0BQWaGI0joiPoUDdAS9qyr4XvtJadu5kW6-fH79Akf87G69DBLPcdoGowmpTiTztyORDoGX0H-Tj6e97BuITLNClGJ6eT0T3c53dGk7f0u9MZYIU9L-tCE8OlRXh7ANVUFI2DGqkPvimu2YKhGSQ_kq-uT3cHc47XzO03bc9KomN0gy0jzZYkfdu77vbFLXOfo8VRPYAtewj3g6rQ-5zyBOx9SRbEgXb5MzTFGutDRAMvY63VzUpp&returnUrl=%2Fgp%2Fbuy%2Fpayselect%2Fhandlers%2Fapx-submit-continue.html&clientId=Checkout&usePopover=true&maxAgeSeconds=7200&iFrameName=ApxSecureIframe-pp-kRxRLU-7&parentWidgetInstanceId=${parentWidgetInstanceId}&hideAddPaymentInstrumentHeader=true&creatablePaymentMethods=CC`

    const POSTRegisterData = qs.stringify(POSTRegisterDataConfig);

    const POSTRegisterResponse = await axios({
        method: 'post',
        url: POSTRegisterUrl,
        headers: {
            'Connection': 'keep-alive', 
            'Cache-Control': 'max-age=0', 
            'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"', 
            'sec-ch-ua-mobile': '?0', 
            'Origin': 'https://www.amazon.com', 
            'Upgrade-Insecure-Requests': '1', 
            'DNT': '1', 
            'Content-Type': 'application/x-www-form-urlencoded', 
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36', 
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
            'Sec-Fetch-Site': 'same-site', 
            'Sec-Fetch-Mode': 'navigate', 
            'Sec-Fetch-User': '?1', 
            'Sec-Fetch-Dest': 'iframe', 
            'Accept-Language': 'en-US,en;q=0.9', 
            referrer: 'https://www.amazon.com/',
            cookie: joinCookies(allCookies)
        },
        data : POSTRegisterData
    })

    return POSTRegisterResponse

}

interface POSTContinueWidgetDynamicParams {
    addCreditCardNumber: string,
    // short widgetState (not from original GET body)
    "ppw-widgetState": string,
    customerId: string
}

const POSTContinueWidget = async (allCookies : string[], params : POSTContinueWidgetDynamicParams) => {

    const {
        addCreditCardNumber,
        customerId
    } = params;

    const ppwWidgetState = params["ppw-widgetState"];

    const POSTContinueWidgetUrl = `https://apx-security.amazon.com/payments-portal/data/f1/widgets2/v1/customer/${customerId}/continueWidget`;
    // const POSTContinueWidgetUrl ='https://apx-security.amazon.com/payments-portal/data/f1/widgets2/v1/customer/A25HA1HE1RD42U/continueWidget'
    // console.log('https://apx-security.amazon.com/payments-portal/data/f1/widgets2/v1/customer/${customerId}/continueWidget')
    // console.log(POSTContinueWidgetUrl)
    const POSTContinueWidgetDataConfig = {
        "ppw-jsEnabled": true,
        addCreditCardNumber: addCreditCardNumber,
        "ppw-widgetEvent": "IdentifyCreditCardEvent",
        "ppw-widgetState": ppwWidgetState
    }

    const POSTContinueWidgetData = qs.stringify(POSTContinueWidgetDataConfig);

    const POSTContinueWidgetResponse = await axios({
        method: 'post',
        url: POSTContinueWidgetUrl,
        headers: {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            // "apx-widget-info": "Checkout/desktop/DJLMTDaququU",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "widget-ajax-attempt-count": "0",
            "x-requested-with": "XMLHttpRequest",
            cookie: joinCookies(allCookies)
        },
        data : POSTContinueWidgetData
    })

    return POSTContinueWidgetResponse;
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


    const POSTSelectShippingAddRes = await axios({
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
        returnParsedCookies(POSTSelectShippingAddRes.headers['set-cookie'])
    )

    // console.log(POSTSelectShippingAddRes)
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

    const GETAddPaymentPageResponse = await axios({
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
        returnParsedCookies(GETAddPaymentPageResponse.headers['set-cookie'])
    )


    // console.log(GETAddPaymentPageResponse.data);
    // return;

    //<input type="hidden" name="ppw-widgetState" value="
    let ppwWidgetState = getValueByDelimiters(GETAddPaymentPageResponse.data , '<input type="hidden" name="ppw-widgetState" value="', '">');
    const iFrameName = 'ApxSecureIframe-' + getValueByDelimiters(GETAddPaymentPageResponse.data, '<iframe id="', '"')
    const parentWidgetInstanceId = getValueByDelimiters(GETAddPaymentPageResponse.data, '"parentWidgetInstanceId":"', '"');

    console.log(`ppwWidgetState: ${ppwWidgetState}`);
    console.log(`iFrameName: ${iFrameName}`)
    console.log(`parentWidgetInstanceId: ${parentWidgetInstanceId}`)
    // console.log(GETAddPaymentPageResponse.data);


    // now we need to get register

    const POSTRegisterResponse = await POSTRegister(
        allCookies, {
            widgetState: ppwWidgetState,
            iFrameName: iFrameName,
            parentWidgetInstanceId: parentWidgetInstanceId
        }
    )

    // console.log(POSTRegisterResponse)

        // need ubid-main and at-main for auth
    ppwWidgetState = getValueByDelimiters(POSTRegisterResponse.data, '<input type="hidden" name="ppw-widgetState" value="', '">')
    // return;

    // return;

    allCookies = accumulateCookies(
        allCookies,
        returnParsedCookies(POSTRegisterResponse.headers['set-cookie'])
    )
    // console.log(ppwWidgetState)

    // console.log(joinCookies(allCookies))
    // return;

    const POSTContinueWidgetResponse = await POSTContinueWidget(allCookies, {
        "ppw-widgetState": ppwWidgetState,
        addCreditCardNumber: testProfile.payment.number,
        customerId: customerId
    });

    // console.log(POSTContinueWidgetResponse);

    // return;


    const POSTAddPaymentMethodResponse = await POSTAddPaymentMethod(allCookies, customerId, {
        'ppw-widgetEvent:AddCreditCardEvent': '',
        'ppw-jsEnabled': true,
        'ppw-widgetState': ppwWidgetState
    }, testProfile.payment);

    console.log(POSTAddPaymentMethodResponse.data.additionalWidgetResponseData.additionalData);

    // const POSTContinueToPaymentResponse = await POSTContinueToPaymentRetry(allCookies, addressId, purchaseId);

    // console.log(POSTContinueToPaymentResponse);

    // console.log(POSTAddShippingAddressFormHandlerResponse);

}

(async () => {
    let allCookies = await signIn(AmazonUser, AmazonPass);
    
    await checkout(allCookies);
})();