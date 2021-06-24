import signIn from "../signin/signin";
import {
    returnParsedCookies,
    joinCookies,
    accumulateCookies,
    convertCookieArrayToObject,
    getValueByDelimiters
} from '../../../../requestFunctions';
import qs from 'qs';
import axios, { AxiosResponse } from 'axios';
import CookieObject from '../../../../interfaces/CookieObject';
import { AmazonUser, AmazonPass } from "../../../../sensitive/logins";
import requestRetryWrapper from '../../../../requestRetryWrapper';
import tsLogger from '../../../../logger';
import genShippingPayload from "../../logic/genShippingPayload";
import testProfile from "../../../../sensitive/testProfile";
import { GETCheckoutScreenRetry } from './initialize/GETCheckoutScreen';
import AddToCart from '../atc/atc';
import { POSTAddShippingAddressFormHandlerRetry } from './shipping/POSTAddShippingAddressFormHandler';
import { POSTSelectShippingAddressRetry } from './shipping/POSTSelectShippingAddress';
import { GETAddPaymentPageRetry } from './payment/GETAddPaymentPageResponse';
import { POSTRegisterRetry } from './payment/POSTRegister';
import { POSTAddPaymentMethodRetry } from './payment/POSTAddPaymentMethod';
import { POSTSelectPaymentMethodRetry } from './payment/POSTSelectPaymentMethod';
import { POSTSubmitOrderRetry } from './payment/POSTSubmitOrder';

// https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript
export const replaceAll = (str : string, find : string, replace : string) => {
    return str.replace(new RegExp(find, 'g'), replace);
}

interface SelectShippingAddressDynamicParams {
    addressBookId: string,
    storeCountry: string,
    addressID: string,
    purchaseId: string
}

// const POSTSelectShippingAddress = async (allCookies : string[], params : SelectShippingAddressDynamicParams) : Promise<AxiosResponse> => {
//     const POSTSelectShippingAddress = 'https://www.amazon.com/gp/buy/shared/handlers/async-continue.html/ref=chk_addr_select_2_customer';

//     const {
//         addressBookId,
//         storeCountry,
//         addressID,
//         purchaseId
//     } = params;

//     console.log(params)

//     const POSTSelectShippingAddressDataConfig = {
//         submissionURL: `/gp/buy/addressselect/handlers/continue.html/ref=chk_addr_select_2_customer?ie=UTF8&action=select-shipping&addressID=${addressID}&enableDeliveryPreferences=1&fromAnywhere=0&isCurrentAddress=0&numberOfDistinctItems=1&purchaseId=${purchaseId}&requestToken=`,
//         pickupUrl: '/gp/buy/storeaddress/handlers/popover/search.html/ref=chk_addr_locker_search_sec',
//         usecase: 'checkout',
//         hasWorkingJavascript: 1,
//         addressBookId: addressBookId,
//         pickupType: 'All',
//         storeCountry: storeCountry,
//         searchCriterion: 'storeZip',
//         isAsync: 1,
//         isClientTimeBased: 1,
//         ie: 'UTF8',
//         action: 'select-shipping',
//         addressID: addressID,
//         enableDeliveryPreferences: 1,
//         fromAnywhere: 0,
//         isCurrentAddress: 0,
//         numberOfDistinctItems: 1,
//         purchaseId: purchaseId,
//         requestToken: '',
//     }


//     const POSTSelectShippingAddressData = qs.stringify(POSTSelectShippingAddressDataConfig) + `&handler=/gp/buy/addressselect/handlers/continue.html`;

//     console.log(POSTSelectShippingAddressData);

//     const POSTSelectShippingAddressResponse = await axios({
//         method: 'post',
//         url: POSTSelectShippingAddress,
//         headers: {
//             "accept": "text/plain, */*; q=0.01",
//             "accept-language": "en-US,en;q=0.9",
//             "content-type": "application/x-www-form-urlencoded; charset=UTF-8;",
//             "downlink": "10",
//             "ect": "4g",
//             "rtt": "100",
//             "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
//             "sec-ch-ua-mobile": "?0",
//             "sec-fetch-dest": "empty",
//             "sec-fetch-mode": "cors",
//             "sec-fetch-site": "same-origin",
//             "x-amz-checkout-transition": "ajax",
//             "x-amz-checkout-type": "spp",
//             "x-requested-with": "XMLHttpRequest",
//             referrer: 'https://www.amazon.com/gp/buy/addressselect/handlers/display.html?hasWorkingJavascript=1',
//             cookie: joinCookies(allCookies)
//         }
//     })

//     return POSTSelectShippingAddressResponse;
// }

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



const splitCC = (cc : string) : string[] => {
    return cc.match(/.{1,4}/g)!;
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

    // console.log(a3);

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


    const POSTSelectShippingAddressResponse = await POSTSelectShippingAddressRetry(allCookies, addressId, purchaseId)

    allCookies = accumulateCookies(
        allCookies,
        returnParsedCookies(POSTSelectShippingAddressResponse.headers['set-cookie'])
    )

    // console.log(`addressId: ${addressId}`)
    // console.log(convertCookieArrayToObject(allCookies));

    const GETAddPaymentPageResponse = await GETAddPaymentPageRetry(allCookies);

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
    }, testProfile.payment);

    // console.log(POSTAddPaymentMethodResponse.data.additionalWidgetResponseData.additionalData);

    const ppwPaymentMethodId = POSTAddPaymentMethodResponse.data.additionalWidgetResponseData.additionalData.paymentInstrumentId;

    // this contains all the ppw information we need
    const POSTSelectPaymentMethodResponse = await POSTSelectPaymentMethodRetry(
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

    const POSTAsyncContinueAfterSelectionResponse = await POSTAsyncContinueAfterSelection(
        allCookies, {
            "ppw-widgetState": ppwWidgetState,
            superDynamicParams: superDynamicParams
        }
    )

    // console.log(POSTAsyncContinueAfterSelectionResponse.data);

    const fuckData = POSTAsyncContinueAfterSelectionResponse.data;

    // console.log(typeof fuckData)
    // console.log(fuckData.subtotals)
    // console.log(fuckData.panels)
    // console.log(fuckData.panels[7]);

    const POSTAsyncContinueAfterSelectionResponseCollectedData = fuckData.panels.map((panel : object) => JSON.stringify(panel)).join(' ')

    // console.log(POSTAsyncContinueAfterSelectionResponseCollectedData);

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
        newFinalData
    )

    if (POSTSubmitOrderResponse.headers['x-amz-checkout-page-type'] === 'CheckoutThankYou') {
        tsLogger("Successfully checked out the product")
    }
    else if (POSTSubmitOrderResponse.headers['x-amz-checkout-page-type'] === 'CheckoutError') {
        tsLogger("Error while checking out")
        console.log(POSTSubmitOrderResponse)
    }
    else {
        tsLogger("Even worse error")
        console.log(POSTSubmitOrderResponse)
    }

    return;
}

(async () => {
    tsLogger('Starting')
    let allCookies = await signIn(AmazonUser, AmazonPass);

    allCookies = await AddToCart(allCookies);
    
    await checkout(allCookies);
    tsLogger('Finished')
})();