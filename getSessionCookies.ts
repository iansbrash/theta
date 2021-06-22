import puppeteer, { PuppeteerNodeLaunchOptions } from 'puppeteer';
import {
    AmazonUser,
    AmazonPass
} from './sensitive/logins';


const PuppeteerLoginAmazonReturnCookies = async (user: string, pass: string) : Promise<puppeteer.Protocol.Network.Cookie[]> => {
    let options : PuppeteerNodeLaunchOptions = {
        headless: false,
    }

    let browser = await puppeteer.launch(options);
    let page = await browser.newPage();


    const AmazonLoginUrl = 'https://www.amazon.com/ap/signin?openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=usflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&'

    // Go to login page
    console.log("Going to the Amazon Login page");
    await page.goto(AmazonLoginUrl);

    // Wait for "Email or mobile phone number" input
    await page.waitForSelector('#ap_email')

    let userInput = await page.$("#ap_email");
    let submitButtonOne = await page.$("#continue");

    // Type email
    console.log(`Typing in username: ${AmazonUser}`);
    await userInput?.click();
    await page.keyboard.type(user, { delay: 50 });

    // Click continue
    console.log("Clicking continue");
    await submitButtonOne?.click();

    // Wait for password after redirect
    await page.waitForSelector('#ap_password');

    // Select password and type
    console.log(`Typing in password: ${AmazonPass}`);
    let passInput = await page.$("#ap_password");
    await passInput?.click();
    await page.keyboard.type(pass, { delay: 50 });

    // Login
    console.log(`Clicking login`);
    await page.click('#auth-signin-button');

    // Wait for page load
    await page.waitForSelector('#nav-search-bar-form');

    // Get cookies
    let LoginCookies : puppeteer.Protocol.Network.Cookie[] = await page.cookies();
    console.log(`Login cookies below:`)
    console.log(parsePuppeteerCookies(LoginCookies));

    // Tidy up
    await page.close();
    await browser.close();

    // Return our cookie array
    return LoginCookies;
}


export const parsePuppeteerCookies = (cookies : puppeteer.Protocol.Network.Cookie[]) : string[] => {
    return cookies.map((cookie : puppeteer.Protocol.Network.Cookie, index : number) => {
        return cookie.name + '=' + cookie.value
    });
}

// https://github.com/jamesgrams/instagram-poster/blob/master/index.js
function delay(timeout : number) {
    return new Promise((resolve) => setTimeout(resolve, timeout));
}

export default PuppeteerLoginAmazonReturnCookies;


// COOKIES THAT STAY THE SAME WHEN VISITING A PRODUCT PAGE
//      i18n-prefs, ubid-main?, session-id-time, session-id, sess-at-main, sst-main, skin, x-main, session-token, lc-main, at-main
// COOKIES THAT DON't STAY THE SAME:
//      csm-hit