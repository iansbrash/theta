import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import LoginQuerys from './LoginQuerys';
import {
    joinCookies
} from '../../../../requestFunctions'
import requestRetryWrapper from '../../../../requestRetryWrapper';
import justinIsCracked from '../../logic/genMetadata';
import { Proxy } from '../../../../interfaces/ProxyList';

const POSTSubLoginPage = async (allCookies : string[], sessionId: string, data : LoginQuerys, proxy : Proxy) : Promise<AxiosResponse> => {

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
        data : POSTSubData,
        proxy: {
            protocol: 'https',
            host: proxy.ip,
            port: proxy.port,
            auth: {
                username: proxy.username,
                password: proxy.password,
            }
        }
    })

    return POSTSubLoginPageResponse;
}

export const POSTSubLoginPageRetry : (allCookies : string[], sessionId: string, data : LoginQuerys, proxy : Proxy) => Promise<AxiosResponse> = requestRetryWrapper(POSTSubLoginPage, {
    baseDelay: 3000,
    numberOfTries: 3,
    consoleRun: 'Posting to Amazon sub login page',
    consoleError: 'Error posting to Amazon sub login page'
})

export default POSTSubLoginPage;