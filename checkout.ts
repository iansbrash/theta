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
    const POSTAddPaymentMethodData = qs.stringify(POSTAddPaymentMethodConfig) + `&ie=${'UTF-8'}&addCreditCardNumber=${splitCC(payment.number).join('+')}&ppw-accountHolderName=${payment.name.split(' ').join('+')}&ppw-expirationDate_month=${payment.expiryMonth.charAt(0) === "0" ? payment.expiryMonth.substring(1) : payment.expiryMonth}&ppw-expirationDate_year=${payment.expiryYear}`;

    // console.log(POSTAddPaymentMethodData)

    const tempData2 = `ppw-widgetEvent%3AAddCreditCardEvent=&ppw-jsEnabled=true&ppw-widgetState=${params["ppw-widgetState"]}` + `&ie=UTF-8&addCreditCardNumber=${splitCC(payment.number).join('+')}&ppw-accountHolderName=${payment.name.split(' ').join('+')}&ppw-expirationDate_month=${payment.expiryMonth.charAt(0) === "0" ? payment.expiryMonth.substring(1) : payment.expiryMonth}&ppw-expirationDate_year=${payment.expiryYear.length === 2 ? '20' + payment.expiryYear : payment.expiryYear}`;

    const tempData = `ppw-widgetEvent%3AAddCreditCardEvent=&ppw-jsEnabled=true&ppw-widgetState=${params["ppw-widgetState"]}&ie=UTF-8&addCreditCardNumber=${'4767+7184+3996+8928'}&ppw-accountHolderName=Ian+brash&ppw-expirationDate_month=11&ppw-expirationDate_year=2023`

    console.log(`tempData:`)
    console.log(tempData)
    console.log('tempData2')
    console.log(tempData2)
    console.log(`POSTAddPaymentMethodData:`)
    console.log(POSTAddPaymentMethodData)
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
        data : tempData2,
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

interface POSTSelectPaymentMethodDynamicProps {
    "ppw-widgetState": string,
    "ppw-paymentMethodId": string,
}

const POSTSelectPaymentMethod = async (allCookies : string[], customerId : string, params : POSTSelectPaymentMethodDynamicProps) : Promise<AxiosResponse> => {
    const POSTSelectPaymentMethodUrl = `https://www.amazon.com/payments-portal/data/f1/widgets2/v1/customer/${customerId}/continueWidget`

    const ppwWidgetState = params["ppw-widgetState"];
    const ppwPaymentMethodId = params["ppw-paymentMethodId"];

    const POSTSelectPaymentMethodDatConfig = {
        "ppw-jsEnabled": true,
        "ppw-widgetState": ppwWidgetState,
        "ppw-widgetEvent": 'AddPaymentMethodRefreshEvent',
        "ppw-paymentMethodId": ppwPaymentMethodId,
        "ppw-widgetAction": 'add-credit-card-workflow-complete'
    }

    const otherData = `ppw-jsEnabled=true&ppw-widgetState=${ppwWidgetState}&ppw-widgetEvent=AddPaymentMethodRefreshEvent&ppw-paymentMethodId=${ppwPaymentMethodId}&ppw-widgetAction=add-credit-card-workflow-complete`

    const POSTSelectPaymentMethodResponse = await axios({
        method: 'post',
        url: POSTSelectPaymentMethodUrl,
        headers: {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            // "apx-widget-info": "Checkout/desktop/I1XIi3UxlepH",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            // "downlink": "10",
            // "ect": "4g",
            // "rtt": "50",
            "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "widget-ajax-attempt-count": "0",
            "x-requested-with": "XMLHttpRequest",
            cookie: joinCookies(allCookies)
        },
        data : otherData
    })

    return POSTSelectPaymentMethodResponse;
}

interface POSTAsyncContinueSuperDynamicParams {
    [key: string]: string
}

interface POSTAsyncContinueAfterSelectionDynamicParams {
    "ppw-widgetState": string,
    superDynamicParams: POSTAsyncContinueSuperDynamicParams
}

const POSTAsyncContinueAfterSelection = async (allCookies : string[], params : POSTAsyncContinueAfterSelectionDynamicParams) : Promise<AxiosResponse> => {
    const POSTAsyncContinueAfterSelectionUrl = `https://www.amazon.com/gp/buy/shared/handlers/async-continue.html`

    const ppwWidgetState = params['ppw-widgetState'];
    const superDynamicParams : POSTAsyncContinueSuperDynamicParams = params.superDynamicParams;

    const POSTAsyncContinueAfterSelectionDataConfig = {
        // "ppw-widgetState": ppwWidgetState,
        'ie': 'UTF-8',
        "ppw-claimCode": '',
        ...superDynamicParams,
        'hasWorkingJavascript': 1,
        'ppw-jsEnabled': '',
        'ppw-widgetEvent:SetPaymentPlanSelectContinueEvent': '',
        'isAsync': 1,
        'isClientTimeBased': 1,
        // 'handler': '/gp/buy/payselect/handlers/apx-submit-continue.html' // this aint encoded u can see the slashes
    }

    let a1 = Object.keys(superDynamicParams)
    let a2 = Object.values(superDynamicParams)
    let a3 : string[] = [];
    a1.forEach((a, index) => a3.push(a + '=' + encodeURIComponent(a2[index])))

    console.log(a3);

    var data2p1 = `ppw-widgetState=${ppwWidgetState}` 
            + '&ie=UTF-8'
            + '&ppw-claimCode=' 
            + '&hasWorkingJavascript=1' 
            + '&ppw-jsEnabled=true' 
            + '&ppw-widgetEvent%3ASetPaymentPlanSelectContinueEvent=' 
            + '&isAsync=1' 
            + '&isClientTimeBased=1' 
            + '&handler=/gp/buy/payselect/handlers/apx-submit-continue.html';

    var data2p2 = `&${a3.join('&')}`
            // + '&ppw-instrumentRowSelection=instrumentId%3D0h_PU_CUS_8a6bf2b9-8fe9-4de2-812b-15ee68c88c95%26isExpired%3Dfalse%26paymentMethod%3DCC%26tfxEligible%3Dfalse' 
            // + '&ppw-0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3_rewardsAccountSelection_customAmountValue=10.96' 
            // + '&ppw-0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3_rewardsAccountSelection_maxAmountValueHiddenInput=10.96' 
            // + '&ppw-0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3_rewardsAccountSelection_currencyUnitHiddenInput=USD' 
            // + '&ppw-0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3_rewardsAccountSelection_instrumentIdHiddenInput=0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3' + '&ppw-0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3_rewardsAccountSelection_parentInstrumentIdHiddenInput=0h_PU_CUS_8a6bf2b9-8fe9-4de2-812b-15ee68c88c95' + '&ppw-0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3_rewardsAccountSelection_currencyToPointsConversionRatioHiddenInput=1' 
            // + '&ppw-0h_PU_CUS_8a6bf2b9-8fe9-4de2-812b-15ee68c88c95_childRewardsAccountInstrumentId=0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3' 
            

    

    // a3 = a3.map(a => encodeURIComponent(a));

    // console.log(a3);

    const testData = `ppw-widgetState=${ppwWidgetState}&` + qs.stringify(POSTAsyncContinueAfterSelectionDataConfig)

    // const testData =  'ppw-widgetState=4-MS0LV7KahEhjK6ae3iPVALlcyfrUEK-W4YX2Q_wpVbGehCDV6hqQROWpOzs4uuRvbhoxahstxiUXVCmr7zY6fuWBW-vWM-dBQPM7DvJ_FvWey5BLE5-lox-IONIXQrxjHjWWhuhzQlnZEpFdXQKgFb00WD4QJl1tnJzZ7obM66UPR8PdUN4PJIr5U1V-4dJ1O9eDuqJuXqivkoQV58Wg7auoiIERxa_dydAQIJvGFNlDE6oGRQnE5Lf1IOdmxO3e75K0eZEhiE0XtfVVxn823V968EiSnwWUdm44remQlhXoIhfEYv8JjN8tFNaLLEZQgBJiUG3kAMvfEbdnhfhB1_cY4HgxGvCzcH9mmMpfhclZdN6RD2d2gx3NLwQ1kGW2LyFvWg0k63sgnssqlelglWhY6Um9v7C73B_2LmGRJm4W4SCoarCmRQQhepzqhQvcDw3SwqXvz9XeJ2UvxvU38-lTpAX5X4BHmR0EK66kpeJVXdslqmfVMsjdvya2OpUIGAvRweLeKLwUQYq2yWyPeeXKdIFgIIcHvD9rzFS99Hqe1SGk1CRSuUfYBgIoAQnT5TJGttCvXtbguGc1BNU0-vlZ8fVRCoaLfCO70fZcFlZIlYScXN0hTnDjcAoZHLlmcJFmVAM_xkA6LIkFPmGOFE_afSEbdkZkEQMTXxOjvfaktsPFXH5H-ayt-DXPqEBcml8d53sZxpLP5VdKXFMbtruGZwlIDGVIS1rON1djvHd9qHHzeQIbwKrEUxgcY8IXztuqZKIOlsUhCKa4OQRSQ2vXlQAuxx218IppZTj4jgB73f2T9kiQUMAC6Q5EXtvb0R0p7Us1T91beUujYXSQPZFBR2_3hz7Pypg0EL9uk1Ct1c2FyHQb071CP9gJ2upUsMgxXyzelCE5AA-9s3T6x5tae7v6oeGn9uDRhcsGLstOOoGNhRJ1ozb3gXq9FRSkXWJnczmQTMbET3SbuZoJ-DP6e9SrAn-MYNTpTOtxXsS0RRuDovZe-v0KXOJcD4mANb8Ecjbys24N6OiHeh78hHjhSvJvfn3tS_obZIz9ZsSgA-yUqLfAKkPQ2Wr8Q136ony56yXJyGJcrtlIuOkGmbcAakRg8tagWTx8olDqqFuvwBClrvTIZOBYb1LDfJ30zHHIlUcj4AnHa7Rry_B8G1CZvuVqmM2Ljp13Mz1EfW-GO5mffBp4Z2WF8TQ17CnQmSTMeblQGpFdcrKgQy7AlyLQPycZOTIZKyQr5g4xpO-uet_fk0BBVmuUTFnAGBzT6ggzpUfIDm5_t0_xVMUvCyHyWTEYWnZgWaUO2GnkvyGxOdHUaQywOxiCDJjxyYlyCiPOhO_KDS1DnV-qgpE4LxAwwkCzjr-7NTjETFIcTfjsjI5_gqgb4E9dCcRmVb5DofTp-hVrbwXVVITKaoCjAyZc4XJkm0uPR1FhyDqmu_nf97DriZ4SQdkLCXMXS6vuHcZbMl6J4vNPObscybwNRnI1pNg9PgSO1btws2H8ETxT--d7TvRJS3pJlcYx7epqorZ2L5sAdPVekZ1-jRlIMQuysNerOjmIGu5JDi4eFAEo7ltnu91Pffm7oG0DNvC1s4WkXJpwCKwCe7Ig2zhQtSVCbXvnXSpXx66PNkURhHqo88nXUlEV2OC1_yuRm27BqBkiM5PCcHsg4KtHXetFPb2DGHOlkLo7FvjnlaDYIcP3OSOjtCGdnePbVC8rnncHg204PAqCp8ZKtLCNuBazBaF_ySxXsr25jWiTFM1EgRUauEfjS39HqxjoWVZp0codG8mZgvSt0311ZqSpCysForA6b0tmD4N69IBElVVlrVxRUaGgJmQ0POu_bSNp-b-4pc2GgzUQgec7KqQugnK3S6xH4RxlTpHjDeNU6O59SRDncxqywPwmySFEU_3Y30nZTEXSEgN8fucsFGyzQUV-u-w8EJ5WTHlYVPIXwxHU_Ld6Wyi0UAoRC1_8aMJCKt75ZXovA8GkjfRNOYJph6oaWAPkLSWThc6Wvph81s_VkyNVmyXoxUvLuESLbKisXq2FwbPpdseLGHLtI32za_Zg3V4hbhux10GGs0F_jafcZ75OQ9OnT0cet7HJ60OEB43WDWX4ky6nySAXRb_vZuCXSbPeM2EzGtHclQF11EBoBUQRKEHgrBPwnzb1CDz4EIBva3Mto2BHgML3-YV-IsnJZ1b4WmDrPZF7zjV13jJqhjZNO1jY3mExTwpSUbkJzi-HQj6pP6ATkYvcQyte4YUyxE19ZOeqBz7nW-VBbhdoSjWGUG_TjMxeVUMVivlW7agATKhPXW2sXqfD1n81dK6nk_A8PgASWEDwnB4ynVCxPCwFO9CaBaCQWoA-qliWRQwV0FkOuRY0vLaoJo0LXLNcB5IBGde_K9Df7MPJUzMcYG2_cE-sDfEWnv64GhITDfLIHEQwknW5R8yMLQepkwTUfitplS6L59Q8DE31BPz2lz52v5p2f0JnT1HwCSU7pzQ_ZZ2jaDqiMtLfMWxn8eas6chopYwkqaqR2cWA_q4feKV5Wh1ASiWQLvLOXrUzJQF92AFflpQRixFF-q78sIB5NXrWo5DuNB7g1HMWd7UWtVMT_E5Rr72nk2-n0-lyFMit0g6IUVtRvp3YR5xD8kg3d5GzZOgg26s8x1TIvX-g2kTisbZbJ-hGfYfFDtL66GNvxTc_9H4YUQXiQNB0QFKVKu2-EjCbA11Qdq-Eyvb4eBhn0vtDZznV0FKUw217pbkGir27at0vaawmezcuIrgX2zhBcgXm8_-lfJEo-E0sPY4KmeUa23LsyjmsH-nfDpBH1zHiaZYgnjidX3ZHg9O9q1nEa1gqWRrqQ5cgTOvcROZ4we0C2tfPcGXrRVyzBwfrxn_Teb-JDdyo6YhQ3yETO9CjjGtp5Mfkcc4-1DVpfr7rTYc7qcezunk9o9vtwpA0xKOwwR54EWkOoEu87ud2ToKdxxeyGzXXsg1S9jS3j0fuVco00bKLrQQaPtT4VQc1OD85TEYaJuLpaJ6mIo527ohGfZXMt-cqKeZheI6fFHG8qScZQAhzzW0_3m_mxPUVuxDMzqcVNju5BroxUbGqE7WvaWDbsSRnWD2AaI-hHcu92U5FGMGGS4zs848I9atmQtoRljEnq-mk_AOL3IIlZCUNjL1ry_0Te-VRd6xjTI2RzJmmq0UHduEQvO1gQgYM2cAm5vSCW99nuqAGWyNaLFS6U4k-SFJPrlbc90_joEt3BPD-2K-cQncvSMfVVPlFPAxH4WMrOGkgTxQ72ithcAE1p0FmuTTvrIuAvFn-gV4svyp-9N2WZnYYIRdCEwyvd7-F1rGTX1lQcO7hpcn1-XYGIizPkiTmv9-JuaJtGFOvOoN2Udq7tbTw5Y_UvYU699J5JaGqqJTPioxMl19cAzvFQlkBZSJFQYRLr4swXcoM47WoTkqnpcGWkC-iUe44AHM2n-d4b0XJ0VvEKa2Msc-cCSmkV3mPZkGq4TRYeted1KewTo_gtuZ9rJHfbpr0BAX86_M9IqXwRqWwSu2I3eWQv8MEdlFQZJfkKcQRNI7snkAuSe5J4QYs42EalYvlNyFwI7eMtOaL8p5DoDWWDyicaDOhePU7JyX9GfpBEd5nOiKi-Md6nwEr8JrUaD3gVwLKdP1sBOu0XqJ9ELr0bXxjNfLTUByD-piltRCHL82l3zJplNs05G1yBFgAkp9_60mUhNoV-FTDJ4COgbJ6yAJgmfuoKtJzRXuS4qcK8Vn3yxTs1swqLLQz4Tc0xv9Vq-yU6NI_bDYxnTaNTd0_hNY09aLxIPnxZgh4bu5PHkLmN8gIOPd1RdFiiA&ie=UTF-8&ppw-claimCode=&ppw-instrumentRowSelection=instrumentId%3D0h_PU_CUS_8a6bf2b9-8fe9-4de2-812b-15ee68c88c95%26isExpired%3Dfalse%26paymentMethod%3DCC%26tfxEligible%3Dfalse&ppw-0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3_rewardsAccountSelection_customAmountValue=10.96&ppw-0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3_rewardsAccountSelection_maxAmountValueHiddenInput=10.96&ppw-0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3_rewardsAccountSelection_currencyUnitHiddenInput=USD&ppw-0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3_rewardsAccountSelection_instrumentIdHiddenInput=0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3&ppw-0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3_rewardsAccountSelection_parentInstrumentIdHiddenInput=0h_PU_CUS_8a6bf2b9-8fe9-4de2-812b-15ee68c88c95&ppw-0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3_rewardsAccountSelection_currencyToPointsConversionRatioHiddenInput=1&ppw-0h_PU_CUS_8a6bf2b9-8fe9-4de2-812b-15ee68c88c95_childRewardsAccountInstrumentId=0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3&hasWorkingJavascript=1&ppw-jsEnabled=true&ppw-widgetEvent%3ASetPaymentPlanSelectContinueEvent=&isAsync=1&isClientTimeBased=1&handler=/gp/buy/payselect/handlers/apx-submit-continue.html'

    const POSTAsyncContinueAfterSelectionData = qs.stringify(POSTAsyncContinueAfterSelectionDataConfig) + '&handler=/gp/buy/payselect/handlers/apx-submit-continue.html';

    const POSTAsyncContinueAfterSelectionResponse = await axios({
        method: 'post',
        url: POSTAsyncContinueAfterSelectionUrl,
        headers: {
            'authority': 'www.amazon.com', 
            'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"', 
            'x-amz-checkout-type': 'spp', 
            'dnt': '1', 
            // 'rtt': '50', 
            'sec-ch-ua-mobile': '?0', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36', 
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8;', 
            'accept': 'text/plain, */*; q=0.01', 
            'x-requested-with': 'XMLHttpRequest', 
            // 'downlink': '10', 
            // 'ect': '4g', 
            'x-amz-checkout-transition': 'ajax', 
            'origin': 'https://www.amazon.com', 
            'sec-fetch-site': 'same-origin', 
            'sec-fetch-mode': 'cors', 
            'sec-fetch-dest': 'empty', 
            'referer': 'https://www.amazon.com/gp/buy/payselect/handlers/display.html?hasWorkingJavascript=1', 
            'accept-language': 'en-US,en;q=0.9', 
            cookie: joinCookies(allCookies)
        },
        data : data2p1 + data2p2 //`ppw-widgetState=${ppwWidgetState}&` + a3.join('&') //testData
    })

    return POSTAsyncContinueAfterSelectionResponse;
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

    const POSTContinueWidgetResponse = await POSTContinueWidget(allCookies, {
        "ppw-widgetState": ppwWidgetState2,
        addCreditCardNumber: testProfile.payment.number,
        customerId: customerId
    });

    // console.log(POSTContinueWidgetResponse);

    // return;


    const POSTAddPaymentMethodResponse = await POSTAddPaymentMethod(allCookies, customerId, {
        'ppw-widgetEvent:AddCreditCardEvent': '',
        'ppw-jsEnabled': true,
        'ppw-widgetState': ppwWidgetState2
    }, testProfile.payment);

    console.log(POSTAddPaymentMethodResponse.data.additionalWidgetResponseData.additionalData);

    const ppwPaymentMethodId = POSTAddPaymentMethodResponse.data.additionalWidgetResponseData.additionalData.paymentInstrumentId;

    // this contains all the ppw information we need
    const POSTSelectPaymentMethodResponse = await POSTSelectPaymentMethod(
        allCookies,
        customerId, {
            "ppw-widgetState": ppwWidgetState,
            "ppw-paymentMethodId": ppwPaymentMethodId
        }
    )

    allCookies = accumulateCookies(
        allCookies,
        returnParsedCookies(POSTSelectPaymentMethodResponse.headers['set-cookie'])
    )

    const SelectPaymentHTML = POSTSelectPaymentMethodResponse.data.htmlContent;
    const paymentInstrumentId = POSTSelectPaymentMethodResponse.data.additionalWidgetResponseData.additionalData.paymentInstrumentId
    
    // console.log(SelectPaymentHTML)
    // console.log(paymentInstrumentId)

    const ppwLength = 46;

    const ppw_instrumentRowSelection = getValueByDelimiters(SelectPaymentHTML, '" type="radio" name="ppw-instrumentRowSelection" value="', '">');
    const _rewardsAccountSelection_customAmountValue = getValueByDelimiters(SelectPaymentHTML, '_rewardsAccountSelection_rewardsApplied" value="', '"');
    const _rewardsAccountSelection_maxAmountValueHiddenInput = getValueByDelimiters(SelectPaymentHTML, '_rewardsAccountSelection_maxAmountValueHiddenInput" value="', '"');
    const _rewardsAccountSelection_currencyUnitHiddenInput = getValueByDelimiters(SelectPaymentHTML, '_rewardsAccountSelection_currencyUnitHiddenInput" value="', '"');
    const _rewardsAccountSelection_instrumentIdHiddenInput = getValueByDelimiters(SelectPaymentHTML, '_rewardsAccountSelection_instrumentIdHiddenInput" value="', '"');
    const _rewardsAccountSelection_parentInstrumentIdHiddenInput = getValueByDelimiters(SelectPaymentHTML, '_rewardsAccountSelection_parentInstrumentIdHiddenInput" value="', '"');
    const _rewardsAccountSelection_currencyToPointsConversionRatioHiddenInput = getValueByDelimiters(SelectPaymentHTML, '_rewardsAccountSelection_currencyToPointsConversionRatioHiddenInput" value="', '"');
    
    // note: this has a different ppw id
    const _childRewardsAccountInstrumentId = getValueByDelimiters(SelectPaymentHTML, '_childRewardsAccountInstrumentId" value="', '"');
    
    console.log(ppw_instrumentRowSelection)
    console.log(_rewardsAccountSelection_customAmountValue)
    console.log(_rewardsAccountSelection_instrumentIdHiddenInput) // ppw-_rewardsAccountSelection_instrumentIdHiddenInput
    console.log(_rewardsAccountSelection_maxAmountValueHiddenInput)
    console.log(_rewardsAccountSelection_currencyUnitHiddenInput)
    console.log(_rewardsAccountSelection_parentInstrumentIdHiddenInput)
    console.log(_rewardsAccountSelection_currencyToPointsConversionRatioHiddenInput)
    console.log(_childRewardsAccountInstrumentId);

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

    const POSTAsyncContinueAfterSelectionResponse = await POSTAsyncContinueAfterSelection(
        allCookies, {
            "ppw-widgetState": ppwWidgetState,
            superDynamicParams: superDynamicParams
        }
    )

    console.log(POSTAsyncContinueAfterSelectionResponse.data);

    const fuckData = POSTAsyncContinueAfterSelectionResponse.data;

    console.log(typeof fuckData)
    console.log(fuckData.subtotals)
    console.log(fuckData.panels)
    console.log(fuckData.panels[7]);

    const finalData = {
        // 'purchaseLevelMessageIds': 'saveDefaults',
        // 'purchaseLevelMessageIds': 'shopWithPoints',
        'submitFromSPC': '1',
        'fasttrackExpiration': '2472',
        'countdownThreshold': '86400',
        'showSimplifiedCountdown': '0',
        'countdownId': 'countdownId-0',
        'quantity.A07053882I1E1NHCOX9GE:': '1',
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
        'csrfToken': 'gMA5XFXSaQsurAt4xeYYEQjv+oFp0qXICxgsOjoAAAAMAAAAAGDUB6hyYXcAAAAA',
        'fromAnywhere': '0',
        'redirectOnSuccess': '0',
        'purchaseTotal': '15.35',
        'purchaseTotalCurrency': 'USD',
        'purchaseID': '106-8763314-3328239',
        'purchaseCustomerId': 'A25HA1HE1RD42U',
        'useCtb': '1',
        'scopeId': 'H4TE1S1QDTHHHAJFM2HZ',
        'isQuantityInvariant': '',
        'promiseTime-0': '1624950000',
        'promiseAsin-0': 'B07W4FMQ5Y',
        'selectedPaymentPaystationId': 'amzn1.pm.wallet.MGhfUFVfQ1VTXzExMDA4ZDM0LTQ1ZjQtNDlkYy1hN2VlLWI4MDU0Yzc3MjIyNQ.QTI1SEExSEUxUkQ0MlU',
        'hasWorkingJavascript': '1',
        'placeYourOrder1': '1',
        'isfirsttimecustomer': '0',
        'isTFXEligible': '',
        'isFxEnabled': '',
        'isFXTncShown': '' 
      }


    return;
}

(async () => {
    let allCookies = await signIn(AmazonUser, AmazonPass);
    
    await checkout(allCookies);
})();