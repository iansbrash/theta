import axios, { AxiosResponse } from 'axios';
import { joinCookies } from '../../../../../requestFunctions';
import requestRetryWrapper from '../../../../../requestRetryWrapper';
import qs from 'qs';
import { ProfilePayment } from '../../../../../interfaces/ProfileObject';
import { Proxy } from '../../../../../interfaces/ProxyList';
import HttpsProxyAgent from 'https-proxy-agent'

const splitCC = (cc : string) : string[] => {
    return cc.match(/.{1,4}/g)!;
}

interface POSTAddPaymentMethodDynamicParams {
    'ppw-widgetEvent:AddCreditCardEvent': string,
    'ppw-jsEnabled': boolean,
    'ppw-widgetState': string
}

const POSTAddPaymentMethod = async (allCookies : string[], customerId : string, params : POSTAddPaymentMethodDynamicParams, payment : ProfilePayment, proxy : Proxy) : Promise<AxiosResponse> => {

    const url = `https://apx-security.amazon.com/payments-portal/data/f1/widgets2/v1/customer/${customerId}/continueWidget?sif_profile=APX-Encrypt-All-NA`
    const POSTAddPaymentMethodConfig : POSTAddPaymentMethodDynamicParams = params;
    
    // also needs CC name expm expy
    const POSTAddPaymentMethodData = qs.stringify(POSTAddPaymentMethodConfig) + `&ie=${'UTF-8'}&addCreditCardNumber=${splitCC(payment.number).join('+')}&ppw-accountHolderName=${payment.name.split(' ').join('+')}&ppw-expirationDate_month=${payment.expiryMonth.charAt(0) === "0" ? payment.expiryMonth.substring(1) : payment.expiryMonth}&ppw-expirationDate_year=${payment.expiryYear}`;


    const tempData2 = `ppw-widgetEvent%3AAddCreditCardEvent=&ppw-jsEnabled=true&ppw-widgetState=${params["ppw-widgetState"]}` + `&ie=UTF-8&addCreditCardNumber=${splitCC(payment.number).join('+')}&ppw-accountHolderName=${payment.name.split(' ').join('+')}&ppw-expirationDate_month=${payment.expiryMonth.charAt(0) === "0" ? payment.expiryMonth.substring(1) : payment.expiryMonth}&ppw-expirationDate_year=${payment.expiryYear.length === 2 ? '20' + payment.expiryYear : payment.expiryYear}`;

    const tempData = `ppw-widgetEvent%3AAddCreditCardEvent=&ppw-jsEnabled=true&ppw-widgetState=${params["ppw-widgetState"]}&ie=UTF-8&addCreditCardNumber=${'4767+7184+3996+8928'}&ppw-accountHolderName=Ian+brash&ppw-expirationDate_month=11&ppw-expirationDate_year=2023`

   
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
        httpsAgent: new (HttpsProxyAgent as any)({host: proxy.ip , port: proxy.port, auth: `${proxy.username}:${proxy.password}`})
    });
    return POSTAddPaymentMethodResponse;
}

export const POSTAddPaymentMethodRetry : (allCookies : string[], customerId : string, params : POSTAddPaymentMethodDynamicParams, payment : ProfilePayment, proxy : Proxy) => Promise<AxiosResponse> = requestRetryWrapper(POSTAddPaymentMethod, {
    baseDelay: 3000,
    numberOfTries: 3,
    consoleRun: 'Adding payment method',
    consoleError: 'Error adding payment method'
})

export default POSTAddPaymentMethod;