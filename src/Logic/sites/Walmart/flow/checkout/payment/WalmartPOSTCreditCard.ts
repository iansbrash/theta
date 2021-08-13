import axios, { AxiosResponse } from 'axios';
import { Proxy } from '../../../../../interfaces/ProxyList';
import {
    joinCookies
} from '../../../../../requestFunctions';

// @ts-ignore
import HttpsProxyAgent from 'https-proxy-agent'
import ProfileObject from '../../../../../interfaces/ProfileObject';

// @ts-ignore
const WalmartPOSTCreditCard = async (allCookies : string[], profile : ProfileObject, voltageEncryptedData : string[][], proxy : Proxy) : Promise<AxiosResponse> => {

    // We get piHash from this!
    var POSTCreditCardData = JSON.stringify({
        "addressLineOne": profile.billing.address1,
        "addressLineTwo": "",
        "cardType": "VISA",
        "city": profile.billing.city,
        "encryptedCvv": voltageEncryptedData[0][1],
        "encryptedPan": voltageEncryptedData[0][0],
        "expiryMonth": profile.payment.expiryMonth,
        "expiryYear": '20' + profile.payment.expiryYear, // yep we need a 20 here
        "firstName": profile.billing.firstName,
        "integrityCheck": voltageEncryptedData[0][2],
        "isGuest": true,
        "keyId": voltageEncryptedData[0][3],
        "lastName": profile.billing.lastName,
        "phase": voltageEncryptedData[0][4], // was 1????
        "phone": profile.information.phone,
        "postalCode": profile.billing.zip,
        "state": "TN",
      });

    // console.log(POSTCreditCardData)
      
    const POSTCreditCardResponse =  await axios({
        method: 'post',
        url: 'https://www.walmart.com/api/checkout-customer/:CID/credit-card',
        headers: { 
            'authority': 'www.walmart.com', 
            'pragma': 'no-cache', 
            'cache-control': 'no-cache', 
            'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"', 
            'accept': 'application/json', 
            'dnt': '1', 
            'sec-ch-ua-mobile': '?0', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36', 
            'content-type': 'application/json', 
            'origin': 'https://www.walmart.com', 
            'sec-fetch-site': 'same-origin', 
            'sec-fetch-mode': 'cors', 
            'sec-fetch-dest': 'empty', 
            'referer': 'https://www.walmart.com/checkout/', 
            'accept-language': 'en-US,en;q=0.9',
            'Cookie': joinCookies(allCookies)
        },
        data : POSTCreditCardData,
        validateStatus: () => true,
        // httpsAgent: new (HttpsProxyAgent as any)({host: proxy.ip , port: proxy.port, auth: `${proxy.username}:${proxy.password}`})
        // proxy: {
        //     protocol: 'http',
        //     host: proxy.ip,
        //     port: proxy.port,
        //     auth: {
        //         username: proxy.username,
        //         password: proxy.password
        //     },
        // }

    });


    return POSTCreditCardResponse;
}

export default WalmartPOSTCreditCard;