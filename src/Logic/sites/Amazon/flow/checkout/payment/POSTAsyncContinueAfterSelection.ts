import axios, { AxiosResponse } from 'axios';
import { joinCookies } from '../../../../../requestFunctions';
import requestRetryWrapper from '../../../../../requestRetryWrapper';
import { Proxy } from '../../../../../interfaces/ProxyList';

// @ts-ignore
import HttpsProxyAgent from 'https-proxy-agent'

export interface POSTAsyncContinueSuperDynamicParams {
    [key: string]: string
}

interface POSTAsyncContinueAfterSelectionDynamicParams {
    "ppw-widgetState": string,
    superDynamicParams: POSTAsyncContinueSuperDynamicParams
}

const POSTAsyncContinueAfterSelection = async (allCookies : string[], params : POSTAsyncContinueAfterSelectionDynamicParams, proxy : Proxy) : Promise<AxiosResponse> => {
    const POSTAsyncContinueAfterSelectionUrl = `https://www.amazon.com/gp/buy/shared/handlers/async-continue.html`

    const ppwWidgetState = params['ppw-widgetState'];
    const superDynamicParams : POSTAsyncContinueSuperDynamicParams = params.superDynamicParams;

    // const POSTAsyncContinueAfterSelectionDataConfig = {
    //     // "ppw-widgetState": ppwWidgetState,
    //     'ie': 'UTF-8',
    //     "ppw-claimCode": '',
    //     ...superDynamicParams,
    //     'hasWorkingJavascript': 1,
    //     'ppw-jsEnabled': '',
    //     'ppw-widgetEvent:SetPaymentPlanSelectContinueEvent': '',
    //     'isAsync': 1,
    //     'isClientTimeBased': 1,
    //     // 'handler': '/gp/buy/payselect/handlers/apx-submit-continue.html' // this aint encoded u can see the slashes
    // }

    let a1 = Object.keys(superDynamicParams)
    let a2 = Object.values(superDynamicParams)
    let a3 : string[] = [];
    a1.forEach((a, index) => a3.push(a + '=' + encodeURIComponent(a2[index])))


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

    // const testData = `ppw-widgetState=${ppwWidgetState}&` + qs.stringify(POSTAsyncContinueAfterSelectionDataConfig)

    // const testData =  'ppw-widgetState=4-MS0LV7KahEhjK6ae3iPVALlcyfrUEK-W4YX2Q_wpVbGehCDV6hqQROWpOzs4uuRvbhoxahstxiUXVCmr7zY6fuWBW-vWM-dBQPM7DvJ_FvWey5BLE5-lox-IONIXQrxjHjWWhuhzQlnZEpFdXQKgFb00WD4QJl1tnJzZ7obM66UPR8PdUN4PJIr5U1V-4dJ1O9eDuqJuXqivkoQV58Wg7auoiIERxa_dydAQIJvGFNlDE6oGRQnE5Lf1IOdmxO3e75K0eZEhiE0XtfVVxn823V968EiSnwWUdm44remQlhXoIhfEYv8JjN8tFNaLLEZQgBJiUG3kAMvfEbdnhfhB1_cY4HgxGvCzcH9mmMpfhclZdN6RD2d2gx3NLwQ1kGW2LyFvWg0k63sgnssqlelglWhY6Um9v7C73B_2LmGRJm4W4SCoarCmRQQhepzqhQvcDw3SwqXvz9XeJ2UvxvU38-lTpAX5X4BHmR0EK66kpeJVXdslqmfVMsjdvya2OpUIGAvRweLeKLwUQYq2yWyPeeXKdIFgIIcHvD9rzFS99Hqe1SGk1CRSuUfYBgIoAQnT5TJGttCvXtbguGc1BNU0-vlZ8fVRCoaLfCO70fZcFlZIlYScXN0hTnDjcAoZHLlmcJFmVAM_xkA6LIkFPmGOFE_afSEbdkZkEQMTXxOjvfaktsPFXH5H-ayt-DXPqEBcml8d53sZxpLP5VdKXFMbtruGZwlIDGVIS1rON1djvHd9qHHzeQIbwKrEUxgcY8IXztuqZKIOlsUhCKa4OQRSQ2vXlQAuxx218IppZTj4jgB73f2T9kiQUMAC6Q5EXtvb0R0p7Us1T91beUujYXSQPZFBR2_3hz7Pypg0EL9uk1Ct1c2FyHQb071CP9gJ2upUsMgxXyzelCE5AA-9s3T6x5tae7v6oeGn9uDRhcsGLstOOoGNhRJ1ozb3gXq9FRSkXWJnczmQTMbET3SbuZoJ-DP6e9SrAn-MYNTpTOtxXsS0RRuDovZe-v0KXOJcD4mANb8Ecjbys24N6OiHeh78hHjhSvJvfn3tS_obZIz9ZsSgA-yUqLfAKkPQ2Wr8Q136ony56yXJyGJcrtlIuOkGmbcAakRg8tagWTx8olDqqFuvwBClrvTIZOBYb1LDfJ30zHHIlUcj4AnHa7Rry_B8G1CZvuVqmM2Ljp13Mz1EfW-GO5mffBp4Z2WF8TQ17CnQmSTMeblQGpFdcrKgQy7AlyLQPycZOTIZKyQr5g4xpO-uet_fk0BBVmuUTFnAGBzT6ggzpUfIDm5_t0_xVMUvCyHyWTEYWnZgWaUO2GnkvyGxOdHUaQywOxiCDJjxyYlyCiPOhO_KDS1DnV-qgpE4LxAwwkCzjr-7NTjETFIcTfjsjI5_gqgb4E9dCcRmVb5DofTp-hVrbwXVVITKaoCjAyZc4XJkm0uPR1FhyDqmu_nf97DriZ4SQdkLCXMXS6vuHcZbMl6J4vNPObscybwNRnI1pNg9PgSO1btws2H8ETxT--d7TvRJS3pJlcYx7epqorZ2L5sAdPVekZ1-jRlIMQuysNerOjmIGu5JDi4eFAEo7ltnu91Pffm7oG0DNvC1s4WkXJpwCKwCe7Ig2zhQtSVCbXvnXSpXx66PNkURhHqo88nXUlEV2OC1_yuRm27BqBkiM5PCcHsg4KtHXetFPb2DGHOlkLo7FvjnlaDYIcP3OSOjtCGdnePbVC8rnncHg204PAqCp8ZKtLCNuBazBaF_ySxXsr25jWiTFM1EgRUauEfjS39HqxjoWVZp0codG8mZgvSt0311ZqSpCysForA6b0tmD4N69IBElVVlrVxRUaGgJmQ0POu_bSNp-b-4pc2GgzUQgec7KqQugnK3S6xH4RxlTpHjDeNU6O59SRDncxqywPwmySFEU_3Y30nZTEXSEgN8fucsFGyzQUV-u-w8EJ5WTHlYVPIXwxHU_Ld6Wyi0UAoRC1_8aMJCKt75ZXovA8GkjfRNOYJph6oaWAPkLSWThc6Wvph81s_VkyNVmyXoxUvLuESLbKisXq2FwbPpdseLGHLtI32za_Zg3V4hbhux10GGs0F_jafcZ75OQ9OnT0cet7HJ60OEB43WDWX4ky6nySAXRb_vZuCXSbPeM2EzGtHclQF11EBoBUQRKEHgrBPwnzb1CDz4EIBva3Mto2BHgML3-YV-IsnJZ1b4WmDrPZF7zjV13jJqhjZNO1jY3mExTwpSUbkJzi-HQj6pP6ATkYvcQyte4YUyxE19ZOeqBz7nW-VBbhdoSjWGUG_TjMxeVUMVivlW7agATKhPXW2sXqfD1n81dK6nk_A8PgASWEDwnB4ynVCxPCwFO9CaBaCQWoA-qliWRQwV0FkOuRY0vLaoJo0LXLNcB5IBGde_K9Df7MPJUzMcYG2_cE-sDfEWnv64GhITDfLIHEQwknW5R8yMLQepkwTUfitplS6L59Q8DE31BPz2lz52v5p2f0JnT1HwCSU7pzQ_ZZ2jaDqiMtLfMWxn8eas6chopYwkqaqR2cWA_q4feKV5Wh1ASiWQLvLOXrUzJQF92AFflpQRixFF-q78sIB5NXrWo5DuNB7g1HMWd7UWtVMT_E5Rr72nk2-n0-lyFMit0g6IUVtRvp3YR5xD8kg3d5GzZOgg26s8x1TIvX-g2kTisbZbJ-hGfYfFDtL66GNvxTc_9H4YUQXiQNB0QFKVKu2-EjCbA11Qdq-Eyvb4eBhn0vtDZznV0FKUw217pbkGir27at0vaawmezcuIrgX2zhBcgXm8_-lfJEo-E0sPY4KmeUa23LsyjmsH-nfDpBH1zHiaZYgnjidX3ZHg9O9q1nEa1gqWRrqQ5cgTOvcROZ4we0C2tfPcGXrRVyzBwfrxn_Teb-JDdyo6YhQ3yETO9CjjGtp5Mfkcc4-1DVpfr7rTYc7qcezunk9o9vtwpA0xKOwwR54EWkOoEu87ud2ToKdxxeyGzXXsg1S9jS3j0fuVco00bKLrQQaPtT4VQc1OD85TEYaJuLpaJ6mIo527ohGfZXMt-cqKeZheI6fFHG8qScZQAhzzW0_3m_mxPUVuxDMzqcVNju5BroxUbGqE7WvaWDbsSRnWD2AaI-hHcu92U5FGMGGS4zs848I9atmQtoRljEnq-mk_AOL3IIlZCUNjL1ry_0Te-VRd6xjTI2RzJmmq0UHduEQvO1gQgYM2cAm5vSCW99nuqAGWyNaLFS6U4k-SFJPrlbc90_joEt3BPD-2K-cQncvSMfVVPlFPAxH4WMrOGkgTxQ72ithcAE1p0FmuTTvrIuAvFn-gV4svyp-9N2WZnYYIRdCEwyvd7-F1rGTX1lQcO7hpcn1-XYGIizPkiTmv9-JuaJtGFOvOoN2Udq7tbTw5Y_UvYU699J5JaGqqJTPioxMl19cAzvFQlkBZSJFQYRLr4swXcoM47WoTkqnpcGWkC-iUe44AHM2n-d4b0XJ0VvEKa2Msc-cCSmkV3mPZkGq4TRYeted1KewTo_gtuZ9rJHfbpr0BAX86_M9IqXwRqWwSu2I3eWQv8MEdlFQZJfkKcQRNI7snkAuSe5J4QYs42EalYvlNyFwI7eMtOaL8p5DoDWWDyicaDOhePU7JyX9GfpBEd5nOiKi-Md6nwEr8JrUaD3gVwLKdP1sBOu0XqJ9ELr0bXxjNfLTUByD-piltRCHL82l3zJplNs05G1yBFgAkp9_60mUhNoV-FTDJ4COgbJ6yAJgmfuoKtJzRXuS4qcK8Vn3yxTs1swqLLQz4Tc0xv9Vq-yU6NI_bDYxnTaNTd0_hNY09aLxIPnxZgh4bu5PHkLmN8gIOPd1RdFiiA&ie=UTF-8&ppw-claimCode=&ppw-instrumentRowSelection=instrumentId%3D0h_PU_CUS_8a6bf2b9-8fe9-4de2-812b-15ee68c88c95%26isExpired%3Dfalse%26paymentMethod%3DCC%26tfxEligible%3Dfalse&ppw-0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3_rewardsAccountSelection_customAmountValue=10.96&ppw-0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3_rewardsAccountSelection_maxAmountValueHiddenInput=10.96&ppw-0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3_rewardsAccountSelection_currencyUnitHiddenInput=USD&ppw-0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3_rewardsAccountSelection_instrumentIdHiddenInput=0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3&ppw-0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3_rewardsAccountSelection_parentInstrumentIdHiddenInput=0h_PU_CUS_8a6bf2b9-8fe9-4de2-812b-15ee68c88c95&ppw-0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3_rewardsAccountSelection_currencyToPointsConversionRatioHiddenInput=1&ppw-0h_PU_CUS_8a6bf2b9-8fe9-4de2-812b-15ee68c88c95_childRewardsAccountInstrumentId=0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3&hasWorkingJavascript=1&ppw-jsEnabled=true&ppw-widgetEvent%3ASetPaymentPlanSelectContinueEvent=&isAsync=1&isClientTimeBased=1&handler=/gp/buy/payselect/handlers/apx-submit-continue.html'

    // const POSTAsyncContinueAfterSelectionData = qs.stringify(POSTAsyncContinueAfterSelectionDataConfig) + '&handler=/gp/buy/payselect/handlers/apx-submit-continue.html';

    const POSTAsyncContinueAfterSelectionResponse = await axios({
        method: 'post',
        url: POSTAsyncContinueAfterSelectionUrl,
        headers: {
            'authority': 'www.amazon.com', 
            'pragma': 'no-cache', 
            'cache-control': 'no-cache', 
            'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"', 
            'x-amz-checkout-type': 'spp', 
            'dnt': '1', 
            'rtt': '50', 
            'sec-ch-ua-mobile': '?0', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36', 
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
            'referer': 'https://www.amazon.com/gp/buy/payselect/handlers/display.html?hasWorkingJavascript=1', 
            'accept-language': 'en-US,en;q=0.9', 
            cookie: joinCookies(allCookies)
        },
        // httpsAgent: new (HttpsProxyAgent as any)({host: proxy.ip , port: proxy.port, auth: `${proxy.username}:${proxy.password}`}),
        proxy: {
            protocol: 'http',
            host: proxy.ip,
            port: proxy.port,
            auth: {
                username: proxy.username,
                password: proxy.password
            }
        },
        data : data2p1 + data2p2 //`ppw-widgetState=${ppwWidgetState}&` + a3.join('&') //testData
    })

    return POSTAsyncContinueAfterSelectionResponse;
}

export const POSTAsyncContinueAfterSelectionRetry : (allCookies : string[], params : POSTAsyncContinueAfterSelectionDynamicParams, proxy : Proxy) => Promise<AxiosResponse> = requestRetryWrapper(POSTAsyncContinueAfterSelection, {
    baseDelay: 3000,
    numberOfTries: 3,
    consoleRun: 'Getting submitting order screen',
    consoleError: 'Error getting submitting order screen'
})

export default POSTAsyncContinueAfterSelection;