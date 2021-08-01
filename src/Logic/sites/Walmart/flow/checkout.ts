import {
    returnParsedCookies, // @ts-ignore
    convertCookieArrayToObject, // @ts-ignore
    joinCookies,
    accumulateCookies,
    getValueByDelimiters
} from '../../../requestFunctions'
import axios from 'axios';
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
    const storesObject : object[] = JSON.parse(`[{${stores}}]`)
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
    
    timestampLogger("Adding address")
    var AddShippingAddressData = JSON.stringify({
        "address": {
          "addressLineOne": "1105 Holly Tree Farms Road",
          "addressLineTwo": "",
          "city": "Brentwood",
          "postalCode": "37027",
          "stateOrProvinceCode": "TN",
          "countryCode": "USA"
        },
        "options": {
          "maxResultSize": "10"
        },
        "geoHint": "US"
    });

    const AddShippingAddressReponse = await axios({
        method: 'post',
        url: 'https://www.walmart.com/api/checkout-avs?version=v2',
        headers: {
            'authority': 'www.walmart.com', 
            'pragma': 'no-cache', 
            'cache-control': 'no-cache', 
            'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"', 
            'accept': 'application/json, text/javascript, */*; q=0.01', 
            'dnt': '1', 
            'sec-ch-ua-mobile': '?0', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36', 
            'content-type': 'application/json', 
            'origin': 'https://www.walmart.com', 
            'sec-fetch-site': 'same-origin', 
            'sec-fetch-mode': 'cors', 
            'sec-fetch-dest': 'empty', 
            'referer': 'https://www.walmart.com/checkout/', 
            'accept-language': 'en-US,en;q=0.9',
            cookie: joinCookies(allCookies)
        },
        data : AddShippingAddressData
    })

    // console.log(AddShippingAddressReponse.data)

    // Aka Walmart prompts us to update address
    if (AddShippingAddressReponse.data.avsStatus === 'FAILURE') {

    }
    allCookies = accumulateCookies(allCookies, returnParsedCookies(AddShippingAddressReponse.headers['set-cookie']))


    // add location
    var PUTLocationData = JSON.stringify({
        "postalCode": "37027",
        "responseGroup": "STOREMETAPLUS",
        "includePickUpLocation": true,
        "persistLocation": true,
        "clientName": "Web-Checkout-ShippingAddress",
        "storeMeta": true,
        "plus": true
    });
      
    const PUTLocationResponse = await axios({
        method: 'put',
        url: 'https://www.walmart.com/account/api/location',
        headers: { 
          'Connection': 'keep-alive', 
          'Pragma': 'no-cache', 
          'Cache-Control': 'no-cache', 
          'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"', 
          'accept': 'application/json, text/javascript, */*; q=0.01', 
          'DNT': '1', 
          'sec-ch-ua-mobile': '?0', 
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36', 
          'content-type': 'application/json', 
          'Origin': 'https://www.walmart.com', 
          'Sec-Fetch-Site': 'same-origin', 
          'Sec-Fetch-Mode': 'cors', 
          'Sec-Fetch-Dest': 'empty', 
          'Referer': 'https://www.walmart.com/checkout/', 
          'Accept-Language': 'en-US,en;q=0.9', 
          'Cookie': joinCookies(allCookies)
        },
        data : PUTLocationData,
        // validateStatus: () => true
    });

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


    // console.log("StoreList:")
    // console.log(storeList)

    

    var POSTShippingAddressData = JSON.stringify({
        "addressLineOne": "1105 Holly Tree Farms Rd",
        "city": "Brentwood",
        "firstName": "Ian",
        "lastName": "Brash",
        "phone": "6158922385",
        "email": "iansbrash@gmail.com",
        "marketingEmailPref": true,
        "postalCode": "37027",
        "state": "TN",
        "countryCode": "USA",
        "addressType": "RESIDENTIAL",
        "changedFields": [],
        "storeList": storeList
      });
      
    const POSTShippingAddressResponse = await axios({
        method: 'post',
        url: 'https://www.walmart.com/api/checkout/v3/contract/:PCID/shipping-address',
        headers: { 
          'Connection': 'keep-alive', 
          'Pragma': 'no-cache', 
          'Cache-Control': 'no-cache', 
          'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"', 
          'DNT': '1', 
          'inkiru_precedence': 'false', 
          'sec-ch-ua-mobile': '?0', 
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36', 
          'content-type': 'application/json', 
          'accept': 'application/json, text/javascript, */*; q=0.01', 
          'wm_cvv_in_session': 'true', 
          'wm_vertical_id': '0', 
          'Origin': 'https://www.walmart.com', 
          'Sec-Fetch-Site': 'same-origin', 
          'Sec-Fetch-Mode': 'cors', 
          'Sec-Fetch-Dest': 'empty', 
          'Referer': 'https://www.walmart.com/checkout/', 
          'Accept-Language': 'en-US,en;q=0.9', 
          'Cookie': joinCookies(allCookies)
        },
        data : POSTShippingAddressData,
        // validateStatus: () => true
    });

    // console.log(POSTShippingAddressResponse.data)

    allCookies = accumulateCookies(allCookies, returnParsedCookies(POSTShippingAddressResponse.headers['set-cookie']))


    let testCardNum = '4767718260058419'
    let testCardCvv = '362'
    let testCardExpMonth = '07' // use 0_ for 1 digit expirations
    let testCardExpYear = '2027'

    timestampLogger("Encrypting payment")
    // @ts-ignore
    const voltageEncryptedData : string[][] = await voltageEncrypt(testCardNum, testCardCvv)

    // We get piHash from this!
    var POSTCreditCardData = JSON.stringify({
        "encryptedPan": voltageEncryptedData[0][0],
        "encryptedCvv": voltageEncryptedData[0][1],
        "integrityCheck": voltageEncryptedData[0][2],
        "keyId": voltageEncryptedData[0][3],
        "phase": "0", // was 1????
        "state": "TN",
        "postalCode": "37027",
        "addressLineOne": "1105 Holly Tree Farms Rd",
        "addressLineTwo": "",
        "city": "Brentwood",
        "firstName": "Ian",
        "lastName": "Brash",
        "expiryMonth": testCardExpMonth,
        "expiryYear": testCardExpYear,
        "phone": "6158922385",
        "cardType": "VISA",
        "isGuest": true
      });

    // console.log(POSTCreditCardData)
      
    timestampLogger("Adding payment (1)")
    const POSTCreditCardResponse =  await axios({
        method: 'post',
        url: 'https://www.walmart.com/api/checkout-customer/:CID/credit-card',
        headers: { 
          'Connection': 'keep-alive', 
          'Pragma': 'no-cache', 
          'Cache-Control': 'no-cache', 
          'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"', 
          'accept': 'application/json', 
          'DNT': '1', 
          'sec-ch-ua-mobile': '?0', 
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36', 
          'content-type': 'application/json', 
          'Origin': 'https://www.walmart.com', 
          'Sec-Fetch-Site': 'same-origin', 
          'Sec-Fetch-Mode': 'cors', 
          'Sec-Fetch-Dest': 'empty', 
          'Referer': 'https://www.walmart.com/checkout/', 
          'Accept-Language': 'en-US,en;q=0.9', 
          'Cookie': joinCookies(allCookies)
        },
        data : POSTCreditCardData,
        validateStatus: () => true
    });

    // console.log(POSTCreditCardResponse.data);
    // return;

    allCookies = accumulateCookies(allCookies, returnParsedCookies(POSTCreditCardResponse.headers['set-cookie']))
    
    var POSTPaymentData = JSON.stringify({
        "payments": [
          {
            "paymentType": POSTCreditCardResponse.data.paymentType,// in CC Response
            "cardType": POSTCreditCardResponse.data.cardType,// in CC Response
            "firstName": POSTCreditCardResponse.data.firstName,// in CC Response
            "lastName": POSTCreditCardResponse.data.lastName, // in CC Response
            "addressLineOne": POSTCreditCardResponse.data.addressLineOne, // in CC Response
            "addressLineTwo": POSTCreditCardResponse.data.addressLineTwo, // in CC Response
            "city": POSTCreditCardResponse.data.city, // in CC Response
            "state": POSTCreditCardResponse.data.state,// in CC Response
            "postalCode": POSTCreditCardResponse.data.postalCode,// in CC Response
            "expiryMonth": testCardExpMonth, // is it 07 or 7?
            "expiryYear": testCardExpYear, 
            "email": "iansbrash@gmail.com", // change please
            "phone": POSTCreditCardResponse.data.phone, // in CC Response
            "encryptedPan": voltageEncryptedData[1][0],//#2
            "encryptedCvv": voltageEncryptedData[1][1],//#2
            "integrityCheck": voltageEncryptedData[1][2],//integrityCheck#2
            "keyId": voltageEncryptedData[1][3],//keyId #2
            "phase": "0",// assumed ... was 1 ???
            "piHash": POSTCreditCardResponse.data.piHash// in CC Response
          }
        ],
        "cvvInSession": true
      });

    //   console.log(POSTPaymentData)
      
    timestampLogger("Adding payment (2)")
      const POSTPaymentResponse = await axios({
        method: 'post',
        url: 'https://www.walmart.com/api/checkout/v3/contract/:PCID/payment',
        headers: { 
          'Connection': 'keep-alive', 
          'Pragma': 'no-cache', 
          'Cache-Control': 'no-cache', 
          'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"', 
          'DNT': '1', 
          'inkiru_precedence': 'false', 
          'sec-ch-ua-mobile': '?0', 
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36', 
          'content-type': 'application/json', 
          'accept': 'application/json, text/javascript, */*; q=0.01', 
          'wm_cvv_in_session': 'true', 
          'wm_vertical_id': '0', 
          'Origin': 'https://www.walmart.com', 
          'Sec-Fetch-Site': 'same-origin', 
          'Sec-Fetch-Mode': 'cors', 
          'Sec-Fetch-Dest': 'empty', 
          'Referer': 'https://www.walmart.com/checkout/', 
          'Accept-Language': 'en-US,en;q=0.9', 
          'Cookie': joinCookies(allCookies) 
        },
        data : POSTPaymentData
      });

    //   console.log(JSON.stringify(POSTPaymentResponse.data))

    allCookies = accumulateCookies(allCookies, returnParsedCookies(POSTPaymentResponse.headers['set-cookie']))
    
    // console.log(POSTPaymentResponse)
    // return;

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
      
    timestampLogger("Submitting order")

    // 400 is error submitting order (could be bad CVV or Expiration Date)
      // @ts-ignore
    const SubmitOrderResponse =  await axios({
        method: 'put',
        url: 'https://www.walmart.com/api/checkout/v3/contract/:PCID/order',
        headers: { 
          'Connection': 'keep-alive', 
          'Pragma': 'no-cache', 
          'Cache-Control': 'no-cache', 
          'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"', 
          'DNT': '1', 
          'inkiru_precedence': 'false', 
          'sec-ch-ua-mobile': '?0', 
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36', 
          'content-type': 'application/json', 
          'accept': 'application/json, text/javascript, */*; q=0.01', 
          'wm_cvv_in_session': 'true', 
          'wm_vertical_id': '0', 
          'Origin': 'https://www.walmart.com', 
          'Sec-Fetch-Site': 'same-origin', 
          'Sec-Fetch-Mode': 'cors', 
          'Sec-Fetch-Dest': 'empty', 
          'Referer': 'https://www.walmart.com/checkout/', 
          'Accept-Language': 'en-US,en;q=0.9', 
          'Cookie': joinCookies(allCookies)
        },
        data : SubmitOrderData,
        validateStatus: () => true
    });

    console.log(SubmitOrderResponse.data)
    // data.code payment_service_insufficient_funds
    // data.code 


};


(async () => {
    await flow();
})();