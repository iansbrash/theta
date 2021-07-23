import AmazonTaskConfig from "../../../../../interfaces/site_task_config/AmazonTaskConfig";
import Task from "../../../../../interfaces/Task";
import tsLogger from "../../../../../logger";
// @ts-ignore
import Checkout from "../../checkout/checkout";
import AddToCart from "../../atc/atc";
import signIn from "../../signin/signin";
import Site from "../../../../../interfaces/enums/Site";
import { Proxy } from "../../../../../interfaces/ProxyList";
import FAST_AsyncContinue1 from "../../FAST/checkout/FAST_AsyncContinue1";
import FAST_GETCheckoutScreen from "../../FAST/checkout/FAST_GETCheckoutScreen";
import { 
    accumulateCookies,
    returnParsedCookies,
    getValueByDelimiters
} from '../../../../../requestFunctions'
import fs from 'fs';

const printProxy = (proxy : Proxy) => {
    return Object.values(proxy).join(':');
}

const AmazonTask = async (task : Task, taskConfig : AmazonTaskConfig, statusWatcher : (s : string) => void) => {

    // look into axios 'cancel tokens'
    // const CancelToken = axios.CancelToken;
    const {
        identifier,
        site,
        profile,
        size,
        proxyList
    } = task

    const proxies = proxyList.proxies;
    const proxy = proxies[identifier % proxies.length];
    const product = 'https://www.amazon.com/Mkeke-Compatible-iPhone-11-Clear/dp/B07W4FMQ5Y/';

    // let proxy : Proxy = {
    //     ip: '67.177.182.32',
    //     port: 3000,
    //     username: '',
    //     password: ''
    // }

    tsLogger(`Starting task ${identifier} on ${Site[site]} using proxy ${printProxy(proxy)} on profile ${profile.information.name} for size ${size} with account ${taskConfig.account.username} using ${taskConfig.mode} mode`)
    statusWatcher('Signing in...')
    let allCookies = await signIn(taskConfig.account.username, taskConfig.account.password, proxy);
    
    statusWatcher('Adding to cart...')
    allCookies = await AddToCart(allCookies, product, proxy);

    // return;
    
    statusWatcher('Checking out...')
    const FAST_GETCheckoutScreenResponse = await FAST_GETCheckoutScreen(allCookies, proxy);

    allCookies = accumulateCookies(
        allCookies,
        returnParsedCookies(FAST_GETCheckoutScreenResponse.headers['set-cookie'])
    )

    console.log(FAST_GETCheckoutScreenResponse.data)
    let addressBookId = getValueByDelimiters(FAST_GETCheckoutScreenResponse.data, '<input type="hidden" name="addressBookId" value="', '"');
    let purchaseId = getValueByDelimiters(FAST_GETCheckoutScreenResponse.data, '<input type="hidden" name="purchaseId" value="', '"')
    let firstAddressID = getValueByDelimiters(FAST_GETCheckoutScreenResponse.data, 'action=select-shipping&amp;addressID=', '&amp;')

    let res =  await FAST_AsyncContinue1(allCookies, {addressBookId, purchaseId, addressID: firstAddressID}, proxy)
    await fs.promises.writeFile('output.txt', JSON.stringify(res.data)); //.panels.map((panel : object) => JSON.stringify(panel)).join(' ')
}

export default AmazonTask;