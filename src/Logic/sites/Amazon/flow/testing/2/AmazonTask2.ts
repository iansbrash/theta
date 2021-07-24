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
// @ts-ignore
import fs from 'fs';
import FAST_AsyncContinue2 from "../../FAST/checkout/FAST_AsyncContinue2";
import FAST_POSTSubmitOrder from "../../FAST/checkout/FAST_POSTSubmitOrder";
import timestampLogger from "../../../../../logger";

const printProxy = (proxy : Proxy) => {
    return Object.values(proxy).join(':');
}

export const replaceAll = (str : string, find : string, replace : string) => {
    return str.replace(new RegExp(find, 'g'), replace);
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

    // console.log(FAST_GETCheckoutScreenResponse.data)
    let addressBookId = getValueByDelimiters(FAST_GETCheckoutScreenResponse.data, '<input type="hidden" name="addressBookId" value="', '"');
    let purchaseId = getValueByDelimiters(FAST_GETCheckoutScreenResponse.data, '<input type="hidden" name="purchaseId" value="', '"')
    let firstAddressID = getValueByDelimiters(FAST_GETCheckoutScreenResponse.data, 'action=select-shipping&amp;addressID=', '&amp;')

    let FAST_AsyncContinue1Response =  await FAST_AsyncContinue1(allCookies, {addressBookId, purchaseId, addressID: firstAddressID}, proxy)
    
    // let FAST_AsyncContinue1ResponseJSONData = JSON.stringify(FAST_AsyncContinue1Response.data);

    

    let async2Data = FAST_AsyncContinue1Response.data.panels[4].content;
    let ppwWidgetState = getValueByDelimiters(async2Data, 'name="ppw-widgetState" value="', '"')
    const SelectPaymentHTML = async2Data

    const ppw_instrumentRowSelection = getValueByDelimiters(SelectPaymentHTML, '" type="radio" name="ppw-instrumentRowSelection" value="', '">');
    const _rewardsAccountSelection_customAmountValue = getValueByDelimiters(SelectPaymentHTML, '_rewardsAccountSelection_rewardsApplied" value="', '"');
    const _rewardsAccountSelection_maxAmountValueHiddenInput = getValueByDelimiters(SelectPaymentHTML, '_rewardsAccountSelection_maxAmountValueHiddenInput" value="', '"');
    const _rewardsAccountSelection_currencyUnitHiddenInput = getValueByDelimiters(SelectPaymentHTML, '_rewardsAccountSelection_currencyUnitHiddenInput" value="', '"');
    const _rewardsAccountSelection_instrumentIdHiddenInput = getValueByDelimiters(SelectPaymentHTML, '_rewardsAccountSelection_instrumentIdHiddenInput" value="', '"');
    const _rewardsAccountSelection_parentInstrumentIdHiddenInput = getValueByDelimiters(SelectPaymentHTML, '_rewardsAccountSelection_parentInstrumentIdHiddenInput" value="', '"');
    const _rewardsAccountSelection_currencyToPointsConversionRatioHiddenInput = getValueByDelimiters(SelectPaymentHTML, '_rewardsAccountSelection_currencyToPointsConversionRatioHiddenInput" value="', '"');
    const _childRewardsAccountInstrumentId = getValueByDelimiters(SelectPaymentHTML, '_childRewardsAccountInstrumentId" value="', '"');

    const superDynamicParams = {
        'ppw-widgetState': ppwWidgetState,
        'ppw-instrumentRowSelection': replaceAll( ppw_instrumentRowSelection, '&amp;', '&' ),
        [`ppw-${_rewardsAccountSelection_instrumentIdHiddenInput}_rewardsAccountSelection_customAmountValue`]: _rewardsAccountSelection_customAmountValue,
        [`ppw-${_rewardsAccountSelection_instrumentIdHiddenInput}_rewardsAccountSelection_instrumentIdHiddenInput`]: _rewardsAccountSelection_instrumentIdHiddenInput,
        [`ppw-${_rewardsAccountSelection_instrumentIdHiddenInput}_rewardsAccountSelection_maxAmountValueHiddenInput`]: _rewardsAccountSelection_maxAmountValueHiddenInput,
        [`ppw-${_rewardsAccountSelection_instrumentIdHiddenInput}_rewardsAccountSelection_currencyUnitHiddenInput`]: _rewardsAccountSelection_currencyUnitHiddenInput,
        [`ppw-${_rewardsAccountSelection_instrumentIdHiddenInput}_rewardsAccountSelection_parentInstrumentIdHiddenInput`]: _rewardsAccountSelection_parentInstrumentIdHiddenInput,
        [`ppw-${_rewardsAccountSelection_instrumentIdHiddenInput}_rewardsAccountSelection_currencyToPointsConversionRatioHiddenInput`]: _rewardsAccountSelection_currencyToPointsConversionRatioHiddenInput,
        [`ppw-${_rewardsAccountSelection_instrumentIdHiddenInput}_childRewardsAccountInstrumentId`]: _childRewardsAccountInstrumentId,
    }

    // console.log(superDynamicParams)

    // await fs.promises.writeFile(`output.txt`, FAST_AsyncContinue1Response.data.panels[4].content) //FAST_AsyncContinue1Response.data.panels[4].content);

    let FAST_AsyncContinue2Response = await FAST_AsyncContinue2(allCookies, superDynamicParams, proxy)
    // await fs.promises.writeFile(`output.txt`, JSON.stringify(FAST_AsyncContinue2Response.data)) //FAST_AsyncContinue1Response.data.panels[4].content);
    // for (let i = 0; i < Object.keys(FAST_AsyncContinue2Response.data.panels).length; i++) {
    //     await fs.promises.writeFile(`output${i}.txt`, FAST_AsyncContinue2Response.data.panels[i].content) //FAST_AsyncContinue1Response.data.panels[4].content);
    // }

    let submitOrderConfig = {
        purchaseLevelMessageIds: 'saveDefaults', // 
        submitFromSPC: 1, // 
        fasttrackExpiration: 9901, // 
        countdownThreshold: 86400, //
        showSimplifiedCountdown: 0, // 
        countdownId: 'countdownId-0', // 
        // 'quantity.A04634882G8NGPCPA374K:': 1, // <span class="a-dropdown-container"><label for="quantity.
        'gift-message-text': '',
        dupOrderCheckArgs: 'B07W4FMQ5Y|1|mhnntomnsqkq|A36MCMZ9LZTDGA', // 
        order0: 'next-1dc',
        'shippingofferingid0.0': 'A181EEEPOJBEKQ',
        'guaranteetype0.0': 'GUARANTEED',
        'issss0.0': 0,
        'shipsplitpriority0.0': 'shipWhenever',
        'isShipWhenCompleteValid0.0': 0,
        'isShipWheneverValid0.0': 1,
        'shippingofferingid0.1': 'A2SO0K7H8Q0UM',
        'guaranteetype0.1': 'GUARANTEED',
        'issss0.1': 0,
        'shipsplitpriority0.1': 'shipWhenComplete',
        'isShipWhenCompleteValid0.1': 1,
        'isShipWheneverValid0.1': 0,
        previousshippingofferingid0: 'A181EEEPOJBEKQ',
        previousguaranteetype0: 'GUARANTEED',
        previousissss0: 0,
        previousshippriority0: 'shipWhenever',
        lineitemids0: 'A04634882G8NGPCPA374K:',
        currentshippingspeed: 'next-1dc',
        previousShippingSpeed0: 'next-1dc',
        currentshipsplitpreference: 'shipWhenever',
        'shippriority.0.shipWhenever': 'shipWhenever',
        groupcount: 1,
        shiptrialprefix: '2ZHE1NPXV6MZEPBXGR8B',
        csrfToken: 'gJebkTiuCfVHMN28GjAtsUlcUaQTQmBqs/GCbDEAAAAMAAAAAGD7d6RyYXcAAAAA',
        fromAnywhere: 0,
        redirectOnSuccess: 0,
        purchaseTotal: 10.96,
        purchaseTotalCurrency: 'USD',
        purchaseID: '106-1422983-8554639',
        purchaseCustomerId: 'A25HA1HE1RD42U',
        useCtb: 1,
        scopeId: '2ZHE1NPXV6MZEPBXGR8B',
        isQuantityInvariant: '',
        'promiseTime-0': 1627196400,
        'promiseAsin-0': 'B07W4FMQ5Y',
        selectedPaymentPaystationId: 'amzn1.pm.wallet.MGhfUFVfQ1VTXzhhNmJmMmI5LThmZTktNGRlMi04MTJiLTE1ZWU2OGM4OGM5NQ.QTI1SEExSEUxUkQ0MlU',
        hasWorkingJavascript: 1,
        placeYourOrder1: 1,
        isfirsttimecustomer: 0,
        isTFXEligible: '',
        isFxEnabled: '',
        isFXTncShown: '',
    }

    let newData = {

    }

    let panelData = FAST_AsyncContinue2Response.data.panels[7].content

    // @ts-ignore
    Object.keys(submitOrderConfig).forEach(k => newData[k] = getValueByDelimiters(panelData, `name="${k}" value="`, '"'))
    
    let dynamicShit = getValueByDelimiters(panelData, '<span class="a-dropdown-container"><label for="quantity.', '"');
    // @ts-ignore
    newData['quantity.' + dynamicShit] = 1;
    console.log(submitOrderConfig);

    // @ts-ignore
    const POSTSubmitOrderResponse = await FAST_POSTSubmitOrder(allCookies, newData, proxy)

    if (POSTSubmitOrderResponse.headers['x-amz-checkout-page-type'] === 'CheckoutThankYou') {
        timestampLogger("Successfully checked out the product")
        return "Success"
    }
    else if (POSTSubmitOrderResponse.headers['x-amz-checkout-page-type'] === 'CheckoutError') {
        console.log('CheckoutError AMZ Page')

        return "Error"
    }
    else if (POSTSubmitOrderResponse.data.indexOf('An error occurred when we tried to process your request.') !== -1 ){
        console.log('An error occurred when we tried to process your request.')
        return "Error"
    }
    else {
        console.log('some OTHER ERROR')
        return "Error"
    }

}

export default AmazonTask;