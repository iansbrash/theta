import axios, { AxiosResponse } from 'axios';
import { joinCookies } from '../../../../../requestFunctions';
import requestRetryWrapper from '../../../../../requestRetryWrapper';
import { Proxy } from '../../../../../interfaces/ProxyList';

const POSTSelectShippingAddress = async (allCookies : string[], addressId : string, purchaseId : string, proxy : Proxy) : Promise<AxiosResponse> => {
    const POSTSelectShippingAddressResponse = await axios({
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
        proxy: {
            protocol: 'https',
            host: proxy.ip,
            port: proxy.port,
            auth: {
                username: proxy.username,
                password: proxy.password,
            }
        },
        data : `action=select-shipping&addressID=${addressId}&purchaseId=${purchaseId}&isClientTimeBased=1&handler=/gp/buy/addressselect/handlers/continue.html`
    })

    return POSTSelectShippingAddressResponse;
}

export const POSTSelectShippingAddressRetry : (allCookies : string[], addressId : string, purchaseId : string, proxy : Proxy) => Promise<AxiosResponse> = requestRetryWrapper(POSTSelectShippingAddress, {
    baseDelay: 3000,
    numberOfTries: 3,
    consoleRun: 'Selecting shipping address',
    consoleError: 'Error selecting shipping address'
})

export default POSTSelectShippingAddress;