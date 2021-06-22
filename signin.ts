import axios from 'axios';
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

const signIn = async () : Promise<string[]> => {

    let allCookies : string[] = []

    let allCookiesObject : CookieObject = {}; 

    const AmazonBeginLoginUrl = 'https://www.amazon.com/ap/signin?openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=usflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&'


    console.log('GETAmazonSignInUser')

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

   

    allCookies = accumulateCookies(allCookies,
        returnParsedCookies(GETAmazonSignInUser.headers['set-cookie'])
    );

    allCookiesObject = convertCookieArrayToObject(allCookies);










   

    const findNewCookiesData = GETAmazonSignInUser.data;

    // console.log(findNewCookiesData)
    // return;

    let appActionToken = getValueByDelimiters(findNewCookiesData, '<input type="hidden" name="appActionToken" value="', '" />');
    console.log(`appActionToken: ${appActionToken}`)
    let appAction = getValueByDelimiters(findNewCookiesData, '<input type="hidden" name="appAction" value="', '" />');
    console.log(`appAction: ${appAction}`)
    let prevRID = getValueByDelimiters(findNewCookiesData, '<input type="hidden" name="prevRID" value="', '" />');
    console.log(`prevRID: ${prevRID}`)
    // const metadata1 = getValueByDelimiters(findNewCookiesData, '<input type="hidden" name="metadata1" value="', '"/>');
    // console.log(`metadata1: ${metadata1}`)
    // perhaps this comes on the second page?
    let workflowState = getValueByDelimiters(findNewCookiesData, '<input type="hidden" name="workflowState" value="', '" />');
    console.log(`workflowState: ${workflowState}`)

    console.log('POSTAmazonSignInUserTwo')
    console.log(`https://www.amazon.com/ap/signin/${allCookiesObject['session-id']}`)
    console.log(joinCookies(allCookies))

    // console.log(findNewCookiesData)

    let wahckConfig = {
        appActionToken: appActionToken, // neccessary
        appAction: 'SIGNIN_PWD_COLLECT',           
        subPageType: "SignInClaimCollect",
        // metadata1
        // "openid.return_to": openidDOTreturn_to,
        create: 0,
        prevRID: prevRID,
        workflowState: workflowState, // neccessary
        email: 'brash@usc.edu', // neccessary,
        password: ''
        // encryptedPwd: encryptedPwd, // neccessary
        // encryptedPwdExpected: ''
    }
    console.log(wahckConfig);

    var POSTAmazonSignInUserTwoData = qs.stringify(wahckConfig);

    // console.log(joinCookies(allCookies));

    const POSTAmazonSignInUserTwo = await axios({
        method: 'post',
        url: `https://www.amazon.com/ap/signin/${allCookiesObject['session-id']}`,
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
        data : POSTAmazonSignInUserTwoData
    });

    allCookies = accumulateCookies(allCookies,
        returnParsedCookies(POSTAmazonSignInUserTwo.headers['set-cookie'])    
    );

    console.log(allCookies)







    
    
    // const metadata1 = getValueByDelimiters(findNewCookiesData, '<input name="metadata1" type="hidden" value="', '">');
    const openidDOTreturn_to = getValueByDelimiters(findNewCookiesData, '<input type="hidden" name="openid.return_to" value="', '">');
    // console.log(openidDOTreturn_to)

    

    const encryptedPasswordExpected = '';
    // const encryptedPasswordExpected = getValueByDelimiters(findNewCookiesData, '<input name="metadata1" type="hidden" value="', '">');



    appActionToken = getValueByDelimiters(findNewCookiesData, '<input type="hidden" name="appActionToken" value="', '" />');
    console.log(`appActionToken: ${appActionToken}`)
    appAction = getValueByDelimiters(findNewCookiesData, '<input type="hidden" name="appAction" value="', '" />');
    console.log(`appAction: ${appAction}`)
    prevRID = getValueByDelimiters(findNewCookiesData, '<input type="hidden" name="prevRID" value="', '" />');
    console.log(`prevRID: ${prevRID}`)
    // const metadata1 = getValueByDelimiters(findNewCookiesData, '<input type="hidden" name="metadata1" value="', '"/>');
    // console.log(`metadata1: ${metadata1}`)
    // perhaps this comes on the second page?
    workflowState = getValueByDelimiters(findNewCookiesData, '<input type="hidden" name="workflowState" value="', '" />');
    console.log(`workflowState: ${workflowState}`)
    

    // console.log(GETAmazonSignInUser);
    // return;

    let metaCracked = justinIsCracked()

    console.log(metaCracked)

    // await delay(20000);


    const whackObj2 = {
        appActionToken: appActionToken, // neccessary
        appAction: appAction,           
        metadata1: metaCracked,
        // "openid.return_to": openidDOTreturn_to,
        prevRID: prevRID,
        workflowState: workflowState, // neccessary
        email: AmazonUser, // neccessary
        // encryptedPwd: encryptedPwd, // neccessary
        // encryptedPwdExpected: ''
        password: AmazonPass
    };

    var data = qs.stringify(whackObj2);

    // Form Data Fields:
    //      appActionToken
    //      appAction                   (SIGNIN_PWD_COLLECT)
    //      metadata1
    //      openid.return_to
    //      prevRID
    //      workflowState
    //      email                       (brash@usc.edu)
    //      encryptedPwd
    //      encryptedPwdExpected

    console.log(convertCookieArrayToObject(allCookies));
    console.log(whackObj2);


    const POSTAmazonSignIn = await axios({
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
            'referer': `https://www.amazon.com/ap/signin/${allCookiesObject['session-id']}`, 
            'accept-language': 'en-US,en;q=0.9', 
            "cookie": joinCookies(allCookies)
        },
        data : data
    })

    allCookies = accumulateCookies(
        allCookies,
        returnParsedCookies(POSTAmazonSignIn.headers['set-cookie'])
    );

    return allCookies;
}

export default signIn;