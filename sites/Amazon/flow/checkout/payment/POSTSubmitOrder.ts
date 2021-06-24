import axios, { AxiosResponse } from 'axios';
import { joinCookies } from '../../../../../requestFunctions';
import requestRetryWrapper from '../../../../../requestRetryWrapper';
import qs from 'qs';

const POSTSubmitOrder = async (allCookies : string[], data : object) => {
    const POSTSubmitOrderUrl = 'https://www.amazon.com/gp/buy/spc/handlers/static-submit-decoupled.html/ref=ox_spc_place_order?ie=UTF8&hasWorkingJavascript='


    const POSTSubmitOrderData = qs.stringify(data)

    const POSTSubmitOrderResponse = await axios({
        method: 'post',
        url: POSTSubmitOrderUrl,
        headers: {
            'authority': 'www.amazon.com', 
            'cache-control': 'max-age=0', 
            'rtt': '50', 
            'downlink': '10', 
            'ect': '4g', 
            'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"', 
            'sec-ch-ua-mobile': '?0', 
            'origin': 'https://www.amazon.com', 
            'upgrade-insecure-requests': '1', 
            'dnt': '1', 
            'content-type': 'application/x-www-form-urlencoded', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36', 
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
            'sec-fetch-site': 'same-origin', 
            'sec-fetch-mode': 'navigate', 
            'sec-fetch-user': '?1', 
            'sec-fetch-dest': 'document', 
            'referer': 'https://www.amazon.com/gp/buy/payselect/handlers/display.html?hasWorkingJavascript=1', 
            'accept-language': 'en-US,en;q=0.9', 
            cookie: joinCookies(allCookies)
        },
        data : POSTSubmitOrderData
    })

    return POSTSubmitOrderResponse;
}

export const POSTSubmitOrderRetry : (allCookies : string[], data : object) => Promise<AxiosResponse> = requestRetryWrapper(POSTSubmitOrder, {
    baseDelay: 3000,
    numberOfTries: 3,
    consoleRun: 'Submitting order...',
    consoleError: 'Error submitting order'
})

export default POSTSubmitOrder;