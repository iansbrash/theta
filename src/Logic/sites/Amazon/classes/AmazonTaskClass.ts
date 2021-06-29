import Site from "../../../interfaces/enums/Site";
import Size from "../../../interfaces/enums/Size";
import ProfileObject from "../../../interfaces/ProfileObject";
import ProxyList from "../../../interfaces/ProxyList";
import TaskClass, { internalStatus } from "../../classes/TaskClass";
import AmazonTaskConfig from "../../../interfaces/site_task_config/AmazonTaskConfig";
import electron from 'electron';
import { convertCookieArrayToObject } from "../../../requestFunctions";

interface storage {
    [key: string]: string
}

interface ipcResponse {
    allCookies: string[],
    storage: storage
}

export enum AmazonStatus {
    CheckoutSuccess,
    CheckoutError
}

class AmazonTaskClass extends TaskClass {

    config : AmazonTaskConfig;
    allCookies : string[];
    allCookiesObject : object = {};
    storage : storage = {};
    status : string = "Idle";


    constructor (
        identifier : number, 
        site : Site, 
        profile : ProfileObject, 
        size : Size[], 
        proxyList : ProxyList, 
        input : string, 
        config : AmazonTaskConfig
    ) {

        super(identifier, site, profile, size, proxyList, input);
        this.config = config;
        this.allCookies = [];
    }

    async test() : Promise<string> {
        const res = await electron.ipcRenderer.invoke('IPCTest', 'arg1', 'arg2');

        return res;

    }

    // deprecated ?
    async start() : Promise<void> {
        if (this.internalStatus === internalStatus.Idle){

            // @ts-ignore
            this.statusWatcher('Starting...');

            this.internalStatus = internalStatus.Active;

            const t = {
                identifier: this.identifier,
                site: this.site,
                // siteConfig: TaskConfig,
                profile: this.profile,
                size: this.size,
                proxyList: this.proxyList
            }
            // const res = await ipcRenderer.invoke('StartAmazon', 'testtask')

            // return res;

            const res = await electron.ipcRenderer.invoke('StartAmazon', 'arg1', 'arg2');

            return res;
        }
        else {
            throw "Task is not idle"
        }
    }

    async signIn() : Promise<void> {
        // user, pass, proxy
        const res = await electron.ipcRenderer.invoke('AmazonSignIn', this.config.account.username, this.config.account.password, this.proxyList.proxies[0]);
        
        console.log('res')
        console.log(res);
        this.allCookies = res;
    }

    /** SignIn Flow via IPC */

    async GETMainLoginPage() : Promise<void> {

        this.status = "Active";

        // allCookies, proxy
        const res : ipcResponse = await electron.ipcRenderer.invoke('AmazonGETMainLoginPage', this.allCookies, this.proxyList.proxies[0]);
        this.allCookies = res.allCookies;
        this.storage = res.storage;
    }

    async POSTMainLoginPage() : Promise<void> {
        // allCookies, allCookiesObject['session-id']

        this.storage.sessiondId = convertCookieArrayToObject(this.allCookies)['session-id'];

        const res = await electron.ipcRenderer.invoke('AmazonPOSTMainLoginPage', this.allCookies, this.storage.sessiondId, {
            appAction: this.storage.appAction,
            appActionToken: this.storage.appActionToken,
            prevRID: this.storage.prevRID,
            workflowState: this.storage.workflowState,
            email: this.config.account.username
        }, this.proxyList.proxies[0]);
        this.allCookies = res.allCookies;
    }

    async POSTSubLoginPage() : Promise<void> {
        // allCookies, allCookiesObject['session-id']
        const res = await electron.ipcRenderer.invoke('AmazonPOSTSubLoginPage', this.allCookies, this.storage.sessiondId, {
            appAction: this.storage.appAction,
            appActionToken: this.storage.appActionToken,
            prevRID: this.storage.prevRID,
            workflowState: this.storage.workflowState,
            email: this.config.account.username,
            password: this.config.account.password
        } , this.proxyList.proxies[0]);

        this.allCookies = res.allCookies;
    }

    /** SignIn Flow via IPC */

    async addToCart() : Promise<void> {
        // allCookies, product, proxy
        const product = 'https://www.amazon.com/Mkeke-Compatible-iPhone-11-Clear/dp/B07W4FMQ5Y/';


        const res = await electron.ipcRenderer.invoke('AmazonATC', this.allCookies, product, this.proxyList.proxies[0]);
        this.allCookies = res;
    }

    /** ATC Flow via IPC */

    async GETProduct() : Promise<void> {
        // allCookies, allCookiesObject['session-id']
        const res = await electron.ipcRenderer.invoke('AmazonGETProduct', this.allCookies, this.input, this.proxyList.proxies[0]);

        this.allCookies = res.allCookies;
        this.storage = {
            ...res.storage,
            sessionId: this.storage.sessionId,
        }
    }

    async AmazonGETProduct() : Promise<string> {
        // allCookies, allCookiesObject['session-id']
        const res = await electron.ipcRenderer.invoke('AmazonGETProduct', this.allCookies, this.input, this.proxyList.proxies[0]);

        this.allCookies = res.allCookies;
        this.storage = {
            ...res.storage,
            sessionId: this.storage.sessionId,
        }

        return res.productTitle;
    }

    async AmazonPOSTAddToCart() : Promise<string> {
        // allCookies, allCookiesObject['session-id']
        const res = await electron.ipcRenderer.invoke('AmazonPOSTAddToCart', this.allCookies, this.storage, this.proxyList.proxies[0]);
        console.log('here 2')

        this.allCookies = res.allCookies;

        // dont think this actually returns anything...
        this.storage = {
            ...res.storage,
            sessionId: this.storage.sessionId,
        }

        console.log('here 3')

        return res.status;
    }

    /** ATC Flow via IPC */

    /** Checkout Flow via IPC */

    async GETCheckoutScreen() : Promise<void> {
        // allCookies, proxy
        const res = await electron.ipcRenderer.invoke('GETCheckoutScreen', this.allCookies, this.proxyList.proxies[0]);

        this.storage = res.storage;

        this.allCookies = res.allCookies;
    }

    async POSTAddShippingAddressFormHandler() : Promise<void> {
        // allCookies, proxy
        const res = await electron.ipcRenderer.invoke('POSTAddShippingAddressFormHandler', 
            this.allCookies, 
            this.profile.information,
            this.profile.shipping,
            this.storage,
            this.proxyList.proxies[0]
        );

        this.storage = res.storage;
        this.allCookies = res.allCookies;
    }

    async POSTSelectShippingAddress() : Promise<void> {
        // allCookies, proxy
        const res = await electron.ipcRenderer.invoke('POSTSelectShippingAddress', this.allCookies, this.storage, this.proxyList.proxies[0]);

        this.allCookies = res.allCookies;
    }

    async GETAddPaymentPage() : Promise<void> {
        // allCookies, proxy
        const res = await electron.ipcRenderer.invoke('GETAddPaymentPage', this.allCookies, this.proxyList.proxies[0]);

        this.allCookies = res.allCookies;
        this.storage = {
            ...this.storage,
            ...res.storage
        }
    }

    async POSTRegister() : Promise<void> {
        // allCookies, proxy
        const res = await electron.ipcRenderer.invoke('POSTRegister', this.allCookies, this.storage, this.proxyList.proxies[0]);

        this.allCookies = res.allCookies;
        this.storage = res.storage;
    }

    async POSTAddPaymentMethod() : Promise<void> {

        console.log(this.storage)

        // allCookies, proxy
        const res = await electron.ipcRenderer.invoke('POSTAddPaymentMethod', this.allCookies, this.storage, this.profile.payment, this.proxyList.proxies[0]);

        this.allCookies = res.allCookies;
        this.storage = {
            ...this.storage,
            ...res.storage
        }
    }

    async POSTSelectPaymentMethod() : Promise<void> {
        // allCookies, proxy
        const res = await electron.ipcRenderer.invoke('POSTSelectPaymentMethod', this.allCookies, this.storage, this.proxyList.proxies[0]);

        this.allCookies = res.allCookies;
        this.storage = res.storage;
    }

    async POSTAsyncContinueAfterSelection() : Promise<void> {
        // allCookies, proxy
        const res = await electron.ipcRenderer.invoke('POSTAsyncContinueAfterSelection', this.allCookies, this.storage, this.proxyList.proxies[0]);


    }

    async POSTSubmitOrder() : Promise<AmazonStatus> {
        const response = await electron.ipcRenderer.invoke('POSTSubmitOrder', this.allCookies, this.storage, this.proxyList.proxies[0]);

        if (response === "Success") {
            return AmazonStatus.CheckoutSuccess
        }
        else {
            return AmazonStatus.CheckoutError
        }
    }

    async checkout() : Promise<void> {
        const res = await electron.ipcRenderer.invoke('AmazonCheckout', this.allCookies, this.proxyList.proxies[0]);



        // this.allCookies = res.allCookies;
        // this.storage = res.storage;
    }


    stop() : void {
        console.log('stopping !')
    }

    /** Checkout Flow via IPC */
}

export default AmazonTaskClass;