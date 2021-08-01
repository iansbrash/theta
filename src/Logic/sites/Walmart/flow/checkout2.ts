import {
    returnParsedCookies, // @ts-ignore
    convertCookieArrayToObject, // @ts-ignore
    joinCookies,
    accumulateCookies
} from '../../../requestFunctions'
import axios from 'axios';
import timestampLogger from '../../../logger';
import { voltageEncrypt } from '../logic/voltageEncrypt';
// import testProfile from '../../../sensitive/testInterfaces/testProfile';

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
        // "storeList": [
        //   {
        //     "id": "90461"
        //   },
        //   {
        //     "id": "5616"
        //   },
        //   {
        //     "id": "5119"
        //   },
        //   {
        //     "id": "659"
        //   },
        //   {
        //     "id": "3717"
        //   },
        //   {
        //     "id": "688"
        //   },
        //   {
        //     "id": "272"
        //   },
        //   {
        //     "id": "5058"
        //   },
        //   {
        //     "id": "4435"
        //   },
        //   {
        //     "id": "5107"
        //   }
        // ],
        // "postalCode": "37215",
        // "city": "Nashville",
        // "state": "TN",
        // "isZipLocated": true,
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
            "shipMethod": "EXPIDITED"
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
    var POSTLocationData = JSON.stringify({
        "address": {
          "addressLineOne": "1105 Holly Tree Farms Road",
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
      
    const POSTLocationResponse = await axios({
        method: 'post',
        url: 'https://www.walmart.com/api/checkout-avs?version=v2',
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
        data : POSTLocationData,
        validateStatus: () => true
    });

    allCookies = accumulateCookies(allCookies, returnParsedCookies(POSTLocationResponse.headers['set-cookie']))
console.log(POSTLocationResponse)
    


    let testCardNum = '4767718260058419'
    let testCardCvv = '362'
    let testCardExpMonth = '07' // use 0_ for 1 digit expirations
    let testCardExpYear = '2027'

    timestampLogger("Encrypting payment")
    // @ts-ignore
    const voltageEncryptedData : string[][] = await voltageEncrypt(testCardNum, testCardCvv)

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
        "storeList": [
          {
            "id": 90010,
            "address": {
              "postalCode": "37027",
              "address1": "251 Franklin Rd",
              "city": "Brentwood",
              "state": "TN",
              "country": "US"
            },
            "storeType": {
              "id": 8,
              "name": "FedEx Office",
              "displayName": "Brentwood FedEx Pickup Location"
            },
            "customerInfo": {
              "distance": 3.84,
              "isPreferred": false,
              "isWithinRange": true
            }
          },
          {
            "id": 272,
            "address": {
              "postalCode": "37067",
              "address1": "3600 Mallory Ln",
              "city": "Franklin",
              "state": "TN",
              "country": "US"
            },
            "storeType": {
              "id": 1,
              "name": "Walmart Supercenter",
              "displayName": "Franklin Supercenter"
            },
            "customerInfo": {
              "distance": 4.31,
              "isPreferred": false,
              "isWithinRange": true
            }
          },
          {
            "id": 5119,
            "address": {
              "postalCode": "37211",
              "address1": "5531 Edmondson Pike",
              "city": "Nashville",
              "state": "TN",
              "country": "US"
            },
            "storeType": {
              "id": 4,
              "name": "Neighborhood Market",
              "displayName": "Nashville Neighborhood Market"
            },
            "customerInfo": {
              "distance": 4.35,
              "isPreferred": false,
              "isWithinRange": true
            }
          },
          {
            "id": 688,
            "address": {
              "postalCode": "37211",
              "address1": "5824 Nolensville Pike",
              "city": "Nashville",
              "state": "TN",
              "country": "US"
            },
            "storeType": {
              "id": 1,
              "name": "Walmart Supercenter",
              "displayName": "Nashville Supercenter"
            },
            "customerInfo": {
              "distance": 5.16,
              "isPreferred": false,
              "isWithinRange": true
            }
          },
          {
            "id": 3717,
            "address": {
              "postalCode": "37211",
              "address1": "4040 Nolensville Pike",
              "city": "Nashville",
              "state": "TN",
              "country": "US"
            },
            "storeType": {
              "id": 1,
              "name": "Walmart Supercenter",
              "displayName": "Nashville Supercenter"
            },
            "customerInfo": {
              "distance": 7.33,
              "isPreferred": false,
              "isWithinRange": true
            }
          },
          {
            "id": 5616,
            "address": {
              "postalCode": "37204",
              "address1": "2421 Powell Ave",
              "city": "Nashville",
              "state": "TN",
              "country": "US"
            },
            "storeType": {
              "id": 1,
              "name": "Walmart Supercenter",
              "displayName": "Nashville Supercenter"
            },
            "customerInfo": {
              "distance": 9.02,
              "isPreferred": false,
              "isWithinRange": true
            }
          },
          {
            "id": 5058,
            "address": {
              "postalCode": "37013",
              "address1": "3035 Hamilton Church Rd",
              "city": "Antioch",
              "state": "TN",
              "country": "US"
            },
            "storeType": {
              "id": 1,
              "name": "Walmart Supercenter",
              "displayName": "Antioch Supercenter"
            },
            "customerInfo": {
              "distance": 9.26,
              "isPreferred": false,
              "isWithinRange": true
            }
          },
          {
            "id": 7020,
            "address": {
              "postalCode": "37086",
              "address1": "5511 Murfreesboro Rd",
              "city": "La Vergne",
              "state": "TN",
              "country": "US"
            },
            "storeType": {
              "id": 1,
              "name": "Walmart Supercenter",
              "displayName": "La Vergne Supercenter"
            },
            "customerInfo": {
              "distance": 12.31,
              "isPreferred": false,
              "isWithinRange": true
            }
          },
          {
            "id": 659,
            "address": {
              "postalCode": "37209",
              "address1": "7044 Charlotte Pike",
              "city": "Nashville",
              "state": "TN",
              "country": "US"
            },
            "storeType": {
              "id": 1,
              "name": "Walmart Supercenter",
              "displayName": "Nashville Supercenter"
            },
            "customerInfo": {
              "distance": 13.26,
              "isPreferred": false,
              "isWithinRange": true
            }
          },
          {
            "id": 406,
            "address": {
              "postalCode": "37167",
              "address1": "570 Enon Springs Rd E",
              "city": "Smyrna",
              "state": "TN",
              "country": "US"
            },
            "storeType": {
              "id": 1,
              "name": "Walmart Supercenter",
              "displayName": "Smyrna Supercenter"
            },
            "customerInfo": {
              "distance": 14.88,
              "isPreferred": false,
              "isWithinRange": true
            }
          }
        ]
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
        validateStatus: () => true
    });

    console.log(POSTShippingAddressResponse)

    allCookies = accumulateCookies(allCookies, returnParsedCookies(POSTShippingAddressResponse.headers['set-cookie']))


    // We get piHash from this!
    var POSTCreditCardData = JSON.stringify({
        "encryptedPan": voltageEncryptedData[0][0],
        "encryptedCvv": voltageEncryptedData[0][1],
        "integrityCheck": voltageEncryptedData[0][2],
        "keyId": voltageEncryptedData[0][3],
        "phase": "0",
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

    console.log(POSTCreditCardData)
      
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
        // validateStatus: () => true
    });

    // console.log(POSTCreditCardResponse);
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
            "phase": "0",// assumed
            "piHash": POSTCreditCardResponse.data.piHash// in CC Response
          }
        ],
        "cvvInSession": true
      });

      console.log(POSTPaymentData)
      
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

      console.log(JSON.stringify(POSTPaymentResponse.data))

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
      console.log(SubmitOrderData)

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

    console.log(SubmitOrderResponse)


};


(async () => {
    await flow();
})();