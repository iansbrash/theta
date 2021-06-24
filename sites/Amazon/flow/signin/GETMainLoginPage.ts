import axios, { AxiosResponse } from 'axios';
import {
    joinCookies
} from '../../../../requestFunctions'
import requestRetryWrapper from '../../../../requestRetryWrapper';

const GETMainLoginPage = async (allCookies : string[]) : Promise<AxiosResponse> => {
    const AmazonBeginLoginUrl = 'https://www.amazon.com/ap/signin?openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=usflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&'

    // returns only a session ID and a session-id-time
    const GETAmazonSignInUser = await axios({
        method: 'get',
        url: AmazonBeginLoginUrl,
        headers: {
            'authority': 'www.amazon.com', 
            'cache-control': 'max-age=0', 
            'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"', 
            'sec-ch-ua-mobile': '?0', 
            'origin': 'https://www.amazon.com', 
            'upgrade-insecure-requests': '1', 
            'dnt': '1', 
            'content-type': 'application/x-www-form-urlencoded', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36', 
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
            'sec-fetch-site': 'same-origin', 
            'sec-fetch-mode': 'navigate', 
            'sec-fetch-user': '?1', 
            'sec-fetch-dest': 'document', 
            'accept-language': 'en-US,en;q=0.9', 
            'referer': 'https://www.amazon.com/ap/signin?openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=usflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&',
            cookie: joinCookies(allCookies)
        }
    });

    return GETAmazonSignInUser;
}

export const GETMainLoginPageRetry : (allCookies : string[]) => Promise<AxiosResponse> = requestRetryWrapper(GETMainLoginPage, {
    baseDelay: 3000,
    numberOfTries: 3,
    consoleRun: 'Getting Amazon login page',
    consoleError: 'Error getting Amazon login page'
})

export default GETMainLoginPage;