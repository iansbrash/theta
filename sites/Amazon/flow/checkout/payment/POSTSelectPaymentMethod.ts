import axios, { AxiosResponse } from 'axios';
import { joinCookies } from '../../../../../requestFunctions';
import requestRetryWrapper from '../../../../../requestRetryWrapper';
import { Proxy } from '../../../../../interfaces/ProxyList';
import HttpsProxyAgent from 'https-proxy-agent'

interface POSTSelectPaymentMethodDynamicProps {
    "ppw-widgetState": string,
    "ppw-paymentMethodId": string,
}

const POSTSelectPaymentMethod = async (allCookies : string[], customerId : string, params : POSTSelectPaymentMethodDynamicProps, proxy : Proxy) : Promise<AxiosResponse> => {
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
        data : otherData,
        httpsAgent: new (HttpsProxyAgent as any)({host: proxy.ip , port: proxy.port, auth: `${proxy.username}:${proxy.password}`})
    })

    return POSTSelectPaymentMethodResponse;
}

export const POSTSelectPaymentMethodRetry : (allCookies : string[], customerId : string, params : POSTSelectPaymentMethodDynamicProps, proxy : Proxy) => Promise<AxiosResponse> = requestRetryWrapper(POSTSelectPaymentMethod, {
    baseDelay: 3000,
    numberOfTries: 3,
    consoleRun: 'Selecting payment method',
    consoleError: 'Error selecting payment method'
})

export default POSTSelectPaymentMethod;