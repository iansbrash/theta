const cipher = require('./aes.js').cipher;
const axios = require('axios');
const getValueByDelimiters = (data, start, end) => {
    const delimiterStartLength = start.length;
    const delimiterStartIndex = data.indexOf(start);
    const dataStartSubstring = data.substring(delimiterStartIndex + delimiterStartLength);
    const delimiterDifference = dataStartSubstring.indexOf(end);
    return dataStartSubstring.substring(0, delimiterDifference);
}
// // a.HexToWords
// var HexToWords = (e) => {
//     var t = new Array(4);
//     if (32 != e.length)
//         return null;
//     for (var n = 0; n < 4; n++)
//         t[n] = parseInt(e.substr(8 * n, 8), 16);
//     return t
// };
let nbase10 = "0123456789";
let nbase62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
let alphabet = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]


const cbcmacq =  function(e, t, n, r) {
    for (var a = new Array(4), i = 0; i < 4; ++i)
        a[i] = e[i];
    for (var o = 0; 4 * o < n; ) {
        for (i = 0; i < 4; ++i)
            a[i] = a[i] ^ (t[4 * (o + i)] << 24 | t[4 * (o + i) + 1] << 16 | t[4 * (o + i) + 2] << 8 | t[4 * (o + i) + 3]);
        a = r.encrypt(a),
        o += 4
    }
    return a
}

// Looks like we want to return e at the end because they are using global vars so no return statement is needed
var bnAdd = (e, t, n) => {
    for (var r = e.length - 1, a = n; r >= 0 && a > 0; ) {
        var i = e[r] + a;
        e[r] = i % t,
        a = (i - e[r]) / t,
        --r
    }

    return e;
}

const bnMultiply = (e, t, n) => {
    var r, a = 0;
    for (r = e.length - 1; r >= 0; --r) {
        var i = e[r] * n + a;
        e[r] = i % t,
        a = (i - e[r]) / t
    }

    return e;
}

const precompF = function(e, t, n, r) {
    var a = new Array(4)
      , i = n.length;
    return a[0] = 16908544 | r >> 16 & 255,
    a[1] = (r >> 8 & 255) << 24 | (255 & r) << 16 | 2560 | 255 & Math.floor(t / 2),
    a[2] = t,
    a[3] = i,
    // e is r.cipher.aes... so we're using aes encrypt here
    e.encrypt(a)
}

const precompb = function(e, t) {
    for (var n = Math.ceil(t / 2), r = 0, a = 1; n > 0; )
        --n,
        (a *= e) >= 256 && (a /= 256,
        ++r);
    return a > 1 && ++r,
    r
}


// o.encrypt
const encrypt = (e, t, n, r) => {
    // console.log(e);
    // console.log(t)
    // console.log(n)
    var i = HexToKey(n); // A chain of encryption functions
    // console.log(`i below`)
    // console.log(i)
    return null == i ? "" : encryptWithCipher(e, t, i, r) // ANother copy-pastable encyrpt function
}

const F = function(e, t, n, r, a, i, c, u, s) {
    var d = Math.ceil(s / 4) + 1
      , l = n.length + s + 1 & 15;
    l > 0 && (l = 16 - l);
    var f, p = new Array(n.length + l + s + 1);
    for (f = 0; f < n.length; f++)
        p[f] = n.charCodeAt(f);
    for (; f < l + n.length; f++)
        p[f] = 0;
    p[p.length - s - 1] = t;
    for (var m = convertRadix(r, a, u, s, 256), E = 0; E < s; E++)
        p[p.length - s + E] = m[E];
    var b, h = cbcmacq(c, p, p.length, e), _ = h, v = new Array(2 * d);
    for (f = 0; f < d; ++f)
        f > 0 && 0 == (3 & f) && (b = f >> 2 & 255,
        b |= b << 8 | b << 16 | b << 24,
        _ = e.encrypt([h[0] ^ b, h[1] ^ b, h[2] ^ b, h[3] ^ b])),
        v[2 * f] = _[3 & f] >>> 16,
        v[2 * f + 1] = 65535 & _[3 & f];
    return convertRadix(v, 2 * d, 65536, i, u)
}

const encryptWithCipher = (e, t, n, r) => {
    // console.log('in encryptWithCipher')
    // console.log(e);
    // console.log(t)
    // console.log(n);
    var a = e.length
      , i = Math.floor(a / 2)
      , c = precompF(n, a, t, r)
      , u = precompb(r, a)
      , s = DigitToVal(e, i, r)
      , d = DigitToVal(e.substr(i), a - i, r);
    if ("" == s || "" == d){
        // console.log("We got fucked")
        return "";

    }
    for (var l = 0; l < 5; l++) {
        var f, p = F(n, 2 * l, t, d, d.length, s.length, c, r, u);
        f = 0;
        for (var m = s.length - 1; m >= 0; --m) {
            (E = s[m] + p[m] + f) < r ? (s[m] = E,
            f = 0) : (s[m] = E - r,
            f = 1)
        }
        p = F(n, 2 * l + 1, t, s, s.length, d.length, c, r, u);
        f = 0;
        for (m = d.length - 1; m >= 0; --m) {
            var E;
            (E = d[m] + p[m] + f) < r ? (d[m] = E,
            f = 0) : (d[m] = E - r,
            f = 1)
        }
    }
    // console.log('o:')
    return ValToDigit(s, r) + ValToDigit(d, r)
}

const DigitToVal = function(e, t, n) {
    var r = new Array(t);
    if (256 == n) {
        for (var a = 0; a < t; a++)
            r[a] = e.charCodeAt(a);
        return r
    }
    for (var i = 0; i < t; i++) {
        var o = parseInt(e.charAt(i), n);
        if (NaN == o || !(o < n))
            return "";
        r[i] = o
    }
    return r
}

const ValToDigit = function(e, t) {
    var n, r = "";
    if (256 == t)
        for (n = 0; n < e.length; n++)
            r += String.fromCharCode(e[n]);
    else
        for (n = 0; n < e.length; n++)
            r += alphabet[e[n]];
    return r
}

// a.HexToKey
const HexToKey = (e) => {
    // return new cipher.aes(HexToWords(e))
    let ci = cipher;
    ci.aes(HexToWords(e))
    return ci;
}

// a. HexToWords
const HexToWords = (e) => {
    var t = new Array(4);
    if (32 != e.length)
        return null;
    for (var n = 0; n < 4; n++)
        t[n] = parseInt(e.substr(8 * n, 8), 16);
    return t
}

const WordToHex = (e) => {
    let Hex = "0123456789abcdef";
    for (var t = 32, n = ""; t > 0; )
        t -= 4,
        n += Hex.substr(e >>> t & 15, 1);
    return n
}

const convertRadix = (e, t, n, r, a) => {
    var i, c = new Array(r);
    for (i = 0; i < r; ++i)
        c[i] = 0;
    for (var u = 0; u < t; ++u)
        c = bnMultiply(c, a, n),
        c = bnAdd(c, a, e[u]);
    return c
}


const integrity = (e, t, n) => {
    var o = String.fromCharCode(0) + String.fromCharCode(t.length) + t + String.fromCharCode(0) + String.fromCharCode(n.length) + n
      , c = HexToWords(e);
    c[3] ^= 1;

    // cipher.aes is some class with a fat encryption function
    // aes contains some local shit like table[] and encrypt and decrypt
    // pretty copy-pastable
    // var u = new cipher.aes(c)
    var u = cipher;
    u.aes(c);

        // computate takes a cipherAES as an argument
    var s = compute(u, o);
    return WordToHex(s[0]) + WordToHex(s[1])
}


// e is a cipherAES
// t is some weird string
const compute = (e, t) => {

    // i.leftShift
    const leftShift = (e) => {
        e[0] = (2147483647 & e[0]) << 1 | e[1] >>> 31,
        e[1] = (2147483647 & e[1]) << 1 | e[2] >>> 31,
        e[2] = (2147483647 & e[2]) << 1 | e[3] >>> 31,
        e[3] = (2147483647 & e[3]) << 1
    }

    // i.MSBnotZero
    const MSBnotZero = (e) => {
        return 2147483647 != (2147483647 | e)
    }

    const const_Rb = 135

    var n = [0, 0, 0, 0]
      , r = e.encrypt(n) 
      , a = r[0];
    leftShift(r),
    MSBnotZero(a) && (r[3] ^= const_Rb);
    for (var o = 0; o < t.length; )
        n[o >> 2 & 3] ^= (255 & t.charCodeAt(o)) << 8 * (3 - (3 & o)),
        0 == (15 & ++o) && o < t.length && (n = e.encrypt(n));
    return 0 != o && 0 == (15 & o) || (a = r[0],
    leftShift(r),
    MSBnotZero(a) && (r[3] ^= const_Rb),
    n[o >> 2 & 3] ^= 128 << 8 * (3 - (3 & o))),
    n[0] ^= r[0],
    n[1] ^= r[1],
    n[2] ^= r[2],
    n[3] ^= r[3],
    e.encrypt(n)
}

const luhn = function(e) {
    for (var t = e.length - 1, n = 0; t >= 0; )
        n += parseInt(e.substr(t, 1), 10),
        t -= 2;
    for (t = e.length - 2; t >= 0; ) {
        var r = 2 * parseInt(e.substr(t, 1), 10);
        n += r < 10 ? r : r - 9,
        t -= 2
    }
    return n % 10
}

const reformat = function(e, t) {
    for (var r = "", a = 0, i = 0; i < t.length; ++i)
        a < e.length && nbase10.indexOf(t.charAt(i)) >= 0 ? (r += e.substr(a, 1),
        ++a) : r += t.substr(i, 1);
    return r
}

const fixluhn = function(e, t, r) {
    var a = luhn(e);
    return a < r ? a += 10 - r : a -= r,
    0 != a ? (a = (e.length - t) % 2 != 0 ? 10 - a : a % 2 == 0 ? 5 - a / 2 : (9 - a) / 2 + 5,
    e.substr(0, t) + a + e.substr(t + 1)) : e
}


const ProtectPANandCVV = (e, t, r)  =>{

    // testing PIE


    const distill = (e) => {
        for (var t = "", r = 0; r < e.length; ++r)
            nbase10.indexOf(e.charAt(r)) >= 0 && (t += e.substr(r, 1));
        return t
    }
    // e is 4111111111111111
    // t is CVV (unencrypted)
    // r is true

    // Some base 10 char maniupation, just changes it up a lil bit
    var a = distill(e)
      , i = distill(t);

    //   console.log(`a: ${a}`)
    //   console.log(`i: ${i}`)

    // Seems to validate card number and CVV
    if (a.length < 13 || a.length > 19 || i.length > 4 || 1 == i.length || 2 == i.length)
        return null;

    // c changes based on PIE
    var c = a.substr(0, PIE.L) + a.substring(a.length - PIE.E);

    // always is true
    if (1 == r) {
        // console.log("1 is true")
        var u = luhn(a) // luhn is some basic encryption function
          , s = a.substring(PIE.L + 1, a.length - PIE.E)
          , d = encrypt(s + i, c, PIE.K, 10) // chain of encryption functions
          , l = a.substr(0, PIE.L) + "0" + d.substr(0, d.length - i.length) + a.substring(a.length - PIE.E)

          // fixluhn calls luhn then does some encryption
          // reformat changes string to base10 then does some switching
          , f = reformat(fixluhn(l, PIE.L, u), e)
          , p = reformat(d.substring(d.length - i.length), t);


        // console.log([f, p, integrity(PIE.K, f, p)])
        return [f, p, integrity(PIE.K, f, p)]
    }
};

let PIE = {
    E: 4,
    K: "",
    L: 6,
    key_id: "",
    phase: 1
};

export const voltageEncrypt = async (number, cvv) => {
    const initialBust = await axios({
        method: 'get',
        url: `https://securedataweb.walmart.com/pie/v1/wmcom_us_vtg_pie/getkey.js?bust=${(new Date()).getTime()}`
    })

    const initialBustK = getValueByDelimiters(initialBust.data, 'PIE.K = "', '"')
    const initialBustKey_Id = getValueByDelimiters(initialBust.data, 'PIE.key_id = "', '"')

    PIE.K = initialBustK
    PIE.key_id = initialBustKey_Id

    // Put in strings I believe
    let res = ProtectPANandCVV(number, cvv, true)
    // let res = ProtectPANandCVV('4111111111111111', '123', true)
    // console.log(res)


    const secondaryBust = await axios({
        method: 'get',
        url: `https://securedataweb.walmart.com/pie/v1/wmcom_us_vtg_pie/getkey.js?bust=${(new Date()).getTime()}`
    })

    const secondaryBustK = getValueByDelimiters(secondaryBust.data, 'PIE.K = "', '"')
    const secondaryBustKey_Id = getValueByDelimiters(secondaryBust.data, 'PIE.key_id = "', '"')

    PIE.K = secondaryBustK
    PIE.key_id = secondaryBustKey_Id
    
    // Perhaps this 4 changes to a 5 is mastercard, etc
    let res2 = ProtectPANandCVV('4111111111111111', cvv, true)

    // Returns encryptedPAN, encryptedCVV, integrityCheck
    return [ [...res, initialBustKey_Id], [...res2, secondaryBustKey_Id] ];
}

// (async () => {
//     // let testNum = '4767718260058419';
//     // let testCVV = '362'
//     // let testExp = '07/27'
//     // let r = new cipher.aes("ASDD");
//     // console.log(r)

//     // e is 4111111111111111
//     // t is CVV (unencrypted)
//     // r is true

    

//     // Flow
//     // Initialize a cipher.aes object
//     // Encrypt plain CC number and CVV using a fetched PIE
//     // 
// })();