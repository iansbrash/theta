import electron from 'electron';
import timestampLogger from '../../../Logic/logger';
import { accumulateCookies, getValueByDelimiters, returnParsedCookies } from '../../../Logic/requestFunctions';
import WalmartATC from '../../../Logic/sites/Walmart/flow/atc/WalmartATC';
import WalmartGETProduct from '../../../Logic/sites/Walmart/flow/atc/WalmartGETProduct';
import WalmartContinueAsGuest from '../../../Logic/sites/Walmart/flow/checkout/initialize/WalmartContinueAsGuest';
import WalmartGETCheckout from '../../../Logic/sites/Walmart/flow/checkout/initialize/WalmartGETCheckout';
import WalmartPOSTCreditCard from '../../../Logic/sites/Walmart/flow/checkout/payment/WalmartPOSTCreditCard';
import WalmartAddShippingAddress from '../../../Logic/sites/Walmart/flow/checkout/shipping/WalmartAddShippingAddress';
import WalmartGETDeliveryOptions from '../../../Logic/sites/Walmart/flow/checkout/shipping/WalmartGETDeliveryOptions';
import WalmartPOSTFulfillment from '../../../Logic/sites/Walmart/flow/checkout/shipping/WalmartPOSTFulfillment';
import WalmartPOSTShippingAddress from '../../../Logic/sites/Walmart/flow/checkout/shipping/WalmartPOSTShippingAddress';
import WalmartPUTLocationResponse from '../../../Logic/sites/Walmart/flow/checkout/shipping/WalmartPUTLocationResponse';
import { voltageEncrypt } from '../../../Logic/sites/Walmart/logic/voltageEncrypt';

const atc = () => {
    electron.ipcMain.handle('WalmartGETProduct', async (event, ...args) => {
        // args:
        // allCookies, product, proxy
        let allCookies = args[0];
        const productUrl = args[1];
        const proxy = args[2];
 
    
        // res is cookies
        const GETProductResponse = await WalmartGETProduct(allCookies, productUrl, proxy);

        allCookies = accumulateCookies(allCookies, returnParsedCookies(GETProductResponse.headers['set-cookie']) )

        const productTitle = getValueByDelimiters(GETProductResponse.data, '<h1 class="prod-ProductTitle prod-productTitle-buyBox font-bold" content="', '" itemprop="name">')
        const offerId = getValueByDelimiters(GETProductResponse.data, '"offerId":"', '"');
        let stores : any = getValueByDelimiters(GETProductResponse.data, '"stores":[{', '}]')
        // console.log(stores)
        let storesObject : object[];
        try {
            storesObject = JSON.parse(`[{${stores}}]`)
        }
        catch (err) {
            console.error("Error parsing " + `[{${stores}}]`);
            return;
        }
        // console.log(storesObject);
        timestampLogger(`Found product: ${productTitle}`)
        timestampLogger(`Found offerId: ${offerId}`)
        timestampLogger(`Found ${storesObject.length} stores`)
        return {
            allCookies: allCookies,
            storage: {
                offerId,
                storesObject
            },
            // extraData
            productTitle: productTitle
        }
    })

    electron.ipcMain.handle('WalmartATC', async (event, ...args) => {
        // args:
        // allCookies, product, proxy
        let allCookies = args[0];
        const productUrl = args[1];
        const offerId = args[2];
        const storesObject = args[3];
        const proxy = args[4];
 
    
        // 400 = offerId is invalid
        const ATCResponse = await WalmartATC(allCookies, productUrl, offerId, storesObject.map((so : any) => so.storeId), proxy)


        allCookies = accumulateCookies(allCookies, returnParsedCookies(ATCResponse.headers['set-cookie']) )
        return {
            allCookies: allCookies,
        }
    })

    electron.ipcMain.handle('WalmartGETCheckout', async (event, ...args) => {
        // args:
        // allCookies, product, proxy
        let allCookies = args[0];
        const proxy = args[1];
 
    
        const GETCheckoutResponse = await WalmartGETCheckout(allCookies, proxy)

        let itemId = GETCheckoutResponse.data.items[0].id
        allCookies = accumulateCookies(allCookies, returnParsedCookies(GETCheckoutResponse.headers['set-cookie']))

        return {
            allCookies: allCookies,
            storage: {
                itemId
            }
        }
    })

    electron.ipcMain.handle('WalmartContinueAsGuest', async (event, ...args) => {
        // args:
        // allCookies, proxy
        let allCookies = args[0];
        const proxy = args[1];
 
    
        const ContinueAsGuestResponse = await WalmartContinueAsGuest(allCookies, proxy)

        allCookies = accumulateCookies(allCookies, returnParsedCookies(ContinueAsGuestResponse.headers['set-cookie']))



        let cagStoreList = ContinueAsGuestResponse.data.stores;
        let storeIds = cagStoreList[0] ? [cagStoreList[0].storeId] : [];
        for (let i = 1; i < cagStoreList.length; i++) {
            if (cagStoreList[i].types.length === 0 /**.includes("pick_up_location") */ ) {
                let l = storeIds.push(cagStoreList[i].storeId);
                if (l > 9) break;
            }
        }

        return {
            allCookies: allCookies,
            storage: {
                storeIds
            }
        }
    })

    electron.ipcMain.handle('WalmartGETDeliveryOptions', async (event, ...args) => {
        // args:
        // allCookies, product, proxy
        let allCookies = args[0];
        const storeIds = args[1];
        const proxy = args[2];
 
    
        const GETDeliveryOptionsResponse = await WalmartGETDeliveryOptions(allCookies, storeIds, proxy)

        allCookies = accumulateCookies(allCookies, returnParsedCookies(GETDeliveryOptionsResponse.headers['set-cookie']))


        // console.log(GETDeliveryOptionsResponse.data)


        timestampLogger("Selecting delivery method")

        let fulfillmentSelection = GETDeliveryOptionsResponse.data.items[0].fulfillmentSelection;

        

        return {
            allCookies: allCookies,
            storage: {
                fulfillmentSelection
            }
        }
    })

    electron.ipcMain.handle('WalmartPOSTFulfillment', async (event, ...args) => {
        // args:
        // allCookies, product, proxy
        let allCookies = args[0];
        const itemId = args[1];
        const fulfillmentSelection = args[2]
        const proxy = args[3];
 
    
        const SelectDeliveryMethodResponse = await WalmartPOSTFulfillment(allCookies, itemId, fulfillmentSelection.fulfillmentOption, fulfillmentSelection.shipMethod, proxy)

        allCookies = accumulateCookies(allCookies, returnParsedCookies(SelectDeliveryMethodResponse.headers['set-cookie']))

        

        return {
            allCookies: allCookies,
        }
    })

    electron.ipcMain.handle('WalmartAddShippingAddress', async (event, ...args) => {
        // args:
        // allCookies, product, proxy
        let allCookies = args[0];
        const shipping = args[1];
        const proxy = args[2];
 
    
        const AddShippingAddressReponse = await WalmartAddShippingAddress(allCookies, shipping, proxy)

        // console.log(AddShippingAddressReponse.data)

        // Aka Walmart prompts us to update address
        if (AddShippingAddressReponse.data.avsStatus === 'FAILURE') {

        }
        allCookies = accumulateCookies(allCookies, returnParsedCookies(AddShippingAddressReponse.headers['set-cookie']))

        

        return {
            allCookies: allCookies,
        }
    })

    electron.ipcMain.handle('WalmartPUTLocationResponse', async (event, ...args) => {
        // args:
        // allCookies, product, proxy
        let allCookies = args[0];
        const shipping = args[1];
        const proxy = args[2];
 
    
        const PUTLocationResponse = await WalmartPUTLocationResponse(allCookies, shipping, proxy)

        allCookies = accumulateCookies(allCookies, returnParsedCookies(PUTLocationResponse.headers['set-cookie']))
        // console.log(PUTLocationResponse.data)
    
    
        let storeObjArray = PUTLocationResponse.data.stores;
        let storeList = storeObjArray[0] ? [{
            id: storeObjArray[0].id,
            address: storeObjArray[0].address,
            storeType: {
                id: storeObjArray[0].storeType.id,
                name: storeObjArray[0].storeType.displayName,
                displayName: storeObjArray[0].displayName
            },
            customerInfo: {
                distance: storeObjArray[0].distance,
                "isPreferred": false,
                "isWithinRange": true
            }
        }] : [];
        for (let i = 1; i < storeObjArray.length; i++) {
            if (storeObjArray[i].types.includes("gsf_store")) {
                let l = storeList.push({
                    id: storeObjArray[i].id,
                    address: storeObjArray[i].address,
                    storeType: {
                        id: storeObjArray[i].storeType.id,
                        name: storeObjArray[i].storeType.displayName,
                        displayName: storeObjArray[i].displayName
                    },
                    customerInfo: {
                        distance: storeObjArray[i].distance,
                        "isPreferred": false,
                        "isWithinRange": true
                    }
                })
    
                if (l > 9) break;
            }
        }

        return {
            allCookies: allCookies,
            storage: {
                storeList
            }
        }
    })

    electron.ipcMain.handle('WalmartPOSTShippingAddress', async (event, ...args) => {
        // args:
        // allCookies, product, proxy
        let allCookies = args[0];
        const profile = args[1];
        const storeList = args[2];
        const proxy = args[3];
 
    
        const POSTShippingAddressResponse = await WalmartPOSTShippingAddress(allCookies, profile, storeList, proxy)

        allCookies = accumulateCookies(allCookies, returnParsedCookies(POSTShippingAddressResponse.headers['set-cookie']))

        

        return {
            allCookies: allCookies,
        }
    })

    electron.ipcMain.handle('WalmartPOSTCreditCard', async (event, ...args) => {
        // args:
        // allCookies, product, proxy
        let allCookies = args[0];
        const profile = args[1];
        const proxy = args[2];
 
       // make this an api call
        const voltageEncryptedData : string[][] = await voltageEncrypt(profile.payment.number, profile.payment.cvv)


        const POSTCreditCardResponse =  await WalmartPOSTCreditCard(allCookies, profile, voltageEncryptedData, proxy)

        allCookies = accumulateCookies(allCookies, returnParsedCookies(POSTCreditCardResponse.headers['set-cookie']))
        

        return {
            allCookies: allCookies,
            storage: {
                voltageEncryptedData
            }
        }
    })

    electron.ipcMain.handle('WalmartPOasdasdasdSTCreditCardasdasdasdasdasd', async (event, ...args) => {
        // args:
        // allCookies, product, proxy
        let allCookies = args[0];
        const profile = args[1];
        const proxy = args[2];
 
       // make this an api call
        const voltageEncryptedData : string[][] = await voltageEncrypt(profile.payment.number, profile.payment.cvv)


        const POSTCreditCardResponse =  await WalmartPOSTCreditCard(allCookies, profile, voltageEncryptedData, proxy)

        allCookies = accumulateCookies(allCookies, returnParsedCookies(POSTCreditCardResponse.headers['set-cookie']))
        

        return {
            allCookies: allCookies,
            storage: {
                voltageEncryptedData
            }
        }
    })
}

export default atc;