import Site from "../../../interfaces/enums/Site";
import Size from "../../../interfaces/enums/Size";
import ProfileObject from "../../../interfaces/ProfileObject";
import ProxyList, { Proxy } from "../../../interfaces/ProxyList";
import TaskClass, { internalStatus, cycleStatus } from "../../classes/TaskClass";
import AmazonTaskConfig, { AmazonModes } from "../../../interfaces/site_task_config/AmazonTaskConfig";
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
    flow : "normalFlow" | "fastFlow" | "preloadFlow";
    flowExtraData : "normalFlowExtraData" | "fastFlowExtraData" | "preloadFlowExtraData";
    currentProxy : Proxy;

    normalFlow : string[] = [
        'GETMainLoginPage',
        'POSTMainLoginPage',
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

    normalFlowExtraData : string[][] = [
        [],
        [],
        [],
        ['productTitle', 'productImage', 'productPrice'],
        [],
        [],
        [],
        [],
        [],
        []
    ]

    fastFlow : string[] = [
        'GETMainLoginPage',
        'POSTMainLoginPage',
        'POSTSubLoginPage',
        'AmazonGETProduct',
        'AmazonPOSTAddToCart',
        'FAST_GETCheckoutScreen', // It is the same up to here, then we do 3 steps instead of 8
        'FAST_AsyncContinue1',
        'FAST_AsyncContinue2',
        'FAST_POSTSubmitOrder'
    ]

    fastFlowExtraData : string[][] = [
        [],
        [],
        [],
        ['productTitle', 'productImage', 'productPrice'],
        [],
        [],
        [],
        [],
        [],
    ]

    async FAST_GETCheckoutScreen() : Promise<cycleStatus> {
        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('FAST_GETCheckoutScreen', this.allCookies, this.currentProxy);

            this.allCookies = res.allCookies;
            this.storage = {
                ...this.storage,
                ...res.storage
            }
        }, 'Submitting order (1)')
    }

    async FAST_AsyncContinue1() : Promise<cycleStatus> {
        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('FAST_AsyncContinue1', this.allCookies, this.storage, this.currentProxy);

            this.allCookies = res.allCookies;
            this.storage = {
                ...res.storage,
                ...this.storage
            }
        }, 'Submitting order (2)')
    }

    async FAST_AsyncContinue2() : Promise<cycleStatus> {
        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('FAST_AsyncContinue2', this.allCookies, this.storage, this.currentProxy);

            this.allCookies = res.allCookies;

            // This makes it so finalData is the only thing left
            this.storage = {
                // ...this.storage,
                ...res.storage
            }
        }, 'Submitting order (3)')
    }

    async FAST_POSTSubmitOrder() : Promise<cycleStatus> {
        return await this.tryCatchWrapper(async () => {
            const response = await electron.ipcRenderer.invoke('FAST_POSTSubmitOrder', this.allCookies, this.storage.finalData, this.currentProxy);

            if (response !== "Success") {
                throw "Checkout Error"
            }

            this.status = "Checked Out"
        }, 'Checked Out')
    }

    preloadFlow : string[] = [
        'GETMainLoginPage',
        'POSTMainLoginPage',
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

    preloadFlowExtraData : string[][] = [
        [],
        [],
        [],
        ['productTitle', 'productImage', 'productPrice'],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
    ]

    nextFunctionIndex : number = 0;


    constructor (
        identifier : number, 
        site : Site, 
        profile : ProfileObject, 
        size : Size[], 
        proxyList : ProxyList, 
        input : string, 
        config : AmazonTaskConfig,
        monitor : number,
        error : number
    ) {

        super(identifier, site, profile, size, proxyList, input, monitor, error);
        this.config = config;
        this.allCookies = [];

        // Not great but passable solution
        this.currentProxy = this.proxyList.proxies[this.identifier % this.proxyList.proxies.length]

        
        if (config.mode === AmazonModes.Normal) {
            this.flow = "normalFlow";
            this.flowExtraData = "normalFlowExtraData"
        }
        else if (config.mode === AmazonModes.Fast) {
            this.flow = "fastFlow"
            this.flowExtraData = "fastFlowExtraData"
        }
        else if (config.mode === AmazonModes.Preload) {
            this.flow = "preloadFlow"
            this.flowExtraData = "preloadFlowExtraData"
        }
        else {
            throw "Flow does not exist"
        }
    }

    async tryCatchWrapper(fn : (() => Promise<any>), successMessage : string) : Promise<cycleStatus> {
        try {
            
            const res = await fn();

            let returnCycleStatus : cycleStatus = {
                status: "Success",
                message: successMessage
            }

            if (res === null || res === undefined) {}
            else if (res.extraData) {
                returnCycleStatus.extraData = res.extraData;
            }

            return returnCycleStatus
        }
        catch (err) {
            throw {
                status: "Error",
                message: err
            }
        }
    }

    async start() : Promise<string> {
        if (this.status !== "Active"){

            this.nextFunctionIndex = 0;
            this.internalStatus = internalStatus.Active;
            this.status = "Active";
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

                console.log(`about to run ${this[this.flow][this.nextFunctionIndex]}`)

                // @ts-ignore
                const res = await this[this[this.flow][this.nextFunctionIndex]]();

                let returnCycleStatus : cycleStatus = {
                    status: 'Success',
                    message: res.message
                }

                // @ts-ignore
                if (this[this.flowExtraData][this.nextFunctionIndex].length > 0) {
                    let extraData = {};
                    // @ts-ignore
                    this[this.flowExtraData][this.nextFunctionIndex].forEach(data => extraData = {...extraData, [data]: res.extraData[data]} )

                    returnCycleStatus.extraData = extraData;
                }

                this.nextFunctionIndex += 1;

                return returnCycleStatus;
            }
            // catches thrown error from nextFunction
            catch (err) {
                return err;
            }
        }
        else if (this.status === "Checked Out") {
            return {
                status: "Stopped",
                message: "Checked Out"
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

        return await this.tryCatchWrapper(async () => {
            const res : ipcResponse = await electron.ipcRenderer.invoke('AmazonGETMainLoginPage', this.allCookies, this.currentProxy);
            this.allCookies = res.allCookies;
            this.storage = res.storage;
            return;
        }, "Signing in (2)")
    }

    async POSTMainLoginPage() : Promise<cycleStatus> {
        // allCookies, allCookiesObject['session-id']

        return await this.tryCatchWrapper(async () => {
            this.storage.sessiondId = convertCookieArrayToObject(this.allCookies)['session-id'];

            const res = await electron.ipcRenderer.invoke('AmazonPOSTMainLoginPage', this.allCookies, this.storage.sessiondId, {
                appAction: this.storage.appAction,
                appActionToken: this.storage.appActionToken,
                prevRID: this.storage.prevRID,
                workflowState: this.storage.workflowState,
                email: this.config.account.username
            }, this.currentProxy);
            this.allCookies = res.allCookies;
        }, 'Signing in (3)')
    }

    async POSTSubLoginPage() : Promise<cycleStatus> {

        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('AmazonPOSTSubLoginPage', this.allCookies, this.storage.sessiondId, {
                appAction: this.storage.appAction,
                appActionToken: this.storage.appActionToken,
                prevRID: this.storage.prevRID,
                workflowState: this.storage.workflowState,
                email: this.config.account.username,
                password: this.config.account.password
            } , this.currentProxy, this.license, this.session);
    
            this.allCookies = res.allCookies;
        }, 'Getting product') 
    }

    /** SignIn Flow via IPC */

    async addToCart() : Promise<void> {
        // allCookies, product, proxy

        
        const product = 'https://www.amazon.com/Mkeke-Compatible-iPhone-11-Clear/dp/B07W4FMQ5Y/';


        const res = await electron.ipcRenderer.invoke('AmazonATC', this.allCookies, product, this.currentProxy);
        this.allCookies = res;
    }

    /** ATC Flow via IPC */

    async AmazonGETProduct() : Promise<cycleStatus> {
        // allCookies, allCookiesObject['session-id']

        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('AmazonGETProduct', this.allCookies, this.input, this.currentProxy);

            this.allCookies = res.allCookies;
            this.storage = {
                ...res.storage,
                sessionId: this.storage.sessionId,
            }

            return {
                extraData: {
                    productTitle: res.productTitle,
                    productImage: res.productImage
                }
            }
    
        }, 'Adding to cart');
    }

    async AmazonPOSTAddToCart() : Promise<cycleStatus> {
        // allCookies, allCookiesObject['session-id']

        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('AmazonPOSTAddToCart', this.allCookies, this.storage, this.currentProxy);
            // console.log('here 2')
    
            this.allCookies = res.allCookies;
    
            // dont think this actually returns anything...
            this.storage = {
                ...res.storage,
                sessionId: this.storage.sessionId,
            }
        }, 'Getting checkout screen')
    }

    /** ATC Flow via IPC */

    /** Checkout Flow via IPC */

    async GETCheckoutScreen() : Promise<cycleStatus> {
        // allCookies, proxy
        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('GETCheckoutScreen', this.allCookies, this.currentProxy);

            this.storage = res.storage;
    
            this.allCookies = res.allCookies;
        }, "Adding shipping")
    }

    async POSTAddShippingAddressFormHandler() : Promise<cycleStatus> {
        // allCookies, proxy
        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('POSTAddShippingAddressFormHandler', 
            this.allCookies, 
            this.profile.information,
            this.profile.shipping,
            this.storage,
            this.currentProxy
        );

        this.storage = res.storage;
        this.allCookies = res.allCookies;
        }, 'Selecting shipping')
    }

    async POSTSelectShippingAddress() : Promise<cycleStatus> {
        // allCookies, proxy
        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('POSTSelectShippingAddress', this.allCookies, this.storage, this.currentProxy);

            this.allCookies = res.allCookies;
        }, 'Adding payment (1)')
    }

    async GETAddPaymentPage() : Promise<cycleStatus> {
        // allCookies, proxy

        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('GETAddPaymentPage', this.allCookies, this.currentProxy);

            this.allCookies = res.allCookies;
            this.storage = {
                ...this.storage,
                ...res.storage
            }
        }, 'Adding payment (2)')
    }

    async POSTRegister() : Promise<cycleStatus> {
        // allCookies, proxy
        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('POSTRegister', this.allCookies, this.storage, this.currentProxy);

            this.allCookies = res.allCookies;
            this.storage = res.storage;
        }, 'Adding payment (3)')
    }

    async POSTAddPaymentMethod() : Promise<cycleStatus> {

        console.log(this.storage)
        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('POSTAddPaymentMethod', this.allCookies, this.storage, this.profile.payment, this.currentProxy);

            this.allCookies = res.allCookies;
            this.storage = {
                ...this.storage,
                ...res.storage
            }
        }, 'Selecting payment')
    }

    async POSTSelectPaymentMethod() : Promise<cycleStatus> {
        // allCookies, proxy

        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('POSTSelectPaymentMethod', this.allCookies, this.storage, this.currentProxy);

            this.allCookies = res.allCookies;
            this.storage = res.storage;
        }, 'Getting submit order screen')
    }

    async POSTAsyncContinueAfterSelection() : Promise<cycleStatus> {
        // allCookies, proxy

        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('POSTAsyncContinueAfterSelection', this.allCookies, this.storage, this.currentProxy);

            this.storage = res.storage;
        }, "Submitting order...")
    }

    async POSTSubmitOrder() : Promise<cycleStatus> {

        return await this.tryCatchWrapper(async () => {
            const response = await electron.ipcRenderer.invoke('POSTSubmitOrder', this.allCookies, this.storage, this.currentProxy);

            if (response !== "Success") {
                throw "Checkout Error"
            }

            this.status = "Checked Out"
        }, 'Checked Out')
    }

    async checkout() : Promise<void> {
        const res = await electron.ipcRenderer.invoke('AmazonCheckout', this.allCookies, this.currentProxy);
    }


    stop() : void {
        this.status = "Stopped"
        console.log('stopping !')
    }

    /** Checkout Flow via IPC */
}

export default AmazonTaskClass;