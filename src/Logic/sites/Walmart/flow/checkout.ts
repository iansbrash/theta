import {
    returnParsedCookies, // @ts-ignore
    convertCookieArrayToObject, // @ts-ignore
    joinCookies,
    accumulateCookies
} from '../../../requestFunctions'
import axios from 'axios';
import timestampLogger from '../../../logger';
import { voltageEncrypt } from '../logic/voltageEncrypt';
import testProfile from '../../../sensitive/testInterfaces/testProfile';

const flow = async () => {
    let productUrl = 'https://www.walmart.com/ip/Starbucks-Dark-Roast-Whole-Bean-Coffee-Sumatra-100-Arabica-1-bag-12-oz/20709874'
    let allCookies : string[] = [];

    timestampLogger("Getting the product")
    let GETProductResponse = await axios({
        method: 'get',
        url: productUrl,
        headers: {
            'authority': 'www.walmart.com', 
            'pragma': 'no-cache', 
            'cache-control': 'no-cache', 
            'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"', 
            'sec-ch-ua-mobile': '?0', 
            'dnt': '1', 
            'upgrade-insecure-requests': '1', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36', 
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
            'sec-fetch-site': 'none', 
            'sec-fetch-mode': 'navigate', 
            'sec-fetch-user': '?1', 
            'sec-fetch-dest': 'document', 
            'accept-language': 'en-US,en;q=0.9', 
        }
    })

    allCookies = accumulateCookies(allCookies, returnParsedCookies(GETProductResponse.headers['set-cookie']) )

    var data = JSON.stringify({
        "offerId": "3D437062270B4972BFB09E2B74794114",
        "quantity": 1,
        "location": {
            "postalCode": "37215",
            "city": "Nashville",
            "state": "TN",
            "isZipLocated": true
        },
        "shipMethodDefaultRule": "SHIP_RULE_1",
        "storeIds": [
            5616,
            5119,
            659,
            3717,
            688
        ]
    });



    timestampLogger("Adding to cart")
    // 400 = offerId is invalid
    const ATCResponse = await axios({
        method: 'post',
        url: 'https://www.walmart.com/api/v3/cart/guest/:CID/items',
        headers: { 
            'authority': 'www.walmart.com', 
            'pragma': 'no-cache', 
            'cache-control': 'no-cache', 
            'accept': 'application/json', 
            'dnt': '1', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36', 
            'content-type': 'application/json', 
            'origin': 'https://www.walmart.com', 
            'sec-fetch-site': 'same-origin', 
            'sec-fetch-mode': 'cors', 
            'sec-fetch-dest': 'empty', 
            'referer': productUrl, 
            'accept-language': 'en-US,en;q=0.9', 
            cookie: joinCookies(allCookies)
        },
        data : data
    });

    console.log(JSON.stringify(ATCResponse.data))

    allCookies = accumulateCookies(allCookies, returnParsedCookies(ATCResponse.headers['set-cookie']) )

    var GETCheckoutResponseData = JSON.stringify({
        "storeList": [
          {
            "id": "90461"
          },
          {
            "id": "5616"
          },
          {
            "id": "5119"
          },
          {
            "id": "659"
          },
          {
            "id": "3717"
          },
          {
            "id": "688"
          },
          {
            "id": "272"
          },
          {
            "id": "5058"
          },
          {
            "id": "4435"
          },
          {
            "id": "5107"
          }
        ],
        "postalCode": "37215",
        "city": "Nashville",
        "state": "TN",
        "isZipLocated": true,
        "crt:CRT": "",
        "customerId:CID": "",
        "customerType:type": "",
        "affiliateInfo:com.wm.reflector": ""
      });



    timestampLogger("Getting Checkout")
    const GETCheckoutResponse = await axios({
        method: 'post',
        url: 'https://www.walmart.com/api/checkout/v3/contract?page=CHECKOUT_VIEW',
        headers: {
            'authority': 'www.walmart.com', 
            'pragma': 'no-cache', 
            'cache-control': 'no-cache', 
            'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"', 
            'dnt': '1', 
            'sec-ch-ua-mobile': '?0', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36', 
            'content-type': 'application/json', 
            'accept': 'application/json, text/javascript, */*; q=0.01', 
            'wm_cvv_in_session': 'true', 
            'wm_vertical_id': '0', 
            'origin': 'https://www.walmart.com', 
            'sec-fetch-site': 'same-origin', 
            'sec-fetch-mode': 'cors', 
            'sec-fetch-dest': 'empty', 
            'referer': 'https://www.walmart.com/checkout/', 
            'accept-language': 'en-US,en;q=0.9', 
            cookie: joinCookies(allCookies)
        },
        data : GETCheckoutResponseData,
    })
    let itemId = GETCheckoutResponse.data.items[0].id
    console.log(JSON.stringify(GETCheckoutResponse.data))
    // https://www.walmart.com/px/PXu6b0qd2S/captcha/captcha.js?a=c&m=0&u=79b804b0-ef05-11eb-87c9-37b2ea7c0201__79b804b0-ef05-11eb-87c9-37b2ea7c0201&v=&g=b

    // console.log(GETCheckoutResponse)

    allCookies = accumulateCookies(allCookies, returnParsedCookies(GETCheckoutResponse.headers['set-cookie']))

    const ContinueAsGuestData = JSON.stringify({
        "responseGroup": "BASICPLUS",
        "includePickUpLocation": true,
        "clientName": "Web-Checkout-FetchContract",
        "storeMeta": false,
        "plus": true
    });

    timestampLogger("Continuing as guest")
    const ContinueAsGuestResponse = await axios({
        method: 'post',
        url: 'https://www.walmart.com/account/api/location',
        headers: {
            'authority': 'www.walmart.com', 
            'pragma': 'no-cache', 
            'cache-control': 'no-cache', 
            'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"', 
            'accept': 'application/json', 
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
        data : ContinueAsGuestData
    })
    console.log(JSON.stringify(ContinueAsGuestResponse.data))

    allCookies = accumulateCookies(allCookies, returnParsedCookies(ContinueAsGuestResponse.headers['set-cookie']))


    var SelectDeliveryMethodResponseData = JSON.stringify({
        "groups": [
          {
              // "Ship to house" this probably doesn't change
            "fulfillmentOption": "S2H",
            "itemIds": [
                itemId
            ],
            // this comes from the loaded page
            // it has like 'automation-id="shipMethod-RUSH"'
            "shipMethod": "RUSH"
          }
        ]
      });

      timestampLogger("Selecting delivery method")
    const SelectDeliveryMethodResponse = await axios({
        method: 'post',
        url: 'https://www.walmart.com/api/checkout/v3/contract/:PCID/fulfillment',
        headers: {
            'authority': 'www.walmart.com', 
            'pragma': 'no-cache', 
            'cache-control': 'no-cache', 
            'accept': 'application/json, text/javascript, */*; q=0.01', 
            'dnt': '1', 
            'inkiru_precedence': 'false', 
            'wm_cvv_in_session': 'true', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36', 
            'wm_vertical_id': '0', 
            'content-type': 'application/json', 
            'origin': 'https://www.walmart.com', 
            'sec-fetch-site': 'same-origin', 
            'sec-fetch-mode': 'cors', 
            'sec-fetch-dest': 'empty', 
            'referer': 'https://www.walmart.com/checkout/', 
            'accept-language': 'en-US,en;q=0.9', 
            cookie: joinCookies(allCookies)
        },
        data : SelectDeliveryMethodResponseData,
        validateStatus: () => true
    })
    allCookies = accumulateCookies(allCookies, returnParsedCookies(SelectDeliveryMethodResponse.headers['set-cookie']))

    // console.log(SelectDeliveryMethodResponse)
    
    timestampLogger("Adding address")
    var AddShippingAddressData = JSON.stringify({
        "address": {
          "addressLineOne": "1105 Holly Tree Farms Road",
          "addressLineTwo": "1234",
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

    console.log(AddShippingAddressReponse.data)

    // Aka Walmart prompts us to update address
    if (AddShippingAddressReponse.data.avsStatus === 'FAILURE') {

    }
    allCookies = accumulateCookies(allCookies, returnParsedCookies(AddShippingAddressReponse.headers['set-cookie']))

    // @ts-ignore
    const voltageEncryptedData : string[] = await voltageEncrypt('4767718260058419', '362')

    var SubmitOrderData = JSON.stringify({
        "cvvInSession": true,
        "voltagePayments": [
          {
            "paymentType": "CREDITCARD",
            "encryptedCvv": voltageEncryptedData[1],
            "encryptedPan": voltageEncryptedData[0],
            "integrityCheck": voltageEncryptedData[2],
            "keyId": voltageEncryptedData[3],
            "phase": "1"
          }
        ]
      });
      
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
        data : SubmitOrderData
    });


};


(async () => {
    await flow();
})();