import Site from "../../../interfaces/enums/Site";
import Size from "../../../interfaces/enums/Size";
import ProfileObject from "../../../interfaces/ProfileObject";
import ProxyList from "../../../interfaces/ProxyList";
import TaskClass, { internalStatus } from "../../classes/TaskClass";
import AmazonTaskConfig from "../../../interfaces/site_task_config/AmazonTaskConfig";
import electron from 'electron';

class AmazonTaskClass extends TaskClass {

    config : AmazonTaskConfig;
    allCookies : string[];

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
        this.allCookies = res;
    }

    /** SignIn Flow via IPC */

    async GETMainLoginPage() : Promise<void> {
        // allCookies, proxy
        const res = await electron.ipcRenderer.invoke('AmazonGETMainLoginPage', this.allCookies, this.proxyList.proxies[0]);
        this.allCookies = res;
    }

    async POSTMainLoginPage() : Promise<void> {
        // allCookies, allCookiesObject['session-id']
        const res = await electron.ipcRenderer.invoke('AmazonPOSTMainLoginPage', this.allCookies, 'sessionId', 'props' , this.proxyList.proxies[0]);
        this.allCookies = res;
    }

    async POSTSubLoginPage() : Promise<void> {
        // allCookies, allCookiesObject['session-id']
        const res = await electron.ipcRenderer.invoke('AmazonPOSTSubLoginPage', this.allCookies, 'sessionId', 'props' , this.proxyList.proxies[0]);
        this.allCookies = res;
    }

    /** SignIn Flow via IPC */

    async addToCart() : Promise<void> {
        // allCookies, product, proxy
        const product = 'B07W4FMQ5Y';


        const res = await electron.ipcRenderer.invoke('AmazonATC', this.allCookies, product, this.proxyList.proxies[0]);
        this.allCookies = res;
    }

    async checkout() : Promise<void> {
        // allCookies, proxy
        const res = await electron.ipcRenderer.invoke('AmazonCheckout', this.allCookies, this.proxyList.proxies[0]);
        return res;
    }

    stop() : void {
        console.log('stopping !')
    }
}

export default AmazonTaskClass;