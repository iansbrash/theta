import CookieObject from './interfaces/CookieObject';

export const getNumberOfRedirects = (res : any) => {
    return res.request._redirectable._redirectCount
}

// takes the string to parse, and strings to delimit the value we want to find
export const getValueByDelimiters = (data: string, start : string, end : string) : string => {
    const delimiterStartLength = start.length;
    const delimiterStartIndex = data.indexOf(start);
    const dataStartSubstring = data.substring(delimiterStartIndex + delimiterStartLength);
    const delimiterDifference = dataStartSubstring.indexOf(end);
    return dataStartSubstring.substring(0, delimiterDifference);
}

// takes a cookie or cookie[] that is unparsed
// i.e. test=123 path="/" expires="123123"
// returns the cookie by itself in an array
export const returnParsedCookies = (cookieArray : string | string[] ) : string[] => {

    if (cookieArray === '' || cookieArray === [] || cookieArray === undefined) {
        return [];
    }

    // is array
    if (Array.isArray(cookieArray)){
        let arr = [];

        for (let i = 0; i < cookieArray.length; i++){
    
            let cookie = cookieArray[i];
    
            let toAppend = cookie.substring(0, cookie.indexOf(';'));
            if (toAppend.substring(toAppend.length - 2) === '""'){
                // console.log('Shitty cookie. Discarding.')
            }
            else {
                arr.push(toAppend);
            }
        }
    
        return arr;
    }
    // is individual cookie
    else {
        let cookie = cookieArray;
    
        let toAppend = cookie.substring(0, cookie.indexOf(';'));
        return [toAppend];
    }
}

// takes an array of parsed cookies and joins them together
export const joinCookies = (cookiesArray : string[]) : string => {
    // let cookiesArrayCopy : string[] = [...cookiesArray];

    // if (!isParsed) {
    //     cookiesArrayCopy = returnParsedCookies(cookiesArrayCopy);
    // }

    return cookiesArray.join('; ');
}

// feed in set-cookie array after parsing with returnParsedCookies
// replaces any cookies that already exist
// returns a string[]
export const accumulateCookies = (originalCookieArray : string | string[], setCookieArray : string | string[]) : string[]  => {
    
    // returns AWSALB= or dtCookie= etc
    const parseForEquals = (cookie : string) => {
        return cookie.substring(0, cookie.indexOf('=') + 1).toLowerCase(); 
    }

    // @ts-ignore
    const makeLowerCase = (cookieArray : string[]) : string[] => {
        let toRet : string[] = [];
        cookieArray.forEach(ck => {

            const ckParse = parseForEquals(ck);
            toRet.push(ckParse.toLowerCase() + ck.substring(ckParse.length));
        })

        return toRet;
    }

    let newOriginalCookieArray : string[];
    let newOrigCookieArray : string[];

    if (!Array.isArray(originalCookieArray)) {
        newOriginalCookieArray = [originalCookieArray];
    }
    else {
        newOriginalCookieArray = originalCookieArray;
    }

    if (!Array.isArray(setCookieArray)) {
        newOrigCookieArray = [setCookieArray];
    }
    else {
        newOrigCookieArray = setCookieArray;
    }

    let newCookieArray : string[] = [];

    // newOriginalCookieArray = makeLowerCase(newOriginalCookieArray);
    // newOrigCookieArray = makeLowerCase(newOrigCookieArray);

    newOrigCookieArray.forEach(newCookie => {

        const newParsedCookie = parseForEquals(newCookie);

        let ct = 0;

        newOriginalCookieArray.forEach(origCookie => {


            if (origCookie.substring(0, newParsedCookie.length) === newParsedCookie) {
                newCookieArray.push(newCookie)
            }
            else {
                ct += 1;
            }
        })

        if (ct === newOriginalCookieArray.length){
            newCookieArray.push(newCookie)
        }
    })

    newOriginalCookieArray.forEach(origCookie => {

        let ct = 0;

        const origCookieParsed = parseForEquals(origCookie);

        for (let i = 0; i < newCookieArray.length; i++){
            if (newCookieArray[i].substring(0, origCookieParsed.length) === origCookieParsed) {
                ct += 1;
            }
        }

        if (ct === 0) {
            newCookieArray.push(origCookie);
        }
    })
    return newCookieArray;
}



export const convertCookieArrayToObject = (cookieArray : string[]) : CookieObject => {
    let toReturnObject : CookieObject = {};

    cookieArray.forEach((cookie : string) => {
        let indexOfEquals : number= cookie.indexOf('=');
        let cookieName : string= cookie.substring(0, indexOfEquals);
        let cookieValue : string= cookie.substring(indexOfEquals + 1);

        toReturnObject[cookieName] = cookieValue;
    })
    
    
    return toReturnObject;
}