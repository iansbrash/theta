import Site from "../../../interfaces/enums/Site";
import Size from "../../../interfaces/enums/Size";
import ProfileObject from "../../../interfaces/ProfileObject";
import ProxyList from "../../../interfaces/ProxyList";
import TaskClass, { internalStatus, cycleStatus } from "../../classes/TaskClass";
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

    normalFlow : string[] = [
        'GETCheckoutScreen',
        'GETMainLoginPage',
        'POSTSubLoginPage',
        'AmazonGETProduct',
        'AmazonPOSTAddToCart',
        'GETCheckoutScreen',
        'POSTAddShippingAddressFormHandler',
        'POSTSelectShippingAddress',
        'GETAddPaymentPage',
        'POSTRegister',
        'POSTAddPaymentMethod',
        'POSTSelectPaymentMethod',
        'POSTAsyncContinueAfterSelection',
        'POSTSubmitOrder'
    ]

    nextFunctionIndex : number = 0;


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
    async start() : Promise<string> {
        if (this.internalStatus === internalStatus.Idle){

            this.nextFunction = this.GETMainLoginPage;
            this.nextFunctionIndex = 0;
            this.internalStatus = internalStatus.Active;
            this.storage = {};
            this.allCookies = [];

            return "Ready";

        }
        else {
            throw "Task is not idle"
        }
    }

    async cycle() : Promise<cycleStatus> {
        if (this.status === "Active") {
            try {

                // @ts-ignore
                const res = await this[this.normalFlow[this.nextFunctionIndex]]();

                this.nextFunctionIndex += 1;

                return {
                    status: 'Success',
                    message: res.message
                }
            }
            // catches thrown error from nextFunction
            catch (err) {
                return err;
            }
        }
        else {
            return {
                status: "Stopped", 
                message: "Stopped"
            }
        }
    }

    /// thoughts:
    // each class has a "cycle" abstract method
    // this method pretty much combines start and the rest of the needed methods into one
    // when you call cycle on an idle task, it does the first step of the flow.
    //      if it succeeds, it returns the next status code, and sets nextFunctions to the next step of the flow
    //      if it fails, it returns "failed", and sets nextFunction to itself, after setting a delay of say 3000

    /** SignIn Flow via IPC */

    async GETMainLoginPage() : Promise<cycleStatus> {

        try {
            const res : ipcResponse = await electron.ipcRenderer.invoke('AmazonGETMainLoginPage', this.allCookies, this.proxyList.proxies[0]);
            this.allCookies = res.allCookies;
            this.storage = res.storage;
            this.nextFunction = this.POSTMainLoginPage;
            return {
                status: "Success",

                // aka the next action
                message: "Signing in (2)"
            }
        }
        catch (err) {
            throw {
                status: "Error",
                message: err
            }
        }

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