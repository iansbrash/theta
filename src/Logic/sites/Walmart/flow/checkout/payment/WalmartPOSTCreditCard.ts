import axios, { AxiosResponse } from 'axios';
import { Proxy } from '../../../../../interfaces/ProxyList';
import {
    joinCookies
} from '../../../../../requestFunctions';

// @ts-ignore
import HttpsProxyAgent from 'https-proxy-agent'
import ProfileObject from '../../../../../interfaces/ProfileObject';

const WalmartPOSTCreditCard = async (allCookies : string[], profile : ProfileObject, voltageEncryptedData : string[][], proxy : Proxy) : Promise<AxiosResponse> => {

    // We get piHash from this!
    var POSTCreditCardData = JSON.stringify({
        "encryptedPan": voltageEncryptedData[0][0],
        "encryptedCvv": voltageEncryptedData[0][1],
        "integrityCheck": voltageEncryptedData[0][2],
        "keyId": voltageEncryptedData[0][3],
        "phase": "0", // was 1????
        "state": "TN",
        "postalCode": profile.billing.zip,
        "addressLineOne": profile.billing.address1,
        "addressLineTwo": "",
        "city": profile.billing.city,
        "firstName": profile.billing.firstName,
        "lastName": profile.billing.lastName,
        "expiryMonth": profile.payment.expiryMonth,
        "expiryYear": '20' + profile.payment.expiryYear, // yep we need a 20 here
        "phone": profile.information.phone,
        "cardType": "VISA",
        "isGuest": true
      });

    // console.log(POSTCreditCardData)
      
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
        // validateStatus: () => true,
        // httpsAgent: new (HttpsProxyAgent as any)({host: proxy.ip , port: proxy.port, auth: `${proxy.username}:${proxy.password}`})
        proxy: {
            protocol: 'http',
            host: proxy.ip,
            port: proxy.port,
            auth: {
                username: proxy.username,
                password: proxy.password
            },
        }

    });

    return POSTCreditCardResponse;
}

export default WalmartPOSTCreditCard;