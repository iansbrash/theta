import electron from 'electron';
import SignIn from '../../Logic/sites/Amazon/flow/signin/signin';
import GETMainLoginPage from '../../Logic/sites/Amazon/flow/signin/GETMainLoginPage';
import POSTMainLoginPage from '../../Logic/sites/Amazon/flow/signin/POSTMainLoginPage';
import POSTSubLoginPage from '../../Logic/sites/Amazon/flow/signin/POSTSubLoginPage';
import { AxiosResponse } from 'axios';
import {
    accumulateCookies,
    returnParsedCookies,
    convertCookieArrayToObject,
    getValueByDelimiters,
} from '../../Logic/requestFunctions';

const signinIpc = () => {
    electron.ipcMain.handle('AmazonSignIn', async (event, ...args) => {
        // args:
        // user, pass, proxy
        const user = args[0];
        const pass = args[1];
        const proxy = args[2];
    
        // res is cookies
        const res = await SignIn(user, pass, proxy);

        return res;
    });

    electron.ipcMain.handle('AmazonGETMainLoginPage', async (event, ...args) => {
        // args:
        // allCookies, proxy
        let allCookies = args[0];
        let proxy = args[1];

        const MainLoginPageRetryResponse : AxiosResponse = await GETMainLoginPage(allCookies, proxy);

        allCookies = accumulateCookies(allCookies,
            returnParsedCookies(MainLoginPageRetryResponse.headers['set-cookie'])
        );

        let allCookiesObject = convertCookieArrayToObject(allCookies);
        const findNewCookiesData = MainLoginPageRetryResponse.data;

        let appActionToken = getValueByDelimiters(findNewCookiesData, '<input type="hidden" name="appActionToken" value="', '" />');
        let appAction = getValueByDelimiters(findNewCookiesData, '<input type="hidden" name="appAction" value="', '" />');
        let prevRID = getValueByDelimiters(findNewCookiesData, '<input type="hidden" name="prevRID" value="', '" />');
        let workflowState = getValueByDelimiters(findNewCookiesData, '<input type="hidden" name="workflowState" value="', '" />');

    

        return {
            allCookies: allCookies,
            storage: {
                appActionToken,
                appAction,
                prevRID,
                workflowState,
                sessionId: allCookiesObject['session-id']
            }
        };
    });

    electron.ipcMain.handle('AmazonPOSTMainLoginPage', async (event, ...args) => {
        // args:
        // allCookies, sessionId, porps, proxy
        let allCookies = args[0];
        const sessionId = args[1];
        const props = args[2];
        const proxy = args[3];

        const {
            appAction,
            appActionToken,
            prevRID,
            workflowState,
            email
        } = props;

    
        // res is cookies
        const POSTMainLoginPageResponse = await POSTMainLoginPage(allCookies, sessionId, {
            appAction,
            appActionToken,
            prevRID,
            workflowState,
            email
        }, proxy);

        allCookies = accumulateCookies(allCookies,
            returnParsedCookies(POSTMainLoginPageResponse.headers['set-cookie'])    
        );


        return {
            allCookies: allCookies,
            storage: {
                appAction,
                appActionToken,
                prevRID,
                workflowState,
                email
            }
        };
    })

    electron.ipcMain.handle('AmazonPOSTSubLoginPage', async (event, ...args) => {
        // args:
        // user, pass, proxy
        let allCookies = args[0];
        const sessionId = args[1];
        const props = args[2];
        const proxy = args[3];
        const license = args[4];
        const session = args[5];

        const {
            appAction,
            appActionToken,
            prevRID,
            workflowState,
            email,
            password
        } = props;
    
        const POSTSubLoginPageRetryResponse = await POSTSubLoginPage(allCookies, sessionId, {
            appActionToken,
            appAction,
            prevRID,
            workflowState,
            email,
            password
        }, proxy, license, session)

        allCookies = accumulateCookies(
            allCookies,
            returnParsedCookies(POSTSubLoginPageRetryResponse.headers['set-cookie'])
        )

        return {
            allCookies
        };
    })
}

export default signinIpc;