import {
    returnParsedCookies, // @ts-ignore
    convertCookieArrayToObject, // @ts-ignore
    joinCookies,
    accumulateCookies,
    getValueByDelimiters
} from '../../../requestFunctions'
import timestampLogger from '../../../logger';
import { voltageEncrypt } from '../logic/voltageEncrypt';
// import testProfile from '../../../sensitive/testInterfaces/testProfile';
import WalmartGETProduct from './atc/WalmartGETProduct';
import testProxyList from '../../../sensitive/testInterfaces/testProxyList';
import WalmartATC from './atc/WalmartATC';
import WalmartGETCheckout from './checkout/initialize/WalmartGETCheckout';
import WalmartContinueAsGuest from './checkout/initialize/WalmartContinueAsGuest';
import WalmartGETDeliveryOptions from './checkout/shipping/WalmartGETDeliveryOptions';
import WalmartPOSTFulfillment from './checkout/shipping/WalmartPOSTFulfillment';
import testProfile from '../../../sensitive/testInterfaces/testProfile';
import WalmartAddShippingAddress from './checkout/shipping/WalmartAddShippingAddress';
import WalmartPUTLocationResponse from './checkout/shipping/WalmartPUTLocationResponse';
import WalmartPOSTShippingAddress from './checkout/shipping/WalmartPOSTShippingAddress';

// @ts-ignore
import WalmartPOSTCreditCard from './checkout/payment/WalmartPOSTCreditCard';
import WalmartPOSTPayment from './checkout/payment/WalmartPOSTPayment';
import WalmartSubmitOrder from './checkout/payment/WalmartSubmitOrder';

const flow = async () => {
    let productUrl = 'https://www.walmart.com/ip/Starbucks-Dark-Roast-Whole-Bean-Coffee-Sumatra-100-Arabica-1-bag-12-oz/20709874'
    let allCookies : string[] = [];
    let proxy = testProxyList.proxies[0]

    timestampLogger("Getting the product")
    let GETProductResponse = await WalmartGETProduct(allCookies, productUrl, proxy)

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


    timestampLogger("Adding to cart")

    // 400 = offerId is invalid
    const ATCResponse = await WalmartATC(allCookies, productUrl, offerId, storesObject.map((so : any) => so.storeId), proxy)

    // console.log(JSON.stringify(ATCResponse.data))

    allCookies = accumulateCookies(allCookies, returnParsedCookies(ATCResponse.headers['set-cookie']) )

    timestampLogger("Getting Checkout")
    const GETCheckoutResponse = await WalmartGETCheckout(allCookies, proxy)

    let itemId = GETCheckoutResponse.data.items[0].id
    // https://www.walmart.com/px/PXu6b0qd2S/captcha/captcha.js?a=c&m=0&u=79b804b0-ef05-11eb-87c9-37b2ea7c0201__79b804b0-ef05-11eb-87c9-37b2ea7c0201&v=&g=b

    allCookies = accumulateCookies(allCookies, returnParsedCookies(GETCheckoutResponse.headers['set-cookie']))
    timestampLogger("Continuing as guest")

 

    const ContinueAsGuestResponse = await WalmartContinueAsGuest(allCookies, proxy)
    // console.log(JSON.stringify(ContinueAsGuestResponse.data))

    allCookies = accumulateCookies(allCookies, returnParsedCookies(ContinueAsGuestResponse.headers['set-cookie']))



    let cagStoreList = ContinueAsGuestResponse.data.stores;
    let storeIds = cagStoreList[0] ? [cagStoreList[0].storeId] : [];
    for (let i = 1; i < cagStoreList.length; i++) {
        if (cagStoreList[i].types.length === 0 /**.includes("pick_up_location") */ ) {
            let l = storeIds.push(cagStoreList[i].storeId);

            if (l > 9) break;
        }
    }


    timestampLogger("Getting delivery options")
    const GETDeliveryOptionsResponse = await WalmartGETDeliveryOptions(allCookies, storeIds, proxy)

    allCookies = accumulateCookies(allCookies, returnParsedCookies(GETDeliveryOptionsResponse.headers['set-cookie']))


    // console.log(GETDeliveryOptionsResponse.data)


    timestampLogger("Selecting delivery method")

    let fulfillmentSelection = GETDeliveryOptionsResponse.data.items[0].fulfillmentSelection;

    const SelectDeliveryMethodResponse = await WalmartPOSTFulfillment(allCookies, itemId, fulfillmentSelection.fulfillmentOption, fulfillmentSelection.shipMethod, proxy)

    allCookies = accumulateCookies(allCookies, returnParsedCookies(SelectDeliveryMethodResponse.headers['set-cookie']))

    // console.log(SelectDeliveryMethodResponse)
    
    // We need to somehow standardize profiles because this is fucked up
    timestampLogger("Adding shipping address (1)")
    const AddShippingAddressReponse = await WalmartAddShippingAddress(allCookies, testProfile.shipping, proxy)

    // console.log(AddShippingAddressReponse.data)

    // Aka Walmart prompts us to update address
    if (AddShippingAddressReponse.data.avsStatus === 'FAILURE') {

    }
    allCookies = accumulateCookies(allCookies, returnParsedCookies(AddShippingAddressReponse.headers['set-cookie']))


    // add location
    
    timestampLogger("Adding shipping address (2)")
    const PUTLocationResponse = await WalmartPUTLocationResponse(allCookies, testProfile.shipping, proxy)

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

    
    timestampLogger("Adding shipping address (3)")

    const POSTShippingAddressResponse = await WalmartPOSTShippingAddress(allCookies, testProfile, storeList, proxy)

    allCookies = accumulateCookies(allCookies, returnParsedCookies(POSTShippingAddressResponse.headers['set-cookie']))


    timestampLogger("Encrypting payment")


    // make this an api call
    const voltageEncryptedData : string[][] = await voltageEncrypt(testProfile.payment.number, testProfile.payment.cvv)




    timestampLogger("Adding payment (1)")
    const POSTCreditCardResponse =  await WalmartPOSTCreditCard(allCookies, testProfile, voltageEncryptedData, proxy)


    allCookies = accumulateCookies(allCookies, returnParsedCookies(POSTCreditCardResponse.headers['set-cookie']))
      
    timestampLogger("Adding payment (2)")
      const POSTPaymentResponse = await WalmartPOSTPayment(allCookies, testProfile, voltageEncryptedData, POSTCreditCardResponse.data, proxy)


    allCookies = accumulateCookies(allCookies, returnParsedCookies(POSTPaymentResponse.headers['set-cookie']))
    
    // console.log(POSTPaymentResponse)
    // return;
    timestampLogger("Submitting order")

    var SubmitOrderData : any = {
        "cvvInSession": true,
        "voltagePayments": [
          {
            "paymentType": POSTCreditCardResponse.data.paymentType,
            "encryptedCvv": voltageEncryptedData[1][1],
            "encryptedPan": voltageEncryptedData[1][0],
            "integrityCheck": voltageEncryptedData[1][2],
            "keyId": voltageEncryptedData[1][3],
            "phase": "0"
          }
        ]
      };
    //   console.log(SubmitOrderData)

      SubmitOrderData = JSON.stringify(SubmitOrderData)
      

    // 400 is error submitting order (could be bad CVV or Expiration Date)
      // @ts-ignore
    try {
        const SubmitOrderResponse = await WalmartSubmitOrder(allCookies, POSTCreditCardResponse.data.paymentType, voltageEncryptedData, proxy)
        console.log(SubmitOrderResponse)
    }
    catch (err) {
        let errData = err.response.data;

        if (errData.code === 'payment_service_insufficient_funds') {
            timestampLogger("Declined: Insufficient funds")
        }
        else if (errData.code === 'payment_service_authorization_decline') {
            timestampLogger("Declined: Failed authorization")
        }
        else {
            timestampLogger(`Declined: Unknown error ${err.response.data.code}`)
        }
        // statusCode
        // error
        // code -- this is what we want
    }

    // data.code payment_service_insufficient_funds (not enough money)
    // data.code payment_service_authorization_decline (decline)


};


(async () => {
    await flow();
})();