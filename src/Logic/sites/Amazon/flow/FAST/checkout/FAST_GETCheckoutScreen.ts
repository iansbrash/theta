import axios, { AxiosResponse } from "axios";
import { joinCookies } from "../../../../../requestFunctions";
import tsLogger from "../../../../../logger";
import { Proxy } from "../../../../../interfaces/ProxyList";

// @ts-ignore
import HttpsProxyAgent from "https-proxy-agent";

const FAST_GETCheckoutScreen = async (allCookies : string[], proxy : Proxy) : Promise<AxiosResponse> => {

    const cartInitiateId = (new Date).getTime();
    const CartUrlBeforeRedirect = `https://www.amazon.com/gp/cart/desktop/go-to-checkout.html/ref=ox_sc_proceed?partialCheckoutCart=1&isToBeGiftWrappedBefore=0&proceedToRetailCheckout=Proceed+to+checkout&proceedToCheckout=1&cartInitiateId=${cartInitiateId}`
    const GETCheckoutScreenResponse : AxiosResponse = await axios({
        method: 'get',
        url: CartUrlBeforeRedirect,
        headers: {
            'authority': 'www.amazon.com', 
            'pragma': 'no-cache', 
            'cache-control': 'no-cache', 
            'rtt': '0', 
            'downlink': '10', 
            'ect': '4g', 
            'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"', 
            'sec-ch-ua-mobile': '?0', 
            'upgrade-insecure-requests': '1', 
            'dnt': '1', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36', 
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
            'sec-fetch-site': 'same-origin', 
            'sec-fetch-mode': 'navigate', 
            'sec-fetch-user': '?1', 
            'sec-fetch-dest': 'document', 
            'referer': 'https://www.amazon.com/gp/cart/view.html/ref=chk_logo_return_to_cart', 
            'accept-language': 'en-US,en;q=0.9', 
            cookie: joinCookies(allCookies)
        },
        proxy: {
            // protocol: 'http',
            host: proxy.ip,
            port: proxy.port,
            auth: {
                username: proxy.username,
                password: proxy.password
            }
        }
        // httpsAgent: new (HttpsProxyAgent as any)({host: proxy.ip , port: proxy.port, auth: `${proxy.username}:${proxy.password}`})
    });

    const needsToResignIn = GETCheckoutScreenResponse.request.res.responseUrl.includes('/ap/signin')

    if (needsToResignIn) {
        tsLogger('Error: Redirected, logging in again')
        console.log(GETCheckoutScreenResponse)
        throw "Redirect error";
    }
    else {
        tsLogger("Successfully got checkout screen without redirect")
        return GETCheckoutScreenResponse;
    }
}

export default FAST_GETCheckoutScreen;