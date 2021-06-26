/* eslint-disable */ 

const lsubid = () : string => {
    var t = 402871197;
    function e(e : any) {
        e = typeof e === undefined || null === e ? '' : e['toString']();
        for (var r = 0; r < e['length']; r++) {
            var n = .02519603282416938 * (t += e['charCodeAt'](r));
            n -= t = n >>> 0,
            t = (n *= t) >>> 0,
            t += 4294967296 * (n -= t);
        }
        return 23283064365386964e-26 * (t >>> 0);
    }
    var r = e(' ') 
        , n = e(' ') 
        , i = e(' ') 
        , o = 1
        , a = [String('<div id="a-popover-root" style="z-index:-1;position:absolute;"></div>'), "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36", 
        (new Date()).getTime()];
    for (var u in a)
        a['hasOwnProperty'](u) && ((r -= e(a[u])) < 0 && (r += 1),
        (n -= e(a[u])) < 0 && (n += 1),
        (i -= e(a[u])) < 0 && (i += 1));
    function s(t : any) {
        return ('0000000000' + (4294967296 * (e = 2091639 * r + 23283064365386964e-26 * o,
        r = n,
        n = i,
        i = e - (o = 0 | e)))['toString']())['slice'](-t);
        var e;
    };
    return 'X' + s(2) + '-' + s(7) + '-' + s(7) + ':' + Math['floor'](new Date()['getTime']() / 1000);
}

function getRandomInt(min : number, max : number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

const crack = () : string => {
    let starttime = (new Date).getTime();
	let he = starttime + 4442;
	let lsu = lsubid()


    let mets = {
        'tz': getRandomInt(0, 9999), 
        'fp2':  getRandomInt(10000, 555555), 
        'lsubid':  getRandomInt(0, 9999), 
        'browser':  getRandomInt(0, 9999)
    };

	let hahah = {
        'dupedPlugins': "Chrome PDF Plugin Chrome PDF Viewer Native Client ||1920-1080-1040-24-*-*-*",
        'errors': [],
        'flashVersion': 'null',
        'location': "https://www.amazon.com/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fsellercentral.amazon.com%2Fhome&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=sc_na_amazon_v2&openid.mode=checkid_setup&language=zh_CN&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&pageId=sc_na_amazon_v2&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&ssoResponse=eyJ6aXAiOiJERUYiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiQTI1NktXIn0.iYtE7Fv6aJ6v8chj2opIp_kOGZ33bdo5resZCKHOyv0Ovq0Egq5yMA.WdeSSQ_tHORwt2UX.rCFA9SmFW6sMqkq8A9L0t4rOE0SvBe993mELFt-VHyS636tvTYTD7NhHOrHZzB80D_qAjzY3KhcnpZEKTV7t_yZ-v0WIkpXgzr_GTOnAGCoq7uKI079hTMOVL-zZxFJswOXZSCQ7aC_uumC8RKta23jimSBYW9dJDKvfwnVJ7AKiKEjq2V6ZnOEUmPfPSTTYy_jbcPxHt4dmIEoc4g05St4Fat0ccd6kNcf6tb0YzM6zF8bwllfXv2Haslg7g9KT_oY2.3Vmm67W6l0WPcwF1ejudGw",
        'lsUbid': lsu,
        'metrics': JSON.stringify(mets),
        'plugins': "Chrome PDF Plugin Chrome PDF Viewer Native Client ||1920-1080-1040-24-*-*-*",
        'referrer': "",
        'screenInfo': "1920-1080-1040-24-*-*-*",
        'start': starttime,
        'timeZone': 8,
        'userAgent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36",
        'version': "4.0.0",
        'webDriver': 'null'
    }

    let lha = {
        metrics: hahah['metrics'],
        start: hahah['start'],
        timeZone: hahah['timeZone'],
        lsUbid: hahah['lsUbid'],
        referrer: hahah['referrer'],
        userAgent: hahah['userAgent'],
        location: hahah['location'],
        webDriver: hahah['webDriver'],
        errors: hahah['errors'],
        version: hahah['version']
    }

	let strhahah = ''

    for (let i = 0; i < Object.keys(lha).length; i++){

        //@ts-ignore
        strhahah = strhahah.concat(lha[Object.keys(lha)[i]]);
    }
 
	return strhahah
}

function crcTable(r : any){
    var crc = Array();
    for (var t=0; t<256; t++){
        for (var e=t, c=0; c<8;c++)
            1 == (1 & e) ? e = e >>> 1 ^ 3988292384 : e >>>= 1;
        crc[t] = e
    };
    return crc
}

const crc32_js = (r : any) => {
    function crcTable2(){
        var crc = Array();
        for (var t=0; t<256; t++){
            for (var e=t, c=0; c<8;c++)
                1 == (1 & e) ? e = e >>> 1 ^ 3988292384 : e >>>= 1;
            crc[t] = e;
        };
        return crc;
    };
    function crc(r : any){
        var t ,e = 0;
        var crcl = crcTable2();
        e ^= 4294967295;
        for (var c=0; c<String(r).length; c++)
            t = 255 & (e ^ String(r).charCodeAt(c));

            // @ts-ignore
            e = e >>> 8 ^ crcl[t];
        return 4294967295 ^ e
    };

    let crclist = crcTable2();
    let cr32 = crc(r);

    return cr32;

}

function hex_js(t : any){
    let temp = ['0123456789ABCDEF'.charAt(t >>> 28 & 15),'0123456789ABCDEF'.charAt(t >>> 24 & 15),'0123456789ABCDEF'.charAt(t >>> 20 & 15),'0123456789ABCDEF'.charAt(t >>> 16 & 15),'0123456789ABCDEF'.charAt(t >>> 12 & 15),'0123456789ABCDEF'.charAt(t >>> 8 & 15),'0123456789ABCDEF'.charAt(t >>> 4 & 15),'0123456789ABCDEF'.charAt(15 & t)]['join']('')
    return temp;
};

function doEncrypt(r : any){
    let t = [1888420705, 2576816180, 2347232058, 874813317];
		for (var e = Math['ceil'](r['length'] / 4), o = [], i = 0; i < e; i++)
			o[i] = (255 & r['charCodeAt'](4 * i)) + ((255 & r['charCodeAt'](4 * i + 1)) << 8) + ((255 & r['charCodeAt'](4 * i + 2)) << 16) + ((255 & r['charCodeAt'](4 * i + 3)) << 24);
		for (var n = Math['floor'](6 + 52 / e),a = o[0], c = o[e - 1], d = 0; n-- > 0; )
			for (var h = (d += 2654435769) >>> 2 & 3, u = 0; u < e; u++)
				a = o[(u + 1) % e],
				c = o[u] += (c >>> 5 ^ a << 2) + (a >>> 3 ^ c << 4) ^ (d ^ a) + (t[3 & u ^ h] ^ c);
		for (var f = [], s = 0; s < e; s++)
			f[s] = String['fromCharCode'](255 & o[s], o[s] >>> 8 & 255, o[s] >>> 16 & 255, o[s] >>> 24 & 255);

		return f['join']('');
}

function base64(e : any){
    var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    e = String(e);
    for (var t, r, o, n, d = e.length % 3, h = "", i = -1, f = e.length - d; ++i < f; )
        t = e.charCodeAt(i) << 16,
        r = e.charCodeAt(++i) << 8,
        o = e.charCodeAt(++i),
        h += c.charAt((n = t + r + o) >> 18 & 63) + c.charAt(n >> 12 & 63) + c.charAt(n >> 6 & 63) + c.charAt(63 & n);
    return 2 == d ? (t = e.charCodeAt(i) << 8,
        r = e.charCodeAt(++i),
        h += c.charAt((n = t + r) >> 10) + c.charAt(n >> 4 & 63) + c.charAt(n << 2 & 63) + "=") : 1 == d && (n = e.charCodeAt(i),
        h += c.charAt(n >> 2) + c.charAt(n << 4 & 63) + "=="),
        h
}

const genMetadata = () : string => {
    let sthahah = crack()
    let crc32 = crc32_js(sthahah)
    let hek = hex_js(crc32)
    let nstrkey = hek + '#' + sthahah
    let uf = doEncrypt(nstrkey)
    let bas = base64(uf)
    return ('ECdITeCs:' + bas);
}

export default genMetadata;