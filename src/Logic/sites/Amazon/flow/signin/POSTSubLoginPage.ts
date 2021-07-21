import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import LoginQuerys from './LoginQuerys';
import {
    joinCookies
} from '../../../../requestFunctions'
import requestRetryWrapper from '../../../../requestRetryWrapper';
import { Proxy } from '../../../../interfaces/ProxyList';
import HttpsProxyAgent from 'https-proxy-agent'
import api from '../../../../api';

const POSTSubLoginPage = async (allCookies : string[], sessionId: string, data : LoginQuerys, proxy : Proxy, license : string, session : string) : Promise<AxiosResponse> => {

    const {
        appActionToken,
        appAction,
        prevRID,
        workflowState,
        email,
        password
    } = data;

    // store.subscribe(() => {
    //     // When state will be updated(in this case, when items will be fetched), this is how we can get updated state.                    
    //      let session= store.getState().session;
    //     console.log(session)
    // })


    console.log('about to get metadata using these credentials')
    console.log(`license: ${license}`)
    console.log(`session: ${session}`)
    console.log(`api: ${api}/sites/amazon/data`)
    let metaCracked = await axios({
        method: 'get',
        url: `${api}/sites/amazon/data`,
        headers: {
            license,
            session
        }
    }) //justinIsCracked()

    metaCracked = metaCracked.data.body;

    console.log(`metadata1: ${metaCracked}`)
    console.log(metaCracked)

    const POSTConfig = {
        appActionToken: appActionToken, 
        appAction: appAction,           
        metadata1: metaCracked,
        prevRID: prevRID,
        workflowState: workflowState, 
        email: email, 
        password: password
    };

    console.log(POSTConfig)

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
        validateStatus: function () {return true;},
        data : POSTSubData,
        httpsAgent: new (HttpsProxyAgent as any)({host: proxy.ip , port: proxy.port, auth: `${proxy.username}:${proxy.password}`})
    })

    return POSTSubLoginPageResponse;
}

export const POSTSubLoginPageRetry : (allCookies : string[], sessionId: string, data : LoginQuerys, proxy : Proxy, license : string, session : string) => Promise<AxiosResponse> = requestRetryWrapper(POSTSubLoginPage, {
    baseDelay: 3000,
    numberOfTries: 3,
    consoleRun: 'Posting to Amazon sub login page',
    consoleError: 'Error posting to Amazon sub login page'
})

export default POSTSubLoginPage;