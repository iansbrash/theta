import electron from 'electron';
import timestampLogger from '../../../Logic/logger';
import { accumulateCookies, getValueByDelimiters, returnParsedCookies } from '../../../Logic/requestFunctions';
import WalmartATC from '../../../Logic/sites/Walmart/flow/atc/WalmartATC';
import WalmartGETProduct from '../../../Logic/sites/Walmart/flow/atc/WalmartGETProduct';
import WalmartContinueAsGuest from '../../../Logic/sites/Walmart/flow/checkout/initialize/WalmartContinueAsGuest';
import WalmartGETCheckout from '../../../Logic/sites/Walmart/flow/checkout/initialize/WalmartGETCheckout';
import WalmartPOSTCreditCard from '../../../Logic/sites/Walmart/flow/checkout/payment/WalmartPOSTCreditCard';
import WalmartAddShippingAddress from '../../../Logic/sites/Walmart/flow/checkout/shipping/WalmartAddShippingAddress';
import WalmartGETDeliveryOptions from '../../../Logic/sites/Walmart/flow/checkout/shipping/WalmartGETDeliveryOptions';
import WalmartPOSTFulfillment from '../../../Logic/sites/Walmart/flow/checkout/shipping/WalmartPOSTFulfillment';
import WalmartPOSTShippingAddress from '../../../Logic/sites/Walmart/flow/checkout/shipping/WalmartPOSTShippingAddress';
import WalmartPUTLocationResponse from '../../../Logic/sites/Walmart/flow/checkout/shipping/WalmartPUTLocationResponse';
import { voltageEncrypt } from '../../../Logic/sites/Walmart/logic/voltageEncrypt';
import flow from '../../../Logic/sites/Walmart/flow/checkout';
import WalmartPOSTPayment from '../../../Logic/sites/Walmart/flow/checkout/payment/WalmartPOSTPayment';
import WalmartSubmitOrder from '../../../Logic/sites/Walmart/flow/checkout/payment/WalmartSubmitOrder';
import constructError from '../../errorConstructor';
const atc = () => {

    electron.ipcMain.handle('WalmartTestFlow', async (event, ...args) => {
        await flow();

        return;
    })

    electron.ipcMain.handle('TESTWALMART', async (event, ...args) => {
        var axios = require('axios');
        // var data = JSON.stringify({
        // "offerId": "BA7B0E82900F49198D4660D59EB964D6",
        // "quantity": 1,
        // "location": {
        //     "postalCode": "29928",
        //     "city": "Hilton Head Island",
        //     "state": "SC",
        //     "isZipLocated": true
        // },
        // "shipMethodDefaultRule": "SHIP_RULE_1",
        // "storeIds": [
        //     728,
        //     6395,
        //     2832,
        //     606,
        //     1383
        // ]
        // });

        // let res = await axios({
        //     method: 'post',
        //     url: 'https://www.walmart.com/api/v3/cart/:CRT/items',
        //     headers: { 
        //         'authority': 'www.walmart.com', 
        //         'pragma': 'no-cache', 
        //         'cache-control': 'no-cache', 
        //         'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"', 
        //         'accept': 'application/json', 
        //         'dnt': '1', 
        //         'sec-ch-ua-mobile': '?0', 
        //         'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36', 
        //         'content-type': 'application/json', 
        //         'origin': 'https://www.walmart.com', 
        //         'sec-fetch-site': 'same-origin', 
        //         'sec-fetch-mode': 'cors', 
        //         'sec-fetch-dest': 'empty', 
        //         'referer': 'https://www.walmart.com/ip/Peet-s-Coffee-Major-Dickason-s-Blend-Dark-Roast-Whole-Bean-Coffee-10-5-oz-Bag/262003157?athcpid=262003157&athpgid=athenaItemPage&athcgid=null&athznid=PWVUB&athieid=v0&athstid=CS020&athguid=2fb5f9d6-007-17b26d47f70d9d&athancid=null&athena=true', 
        //         'accept-language': 'en-US,en;q=0.9', 
        //         'cookie': 'next-day=null|false|true|null|1628444065; location-data=29928%3AHilton%20Head%20Island%3ASC%3A%3A1%3A1|k8%3B%3B3.58%2C4xn%3B%3B8.78%2C26o%3B%3B16.52%2Cgu%3B%3B16.84%2C12f%3B%3B18.06%2C5jh%3B%3B18.22%2Cgt%3B%3B22.8%2C534%3B%3B25.26%2C3hu%3B%3B25.33%2C3ik%3B%3B27.62||7|1|1y80%3B16%3B6%3B20.63; DL=29928%2C%2C%2Cip%2C29928%2C%2C; TB_Latency_Tracker_100=1; TB_Navigation_Preload_01=1; TB_DC_Flap_Test=1; vtc=aN4Gy0fCcQX0yY4nJnD1bM; bstc=aN4Gy0fCcQX0yY4nJnD1bM; mobileweb=0; xpa=; xpm=3%2B1628444065%2BaN4Gy0fCcQX0yY4nJnD1bM~%2B0; _pxhd=K-xXAstNSNczEWXeoOBGTyLY2A0wfA76ZFK9xNzwEFbEeeu-k3IWGlROK7ZrqzJlAbvuomv6lp0nvipXRd0SOg==:mA30dMn-QhAJug5IOroYA18uBz-nhJFUpDq4vlnLhN4Fe8S0BVJcMoG4fMM5kIDKJP2GYrlJDs6/ELCmo-HZGbgxMjjQoPYdpdZ-IUworxY=; TS013ed49a=01538efd7c5c806f7e495c68d1b3efb70356503c5acab3f7e7e1d39b8d657fdfd942218fa433e34ee24868fdebde57e6313f73d75c; TBV=7; tb_sw_supported=true; TB_SFOU-100=1; athrvi=RVI~hf9dd9d5-h13c01f2; ACID=edfc3a00-fbf0-4b39-94ae-3dc30a74a69d; hasACID=1; CRT=7c0842f5-7913-43bd-b53e-e758fb54a4b2; hasCRT=1; type=GUEST; auth=MTAyOTYyMDE4%2ByOM%2BRPUan77bOfuEx1ISY9A%2FnC499kGmyJge0337HX5grPecrU2YpARc8UAICl2ZM8gC1KkMOVQkkqPbRhsqn1g%2FgFthgb9akBQFwtjfP5jz16rTRULULUvxaBVIdlU767wuZloTfhm7Wk2KcjyglM949MaUzwsNnQKx2EXSLmU2Ugvl9IbSWORAiuy6e4cbxC%2B5JIxMjHQV0MympSVZDFQYBehaW98kaUbNr1Rk2sUMk70P8glgOEpLOprhDfMywI05adPtwc9%2Fm5r1ONHR0U%2BHXaPDhdIU93GANjt70spId9jAK%2BSUP7NETm8w7xGD0kwp1EPRG5hUpAL0ItlWYLcIWAcQaQ6vDVxANGSfJEt5Kgo9tTOedHpnWM3lfCNwnUrysku9rUl7qPlSFt92Q%3D%3D; akavpau_p1=1628444679~id=97975404f0a399d51a0c3a0464fe9c2f; tb-c30=scus-t1; TS01b0be75=01538efd7c2e7c2b32aff7354c39a1b465baacb97a84633bcaf7700e4552a3eb54222226f0d6bc66cfff1c77a82598fd9d19c1ba4c; cart-item-count=0; com.wm.reflector="reflectorid:0000000000000000000000@lastupd:1628444582460@firstcreate:1628444065650"; akavpau_p8=1628445187~id=26ad51a3a6dbb17310778790ccafcd8e; CRT=7c0842f5-7913-43bd-b53e-e758fb54a4b2; TS013ed49a=01538efd7c5c806f7e495c68d1b3efb70356503c5acab3f7e7e1d39b8d657fdfd942218fa433e34ee24868fdebde57e6313f73d75c; bstc=aN4Gy0fCcQX0yY4nJnD1bM; hasCRT=1; mobileweb=0; tb-c30=scus-t1; vtc=aN4Gy0fCcQX0yY4nJnD1bM; xpa=; xpm=3%2B1628444065%2BaN4Gy0fCcQX0yY4nJnD1bM~%2B0; TS01b0be75=01538efd7cad157cb8f21ac836b34393d1d99aee8686fa78eed6d8f8d57dd838f10eeb65e878bc0dd25cfcd4be09303f2a15ba0dda'
        //     },
        //     data : data
        //     })

        //     console.log(res.data)

            var data2 = JSON.stringify({
            "offerId": "BCF6CF461A96487489A3E677E7D51102",
            "quantity": 1,
            "storeIds": [
                728,
                6395,
                2832,
                606,
                1383
            ],
            "location": {
                "postalCode": "29928",
                "city": "Hilton Head Island",
                "state": "SC",
                "isZipLocated": true
            },
            "shipMethodDefaultRule": "SHIP_RULE_1"
            });


            let res2 = await axios({
                method: 'post',
                url: 'https://www.walmart.com/api/v3/cart/guest/:CID/items',
                headers: { 
                    'authority': 'www.walmart.com', 
                    'pragma': 'no-cache', 
                    'cache-control': 'no-cache', 
                    'accept': 'application/json', 
                    'dnt': '1', 
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36', 
                    'content-type': 'application/json', 
                    'origin': 'https://www.walmart.com', 
                    'sec-fetch-site': 'same-origin', 
                    'sec-fetch-mode': 'cors', 
                    'sec-fetch-dest': 'empty', 
                    'referer': 'https://www.walmart.com/ip/Dunkin-Original-Blend-Medium-Roast-Coffee-30-Ounce-Canister/118940370?wpa_ref_id=wpaqs:353Bk27KkrpeQFGDXKhLo-P-lVvgY2FBaY_xRQPSovKldL6qCzRD1sHN5Oq9FyQlgQSJ6odAn4kKNkJmVifRIHdUVlRKMweEJGSJQ-6BOVMjdOukZTPIcKJu5qM_Ccn-&wpa_bd=1628428353657&adpgm=wpa&athcpid=118940370&athpgid=athenaItemPage&athcgid=null&athznid=PWVUB&athieid=v0&athstid=CS098&athguid=36bdd20b-007-17b26edefbfae0&athposb=2&athena=true&wpa_pg=item&wpa_pg_id=20709874&wpa_st=Starbucks%2BDark%2BRoast%2BWhole%2BBean%2BCoffee%2B%2BSumatra%2B%2B100%2BArabica%2B%2B1%2Bbag%2B12%2Boz&wpa_tax=976759_1086446_1229652&wpa_bucket=PWVUB&wpa_pos=5&wpa_aduid=190f6890-93cd-4ec3-8b34-a7e0bc370abf&wpa_plmt=1145x1145_B-C-OG_TI_1-21_P13n-Carousel-PWVUB-contentZoneTop1', 
                    'accept-language': 'en-US,en;q=0.9', 
                    'cookie': 'next-day=null|false|true|null|1628445732; CRT=2045e489-b370-4873-9e33-8ddae1864e29; location-data=29928%3AHilton%20Head%20Island%3ASC%3A%3A1%3A1|k8%3B%3B3.58%2C4xn%3B%3B8.78%2C26o%3B%3B16.52%2Cgu%3B%3B16.84%2C12f%3B%3B18.06%2C5jh%3B%3B18.22%2Cgt%3B%3B22.8%2C534%3B%3B25.26%2C3hu%3B%3B25.33%2C3ik%3B%3B27.62||7|1|1y80%3B16%3B6%3B20.63; DL=29928%2C%2C%2Cip%2C29928%2C%2C; TB_Latency_Tracker_100=1; TB_Navigation_Preload_01=1; TB_DC_Flap_Test=0; vtc=TnWC9hOC5XQVClA8pb6jMo; bstc=TnWC9hOC5XQVClA8pb6jMo; mobileweb=0; xpa=; xpm=3%2B1628445732%2BTnWC9hOC5XQVClA8pb6jMo~%2B0; _pxhd=FxOIJ-ZAMqJlpptyhZH-xREOv/PAvLG/IFBKg0DtZB/HOuomEmBRysZT3mde299dSqQ-a5jo9kcCxNB2OQiddA==:DrCIrkG8BcGuYVpVWChanb7bAmiWj4HFpvNEbpkhbV3FPi8Hb0RfhGFp0iBB1ZN3bMCu1BMMY8x6aAMKTpkZHRQtHTvdiNU5Wn4MKOW9Cpg=; TS01b0be75=01538efd7c24e879455d4bc3c47629f0311de8db90a1e9497301fed994a0f2659c437dfe22b50a9508696c8e6a945524592d3d5813; TS013ed49a=01538efd7c24e879455d4bc3c47629f0311de8db90a1e9497301fed994a0f2659c437dfe22b50a9508696c8e6a945524592d3d5813; TBV=7; cart-item-count=0; tb_sw_supported=true; TB_SFOU-100=1; com.wm.reflector="reflectorid:0000000000000000000000@lastupd:1628445737660@firstcreate:1628445732800"; akavpau_p8=1628446338~id=ba19b8126774f1cc4bb3bd289fa33e8b; athrvi=RVI~h716e2d2-h13c01f2; TS013ed49a=01538efd7c24e879455d4bc3c47629f0311de8db90a1e9497301fed994a0f2659c437dfe22b50a9508696c8e6a945524592d3d5813; auth=MTAyOTYyMDE4%2FQ8JjVBb0Js8tYf5YrpdvGa%2FuiW%2BBaYX%2FAw3OiM1tzIeuA1xADa2tvlkOL0NjU31SCoWKLT0wG40mmt9gAc4mAyMvy2r%2B%2Bzq%2FypCijczb8c5tGFnSP%2FEQLqsFP5vzi1P767wuZloTfhm7Wk2KcjygobRHThsmZk%2BGcqTfIab85TmWicMOWMK93AeKqJoii538v34jpk1Vn2lrFS7xrzGchwBep1Svg5fDS6Fpn1KaXUUMk70P8glgOEpLOprhDfMywI05adPtwc9%2Fm5r1ONHR%2Bly7Q2pnsfz8YQjSjsCJ%2BzrBMuglCHA5wr4%2BivNIn2i%2FlxqtmO1awRg4IM5isyOj7XReWAswpXJeYkgV3lOkcjxxP3PEMmrdI0eCKxcIuYKtH%2B4rEYS4dN6ChRLZGobLg%3D%3D; bstc=TnWC9hOC5XQVClA8pb6jMo; hasACID=1; hasCRT=1; mobileweb=0; tb-c30=wus-t1; type=GUEST; vtc=TnWC9hOC5XQVClA8pb6jMo; xpa=; xpm=3%2B1628445732%2BTnWC9hOC5XQVClA8pb6jMo~%2B0'
                },
                data : data2
                })
                console.log("RES2")
                console.log(res2.data)


        return;
    })

    


    electron.ipcMain.handle('WalmartGETProduct', async (event, ...args) => {
        // args:
        // allCookies, product, proxy
        let allCookies = args[0];
        const productUrl = args[1];
        const proxy = args[2];
 
    
        // res is cookies
        const GETProductResponse = await WalmartGETProduct(allCookies, productUrl, proxy);

        allCookies = accumulateCookies(allCookies, returnParsedCookies(GETProductResponse.headers['set-cookie']) )

        const productTitle = getValueByDelimiters(GETProductResponse.data, '<h1 class="prod-ProductTitle prod-productTitle-buyBox font-bold" content="', '" itemprop="name">')
        const offerId = getValueByDelimiters(GETProductResponse.data, '"offerId":"', '"');
        let stores : any = getValueByDelimiters(GETProductResponse.data, '"stores":[{', '}]')
        // console.log(stores)
        let storesObject : object[];
        try {
            storesObject = JSON.parse(`[{${stores}}]`)
        }
        catch (err) {
            console.error("Error parsing " + `[{${stores}}]`);
            return;
        }
        // console.log(storesObject);
        timestampLogger(`Found product: ${productTitle}`)
        timestampLogger(`Found offerId: ${offerId}`)
        timestampLogger(`Found ${storesObject.length} stores`)
        return {
            allCookies: allCookies,
            storage: {
                offerId,
                storesObject
            },
            // extraData
            productTitle: productTitle
        }
    })

    electron.ipcMain.handle('WalmartATC', async (event, ...args) => {
        // args:
        // allCookies, product, proxy
        let allCookies = args[0];
        const productUrl = args[1];
        const offerId = args[2];
        const storesObject = args[3];
        const proxy = args[4];

        // console.log(allCookies)
        // console.log(productUrl)
        // console.log(offerId)
        // console.log(storesObject)
        // console.log(proxy)
    
        // 400 = offerId is invalid
        const ATCResponse = await WalmartATC(allCookies, productUrl, offerId, storesObject.map((so : any) => parseInt(so.storeId)), proxy)


        allCookies = accumulateCookies(allCookies, returnParsedCookies(ATCResponse.headers['set-cookie']) )
        return {
            allCookies: allCookies,
        }
    })

    electron.ipcMain.handle('WalmartGETCheckout', async (event, ...args) => {
        // args:
        // allCookies, product, proxy
        let allCookies = args[0];
        const proxy = args[1];
 
    
        const GETCheckoutResponse = await WalmartGETCheckout(allCookies, proxy)

        let itemId = GETCheckoutResponse.data.items[0].id
        allCookies = accumulateCookies(allCookies, returnParsedCookies(GETCheckoutResponse.headers['set-cookie']))

        return {
            allCookies: allCookies,
            storage: {
                itemId
            }
        }
    })

    electron.ipcMain.handle('WalmartContinueAsGuest', async (event, ...args) => {
        // args:
        // allCookies, proxy
        let allCookies = args[0];
        const proxy = args[1];
 
    
        const ContinueAsGuestResponse = await WalmartContinueAsGuest(allCookies, proxy)

        allCookies = accumulateCookies(allCookies, returnParsedCookies(ContinueAsGuestResponse.headers['set-cookie']))



        let cagStoreList = ContinueAsGuestResponse.data.stores;
        let storeIds = cagStoreList[0] ? [cagStoreList[0].storeId] : [];
        for (let i = 1; i < cagStoreList.length; i++) {
            if (cagStoreList[i].types.length === 0 /**.includes("pick_up_location") */ ) {
                let l = storeIds.push(cagStoreList[i].storeId);
                if (l > 9) break;
            }
        }

        return {
            allCookies: allCookies,
            storage: {
                storeIds
            }
        }
    })

    electron.ipcMain.handle('WalmartGETDeliveryOptions', async (event, ...args) => {
        // args:
        // allCookies, product, proxy
        let allCookies = args[0];
        const storeIds = args[1];
        const proxy = args[2];
 
    
        const GETDeliveryOptionsResponse = await WalmartGETDeliveryOptions(allCookies, storeIds, proxy)

        allCookies = accumulateCookies(allCookies, returnParsedCookies(GETDeliveryOptionsResponse.headers['set-cookie']))


        // console.log(GETDeliveryOptionsResponse.data)


        timestampLogger("Selecting delivery method")

        let fulfillmentSelection = GETDeliveryOptionsResponse.data.items[0].fulfillmentSelection;

        

        return {
            allCookies: allCookies,
            storage: {
                fulfillmentSelection
            }
        }
    })

    electron.ipcMain.handle('WalmartPOSTFulfillment', async (event, ...args) => {
        // args:
        // allCookies, product, proxy
        let allCookies = args[0];
        const itemId = args[1];
        const fulfillmentSelection = args[2]
        const proxy = args[3];
 
    
        const SelectDeliveryMethodResponse = await WalmartPOSTFulfillment(allCookies, itemId, fulfillmentSelection.fulfillmentOption, fulfillmentSelection.shipMethod, proxy)

        allCookies = accumulateCookies(allCookies, returnParsedCookies(SelectDeliveryMethodResponse.headers['set-cookie']))

        

        return {
            allCookies: allCookies,
        }
    })

    electron.ipcMain.handle('WalmartAddShippingAddress', async (event, ...args) => {
        // args:
        // allCookies, product, proxy
        let allCookies = args[0];
        const shipping = args[1];
        const proxy = args[2];
 
    
        const AddShippingAddressReponse = await WalmartAddShippingAddress(allCookies, shipping, proxy)

        // console.log(AddShippingAddressReponse.data)

        // Aka Walmart prompts us to update address
        if (AddShippingAddressReponse.data.avsStatus === 'FAILURE') {

        }
        allCookies = accumulateCookies(allCookies, returnParsedCookies(AddShippingAddressReponse.headers['set-cookie']))

        

        return {
            allCookies: allCookies,
        }
    })

    electron.ipcMain.handle('WalmartPUTLocationResponse', async (event, ...args) => {
        // args:
        // allCookies, product, proxy
        let allCookies = args[0];
        const shipping = args[1];
        const proxy = args[2];
 
        timestampLogger("tHE FUCK IS GOING ON HERER")
    
        const PUTLocationResponse = await WalmartPUTLocationResponse(allCookies, shipping, proxy)
        timestampLogger("wh")

        allCookies = accumulateCookies(allCookies, returnParsedCookies(PUTLocationResponse.headers['set-cookie']))
        // console.log(PUTLocationResponse.data)
    
    
        let storeObjArray = PUTLocationResponse.data.stores;
        let storeList = storeObjArray[0] ? [{
            id: storeObjArray[0].id,
            address: storeObjArray[0].address,
            storeType: {
                id: storeObjArray[0].storeType.id,
                name: storeObjArray[0].storeType.displayName,
                displayName: storeObjArray[0].displayName
            },
            customerInfo: {
                distance: storeObjArray[0].distance,
                "isPreferred": false,
                "isWithinRange": true
            }
        }] : [];
        for (let i = 1; i < storeObjArray.length; i++) {
            if (storeObjArray[i].types.includes("gsf_store")) {
                let l = storeList.push({
                    id: storeObjArray[i].id,
                    address: storeObjArray[i].address,
                    storeType: {
                        id: storeObjArray[i].storeType.id,
                        name: storeObjArray[i].storeType.displayName,
                        displayName: storeObjArray[i].displayName
                    },
                    customerInfo: {
                        distance: storeObjArray[i].distance,
                        "isPreferred": false,
                        "isWithinRange": true
                    }
                })
    
                if (l > 9) break;
            }
        }

        return {
            allCookies: allCookies,
            storage: {
                storeList
            }
        }
    })

    electron.ipcMain.handle('WalmartPOSTShippingAddress', async (event, ...args) => {
        // args:
        // allCookies, product, proxy
        let allCookies = args[0];
        const profile = args[1];
        const storeList = args[2];
        const proxy = args[3];
 
    
        const POSTShippingAddressResponse = await WalmartPOSTShippingAddress(allCookies, profile, storeList, proxy)

        allCookies = accumulateCookies(allCookies, returnParsedCookies(POSTShippingAddressResponse.headers['set-cookie']))

        

        return {
            allCookies: allCookies,
        }
    })

    electron.ipcMain.handle('WalmartPOSTCreditCard', async (event, ...args) => {
        // args:
        // allCookies, product, proxy
        let allCookies = args[0];
        const profile = args[1];
        const proxy = args[2];
 
       // make this an api call
        const voltageEncryptedData : string[][] = await voltageEncrypt(profile.payment.number, profile.payment.cvv)


        const POSTCreditCardResponse =  await WalmartPOSTCreditCard(allCookies, profile, voltageEncryptedData, proxy)

        allCookies = accumulateCookies(allCookies, returnParsedCookies(POSTCreditCardResponse.headers['set-cookie']))
        

        return {
            allCookies: allCookies,
            storage: {
                voltageEncryptedData,
                POSTCreditCardResponseData: POSTCreditCardResponse.data
            }
        }
    })

    electron.ipcMain.handle('WalmartPOSTPayment', async (event, ...args) => {
        // args:
        // allCookies, product, proxy
        let allCookies = args[0];
        const profile = args[1];
        const voltageEncryptedData = args[2];
        const POSTCreditCardResponseData = args[3];
        const proxy = args[4];
 
       // make this an api call
        // const voltageEncryptedData : string[][] = await voltageEncrypt(profile.payment.number, profile.payment.cvv)


        const POSTPaymentResponse = await WalmartPOSTPayment(allCookies, profile, voltageEncryptedData, POSTCreditCardResponseData, proxy)
        allCookies = accumulateCookies(allCookies, returnParsedCookies(POSTPaymentResponse.headers['set-cookie']))
        

        return {
            allCookies: allCookies,
            storage: {
                voltageEncryptedData
            }
        }
    })

    electron.ipcMain.handle('WalmartSubmitOrder', async (event, ...args) => {
        // args:
        // allCookies, product, proxy
        let allCookies = args[0];
        const POSTCreditCardResponseData = args[1];
        const voltageEncryptedData = args[2];
        const proxy = args[3];
 
        var SubmitOrderData : any = {
            "cvvInSession": true,
            "voltagePayments": [
              {
                "paymentType": POSTCreditCardResponseData.paymentType,
                "encryptedCvv": voltageEncryptedData[1][1],
                "encryptedPan": voltageEncryptedData[1][0],
                "integrityCheck": voltageEncryptedData[1][2],
                "keyId": voltageEncryptedData[1][3],
                "phase": voltageEncryptedData[1][4]
              }
            ]
          };
        //   console.log(SubmitOrderData)
    
        SubmitOrderData = JSON.stringify(SubmitOrderData)
          
    
        // 400 is error submitting order (could be bad CVV or Expiration Date)
          // @ts-ignore
        try {
            const SubmitOrderResponse = await WalmartSubmitOrder(allCookies, POSTCreditCardResponseData.paymentType, voltageEncryptedData, proxy)
            console.log(SubmitOrderResponse)

            return {status: "Success", message: "Success"}
        }
        catch (err) {
            let errData = err.response.data;
    
            if (errData.code === 'payment_service_insufficient_funds') {
                timestampLogger("Declined: Insufficient funds")
                return constructError(400, `Declined: Insufficient funds`)
            }
            else if (errData.code === 'payment_service_authorization_decline') {
                timestampLogger("Declined: Failed authorization")
                return constructError(400, `Declined: Declined: Failed authorization`)
            }
            else {
                timestampLogger(`Declined: Unknown error ${err.response.data.code}`)
                return constructError(400, `Declined: ${err.response.data.code}`)
            }
            // statusCode
            // error
            // code -- this is what we want
        }
        

        return {
            allCookies: allCookies,
            storage: {
                voltageEncryptedData
            }
        }
    })
}

export default atc;