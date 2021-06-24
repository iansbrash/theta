import axios, { AxiosResponse } from 'axios';
import { joinCookies } from '../../../../../requestFunctions';
import requestRetryWrapper from '../../../../../requestRetryWrapper';
import qs from 'qs';
import { Proxy } from '../../../../../interfaces/ProxyList';


interface POSTRegisterDynamicParams {
    widgetState: string,
    iFrameName: string,
    parentWidgetInstanceId: string
}

const POSTRegister = async (allCookies : string[], params : POSTRegisterDynamicParams, proxy : Proxy) => {

    const POSTRegisterUrl = 'https://apx-security.amazon.com/cpe/pm/register';

    const {
        widgetState,
        iFrameName,
        parentWidgetInstanceId
    } = params;

    const POSTRegisterDataConfig = {
        widgetState: widgetState,
        returnUrl: '/gp/buy/payselect/handlers/apx-submit-continue.html',
        clientId: 'Checkout',
        usePopover: true,
        maxAgeSeconds: 7200,
        iFrameName: iFrameName,
        parentWidgetInstanceId: parentWidgetInstanceId,
        hideAddPaymentInstrumentHeader: true,
        creatablePaymentMethods: 'CC'
    }

    // const testData = `widgetState=4-MS23fwxRpYfUypX4fXeanbxzSKE5cb_pPjtkOjkx8TiK6OxqsdDtuJ5V1xqy5Ie7C7zEGePU4FeKzq7XCIhSAGFRspBSABmWgMGm39YR7M15Y_brVD4J55BESX3ng60tABerX4B2MqJe67rUtDf3sT7rg0tmWFn-Jz-1SG-y9qdUinsspE0ELZwPAfbCyKhgQ8ygf9L-4MCKRdM33-hRPvOO3I8viCBqfrpro-gT9HyU9YEwE8Z5fB1s_pPhnvvibJ4uvXy3muHlfFWWPYZtsiRFQNCfJVSo4EJNub-gW8La4TbamxjXhPdumfoQcw8x0LahRBCTP6zSkgGhaMpFi1nDSGn3cdcU5K74zo-TIR-Cgnf47G6rjn1tHfNbUKkbWSN8GhA8X4rN8BkPoejK7cRdxU6jLS1ljqpNzk5kJH-TKFT6vJXZ78Yd7EGqINzjF6EljyyEghaRuIxbXq0BKYcGoAZnHR-1kr5BY0PxWcXHyZ0z0jSO9iKRwHwml65VKaRfG9sy8idYrfxKW8tEGQyBmf07OcpO7GgMhQG6JIrcPkK5NcNbPtceQXKrp-hudWraN5dOhLWlh54FEAi_zhALj1lcVMMpY-8Q_IEdlLDoY66FsTAEl-J68yr3XoGNXLk6AjnEy1eSR1sKHNaa9IFPH7gD2ezC1awb9h4vTdRuOxtY29xOFZwt6JMtCjodz50gsurZykdR9LEITKhB5YUa13wASytB-tQ4TUEFW6cmex7zZP1LZxn3w4HRoAJrws5CHvlWMx9MMidVf040gAsBUX_v1CITlRWfr_0JA2bpfdVGJV-volc83a0YGbCsPPHUw7YJwR2my_I3fkrwuKpttjaX6A_8n2u6_-KFJ0UPWeS-r8bVYIHZfgErYPa4ance-YnDXqCctpszTu6xuvStBiT8tl0XbW-0G4SspySP_-0r8kSEQMnb-oWMYTogzcg4QzNaFRozLq8a14G34sepnKm-3MCjlFFDK5eUYPi1IOpx6PX5T5Vg_lLvgVGsACvKBpr5dttOWqXuojYH1AZ6RMK2iNbnTQjUzeCEi_l5YOYsPJgrxMaush8TIxXrSqPBU7uftbMMOOiNBq7mRGwQRS6Zitv2oFtvd4Ye3Jres0Nkt0pQqyBKheHKWHLtjz0e1wfJUisg57BPisIgf8mhGlQtkCUM4lntMgfF16zAdVIPd09DAvw1pmTkGDBAQRNHtz0KiiTZ82YHu2w0E1c0gvMEFyWEWzUA-vvMQytXo7Oxoyc8I6QMWsj0gMiHPrbRYWlXJK7MRG-AbB-F6tuI5_gyPqAg04LrpsUaUcMzBjiHjAoKzs8AFIU3lNFXnUuP1U4MulOIiRgbTkFtXiCiJnKNI7TzV0QTZJPHnVNcaaQHzi_tWi-xHyOubLY0GG_DHY9TH7WM6hOejZhIKVnUD7bA2Af0qNXtLIerCJwljOWCLCGpYHORrORZjZk3WNfDahvEM99T26IdduhIlDfClFskfCuZIbVoWoXcYVRY6qPRoP3F7vC5rjvWlXE2ypkuWvYYRbEymbYrEEg9O9SiESimrZRtCZveuMyFXKWrsoO1SFk12Y1cGxMcJNn3o_hOn6TcrzVB34BAvRZ65Qtq7dvTGibxLyEnhJv8CcpwC7YfN3KMUJwFu5gBZzuQNrWmIG-Ms4QoFamRr3NsfRRmz0aUbhSigLKL7QDa5HPQpROn3NWhII2Guk_lNy15-8rcX29-UktBzq87BkcayJBhn5F7SNtsJivd7STGEVBkAesLQPKdUqhNNsEltHE730FXhLaJxkB5JYc3M0XMDUwOuk8oZWTpRSwmXVejm2jr4dAnfas32UL-dQcbnztptUEr0s31p8kvrTPffrJDyKhQS6ho2FW39Vfl5nBFZBfa8g7jIeqzHzSwHXzPXb2B73GEjF8wS0Wf39C2a6eNRB5l5aMM8HubMokGLM8p3KRdYLgFGpJGSr3PTOhrI2JfTym9SfoTQYM9wbJiAkkPcQN76FUUMF5cAWIESDmkscVHoBkGU2UlFbJV7qxR-Dn5adNNXOH73d82JUOe60zuacnOYR88HcfGtGwjyqPeqcc7GtBNtGLSLBRHdOjAEF5lXZbKNHCrxvQloDm4sJfeyDWCXpGmij4GJCZA5ZOTdQK66WoJAIOUyHQ-djiNHahGsPQceXBV0aEFO3PAlq3MUYm-XFbtNcVKxT1XoTJx-LiV2TdLaokqVZQMR2RAAl823gBQlgpaDLDPAYtSQtdJFvPisiHbkCQSLM2-nKpoDwjk5MD9nLuJQbvndcIaCSH-wVQIUeu80_7KzHWaGOsYjc1W_DY2e21D1AOU85gYx4llAVsHvQqZjfuc8TSCjfs95z1--lpWJHjrqjgDJK3cuQj0fHV5b50IT-_qgeE254W0hcH1X_nh2dImqjpQy4gw-uySYIhXLu7G1AeVfUV6e3265dNjAGVeiXlWF8BtYoJ5QotZ6JNIP6VJ0f8AjZZW2_N8I46n_fVgGnAa54l7CbK96NB1H-IffihEnMPhVxA4y1Qx37oqMdMJ9ERjPO1QBcwCNBxfzHfmwyRuB8HJ2ewkRbL_PjSnJ1O-mqp5rBZ0hfMu9ubuGY1jLVs6f0h3Dxffv7EN86b-cmDBiw3w6dHTFJ19MTeIRiD32ZCn7XOtXlX20UYwiX5A7b5e3tzTmLDjoSDaPDiUjHTU-QhRyqK_-cSU4l2ZDh-uDBvLLmEapNFu9ypkrW7eQk3C36Q4ZlQyIZ11rZIaeZ-LQamaeQ_-9eJskX0wjy6J-dOWwIhLlJJb4w12YL0ryyhmv-92eWQSdN_CH_8NGvM1T3X5RdWP-kO6wqOMsp890d0fzgkE22UXDsCwJYhy-8Vm_liVvLiLRcThhsKcRRB72UldMIOeUw0bHtd-q7LERn_xlaMpLbku0KcFGHq4Xe9ujYEcOaBzTuC5ucxRJ6WNNb5JjgRSJwOExGCjMSihqvLb1zo-8SMZ5m-qkwVWYbz6-Oq9ChC13dgnefK6llbjy-clW2W0l4hpXdiAlWLjZdOihCmNffyLPFVrDpxl2Y-RYEwO47E0-dPCZPFFf6iKKp75Ea4K7gB5c3SW02-QU4KusOQnE832JmybTzNng2QVshRlSdbNvECIH_kiRpDdU5GeBsPYiRQK1qYHjK6ilWs1PUoLITmxutcW3avYZS4aPcgAatpV7DaYOkN8Q_wcbqVvIEFrnKOo38M4whvishsqMiZ_fQ4Cd4Ef3VaCDt9u95ElpKtDCxf7a42k32FqVAy8r3KaJuaqn7ds9gGG_1NQXrZck2wG4h7qp0QLmIPyFEUYoUJ0EOpXL1KfqeJvdITfXs4BAqpl5hweUDY5zPlAfOu6nS6LY6nBDZ_pbrSeLKvXEc4N56KEo9fgZ0CgrDkNk_VHpvqaHMK9FxC8cgw4QAer6RkCQqzV2M2giruJH9embnIaqFKNQ3ppI_ELONn_zcXZ4Wk_9wi7fXbdRdYY7CdGdsK0BQWaGI0joiPoUDdAS9qyr4XvtJadu5kW6-fH79Akf87G69DBLPcdoGowmpTiTztyORDoGX0H-Tj6e97BuITLNClGJ6eT0T3c53dGk7f0u9MZYIU9L-tCE8OlRXh7ANVUFI2DGqkPvimu2YKhGSQ_kq-uT3cHc47XzO03bc9KomN0gy0jzZYkfdu77vbFLXOfo8VRPYAtewj3g6rQ-5zyBOx9SRbEgXb5MzTFGutDRAMvY63VzUpp&returnUrl=%2Fgp%2Fbuy%2Fpayselect%2Fhandlers%2Fapx-submit-continue.html&clientId=Checkout&usePopover=true&maxAgeSeconds=7200&iFrameName=ApxSecureIframe-pp-kRxRLU-7&parentWidgetInstanceId=${parentWidgetInstanceId}&hideAddPaymentInstrumentHeader=true&creatablePaymentMethods=CC`

    const POSTRegisterData = qs.stringify(POSTRegisterDataConfig);

    const POSTRegisterResponse = await axios({
        method: 'post',
        url: POSTRegisterUrl,
        headers: {
            'Connection': 'keep-alive', 
            'Cache-Control': 'max-age=0', 
            'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"', 
            'sec-ch-ua-mobile': '?0', 
            'Origin': 'https://www.amazon.com', 
            'Upgrade-Insecure-Requests': '1', 
            'DNT': '1', 
            'Content-Type': 'application/x-www-form-urlencoded', 
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36', 
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
            'Sec-Fetch-Site': 'same-site', 
            'Sec-Fetch-Mode': 'navigate', 
            'Sec-Fetch-User': '?1', 
            'Sec-Fetch-Dest': 'iframe', 
            'Accept-Language': 'en-US,en;q=0.9', 
            referrer: 'https://www.amazon.com/',
            cookie: joinCookies(allCookies)
        },
        data : POSTRegisterData,
        proxy: {
            protocol: 'https',
            host: proxy.ip,
            port: proxy.port,
            auth: {
                username: proxy.username,
                password: proxy.password,
            }
        }
    })

    return POSTRegisterResponse

}

export const POSTRegisterRetry : (allCookies : string[], params : POSTRegisterDynamicParams, proxy : Proxy) => Promise<AxiosResponse> = requestRetryWrapper(POSTRegister, {
    baseDelay: 3000,
    numberOfTries: 3,
    consoleRun: 'Getting payment iframe',
    consoleError: 'Error getting payment iframe'
})

export default POSTRegister;