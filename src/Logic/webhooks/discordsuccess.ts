import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

const sendSuccess = async (
    webhook : string, 
    productTitle : string, 
    store : string, 
    profileName : string, 
    size : string, 
    proxyListName : string, 
    accountName : string, 
    mode : string, 
    productImage : string
) => {

    const payload = {
        "content": null,
        "embeds": [
            {
                "title": productTitle,
                "url": "https://amazon.com/",
                "color": 5814783,
                "fields": [
                {
                "name": store,
                    "value": "Amazon",
                    "inline": true
                },
                {
                "name": "Profile",
                    "value": profileName,
                    "inline": true
                },
                {
                "name": "Size",
                    "value": size,
                    "inline": true
                },
                {
                "name": "Proxys",
                    "value": proxyListName,
                    "inline": true
                },
                {
                "name": "Account",
                    "value": accountName,
                    "inline": true
                },
                {
                "name": "Mode",
                    "value": mode,
                    "inline": true
                }
                ],
                "author": {
                    "name": "Successful checkout!"
                },
                "footer": {
                    "text": "Thaeta"
                },
                "timestamp": "",//(new Date).getUTCDate(),
                "thumbnail": {
                    "url": productImage //"https://images-na.ssl-images-amazon.com/images/I/619BkvKW35L._SX342_.jpg"
                }
            }
        ],
        "username": "Theta"
    }


    var data = qs.stringify({
        'payload_json': JSON.stringify(payload)
    });
    var config : AxiosRequestConfig = {
        method: 'post',
        url: webhook,
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded', 
        },
        data : data
    };
    try {
        console.log(`'about to post to ${webhook}`)
        await axios(config)
    }
    catch (err) {
        throw err
    }
}

export default sendSuccess;