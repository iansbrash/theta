// purchaseLevelMessageIds: saveDefaults
// submitFromSPC: 1
// fasttrackExpiration: 9901
// countdownThreshold: 86400
// showSimplifiedCountdown: 0
// countdownId: countdownId-0
// quantity.A04634882G8NGPCPA374K:: 1
// gift-message-text: 
// dupOrderCheckArgs: B07W4FMQ5Y|1|mhnntomnsqkq|A36MCMZ9LZTDGA
// order0: next-1dc
// shippingofferingid0.0: A181EEEPOJBEKQ
// guaranteetype0.0: GUARANTEED
// issss0.0: 0
// shipsplitpriority0.0: shipWhenever
// isShipWhenCompleteValid0.0: 0
// isShipWheneverValid0.0: 1
// shippingofferingid0.1: A2SO0K7H8Q0UM
// guaranteetype0.1: GUARANTEED
// issss0.1: 0
// shipsplitpriority0.1: shipWhenComplete
// isShipWhenCompleteValid0.1: 1
// isShipWheneverValid0.1: 0
// previousshippingofferingid0: A181EEEPOJBEKQ
// previousguaranteetype0: GUARANTEED
// previousissss0: 0
// previousshippriority0: shipWhenever
// lineitemids0: A04634882G8NGPCPA374K:
// currentshippingspeed: next-1dc
// previousShippingSpeed0: next-1dc
// currentshipsplitpreference: shipWhenever
// shippriority.0.shipWhenever: shipWhenever
// groupcount: 1
// shiptrialprefix: 2ZHE1NPXV6MZEPBXGR8B
// csrfToken: gJebkTiuCfVHMN28GjAtsUlcUaQTQmBqs/GCbDEAAAAMAAAAAGD7d6RyYXcAAAAA
// fromAnywhere: 0
// redirectOnSuccess: 0
// purchaseTotal: 10.96
// purchaseTotalCurrency: USD
// purchaseID: 106-1422983-8554639
// purchaseCustomerId: A25HA1HE1RD42U
// useCtb: 1
// scopeId: 2ZHE1NPXV6MZEPBXGR8B
// isQuantityInvariant: 
// promiseTime-0: 1627196400
// promiseAsin-0: B07W4FMQ5Y
// selectedPaymentPaystationId: amzn1.pm.wallet.MGhfUFVfQ1VTXzhhNmJmMmI5LThmZTktNGRlMi04MTJiLTE1ZWU2OGM4OGM5NQ.QTI1SEExSEUxUkQ0MlU
// hasWorkingJavascript: 1
// placeYourOrder1: 1
// isfirsttimecustomer: 0
// isTFXEligible: 
// isFxEnabled: 
// isFXTncShown: 


import axios from 'axios';
import { joinCookies } from '../../../../../requestFunctions';
import qs from 'qs';
import { Proxy } from '../../../../../interfaces/ProxyList';
import HttpsProxyAgent from 'https-proxy-agent'

const FAST_POSTSubmitOrder = async (allCookies : string[], finalData : object, proxy : Proxy) => {
    const POSTSubmitOrderUrl = 'https://www.amazon.com/gp/buy/spc/handlers/static-submit-decoupled.html/ref=ox_spc_place_order?ie=UTF8&hasWorkingJavascript='

    const POSTSubmitOrderData = qs.stringify(finalData)

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
        data : POSTSubmitOrderData,
        httpsAgent: new (HttpsProxyAgent as any)({host: proxy.ip , port: proxy.port, auth: `${proxy.username}:${proxy.password}`})
    })

    return POSTSubmitOrderResponse;
}

export default FAST_POSTSubmitOrder;