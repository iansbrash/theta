import axios, { AxiosResponse } from 'axios';
import { Proxy } from '../../../../../interfaces/ProxyList';
import {
    joinCookies
} from '../../../../../requestFunctions';
// @ts-ignore
import HttpsProxyAgent from 'https-proxy-agent'
import ProfileObject from '../../../../../interfaces/ProfileObject';

const WalmartPOSTShippingAddress = async (allCookies : string[], profile : ProfileObject, storeList : object[], proxy : Proxy) : Promise<AxiosResponse> => {

    var POSTShippingAddressData = JSON.stringify({
        "addressLineOne": profile.shipping.address1,
        "city": profile.shipping.city,
        "firstName": profile.shipping.firstName,
        "lastName": profile.shipping.lastName,
        "phone": profile.information.phone,
        "email": profile.information.email,
        "marketingEmailPref": true,
        "postalCode": profile.shipping.zip,
        "state": "TN",
        "countryCode": "USA",
        "addressType": "RESIDENTIAL",
        "changedFields": [],
        "storeList": storeList
      });
      
    const WalmartPOSTShippingAddress = await axios({
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
        // httpsAgent: new (HttpsProxyAgent as any)({host: proxy.ip , port: proxy.port, auth: `${proxy.username}:${proxy.password}`}),
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

    return WalmartPOSTShippingAddress;
}


export default WalmartPOSTShippingAddress;