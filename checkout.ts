import signIn from "./signin";
import {
    returnParsedCookies,
    joinCookies,
    accumulateCookies,
    convertCookieArrayToObject,
    getValueByDelimiters
} from './requestFunctions';
import qs from 'qs';
import axios, { AxiosResponse } from 'axios';
import CookieObject from './interfaces/CookieObject';
//https://www.amazon.com/gp/cart/desktop/go-to-checkout.html/ref=ox_sc_proceed?partialCheckoutCart=1&isToBeGiftWrappedBefore=0&proceedToRetailCheckout=Proceed+to+checkout&proceedToCheckout=1&cartInitiateId=1624396027218
//https://www.amazon.com/gp/buy/addressselect/handlers/display.html?hasWorkingJavascript=1


// contains the cartInitiateId
// https://www.amazon.com/gp/cart/view.html?ref_=nav_cart


const checkout = async (allCookies : string[]) => {
    console.log('Beginning checkout process with these cookies:')
    console.log(allCookies)

    // const cartInitiateIdUrl : string = 'https://www.amazon.com/gp/cart/view.html?ref_=nav_cart';
    // const GETcartInitiateIdUrl : AxiosResponse= await axios({
    //     method: 'get',
    //     url: cartInitiateIdUrl,
    //     headers: {
    //         "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    //         "accept-language": "en-US,en;q=0.9",
    //         "downlink": "6.65",
    //         "ect": "4g",
    //         "rtt": "50",
    //         "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
    //         "sec-ch-ua-mobile": "?0",
    //         "sec-fetch-dest": "document",
    //         "sec-fetch-mode": "navigate",
    //         "sec-fetch-site": "none",
    //         "sec-fetch-user": "?1",
    //         "upgrade-insecure-requests": "1",
    //         cookie: joinCookies(allCookies)
    //     }
    // })

    // allCookies = accumulateCookies(
    //     allCookies,
    //     returnParsedCookies(GETcartInitiateIdUrl.headers['set-cookie'])
    // )

    // const cData : string = GETcartInitiateIdUrl.data;
    // console.log(cData);
    // return;

    // const cartInitiateId = getValueByDelimiters(cData.substring(cData.indexOf('" name="cartInitiateId"></form>') - 25), 'value="', '"' )
    // console.log(cData.substring(cData.indexOf('" name="cartInitiateId">')))
    // console.log(`cartInitiateId: ${cartInitiateId}`);

    const cartInitiateId = (new Date).getTime();


    const CartUrlBeforeRedirect = `https://www.amazon.com/gp/cart/desktop/go-to-checkout.html/ref=ox_sc_proceed?partialCheckoutCart=1&isToBeGiftWrappedBefore=0&proceedToRetailCheckout=Proceed+to+checkout&proceedToCheckout=1&cartInitiateId=${cartInitiateId}`
    const GETCartUrlBeforeRedirectRes : AxiosResponse = await axios({
        method: 'get',
        url: CartUrlBeforeRedirect,
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9",
            "downlink": "7.5",
            "ect": "4g",
            "rtt": "50",
            "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            cookie: joinCookies(allCookies)
        }
    });

    const needsToResignIn = GETCartUrlBeforeRedirectRes.request.res.responseUrl.includes('/ap/signin')

    if (needsToResignIn) {
        console.log('needs to resign in!')



        
    }

    console.log(GETCartUrlBeforeRedirectRes)
}

(async () => {
    let allCookies = await signIn();
    await checkout(allCookies);
})();