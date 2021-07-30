const cipher = require('./aes.js').cipher;

// // a.HexToWords
// var HexToWords = (e) => {
//     var t = new Array(4);
//     if (32 != e.length)
//         return null;
//     for (var n = 0; n < 4; n++)
//         t[n] = parseInt(e.substr(8 * n, 8), 16);
//     return t
// };


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


// o.encrypt
const encrypt = (e, t, n, r) => {
    var i = HexToKey(n); // A chain of encryption functions
    return null == i ? "" : o.encryptWithCipher(e, t, i, r) // ANother copy-pastable encyrpt function
}

const encryptWithCipher = (e, t, n, r) => {
    var a = e.length
      , i = Math.floor(a / 2)
      , c = o.precompF(n, a, t, r)
      , u = o.precompb(r, a)
      , s = o.DigitToVal(e, i, r)
      , d = o.DigitToVal(e.substr(i), a - i, r);
    if ("" == s || "" == d)
        return "";
    for (var l = 0; l < 5; l++) {
        var f, p = o.F(n, 2 * l, t, d, d.length, s.length, c, r, u);
        f = 0;
        for (var m = s.length - 1; m >= 0; --m) {
            (E = s[m] + p[m] + f) < r ? (s[m] = E,
            f = 0) : (s[m] = E - r,
            f = 1)
        }
        p = o.F(n, 2 * l + 1, t, s, s.length, d.length, c, r, u);
        f = 0;
        for (m = d.length - 1; m >= 0; --m) {
            var E;
            (E = d[m] + p[m] + f) < r ? (d[m] = E,
            f = 0) : (d[m] = E - r,
            f = 1)
        }
    }
    return o.ValToDigit(s, r) + o.ValToDigit(d, r)
},

// a.HexToKey
const HexToKey = (e) => {
    return new r.cipher.aes(a.HexToWords(e))
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
    var u = new cipher.aes(c)

        // computate takes a cipherAES as an argument
      , s = i.compute(u, o);
    return a.WordToHex(s[0]) + a.WordToHex(s[1])
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

    var n = [0, 0, 0, 0]
      , r = e.encrypt(n)
      , a = r[0];
    i.leftShift(r),
    i.MSBnotZero(a) && (r[3] ^= i.const_Rb);
    for (var o = 0; o < t.length; )
        n[o >> 2 & 3] ^= (255 & t.charCodeAt(o)) << 8 * (3 - (3 & o)),
        0 == (15 & ++o) && o < t.length && (n = e.encrypt(n));
    return 0 != o && 0 == (15 & o) || (a = r[0],
    i.leftShift(r),
    i.MSBnotZero(a) && (r[3] ^= i.const_Rb),
    n[o >> 2 & 3] ^= 128 << 8 * (3 - (3 & o))),
    n[0] ^= r[0],
    n[1] ^= r[1],
    n[2] ^= r[2],
    n[3] ^= r[3],
    e.encrypt(n)
}

// const aesEncrypt = (e) => {
//     const _crypt = (e, t) => {
//         if (4 !== e.length)
//         throw "invalid aes block size";
//         var n, a, i, o, c = this._key[t], u = e[0] ^ c[0], s = e[t ? 3 : 1] ^ c[1], d = e[2] ^ c[2], l = e[t ? 1 : 3] ^ c[3], f = c.length / 4 - 2, p = 4, m = [0, 0, 0, 0], E = this._tables[t], b = E[0], h = E[1], _ = E[2], v = E[3], y = E[4];
//         for (o = 0; o < f; o++)
//             n = b[u >>> 24] ^ h[s >> 16 & 255] ^ _[d >> 8 & 255] ^ v[255 & l] ^ c[p],
//             a = b[s >>> 24] ^ h[d >> 16 & 255] ^ _[l >> 8 & 255] ^ v[255 & u] ^ c[p + 1],
//             i = b[d >>> 24] ^ h[l >> 16 & 255] ^ _[u >> 8 & 255] ^ v[255 & s] ^ c[p + 2],
//             l = b[l >>> 24] ^ h[u >> 16 & 255] ^ _[s >> 8 & 255] ^ v[255 & d] ^ c[p + 3],
//             p += 4,
//             u = n,
//             s = a,
//             d = i;
//         for (o = 0; o < 4; o++)
//             m[t ? 3 & -o : o] = y[u >>> 24] << 24 ^ y[s >> 16 & 255] << 16 ^ y[d >> 8 & 255] << 8 ^ y[255 & l] ^ c[p++],
//             n = u,
//             u = s,
//             s = d,
//             d = l,
//             l = n;
//         return m
//     }

//     return _crypt(e, 0)
// }

// // r.cipher.aes
// const CipherAES = (e) => {
//     let _tables;

//     // START this._precompute();
//     var e, t, n, r, a, i, o, c, u = _tables[0], s = _tables[1], d = u[4], l = s[4], f = [], p = [];
//     for (e = 0; e < 256; e++)
//         p[(f[e] = e << 1 ^ 283 * (e >> 7)) ^ e] = e;
//     for (t = n = 0; !d[t]; t ^= 0 == r ? 1 : r,
//     n = 0 == p[n] ? 1 : p[n])
//         for (i = (i = n ^ n << 1 ^ n << 2 ^ n << 3 ^ n << 4) >> 8 ^ 255 & i ^ 99,
//         d[t] = i,
//         l[i] = t,
//         c = 16843009 * f[a = f[r = f[t]]] ^ 65537 * a ^ 257 * r ^ 16843008 * t,
//         o = 257 * f[i] ^ 16843008 * i,
//         e = 0; e < 4; e++)
//             u[e][t] = o = o << 24 ^ o >>> 8,
//             s[e][i] = c = c << 24 ^ c >>> 8;
//     for (e = 0; e < 5; e++)
//         u[e] = u[e].slice(0),
//         s[e] = s[e].slice(0)

//     var t, n, a, i, o, c = _tables[0][4], u = _tables[1], s = e.length, d = 1;
//     if (4 !== s && 6 !== s && 8 !== s)
//         throw "invalid aes key size";
//     for (_key = [i = e.slice(0), o = []],
//     t = s; t < 4 * s + 28; t++)
//         a = i[t - 1],
//         (t % s == 0 || 8 === s && t % s == 4) && (a = c[a >>> 24] << 24 ^ c[a >> 16 & 255] << 16 ^ c[a >> 8 & 255] << 8 ^ c[255 & a],
//         t % s == 0 && (a = a << 8 ^ a >>> 24 ^ d << 24,
//         d = d << 1 ^ 283 * (d >> 7))),
//         i[t] = i[t - s] ^ a;
//     for (n = 0; t; n++,
//     t--)
//         a = i[3 & n ? t : t - 4],
//         o[n] = t <= 4 || n < 4 ? a : u[0][c[a >>> 24]] ^ u[1][c[a >> 16 & 255]] ^ u[2][c[a >> 8 & 255]] ^ u[3][c[255 & a]]
//     // END this._precompute();

//     let _key;
//     var t, n, a, i, o, c = _tables[0][4], u = _tables[1], s = e.length, d = 1;
//     if (4 !== s && 6 !== s && 8 !== s)
//         throw new r.exception.invalid("invalid aes key size");
//     for (_key = [i = e.slice(0), o = []],
//     t = s; t < 4 * s + 28; t++)
//         a = i[t - 1],
//         (t % s == 0 || 8 === s && t % s == 4) && (a = c[a >>> 24] << 24 ^ c[a >> 16 & 255] << 16 ^ c[a >> 8 & 255] << 8 ^ c[255 & a],
//         t % s == 0 && (a = a << 8 ^ a >>> 24 ^ d << 24,
//         d = d << 1 ^ 283 * (d >> 7))),
//         i[t] = i[t - s] ^ a;
//     for (n = 0; t; n++, t--)
//         a = i[3 & n ? t : t - 4],
//         o[n] = t <= 4 || n < 4 ? a : u[0][c[a >>> 24]] ^ u[1][c[a >> 16 & 255]] ^ u[2][c[a >> 8 & 255]] ^ u[3][c[255 & a]]
    
// };


const ProtectPANandCVV = (e, t, r)  =>{

    // testing PIE
    let PIE = {
        E: 4,
        K: 'FD95A93707CFF179016A1BA050694B0B',
        L: 6,
        key_id: '997bf723',
        phase: 1
    }

    let nbase10 = "0123456789";
    let nbase62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    const distill = (e) => {
        for (var t = "", r = 0; r < e.length; ++r)
            n.base10.indexOf(e.charAt(r)) >= 0 && (t += e.substr(r, 1));
        return t
    }
    // e is 4111111111111111
    // t is CVV (unencrypted)
    // r is true

    // Some base 10 char maniupation, just changes it up a lil bit
    var a = distill(e)
      , i = distill(t);

    // Seems to validate card number and CVV
    if (a.length < 13 || a.length > 19 || i.length > 4 || 1 == i.length || 2 == i.length)
        return null;

    // c changes based on PIE
    var c = a.substr(0, PIE.L) + a.substring(a.length - PIE.E);

    // always is true
    // if (1 == r) {
    //     var u = n.luhn(a) // luhn is some basic encryption function
    //       , s = a.substring(PIE.L + 1, a.length - PIE.E)
    //       , d = o.encrypt(s + i, c, PIE.K, 10) // chain of encryption functions
    //       , l = a.substr(0, PIE.L) + "0" + d.substr(0, d.length - i.length) + a.substring(a.length - PIE.E)

    //       // fixluhn calls luhn then does some encryption
    //       // reformat changes string to base10 then does some switching
    //       , f = n.reformat(n.fixluhn(l, PIE.L, u), e)
    //       , p = n.reformat(d.substring(d.length - i.length), t);


    //     return [f, p, n.integrity(PIE.K, f, p)]
    // }
    // console.log(`1 is somehow not true. Probably some compatibility issue`)
    // if (0 != n.luhn(a))
    //     return null;
        

    //d = "1" + o.encrypt(_ + b, c, PIE.K, 10)

    s = a.substring(PIE.L + 1, a.length - PIE.E);
    var m, E = 23 - PIE.L - PIE.E, b = s + i, h = Math.floor((E * Math.log(62) - 34 * Math.log(2)) / Math.log(10)) - b.length - 1, _ = "11111111111111111111111111111".substr(0, h) + 2 * i.length, v = (d = "1" + o.encrypt(_ + b, c, PIE.K, 10),
    parseInt(PIE.key_id, 16)), y = new Array(d.length);
    for (m = 0; m < d.length; ++m)
        y[m] = parseInt(d.substr(m, 1), 10);
    var g = convertRadix(y, d.length, 10, E, 62);
    g = bnMultiply(g, 62, 131072),
    g = bnMultiply(g, 62, 65536),
    g = bnAdd(g, 62, v),
    1 == PIE.phase && g = bnAdd(g, 62, 4294967296);
    var O = "";
    for (m = 0; m < E; ++m)
        O += nbase62.substr(g[m], 1);
    f = a.substr(0, PIE.L) + O.substr(0, E - 4) + a.substring(a.length - PIE.E),
    p = O.substring(E - 4);
    console.log([f, p, n.integrity(PIE.K, f, p)])

    // This is the encrypted information we need
    return [f, p, n.integrity(PIE.K, f, p)]
}


(() => {
    let r = new cipher.aes("ASDD");
    console.log(r)
})();