import axios, { AxiosResponse } from 'axios';
import { replaceAll } from '../checkout';
import { genShippingPayloadParams } from '../../../logic/genShippingPayload';
import { joinCookies } from '../../../../../requestFunctions';
import tsLogger from '../../../../../logger';
import requestRetryWrapper from '../../../../../requestRetryWrapper';

//https://www.amazon.com/gp/identity/address/widgets/form/handlers/create-address-form-handler.html
const POSTAddShippingAddressFormHandler = async (allCookies : string[], shippingPayload : genShippingPayloadParams) : Promise<any>=> {
    const POSTAddShippingUrl = 'https://www.amazon.com/gp/identity/address/widgets/form/handlers/create-address-form-handler.html';

    let POSTAddShippingConfigData : string = JSON.stringify(shippingPayload)
    
    // does big replace... should make a function to do this automatically instead of manually
    // amazon parsing sucks
    POSTAddShippingConfigData = replaceAll(POSTAddShippingConfigData, '{"deliveryInstructionsDisplayMode":"CDP_ONLY","deliveryInstructionsClientName":"RetailWebsite","deliveryInstructionsDeviceType":"desktop","deliveryInstructionsIsEditAddressFlow":"false"}', '"{\\"deliveryInstructionsDisplayMode\\" : \\"CDP_ONLY\\", \\"deliveryInstructionsClientName\\" : \\"RetailWebsite\\", \\"deliveryInstructionsDeviceType\\" : \\"desktop\\", \\"deliveryInstructionsIsEditAddressFlow\\" : \\"false\\"}"')
    POSTAddShippingConfigData = replaceAll(POSTAddShippingConfigData, '{"initialCountryCode":"US"}', '"{\\"initialCountryCode\\":\\"US\\"}"')

    const POSTAddShippingAddressFormHandlerResponse = await axios({
        method: 'post',
        url: POSTAddShippingUrl,
        headers: {
            "accept": "text/html;charset=UTF-8",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/x-www-form-urlencoded",
            "downlink": "9.1",
            "ect": "4g",
            "rtt": "50",
            "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            referrer: 'https://www.amazon.com/gp/buy/addressselect/handlers/display.html?hasWorkingJavascript=1',
            cookie: joinCookies(allCookies)
        },
        data : 'payLoad=' + encodeURIComponent(POSTAddShippingConfigData)
    })

    if (POSTAddShippingAddressFormHandlerResponse.data.createOrEditAddressResponse.addressId !== null) {
        tsLogger("Successfully added shipping address")
        return POSTAddShippingAddressFormHandlerResponse;
    }
    else {
        tsLogger("Error adding shipping address")
        throw "Error adding shipping address";
    }
}

export const POSTAddShippingAddressFormHandlerRetry : (allCookies : string[], shippingPayload : genShippingPayloadParams) => Promise<AxiosResponse> = requestRetryWrapper(POSTAddShippingAddressFormHandler, {
    baseDelay: 3000,
    numberOfTries: 3,
    consoleRun: 'Adding shipping information',
    consoleError: 'Error adding shipping information'
})

export default POSTAddShippingAddressFormHandler;