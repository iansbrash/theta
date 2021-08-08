import Site from "../../../interfaces/enums/Site";
import Size from "../../../interfaces/enums/Size";
import ProfileObject from "../../../interfaces/ProfileObject";
import ProxyList, { Proxy } from "../../../interfaces/ProxyList";
import TaskClass, { cycleStatus, Storage } from "../../classes/TaskClass";
import WalmartTaskConfig, { WalmartModes } from "../../../interfaces/site_task_config/WalmartTaskConfig";
import electron from 'electron';
import { convertCookieArrayToObject } from "../../../requestFunctions";

interface ipcResponse {
    allCookies: string[],
    storage: Storage
}


class WalmartTaskClass extends TaskClass {

    config : WalmartTaskConfig;
    flow : "normalFlow"
    flowExtraData : "normalFlowExtraData"
    currentProxy : Proxy;
    nextFunctionIndex : number = 0;

    normalFlow : string[] = [
        'WalmartGETProduct',
        'WalmartATC',
        'WalmartGETCheckout',
        'WalmartContinueAsGuest',
        'WalmartGETDeliveryOptions',
        'WalmartPOSTFulfillment',
        'WalmartAddShippingAddress',
        'WalmartPUTLocationResponse',
        'WalmartPOSTShippingAddress',
        'WalmartPOSTCreditCard',
        'WalmartPOSTPayment',
        'WalmartSubmitOrder',
    ]

    normalFlowExtraData : string[][] = [
        ['productTitle'],
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
        []
    ]

    async start() {
        if (this.status !== "Active"){
            this.resetTask();
            return {
                status: "Ready", message: "Getting product"
            };
        }
        else {
            throw "Task is not idle"
        }
    }

    constructor (
        identifier : number, 
        site : Site, 
        profile : ProfileObject, 
        size : Size[], 
        proxyList : ProxyList, 
        input : string, 
        config : WalmartTaskConfig,
        monitor : number,
        error : number
    ) {

        super(identifier, site, profile, size, proxyList, input, monitor, error);
        this.config = config;
        this.allCookies = [];

        // Not great but passable solution
        this.currentProxy = this.proxyList.proxies[this.identifier % this.proxyList.proxies.length]

        
        if (config.mode === WalmartModes.Normal) {
            this.flow = "normalFlow";
            this.flowExtraData = "normalFlowExtraData"
        }
        else {
            throw "Flow does not exist"
        }
    }

    async TestWalmartFlow() : Promise<void> {
        await electron.ipcRenderer.invoke("WalmartTestFlow");
    }

    async WalmartGETProduct() : Promise<cycleStatus> {
        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('WalmartGETProduct', this.allCookies, this.input, this.currentProxy);
            this.allCookies = res.allCookies;
            this.storage = res.storage;

            return {
                extraData: {
                    productTitle: res.productTitle,
                    productImage: res.productImage
                }
            }

        }, "Adding to cart")
    }

    async WalmartATC() : Promise<cycleStatus> {
        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('WalmartATC', this.allCookies, this.input, this.storage.offerId, this.storage.storesObject, this.currentProxy);
            this.allCookies = res.allCookies;

        }, "Getting checkout screen")
    }

    async WalmartGETCheckout() : Promise<cycleStatus> {
        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('WalmartGETCheckout', this.allCookies, this.currentProxy);
            this.allCookies = res.allCookies;
            this.storage = {
                ...this.storage,
                ...res.storage
            }

        }, "Guest login")
    }

    async WalmartContinueAsGuest() : Promise<cycleStatus> {
        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('WalmartContinueAsGuest', this.allCookies, this.currentProxy);
            this.allCookies = res.allCookies;
            this.storage = {
                ...this.storage,
                ...res.storage
            }

        }, "Getting delivery options")
    }

    async WalmartGETDeliveryOptions() : Promise<cycleStatus> {
        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('WalmartGETDeliveryOptions', this.allCookies, this.storage.storeIds, this.currentProxy);
            this.allCookies = res.allCookies;
            this.storage = {
                ...this.storage,
                ...res.storage
            }

        }, "POST Fulfillment")
    }

    async WalmartPOSTFulfillment() : Promise<cycleStatus> {
        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('WalmartPOSTFulfillment', this.allCookies, this.storage.itemId, this.storage.fulfillmentSelection, this.currentProxy);
            this.allCookies = res.allCookies;

        }, "AddShippingAddress (1)")
    }

    async WalmartAddShippingAddress() : Promise<cycleStatus> {
        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('WalmartAddShippingAddress', this.allCookies, this.profile.shipping, this.currentProxy);
            this.allCookies = res.allCookies;

        }, "AddShippingAddress (2)")
    }

    async WalmartPUTLocationResponse() : Promise<cycleStatus> {
        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('WalmartPUTLocationResponse', this.allCookies, this.profile.shipping, this.currentProxy);
            this.allCookies = res.allCookies;
            this.storage = res.storage

        }, "AddShippingAddress (3)")
    }

    async WalmartPOSTCreditCard() : Promise<cycleStatus> {
        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('WalmartPOSTCreditCard', this.allCookies, this.profile, this.currentProxy);
            this.allCookies = res.allCookies;
            this.storage = res.storage

        }, "Adding payment(2)")
    }

    async WalmartPOSTShippingAddress() : Promise<cycleStatus> {
        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('WalmartPOSTShippingAddress', this.allCookies, this.profile, this.storage.storeList, this.currentProxy);
            this.allCookies = res.allCookies;

        }, "Adding payment (1)")
    }

    async WalmartPOSTPayment() : Promise<cycleStatus> {
        return await this.tryCatchWrapper(async () => {
            const res = await electron.ipcRenderer.invoke('WalmartPOSTPayment', this.allCookies, this.profile, this.storage.voltageEncryptedData, this.storage.POSTCreditCardResponseData, this.currentProxy);
            this.allCookies = res.allCookies;

        }, "Submitting order")
    }

    async WalmartSubmitOrder() : Promise<cycleStatus> {
        return await this.tryCatchWrapper(async () => {
            const response = await electron.ipcRenderer.invoke('WalmartSubmitOrder', this.allCookies, this.storage.POSTCreditCardResponseData, this.storage.voltageEncryptedData, this.currentProxy);
            if (response.isError) throw response;
            else {
                this.status = "Checked Out"
            }

        }, "Checked Out")
    }


    async sendLocalDiscordSuccess() : Promise<void> {
        return;
    }
    async getPublicDiscordSuccessHeaders() : Promise<{
        license: string,
        session: string,
        [key : string]: string | number
    }> {
        return {
            license: '1', session: '1'
        }
    } 


    /** Checkout Flow via IPC */
}

export default WalmartTaskClass;