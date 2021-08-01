import axios, { AxiosResponse } from 'axios';
import { Proxy } from '../../../../../interfaces/ProxyList';
import {
    joinCookies
} from '../../../../../requestFunctions';
import HttpsProxyAgent from 'https-proxy-agent'
import ProfileObject from '../../../../../interfaces/ProfileObject';

const WalmartPOSTPayment = async (allCookies : string[], profile : ProfileObject, voltageEncryptedData : string[][], POSTCreditCardResponseData : any, proxy : Proxy) : Promise<AxiosResponse> => {

    // We get piHash from this!
    var POSTPaymentData = JSON.stringify({
        "payments": [
          {
            "paymentType": POSTCreditCardResponseData.paymentType,// in CC Response
            "cardType": POSTCreditCardResponseData.cardType,// in CC Response
            "firstName": POSTCreditCardResponseData.firstName,// in CC Response
            "lastName": POSTCreditCardResponseData.lastName, // in CC Response
            "addressLineOne": POSTCreditCardResponseData.addressLineOne, // in CC Response
            "addressLineTwo": POSTCreditCardResponseData.addressLineTwo, // in CC Response
            "city": POSTCreditCardResponseData.city, // in CC Response
            "state": POSTCreditCardResponseData.state,// in CC Response
            "postalCode": POSTCreditCardResponseData.postalCode,// in CC Response
            "expiryMonth": profile.payment.expiryMonth, // is it 07 or 7?
            "expiryYear": '20' + profile.payment.expiryYear, 
            "email": profile.information.email, // change please
            "phone": POSTCreditCardResponseData.phone, // in CC Response
            "encryptedPan": voltageEncryptedData[1][0],//#2
            "encryptedCvv": voltageEncryptedData[1][1],//#2
            "integrityCheck": voltageEncryptedData[1][2],//integrityCheck#2
            "keyId": voltageEncryptedData[1][3],//keyId #2
            "phase": "0",// assumed ... was 1 ???
            "piHash": POSTCreditCardResponseData.piHash// in CC Response
          }
        ],
        "cvvInSession": true
      });

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
        data : POSTPaymentData,
        httpsAgent: new (HttpsProxyAgent as any)({host: proxy.ip , port: proxy.port, auth: `${proxy.username}:${proxy.password}`})
      });

    return POSTPaymentResponse;
}

export default WalmartPOSTPayment;