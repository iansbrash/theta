import axios, { AxiosResponse } from 'axios';
import { joinCookies } from '../../../../../requestFunctions';
import { Proxy } from '../../../../../interfaces/ProxyList';
import HttpsProxyAgent from 'https-proxy-agent'

const FAST_AsyncContinue2 = async (allCookies : string[], storage : {purchaseId: string, addressID: string, addressBookId: string}, proxy : Proxy) : Promise<AxiosResponse> => {
    const FAST_AsyncContinue2Url = `https://www.amazon.com/gp/buy/shared/handlers/async-continue.html`

    const {
        addressBookId,
        addressID,
        purchaseId
    } = storage;

    let dataConfig = {
        // submissionURL: /gp/buy/addressselect/handlers/continue.html/ref=chk_addr_select_1_mru?ie=UTF8&action=select-shipping&addressID=MLH6M2BGUAJSRR256M6EG1224DR1EH1AHA25HA1HE1RD42UPXTQ2EIA2OXJDLFBG&enableDeliveryPreferences=1&fromAnywhere=0&isCurrentAddress=0&numberOfDistinctItems=1&purchaseId=106-6565639-0269811&requestToken=
        // pickupUrl: /gp/buy/storeaddress/handlers/popover/search.html/ref=chk_addr_locker_search_sec
        usecase: 'checkout',
        hasWorkingJavascript: 1,
        addressBookId: addressBookId,
        pickupType: 'All',
        storeCountry: 'US',
        searchCriterion: 'storeZip',
        storeZip: '',
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
        handler: '/gp/buy/addressselect/handlers/continue.html'
    }

    // @ts-ignore
    const data = Object.keys(dataConfig).map((key, index) => key + '=' + encodeURIComponent(dataConfig[key])).join('&')

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
        httpsAgent: new (HttpsProxyAgent as any)({host: proxy.ip , port: proxy.port, auth: `${proxy.username}:${proxy.password}`}),
        data : data
    })

    return FAST_AsyncContinue2Response;
}

export default FAST_AsyncContinue2;