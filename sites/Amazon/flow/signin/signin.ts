import { AxiosResponse } from 'axios';
import {
    returnParsedCookies,
    accumulateCookies,
    convertCookieArrayToObject,
    getValueByDelimiters
} from '../../../../requestFunctions';
import CookieObject from '../../../../interfaces/CookieObject';
import {
    GETMainLoginPageRetry
} from './GETMainLoginPage';
import {
    POSTMainLoginPageRetry
} from './POSTMainLoginPage';
import {
    POSTSubLoginPageRetry
} from './POSTSubLoginPage';


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

export default signIn;