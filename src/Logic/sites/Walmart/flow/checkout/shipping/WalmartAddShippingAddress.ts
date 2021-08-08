import axios, { AxiosResponse } from 'axios';
import { Proxy } from '../../../../../interfaces/ProxyList';
import {
    joinCookies
} from '../../../../../requestFunctions';

// @ts-ignore
import HttpsProxyAgent from 'https-proxy-agent'
import { ProfileShipping } from '../../../../../interfaces/ProfileObject';

const WalmartAddShippingAddress = async (allCookies : string[], shipping : ProfileShipping, proxy : Proxy) : Promise<AxiosResponse> => {

    // This is kida fucked up
    var AddShippingAddressData = JSON.stringify({
        "address": {
          "addressLineOne": shipping.address1,
          "addressLineTwo": shipping.address2,
          "city": shipping.city,
          "postalCode": shipping.zip,
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
        data : AddShippingAddressData,
        // httpsAgent: new (HttpsProxyAgent as any)({host: proxy.ip , port: proxy.port, auth: `${proxy.username}:${proxy.password}`}),
        proxy: {
            host: proxy.ip,
            port: proxy.port,
            auth: {
                username: proxy.username,
                password: proxy.password
            },
        }
    })

    return AddShippingAddressReponse;
}


export default WalmartAddShippingAddress;