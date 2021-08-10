import axios, { AxiosResponse } from 'axios';
import { joinCookies } from '../../../../../requestFunctions';
import { Proxy } from '../../../../../interfaces/ProxyList';

// @ts-ignore
import HttpsProxyAgent from 'https-proxy-agent'
import qs from 'qs';

const FAST_AsyncContinue2 = async (allCookies : string[], superDynamicParams : object, proxy : Proxy) : Promise<AxiosResponse> => {
    const FAST_AsyncContinue2Url = `https://www.amazon.com/gp/buy/shared/handlers/async-continue.html`

  

    let dataConfig = {
        // "ppw-widgetState": superDynamicParams.,
        'ie': 'UTF-8',
        'ppw-claimCode': '',
        ...superDynamicParams,
        // 'ppw-instrumentRowSelection': '',// instrumentId=0h_PU_CUS_8a6bf2b9-8fe9-4de2-812b-15ee68c88c95&isExpired=false&paymentMethod=CC&tfxEligible=false
        // 'ppw-0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3_rewardsAccountSelection_customAmountValue': '',//  10.96
        // 'ppw-0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3_rewardsAccountSelection_maxAmountValueHiddenInput':  '',// 10.96
        // 'ppw-0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3_rewardsAccountSelection_currencyUnitHiddenInput': 'USD',
        // 'ppw-0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3_rewardsAccountSelection_instrumentIdHiddenInput':  '',// 0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3
        // 'ppw-0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3_rewardsAccountSelection_parentInstrumentIdHiddenInput':  '',// 0h_PU_CUS_8a6bf2b9-8fe9-4de2-812b-15ee68c88c95
        // 'ppw-0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3_rewardsAccountSelection_currencyToPointsConversionRatioHiddenInput': 1,
        // 'ppw-0h_PU_CUS_8a6bf2b9-8fe9-4de2-812b-15ee68c88c95_childRewardsAccountInstrumentId':  '',// 0h_PU_CUS_73c3ed2a-f7b3-4118-bda7-54c644e95ae3
        hasWorkingJavascript: 1,
        'ppw-jsEnabled': true,
        'ppw-widgetEvent:SetPaymentPlanSelectContinueEvent':  '',// 
        isAsync: 1,
        isClientTimeBased: 1,
        handler: '/gp/buy/payselect/handlers/apx-submit-continue.html'
    }

    // @ts-ignore
    const data = qs.stringify(dataConfig)

    console.log(data)


    // const data = qs.stringify(dataConfig)

    const FAST_AsyncContinue2Response = await axios({
        method: 'post',
        url: FAST_AsyncContinue2Url,
        headers: {
            'authority': 'www.amazon.com', 
            'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"', 
            'x-amz-checkout-type': 'spp', 
            'dnt': '1', 
            'rtt': '50', 
            'sec-ch-ua-mobile': '?0', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36', 
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8;', 
            'accept': 'text/plain, */*; q=0.01', 
            'x-requested-with': 'XMLHttpRequest', 
            'downlink': '8.2', 
            'ect': '4g', 
            'x-amz-checkout-transition': 'ajax', 
            'origin': 'https://www.amazon.com', 
            'sec-fetch-site': 'same-origin', 
            'sec-fetch-mode': 'cors', 
            'sec-fetch-dest': 'empty', 
            'referer': 'https://www.amazon.com/gp/buy/addressselect/handlers/display.html?hasWorkingJavascript=1', 
            'accept-language': 'en-US,en;q=0.9', 
            cookie: joinCookies(allCookies)
        },
        proxy: {
            host: proxy.ip,
            port: proxy.port,
            auth: {
                username: proxy.username,
                password: proxy.password
            },
        },
        // httpsAgent: new (HttpsProxyAgent as any)({host: proxy.ip , port: proxy.port, auth: `${proxy.username}:${proxy.password}`}),
        data : data
    })

    return FAST_AsyncContinue2Response;
}

export default FAST_AsyncContinue2;