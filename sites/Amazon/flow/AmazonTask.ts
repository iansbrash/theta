import AmazonTaskConfig from "../../../interfaces/site_task_config/AmazonTaskConfig";
import Task from "../../../interfaces/Task";
import tsLogger from "../../../logger";
import Checkout from "./checkout/checkout";
import AddToCart from "./atc/atc";
import signIn from "./signin/signin";

const AmazonTask = async (task : Task, taskConfig : AmazonTaskConfig) => {

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
    const product = 'B07W4FMQ5Y';

    tsLogger('Starting')
    let allCookies = await signIn(taskConfig.account.username, taskConfig.account.password, proxy);

    allCookies = await AddToCart(allCookies, product, proxy);
    
    await Checkout(allCookies, proxy);
    tsLogger('Finished')
}