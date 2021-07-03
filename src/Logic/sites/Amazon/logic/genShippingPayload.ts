import {
    ProfileShipping,
    ProfileInformation
} from '../../../interfaces/ProfileObject';

interface addressUIWidgetsDeliveryInstructionsDesktopExpanderContextParams {
    "deliveryInstructionsDisplayMode": string, //"CDP_ONLY", 
    "deliveryInstructionsClientName": string, // "RetailWebsite" 
    "deliveryInstructionsDeviceType": string, // "desktop" 
    "deliveryInstructionsIsEditAddressFlow": string // "false",
}

interface addressUIWidgetsDeliveryInstructionsData {
    "initialCountryCode" : string // "US",
}

export interface genShippingPayloadParams {
    "address-ui-widgets-countryCode": string, // "US",
    "address-ui-widgets-enterAddressFullName": string, // "Ian Brash",
    "address-ui-widgets-enterAddressPhoneNumber": string, // "+16158922385",
    "address-ui-widgets-enterAddressLine1": string, // "1105 Holly Tree Farms Rd",
    "address-ui-widgets-enterAddressLine2": string, // "home 1",
    "address-ui-widgets-enterAddressCity": string, // "Brentwood",
    "address-ui-widgets-enterAddressStateOrRegion": string, // "TN",
    "address-ui-widgets-enterAddressPostalCode": string, // "37027",
    "address-ui-widgets-previous-address-form-state-token": string, // "eyJ6aXAiOiJERUYiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiQTI1NktXIn0.MMfU6kMpwX7aGLh6Q4HRoZrCRWz_dZu5o9ieFTXzzlyOn0cHi9wl1A.qLLI8hsrqNfx8lDS.cYzQpVDbc-Bk1N4Ov0qgrNsjYkXakv_fOVVxJolJF1Mc8GahXfZaKlDZ5X6piZY6NOHYxoKT5DGNOOhjt8apeboyFlakA90ZqfOBj7OjRtymC8czD3GTCiW-Pw8QmmtKkpVjD7BOWDB7OL2-95evfrRtzdfkHYimV73dLCAXW9bql3g5M8PgtmPb5Adjc-FQh-NAvkO9HXfnJmG8oKj6lWEIWMt_oSVsIo4xgF3dRw9w2Qw43PXu5MO4_WMelJo3wd-cTkn62-LmceT8ZLHe37jnOkJ6OUFCYzTw4YtpdpnPQaad3GE23dcLzvsP_ECMIWmdJ4GgjFavL4nlpLW-ME4MSODfxO3lQff4-e1QgzPf-xH6aYvoj16YRvVgKt3UwXi6j4afuY9OYKcCZ_Bv-12n7SZY6hMpuZSmBkbQqD0TqA-Rpg36neKRcPa2Sg.w52mQVh7kp87LI-GoEU0Eg",
    "address-ui-widgets-delivery-instructions-desktop-expander-context": addressUIWidgetsDeliveryInstructionsDesktopExpanderContextParams,
    "address-ui-widgets-addressFormButtonText": string, // "useThisAddress",
    "address-ui-widgets-addressFormHideHeading": string, // "false",
    "address-ui-widgets-addressFormHideSubmitButton": string, // "false",
    "address-ui-widgets-enableImportContact": string, // "false",
    "address-ui-widgets-enableAddressDetails": string, // "true",
    "address-ui-widgets-returnLegacyAddressID": string, // string, // "false",
    "address-ui-widgets-enableDeliveryInstructions": string, // "true",
    "address-ui-widgets-enableAddressWizardInlineSuggestions": string, // "true",
    "address-ui-widgets-enableEmailAddress": string, // "false",
    "address-ui-widgets-enableAddressTips": string, // "false",
    "address-ui-widgets-amazonBusinessGroupId": string, // "",
    "address-ui-widgets-enableAddressWizardForm": string, // "true",
    "address-ui-widgets-delivery-instructions-data": addressUIWidgetsDeliveryInstructionsData,
    "address-ui-widgets-address-wizard-interaction-id": string, // "698c3310-b1cd-40c1-a05f-baa6f05bd933",
    "address-ui-widgets-obfuscated-customerId": string, // "A25HA1HE1RD42U",
    "address-ui-widgets-locationData": string, // "",
    "address-ui-widgets-locale": string, // "",
    "hasWorkingJavascript": string, // "1",
    "purchaseId": string, // "106-2873896-2015404"
} 

interface DynamicShippingPayloadParams {
    "address-ui-widgets-previous-address-form-state-token": string, // "eyJ6aXAiOiJERUYiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiQTI1NktXIn0.MMfU6kMpwX7aGLh6Q4HRoZrCRWz_dZu5o9ieFTXzzlyOn0cHi9wl1A.qLLI8hsrqNfx8lDS.cYzQpVDbc-Bk1N4Ov0qgrNsjYkXakv_fOVVxJolJF1Mc8GahXfZaKlDZ5X6piZY6NOHYxoKT5DGNOOhjt8apeboyFlakA90ZqfOBj7OjRtymC8czD3GTCiW-Pw8QmmtKkpVjD7BOWDB7OL2-95evfrRtzdfkHYimV73dLCAXW9bql3g5M8PgtmPb5Adjc-FQh-NAvkO9HXfnJmG8oKj6lWEIWMt_oSVsIo4xgF3dRw9w2Qw43PXu5MO4_WMelJo3wd-cTkn62-LmceT8ZLHe37jnOkJ6OUFCYzTw4YtpdpnPQaad3GE23dcLzvsP_ECMIWmdJ4GgjFavL4nlpLW-ME4MSODfxO3lQff4-e1QgzPf-xH6aYvoj16YRvVgKt3UwXi6j4afuY9OYKcCZ_Bv-12n7SZY6hMpuZSmBkbQqD0TqA-Rpg36neKRcPa2Sg.w52mQVh7kp87LI-GoEU0Eg",
    "address-ui-widgets-address-wizard-interaction-id": string, // "698c3310-b1cd-40c1-a05f-baa6f05bd933",
    "address-ui-widgets-obfuscated-customerId": string, // "A25HA1HE1RD42U",
    "purchaseId": string, // "106-2873896-2015404"
}

const genShippingPayload = (information : ProfileInformation, shipping : ProfileShipping, dynamicParams : DynamicShippingPayloadParams) : genShippingPayloadParams => {


    const {
        firstName,
        lastName,
        address1,
        address2,
        zip,
        city,
        // state,
        // country
    } = shipping;

    const {
        phone
    } = information;

    const payload : genShippingPayloadParams = {
        "address-ui-widgets-countryCode": "US",
        "address-ui-widgets-enterAddressFullName": firstName + " " + lastName,
        "address-ui-widgets-enterAddressPhoneNumber": phone, // "+16158922385",
        "address-ui-widgets-enterAddressLine1": address1, // "1105 Holly Tree Farms Rd",
        "address-ui-widgets-enterAddressLine2": address2, // "home 1",
        "address-ui-widgets-enterAddressCity": city, // "Brentwood",
        "address-ui-widgets-enterAddressStateOrRegion": "TN", // "TN",
        "address-ui-widgets-enterAddressPostalCode": zip, // "37027",
        "address-ui-widgets-previous-address-form-state-token": dynamicParams['address-ui-widgets-previous-address-form-state-token'], // "eyJ6aXAiOiJERUYiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiQTI1NktXIn0.MMfU6kMpwX7aGLh6Q4HRoZrCRWz_dZu5o9ieFTXzzlyOn0cHi9wl1A.qLLI8hsrqNfx8lDS.cYzQpVDbc-Bk1N4Ov0qgrNsjYkXakv_fOVVxJolJF1Mc8GahXfZaKlDZ5X6piZY6NOHYxoKT5DGNOOhjt8apeboyFlakA90ZqfOBj7OjRtymC8czD3GTCiW-Pw8QmmtKkpVjD7BOWDB7OL2-95evfrRtzdfkHYimV73dLCAXW9bql3g5M8PgtmPb5Adjc-FQh-NAvkO9HXfnJmG8oKj6lWEIWMt_oSVsIo4xgF3dRw9w2Qw43PXu5MO4_WMelJo3wd-cTkn62-LmceT8ZLHe37jnOkJ6OUFCYzTw4YtpdpnPQaad3GE23dcLzvsP_ECMIWmdJ4GgjFavL4nlpLW-ME4MSODfxO3lQff4-e1QgzPf-xH6aYvoj16YRvVgKt3UwXi6j4afuY9OYKcCZ_Bv-12n7SZY6hMpuZSmBkbQqD0TqA-Rpg36neKRcPa2Sg.w52mQVh7kp87LI-GoEU0Eg",
        "address-ui-widgets-delivery-instructions-desktop-expander-context": {
            "deliveryInstructionsDisplayMode": "CDP_ONLY", //"CDP_ONLY", 
            "deliveryInstructionsClientName": "RetailWebsite", // "RetailWebsite" 
            "deliveryInstructionsDeviceType": "desktop", // "desktop" 
            "deliveryInstructionsIsEditAddressFlow": "false" // "false",
        },
        "address-ui-widgets-addressFormButtonText": "useThisAddress", // "useThisAddress",
        "address-ui-widgets-addressFormHideHeading": "false", // "false",
        "address-ui-widgets-addressFormHideSubmitButton": "false", // "false",
        "address-ui-widgets-enableImportContact": "false", // "false",
        "address-ui-widgets-enableAddressDetails": "true", // "true",
        "address-ui-widgets-returnLegacyAddressID": "false", // "false",
        "address-ui-widgets-enableDeliveryInstructions": "true", // "true",
        "address-ui-widgets-enableAddressWizardInlineSuggestions": "true", // "true",
        "address-ui-widgets-enableEmailAddress": "false", // "false",
        "address-ui-widgets-enableAddressTips": "false", // "false",
        "address-ui-widgets-amazonBusinessGroupId": "", // "",
        "address-ui-widgets-enableAddressWizardForm": "true", // "true",
        "address-ui-widgets-delivery-instructions-data": {
            "initialCountryCode" : "US" // "US",
        },
        "address-ui-widgets-address-wizard-interaction-id": dynamicParams['address-ui-widgets-address-wizard-interaction-id'], // "698c3310-b1cd-40c1-a05f-baa6f05bd933",
        "address-ui-widgets-obfuscated-customerId": dynamicParams['address-ui-widgets-obfuscated-customerId'], // "A25HA1HE1RD42U",
        "address-ui-widgets-locationData": "", // "",
        "address-ui-widgets-locale": "", // "",
        "hasWorkingJavascript": "1", // "1",
        /** All of the below can be found within the html */
        "purchaseId": dynamicParams['purchaseId'], // "106-2873896-2015404"
    }

    return payload;
}

export default genShippingPayload;


// // add address payload when editing
// let p1 = {
//     // when editing?
//     "address-ui-widgets-original-address-id": "WDTEKBVUPSGNVV4FXHFUG1224DR1EH1AHA25HA1HE1RD42UPXTQ2EIA2OXTVYY2R",
//     "address-ui-widgets-countryCode": "US",
//     "address-ui-widgets-enterAddressFullName": "Ian Bra%#s+h+",
//     "address-ui-widgets-enterAddressPhoneNumber": "6158922835",
//     "address-ui-widgets-enterAddressLine1": "104 JEFFERSON SQ 104",
//     "address-ui-widgets-enterAddressLine2": "104",
//     "address-ui-widgets-enterAddressCity": "NASHVILLE",
//     "address-ui-widgets-enterAddressStateOrRegion": "TN",
//     "address-ui-widgets-enterAddressPostalCode": "37215-3701",
//     "address-ui-widgets-previous-address-form-state-token": "eyJ6aXAiOiJERUYiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiQTI1NktXIn0.PoLdikdXEyanaB_k1351tHVZwU6OxCA3cAOELzOE4vPSD05fg4a5Rw.TwYxvCXRkv-I3ooY.wapeA4jY54RPwcozS0oC2n5fpWGUGSUnFyoMaSVOMAK1MT9IkP6jcSwlXx4nNENEXA0kNXmu1QNAF6dn71YmVt1cbo9Kzi3TwgaL2fdooK54bVyvQ4Js5giydIzzdSxh337oF_KK8iwLXQ4lc8_jcO_q5L3C2xdCilClPUgccvsAJhpmGpqifiLBx1ie4gy1FEZ9_gioDhT-oehQGo9rLXXde6ro4A_RMS9ZxxzvG3OLczyg7ixf8AJ6oYyqh1uKBrX5A415qG0fOHE9iL9FqObWHLKI4AOD2Q-cGmbXZAbSCFTcuyHOaohhYNFQ6qle4t7Qn4H9PaSUmkykfxJ_uGcMg86VcBNS3S78BQgFvUb8agZvQHzPkavyka4957MdvcnJEUq9hykvuZwsYtx5znpZQSlkRJMECma3Q9hArGr-YaYTwNVfjNHL1IuruRRoMUjHEBTNvuqmPaIq5XWeXKmzccZYOOUrH1adv34UThK8MfTV6OGBMRI.yVFjoGsK7BT3JKZwIMb0_g",
//     "address-ui-widgets-delivery-instructions-desktop-expander-context": "{\"deliveryInstructionsDisplayMode\" : \"CDP_ONLY\", \"deliveryInstructionsClientName\" : \"RetailWebsite\", \"deliveryInstructionsDeviceType\" : \"desktop\", \"deliveryInstructionsIsEditAddressFlow\" : \"true\"}",
//     "address-ui-widgets-addressFormButtonText": "useThisAddress",
//     "address-ui-widgets-addressFormHideHeading": "false",
//     "address-ui-widgets-addressFormHideSubmitButton": "false",
//     "address-ui-widgets-enableImportContact": "false",
//     "address-ui-widgets-enableAddressDetails": "true",
//     "address-ui-widgets-returnLegacyAddressID": "false",
//     "address-ui-widgets-enableDeliveryInstructions": "true",
//     "address-ui-widgets-enableAddressWizardInlineSuggestions": "true",
//     "address-ui-widgets-enableEmailAddress": "false",
//     "address-ui-widgets-enableAddressTips": "false",
//     "address-ui-widgets-amazonBusinessGroupId": "",
//     "address-ui-widgets-enableAddressWizardForm": "true",
//     "address-ui-widgets-delivery-instructions-data": "{\"initialCountryCode\":\"US\"}",
//     "address-ui-widgets-address-wizard-interaction-id": "8d289381-8e92-431c-b098-c41ba96c971e",
//     "address-ui-widgets-obfuscated-customerId": "A25HA1HE1RD42U",
//     "address-ui-widgets-locationData": "",
//     "address-ui-widgets-locale": "",
//     "purchaseId": "106-2873896-2015404"
// }

// // payload for adding
// const p2 = {
//     "address-ui-widgets-countryCode": "US",
//     "address-ui-widgets-enterAddressFullName": "Ian Brash",
//     "address-ui-widgets-enterAddressPhoneNumber": "+16158922385",
//     "address-ui-widgets-enterAddressLine1": "1105 Holly Tree Farms Rd",
//     "address-ui-widgets-enterAddressLine2": "home 1",
//     "address-ui-widgets-enterAddressCity": "Brentwood",
//     "address-ui-widgets-enterAddressStateOrRegion": "TN",
//     "address-ui-widgets-enterAddressPostalCode": "37027",
//     "address-ui-widgets-previous-address-form-state-token": "eyJ6aXAiOiJERUYiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiQTI1NktXIn0.MMfU6kMpwX7aGLh6Q4HRoZrCRWz_dZu5o9ieFTXzzlyOn0cHi9wl1A.qLLI8hsrqNfx8lDS.cYzQpVDbc-Bk1N4Ov0qgrNsjYkXakv_fOVVxJolJF1Mc8GahXfZaKlDZ5X6piZY6NOHYxoKT5DGNOOhjt8apeboyFlakA90ZqfOBj7OjRtymC8czD3GTCiW-Pw8QmmtKkpVjD7BOWDB7OL2-95evfrRtzdfkHYimV73dLCAXW9bql3g5M8PgtmPb5Adjc-FQh-NAvkO9HXfnJmG8oKj6lWEIWMt_oSVsIo4xgF3dRw9w2Qw43PXu5MO4_WMelJo3wd-cTkn62-LmceT8ZLHe37jnOkJ6OUFCYzTw4YtpdpnPQaad3GE23dcLzvsP_ECMIWmdJ4GgjFavL4nlpLW-ME4MSODfxO3lQff4-e1QgzPf-xH6aYvoj16YRvVgKt3UwXi6j4afuY9OYKcCZ_Bv-12n7SZY6hMpuZSmBkbQqD0TqA-Rpg36neKRcPa2Sg.w52mQVh7kp87LI-GoEU0Eg",
//     "address-ui-widgets-delivery-instructions-desktop-expander-context": "{\"deliveryInstructionsDisplayMode\" : \"CDP_ONLY\", \"deliveryInstructionsClientName\" : \"RetailWebsite\", \"deliveryInstructionsDeviceType\" : \"desktop\", \"deliveryInstructionsIsEditAddressFlow\" : \"false\"}",
//     "address-ui-widgets-addressFormButtonText": "useThisAddress",
//     "address-ui-widgets-addressFormHideHeading": "false",
//     "address-ui-widgets-addressFormHideSubmitButton": "false",
//     "address-ui-widgets-enableImportContact": "false",
//     "address-ui-widgets-enableAddressDetails": "true",
//     "address-ui-widgets-returnLegacyAddressID": "false",
//     "address-ui-widgets-enableDeliveryInstructions": "true",
//     "address-ui-widgets-enableAddressWizardInlineSuggestions": "true",
//     "address-ui-widgets-enableEmailAddress": "false",
//     "address-ui-widgets-enableAddressTips": "false",
//     "address-ui-widgets-amazonBusinessGroupId": "",
//     "address-ui-widgets-enableAddressWizardForm": "true",
//     "address-ui-widgets-delivery-instructions-data": "{\"initialCountryCode\":\"US\"}",
//     "address-ui-widgets-address-wizard-interaction-id": "698c3310-b1cd-40c1-a05f-baa6f05bd933",
//     "address-ui-widgets-obfuscated-customerId": "A25HA1HE1RD42U",
//     "address-ui-widgets-locationData": "",
//     "address-ui-widgets-locale": "",
//     "hasWorkingJavascript": "1",
//     "purchaseId": "106-2873896-2015404"
// }