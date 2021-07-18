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
        ['productTitle', 'productThumbnail'],
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
        config : AmazonTaskConfig
    ) {

        super(identifier, site, profile, size, proxyList, input);
        this.config = config;
        this.allCookies = [];
    }

    async tryCatchWrapper(fn : (() => Promise<any>), successMessage : string) : Promise<cycleStatus> {
        try {
            
            const res = await fn();

            let returnCycleStatus : cycleStatus = {
                status: "Success",
                message: successMessage
            }
            console.log('here 1')
            if (res === null || res === undefined) {}
            else if (res.extraData) {
                // let extraData = {};
                // Object.keys(res.extraData).forEach((data : string) => 
                //     extraData = {...extraData, [data]: extraData[data]}
                // )
                returnCycleStatus.extraData = res.extraData;
            }
            console.log(`returnCycleStatus in tryatch`)
            console.log(returnCycleStatus)

            return returnCycleStatus
        }
        catch (err) {
            throw {
                status: "Error",
                message: err
            }
        }
    }

    async test() : Promise<string> {
        const res = await electron.ipcRenderer.invoke('IPCTest', 'arg1', 'arg2');

        return res;

    }

    // deprecated ?
    async start() : Promise<string> {
        if (this.status !== "Active"){

            // this.nextFunction = this.GETMainLoginPage;
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

        console.log('in ACtive')

        if (this.status === "Active") {
            try {

                console.log(`about to run ${this.normalFlow[this.nextFunctionIndex]}`)
                // @ts-ignore
                const res = await this[this.normalFlow[this.nextFunctionIndex]]();
                console.log('here 3')

                let returnCycleStatus : cycleStatus = {
                    status: 'Success',
                    message: res.message
                }

                if (this['normalFlowExtraData'][this.nextFunctionIndex].length > 0) {
                    let extraData = {};
                    // @ts-ignore
                    this['normalFlowExtraData'][this.nextFunctionIndex].forEach(data => extraData = {...extraData, [data]: res.extraData[data]} )

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
            const res : ipcResponse = await electron.ipcRenderer.invoke('AmazonGETMainLoginPage', this.allCookies, this.proxyList.proxies[0]);
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
            }, this.proxyList.proxies[0]);
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
            } , this.proxyList.proxies[0], this.license, this.session);
    
            this.allCookies = res.allCookies;
        }, 'Getting product') 
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

    async AmazonGETProduct() : Promise<cycleStatus> {
        // allCookies, allCookiesObject['session-id']

        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('AmazonGETProduct', this.allCookies, this.input, this.proxyList.proxies[0]);

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
    
            // return res.productTitle;
        }, 'Adding to cart');
    }

    async AmazonPOSTAddToCart() : Promise<cycleStatus> {
        // allCookies, allCookiesObject['session-id']

        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('AmazonPOSTAddToCart', this.allCookies, this.storage, this.proxyList.proxies[0]);
            // console.log('here 2')
    
            this.allCookies = res.allCookies;
    
            // dont think this actually returns anything...
            this.storage = {
                ...res.storage,
                sessionId: this.storage.sessionId,
            }
        }, 'Getting checkout screen')
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

    async GETCheckoutScreen() : Promise<cycleStatus> {
        // allCookies, proxy
        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('GETCheckoutScreen', this.allCookies, this.proxyList.proxies[0]);

            this.storage = res.storage;
    
            this.allCookies = res.allCookies;
        }, "Adding shipping")
        const res = await electron.ipcRenderer.invoke('GETCheckoutScreen', this.allCookies, this.proxyList.proxies[0]);

        this.storage = res.storage;

        this.allCookies = res.allCookies;
    }

    async POSTAddShippingAddressFormHandler() : Promise<cycleStatus> {
        // allCookies, proxy
        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('POSTAddShippingAddressFormHandler', 
            this.allCookies, 
            this.profile.information,
            this.profile.shipping,
            this.storage,
            this.proxyList.proxies[0]
        );

        this.storage = res.storage;
        this.allCookies = res.allCookies;
        }, 'Selecting shipping')
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

    async POSTSelectShippingAddress() : Promise<cycleStatus> {
        // allCookies, proxy
        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('POSTSelectShippingAddress', this.allCookies, this.storage, this.proxyList.proxies[0]);

            this.allCookies = res.allCookies;
        }, 'Adding payment (1)')

        const res = await electron.ipcRenderer.invoke('POSTSelectShippingAddress', this.allCookies, this.storage, this.proxyList.proxies[0]);

        this.allCookies = res.allCookies;
    }

    async GETAddPaymentPage() : Promise<cycleStatus> {
        // allCookies, proxy

        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('GETAddPaymentPage', this.allCookies, this.proxyList.proxies[0]);

            this.allCookies = res.allCookies;
            this.storage = {
                ...this.storage,
                ...res.storage
            }
        }, 'Adding payment (2)')
        const res = await electron.ipcRenderer.invoke('GETAddPaymentPage', this.allCookies, this.proxyList.proxies[0]);

        this.allCookies = res.allCookies;
        this.storage = {
            ...this.storage,
            ...res.storage
        }
    }

    async POSTRegister() : Promise<cycleStatus> {
        // allCookies, proxy
        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('POSTRegister', this.allCookies, this.storage, this.proxyList.proxies[0]);

            this.allCookies = res.allCookies;
            this.storage = res.storage;
        }, 'Adding payment (3)')
        const res = await electron.ipcRenderer.invoke('POSTRegister', this.allCookies, this.storage, this.proxyList.proxies[0]);

        this.allCookies = res.allCookies;
        this.storage = res.storage;
    }

    async POSTAddPaymentMethod() : Promise<cycleStatus> {

        console.log(this.storage)
        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('POSTAddPaymentMethod', this.allCookies, this.storage, this.profile.payment, this.proxyList.proxies[0]);

            this.allCookies = res.allCookies;
            this.storage = {
                ...this.storage,
                ...res.storage
            }
        }, 'Selecting payment')

        // allCookies, proxy
        const res = await electron.ipcRenderer.invoke('POSTAddPaymentMethod', this.allCookies, this.storage, this.profile.payment, this.proxyList.proxies[0]);

        this.allCookies = res.allCookies;
        this.storage = {
            ...this.storage,
            ...res.storage
        }
    }

    async POSTSelectPaymentMethod() : Promise<cycleStatus> {
        // allCookies, proxy

        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('POSTSelectPaymentMethod', this.allCookies, this.storage, this.proxyList.proxies[0]);

            this.allCookies = res.allCookies;
            this.storage = res.storage;
        }, 'Getting submit order screen')
        const res = await electron.ipcRenderer.invoke('POSTSelectPaymentMethod', this.allCookies, this.storage, this.proxyList.proxies[0]);

        this.allCookies = res.allCookies;
        this.storage = res.storage;
    }

    async POSTAsyncContinueAfterSelection() : Promise<cycleStatus> {
        // allCookies, proxy

        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('POSTAsyncContinueAfterSelection', this.allCookies, this.storage, this.proxyList.proxies[0]);

            this.storage = res.storage;
        }, "Submitting order...")
    }

    async POSTSubmitOrder() : Promise<cycleStatus> {

        return await this.tryCatchWrapper(async () => {
            const response = await electron.ipcRenderer.invoke('POSTSubmitOrder', this.allCookies, this.storage, this.proxyList.proxies[0]);

            if (response !== "Success") {
                throw "Checkout Error"
            }

            this.status = "Checked Out"
        }, 'Checked Out')
    }

    async checkout() : Promise<void> {
        const res = await electron.ipcRenderer.invoke('AmazonCheckout', this.allCookies, this.proxyList.proxies[0]);



        // this.allCookies = res.allCookies;
        // this.storage = res.storage;
    }


    stop() : void {
        this.status = "Stopped"
        console.log('stopping !')
    }

    /** Checkout Flow via IPC */
}

export default AmazonTaskClass;