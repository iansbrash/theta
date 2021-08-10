import axios, { AxiosResponse } from 'axios';
import { Proxy } from '../../../../../interfaces/ProxyList';
import {
    joinCookies
} from '../../../../../requestFunctions';
// @ts-ignore
import HttpsProxyAgent from 'https-proxy-agent'

const WalmartPOSTFulfillment = async (allCookies : string[], itemId : string, fulfillmentOption : string, shipMethod : string, proxy : Proxy) : Promise<AxiosResponse> => {

    var SelectDeliveryMethodResponseData = JSON.stringify({
        "groups": [
          {
              // "Ship to house" this probably doesn't change
            "fulfillmentOption": fulfillmentOption,
            "itemIds": [
                itemId
            ],
            // this comes from the loaded page
            // it has like 'automation-id="shipMethod-RUSH"'
            "shipMethod": shipMethod
          }
        ]
      });

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

    return SelectDeliveryMethodResponse;
}


export default WalmartPOSTFulfillment;