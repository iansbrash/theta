import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

const sendSuccess = async (webhook : string) => {

    const payload = {
        "content": null,
        "embeds": [
            {
                "title": "PS5 Digital Edition",
                "url": "https://amazon.com/",
                "color": 5814783,
                "fields": [
                {
                "name": "Store",
                    "value": "Amazon",
                    "inline": true
                },
                {
                "name": "Profile",
                    "value": "Real Card",
                    "inline": true
                },
                {
                "name": "Size",
                    "value": "OS",
                    "inline": true
                },
                {
                "name": "Proxys",
                    "value": "Comcast ISP",
                    "inline": true
                },
                {
                "name": "Account",
                    "value": "brash@usc.edu",
                    "inline": true
                },
                {
                "name": "Mode",
                    "value": "Normal",
                    "inline": true
                }
                ],
                "author": {
                    "name": "Successful checkout!"
                },
                "footer": {
                    "text": "Theta"
                },
                "timestamp": "2021-06-28T07:52:00.000Z",
                    "thumbnail": {
                    "url": "https://images-na.ssl-images-amazon.com/images/I/619BkvKW35L._SX342_.jpg"
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
        await axios(config)
    }
    catch (err) {
        console.log('Error in webhook')
    }
}

export default sendSuccess;