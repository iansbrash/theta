import axios, { AxiosResponse } from 'axios';
import { Proxy } from '../../../../../interfaces/ProxyList';
import {
    joinCookies
} from '../../../../../requestFunctions';
// @ts-ignore
import HttpsProxyAgent from 'https-proxy-agent'
import { ProfileShipping } from '../../../../../interfaces/ProfileObject';

const WalmartPUTLocationResponse = async (allCookies : string[], shipping : ProfileShipping, proxy : Proxy) : Promise<AxiosResponse> => {

    // This is kida fucked up
    var PUTLocationData = JSON.stringify({
        "postalCode": shipping.zip, // this might be location data, not ship address data ???? this is fucked
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
    })

    return PUTLocationResponse;
}

export default WalmartPUTLocationResponse;