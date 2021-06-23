import axios, { AxiosResponse } from 'axios';
import {
    returnParsedCookies,
    joinCookies,
    accumulateCookies,
    convertCookieArrayToObject,
    getValueByDelimiters
} from './requestFunctions';
import qs from 'qs';
import CookieObject from './interfaces/CookieObject';
import justinIsCracked from './genMetadata';
import { AmazonUser, AmazonPass } from './sensitive/logins';
import requestRetryWrapper from './requestRetryWrapper';

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

const GETMainLoginPageRetry : (allCookies : string[]) => Promise<AxiosResponse> = requestRetryWrapper(GETMainLoginPage, {
    baseDelay: 3000,
    numberOfTries: 3,
    consoleRun: 'Getting Amazon login page',
    consoleError: 'Error getting Amazon login page'
})

interface LoginQuerys {
    appActionToken: string,
    appAction: string,
    prevRID: string,
    workflowState: string,
    email: string,
    password?: string
}

const POSTMainLoginPage = async (allCookies : string[], sessionId: string, data : LoginQuerys) : Promise<AxiosResponse> => {
    
    const {
        appActionToken,
        appAction,
        prevRID,
        workflowState,
        email
    } = data;

    let POSTConfig = {
        appActionToken: appActionToken,
        appAction: appAction,           
        subPageType: "SignInClaimCollect",
        create: 0,
        prevRID: prevRID,
        workflowState: workflowState,
        email: email,
        password: ''
    }

    let POSTMainLoginPageData : string = qs.stringify(POSTConfig);


    const POSTMainLoginPageResponse : AxiosResponse = await axios({
        method: 'post',
        url: `https://www.amazon.com/ap/signin/${sessionId}`,
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
            'referer': 'https://www.amazon.com/ap/signin?openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=usflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&', 
            'accept-language': 'en-US,en;q=0.9', 
            cookie: joinCookies(allCookies),
        },
        data : POSTMainLoginPageData
    });

    return POSTMainLoginPageResponse;
}

const POSTMainLoginPageRetry : (allCookies : string[], sessionId: string, data : LoginQuerys) => Promise<AxiosResponse> = requestRetryWrapper(POSTMainLoginPage, {
    baseDelay: 3000,
    numberOfTries: 3,
    consoleRun: 'Posting to Amazon main login page',
    consoleError: 'Error posting to Amazon main login page'
})

const POSTSubLoginPage = async (allCookies : string[], sessionId: string, data : LoginQuerys) : Promise<AxiosResponse> => {

    const {
        appActionToken,
        appAction,
        prevRID,
        workflowState,
        email,
        password
    } = data;


    const metaCracked = justinIsCracked()

    const POSTConfig = {
        appActionToken: appActionToken, 
        appAction: appAction,           
        metadata1: metaCracked,
        prevRID: prevRID,
        workflowState: workflowState, 
        email: email, 
        password: password
    };

    const POSTSubData = qs.stringify(POSTConfig);

    const POSTSubLoginPageResponse = await axios({
        method: 'post',
        url: 'https://www.amazon.com/ap/signin',
        headers: {
            'authority': 'www.amazon.com', 
            'cache-control': 'max-age=0', 
            'rtt': '100', 
            'downlink': '6.45', 
            'ect': '4g', 
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
            'referer': `https://www.amazon.com/ap/signin/${sessionId}`, 
            'accept-language': 'en-US,en;q=0.9', 
            "cookie": joinCookies(allCookies)
        },
        maxRedirects: 0,
        validateStatus: function (a) {return true;},
        data : POSTSubData
    })

    return POSTSubLoginPageResponse;
}

const POSTSubLoginPageRetry : (allCookies : string[], sessionId: string, data : LoginQuerys) => Promise<AxiosResponse> = requestRetryWrapper(POSTSubLoginPage, {
    baseDelay: 3000,
    numberOfTries: 3,
    consoleRun: 'Posting to Amazon sub login page',
    consoleError: 'Error posting to Amazon sub login page'
})

const signIn = async (email : string, password : string) : Promise<string[]> => {

    let allCookies : string[] = []
    let allCookiesObject : CookieObject = {}; 


    const MainLoginPageRetryResponse : AxiosResponse = await GETMainLoginPageRetry(allCookies);

    allCookies = accumulateCookies(allCookies,
        returnParsedCookies(MainLoginPageRetryResponse.headers['set-cookie'])
    );
    allCookiesObject = convertCookieArrayToObject(allCookies);
    const findNewCookiesData = MainLoginPageRetryResponse.data;

    let appActionToken = getValueByDelimiters(findNewCookiesData, '<input type="hidden" name="appActionToken" value="', '" />');
    let appAction = getValueByDelimiters(findNewCookiesData, '<input type="hidden" name="appAction" value="', '" />');
    let prevRID = getValueByDelimiters(findNewCookiesData, '<input type="hidden" name="prevRID" value="', '" />');
    let workflowState = getValueByDelimiters(findNewCookiesData, '<input type="hidden" name="workflowState" value="', '" />');

    const POSTMainLoginPageResponse = await POSTMainLoginPageRetry(allCookies, allCookiesObject['session-id'], {
        appActionToken,
        appAction,
        prevRID,
        workflowState,
        email
    });

    allCookies = accumulateCookies(allCookies,
        returnParsedCookies(POSTMainLoginPageResponse.headers['set-cookie'])    
    );

    appActionToken = getValueByDelimiters(findNewCookiesData, '<input type="hidden" name="appActionToken" value="', '" />');
    appAction = getValueByDelimiters(findNewCookiesData, '<input type="hidden" name="appAction" value="', '" />');
    prevRID = getValueByDelimiters(findNewCookiesData, '<input type="hidden" name="prevRID" value="', '" />');
    workflowState = getValueByDelimiters(findNewCookiesData, '<input type="hidden" name="workflowState" value="', '" />');

    const POSTSubLoginPageRetryResponse = await POSTSubLoginPageRetry(allCookies, allCookiesObject['session-id'], {
        appActionToken,
        appAction,
        prevRID,
        workflowState,
        email,
        password
    })

    allCookies = accumulateCookies(
        allCookies,
        returnParsedCookies(POSTSubLoginPageRetryResponse.headers['set-cookie'])
    )

    return allCookies;
}

// (async () => {
//     await signIn(AmazonUser, AmazonPass);
// })();
export default signIn;