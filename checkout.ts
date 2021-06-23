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
import { AmazonUser, AmazonPass } from "./sensitive/logins";
import requestRetryWrapper from './requestRetryWrapper';
import tsLogger from './logger';
import justinIsCracked from './genMetadata';

//https://www.amazon.com/gp/cart/desktop/go-to-checkout.html/ref=ox_sc_proceed?partialCheckoutCart=1&isToBeGiftWrappedBefore=0&proceedToRetailCheckout=Proceed+to+checkout&proceedToCheckout=1&cartInitiateId=1624396027218
//https://www.amazon.com/gp/buy/addressselect/handlers/display.html?hasWorkingJavascript=1


// contains the cartInitiateId
// https://www.amazon.com/gp/cart/view.html?ref_=nav_cart

const GETCheckoutScreen = async (allCookies : string[], email : string, password : string) : Promise<AxiosResponse> => {
    const cartInitiateId = (new Date).getTime();
    const CartUrlBeforeRedirect = `https://www.amazon.com/gp/cart/desktop/go-to-checkout.html/ref=ox_sc_proceed?partialCheckoutCart=1&isToBeGiftWrappedBefore=0&proceedToRetailCheckout=Proceed+to+checkout&proceedToCheckout=1&cartInitiateId=${cartInitiateId}`
    const GETCheckoutScreenResponse : AxiosResponse = await axios({
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

    const needsToResignIn = GETCheckoutScreenResponse.request.res.responseUrl.includes('/ap/signin')

    if (needsToResignIn) {

        allCookies = accumulateCookies(
            allCookies,
            returnParsedCookies(GETCheckoutScreenResponse.headers['set-cookie'])
        )

        tsLogger('Redirected, logging in again')

        const ParseData = GETCheckoutScreenResponse.data;


        // email
        let appActionToken, appAction, prevRID, workflowState, siteState, openidDOTreturn_to, metadata1;
        
        appActionToken = getValueByDelimiters(ParseData, '<input type="hidden" name="appActionToken" value="', '" />');
        appAction = getValueByDelimiters(ParseData, '<input type="hidden" name="appAction" value="', '" />');
        prevRID = getValueByDelimiters(ParseData, '<input type="hidden" name="prevRID" value="', '" />');
        workflowState = getValueByDelimiters(ParseData, '<input type="hidden" name="workflowState" value="', '" />');
        siteState = getValueByDelimiters(ParseData, '<input type="hidden" name="siteState" value="', '" />');
        openidDOTreturn_to = getValueByDelimiters(ParseData, '<input type="hidden" name="openid.return_to" value="', '" />');
        metadata1 = justinIsCracked();

        const POSTLoginRedirectConfig = {
            appActionToken, 
            appAction,           
            metadata1,
            prevRID,
            workflowState, 
            email, 
            password,
            siteState,
            "openid.return_to": openidDOTreturn_to
        };

        console.log(POSTLoginRedirectConfig);
    
        const POSTLoginRedirectData = qs.stringify(POSTLoginRedirectConfig);

        const POSTLoginRedirectResponse : AxiosResponse = await axios({
            method: 'post',
            url: 'https://www.amazon.com/ap/signin',
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "max-age=0",
                "content-type": "application/x-www-form-urlencoded",
                "downlink": "7.65",
                "ect": "4g",
                "rtt": "50",
                "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
                cookie: joinCookies(allCookies),
                referrer: GETCheckoutScreenResponse.request.res.responseUrl
            },
            data : POSTLoginRedirectData
        })

        if (POSTLoginRedirectResponse.headers['set-cookie'].length === 3){
            tsLogger("Successfully logged in after redirect")
        }
        else {
            tsLogger("Failed to login after redirect")
        }

        return POSTLoginRedirectResponse;
    }
    else {
        tsLogger("Successfully got checkout screen without redirect")

        return GETCheckoutScreenResponse;
    }

}

const GETCheckoutScreenRetry : (allCookies : string[], username : string, password : string) => Promise<AxiosResponse> = requestRetryWrapper(GETCheckoutScreen, {
    baseDelay: 3000,
    numberOfTries: 3,
    consoleRun: 'Getting checkout screen',
    consoleError: 'Error getting checkout screen'
})


const checkout = async (allCookies : string[]) => {
    // console.log('Beginning checkout process with these cookies:')
    // console.log(allCookies)

    const GETCheckoutScreenResponse = await GETCheckoutScreenRetry(allCookies, AmazonUser, AmazonPass);

    allCookies = accumulateCookies(
        allCookies,
        returnParsedCookies(GETCheckoutScreenResponse.headers['set-cookie'])
    )

    return;

    const needsToResignIn = GETCheckoutScreenResponse.request.res.responseUrl.includes('/ap/signin')

    if (needsToResignIn) {
        console.log('needs to resign in!')

        // const POSTRedirectSignIn = await axios({
        //     method: 'post',
        //     url: 'https://www.amazon.com/ap/signin',
        //     headers: {
        //         "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        //         "accept-language": "en-US,en;q=0.9",
        //         "cache-control": "max-age=0",
        //         "content-type": "application/x-www-form-urlencoded",
        //         "downlink": "7.65",
        //         "ect": "4g",
        //         "rtt": "50",
        //         "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
        //         "sec-ch-ua-mobile": "?0",
        //         "sec-fetch-dest": "document",
        //         "sec-fetch-mode": "navigate",
        //         "sec-fetch-site": "same-origin",
        //         "sec-fetch-user": "?1",
        //         "upgrade-insecure-requests": "1",
        //         cookie: joinCookies(allCookies)
        //     }
        // })


        
    }

    console.log(GETCheckoutScreenResponse)
}

(async () => {
    let allCookies = await signIn(AmazonUser, AmazonPass);
    await checkout(allCookies);
})();