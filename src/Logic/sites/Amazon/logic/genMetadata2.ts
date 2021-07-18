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

const crack = () : string => {
    let starttime = (new Date).getTime();
	let lsu = lsubid()

    let xd = {
        "metrics": {
            "el": 0,
            "script": 1,
            "h": 0,
            "batt": 0,
            "perf": 0,
            "auto": 0,
            "tz": 0,
            "fp2": 0,
            "lsubid": 0,
            "browser": 0,
            "capabilities": 1,
            "gpu": 0,
            "dnt": 0,
            "math": 0,
            "tts": 0,
            "input": 1,
            "canvas": 0,
            "captchainput": 0,
            "pow": 0
        },
        "start": 1626561936760,
        "interaction": {
            "clicks": 1,
            "touches": 0,
            "keyPresses": 0,
            "cuts": 0,
            "copies": 0,
            "pastes": 0,
            "keyPressTimeIntervals": [],
            "mouseClickPositions": ["448,650"],
            "keyCycles": [],
            "mouseCycles": [66, 93],
            "touchCycles": []
        },
        "scripts": {
            "dynamicUrls": ["https://c.amazon-adsystem.com/bao-csm/forensics/a9-tq-forensics-incremental.min.js", "https://images-na.ssl-images-amazon.com/images/I/31YXrY93hfL.js", "https://images-na.ssl-images-amazon.com/images/I/61-6nKPKyWL._RC|11Y+5x+kkTL.js,51KMV3Cz2XL.js,31x4ENTlVIL.js,31f4+QIEeqL.js,01N6xzIJxbL.js,518BI433aLL.js,01rpauTep4L.js,31QZSjMuoeL.js,61ofwvddDeL.js,01KsMxlPtzL.js_.js?AUIClients/AmazonUI", "https://images-na.ssl-images-amazon.com/images/I/21G215oqvfL._RC|21OJDARBhQL.js,218GJg15I8L.js,31lucpmF4CL.js,2119M3Ks9rL.js,51pHXSL0+8L.js_.js?AUIClients/AuthenticationPortalAssets", "https://images-na.ssl-images-amazon.com/images/I/01wGDSlxwdL.js?AUIClients/AuthenticationPortalInlineAssets", "https://images-na.ssl-images-amazon.com/images/I/31wFiUhQ5CL.js?AUIClients/CVFAssets", "https://images-na.ssl-images-amazon.com/images/I/81oDzXaLrLL.js?AUIClients/SiegeClientSideEncryptionAUI", "https://images-na.ssl-images-amazon.com/images/I/716U66oCsOL.js?AUIClients/FWCIMAssets", "https://static.siege-amazon.com/prod/profiles/AuthenticationPortalSigninNA.js"],
            "inlineHashes": [-1746719145, -282132413, 130919423, -314038750, -682620762, 216868775, 1424856663, 209691858, 318224283, 1251695250, 2073308497, 4606827, -1611905557, 1800521327, 2118020403, 1532181211, -1983510763, 331421908],
            "elapsed": 9,
            "dynamicUrlCount": 9,
            "inlineHashesCount": 18
        },
        "history": {
            "length": 4
        },
        "battery": {},
        "performance": {
            "timing": {
                "connectStart": starttime, 
                "navigationStart": 1626561915605, // 0
                "loadEventEnd": starttime + 21009, // 21009
                "domLoading": starttime + 219, // 219
                "secureConnectionStart": 0,
                "fetchStart": starttime, // 0
                "domContentLoadedEventStart": starttime + 685, // 685
                "responseStart": starttime + 206, // 206
                "responseEnd": starttime + 268, // 268
                "domInteractive": starttime + 685, // 685
                "domainLookupEnd": starttime, // 0
                "redirectStart": 0,
                "requestStart": starttime + 4, // 4
                "unloadEventEnd": starttime + 216, // 216
                "unloadEventStart": starttime + 215, // 215
                "domComplete": starttime + 20993, // 20993
                "domainLookupStart": starttime, // 0
                "loadEventStart": starttime + 20993, // 20993
                "domContentLoadedEventEnd": starttime + 693, // 693
                "redirectEnd": 0,
                "connectEnd": starttime // 0
            }
        },
        "automation": {
            "wd": {
                "properties": {
                    "document": [],
                    "window": [],
                    "navigator": []
                }
            },
            "phantom": {
                "properties": {
                    "window": []
                }
            }
        },
        "end": starttime + 31241,
        "timeZone": -6,
        "flashVersion": null,
        "plugins": "Chrome PDF Plugin Chrome PDF Viewer Native Client ||1920-1200-1160-24-*-*-*",
        "dupedPlugins": "Chrome PDF Plugin Chrome PDF Viewer Native Client ||1920-1200-1160-24-*-*-*",
        "screenInfo": "1920-1200-1160-24-*-*-*",
        "lsUbid": lsu,//"X27-6624931-5472254:1601666187",
        "referrer": "https://www.amazon.com/ap/signin?_encoding=UTF8&openid.assoc_handle=usflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fgp%2Fyourstore%2Fhome%3Fie%3DUTF8%26action%3Dsign-out%26path%3D%252Fgp%252Fyourstore%252Fhome%26ref_%3Dnav_AccountFlyout_signout%26signIn%3D1%26useRedirectOnSuccess%3D1",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "location": "https://www.amazon.com/ap/signin",
        "webDriver": false,
        "capabilities": {
            "css": {
                "textShadow": 1,
                "WebkitTextStroke": 1,
                "boxShadow": 1,
                "borderRadius": 1,
                "borderImage": 1,
                "opacity": 1,
                "transform": 1,
                "transition": 1
            },
            "js": {
                "audio": true,
                "geolocation": true,
                "localStorage": "supported",
                "touch": false,
                "video": true,
                "webWorker": true
            },
            "elapsed": 0
        },
        "gpu": {
            "vendor": "Google Inc. (Intel)",
            "model": "ANGLE (Intel, Intel(R) UHD Graphics Direct3D11 vs_5_0 ps_5_0, D3D11-27.20.100.9168)",
            "extensions": ["ANGLE_instanced_arrays", "EXT_blend_minmax", "EXT_color_buffer_half_float", "EXT_disjoint_timer_query", "EXT_float_blend", "EXT_frag_depth", "EXT_shader_texture_lod", "EXT_texture_compression_bptc", "EXT_texture_compression_rgtc", "EXT_texture_filter_anisotropic", "WEBKIT_EXT_texture_filter_anisotropic", "EXT_sRGB", "KHR_parallel_shader_compile", "OES_element_index_uint", "OES_fbo_render_mipmap", "OES_standard_derivatives", "OES_texture_float", "OES_texture_float_linear", "OES_texture_half_float", "OES_texture_half_float_linear", "OES_vertex_array_object", "WEBGL_color_buffer_float", "WEBGL_compressed_texture_s3tc", "WEBKIT_WEBGL_compressed_texture_s3tc", "WEBGL_compressed_texture_s3tc_srgb", "WEBGL_debug_renderer_info", "WEBGL_debug_shaders", "WEBGL_depth_texture", "WEBKIT_WEBGL_depth_texture", "WEBGL_draw_buffers", "WEBGL_lose_context", "WEBKIT_WEBGL_lose_context", "WEBGL_multi_draw"]
        },
        "dnt": 1,
        "math": {
            "tan": "-1.4214488238747245",
            "sin": "0.8178819121159085",
            "cos": "-0.5753861119575491"
        },
        "form": {
            "ap-credential-autofill-hint": {
                "clicks": 0,
                "touches": 0,
                "keyPresses": 0,
                "cuts": 0,
                "copies": 0,
                "pastes": 0,
                "keyPressTimeIntervals": [],
                "mouseClickPositions": [],
                "keyCycles": [],
                "mouseCycles": [],
                "touchCycles": [],
                "width": 0,
                "height": 0,
                "totalFocusTime": 0,
                "prefilled": true
            },
            "password": {
                "clicks": 0,
                "touches": 0,
                "keyPresses": 0,
                "cuts": 0,
                "copies": 0,
                "pastes": 0,
                "keyPressTimeIntervals": [],
                "mouseClickPositions": [],
                "keyCycles": [],
                "mouseCycles": [],
                "touchCycles": [],
                "width": 296,
                "height": 31,
                "totalFocusTime": 0,
                "prefilled": true
            }
        },
        "token": {
            "isCompatible": true,
            "pageHasCaptcha": 0
        },
        "auth": {
            "form": {
                "method": "post"
            }
        },
        "errors": [],
        "version": "4.0.0"
    }

    return JSON.stringify(xd)
}

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
    for (var t, r, o, n, d = e.length % 3, h = "", i = -1, f = e.length - d; ++i < f;) t = e.charCodeAt(i) << 16, r = e.charCodeAt(++i) << 8, o = e.charCodeAt(++i), h += c.charAt((n = t + r + o) >> 18 & 63) + c.charAt(n >> 12 & 63) + c.charAt(n >> 6 & 63) + c.charAt(63 & n);
    return 2 == d ? (t = e.charCodeAt(i) << 8, r = e.charCodeAt(++i), h += c.charAt((n = t + r) >> 10) + c.charAt(n >> 4 & 63) + c.charAt(n << 2 & 63) + "=") : 1 == d && (n = e.charCodeAt(i), h += c.charAt(n >> 2) + c.charAt(n << 4 & 63) + "=="), h
}


const calculate = (r : any) => {
    let crcTable = buildCrcTable();

    var t, e = 0;
    e ^= 4294967295;
    for (var c = 0; c < r.length; c++) t = 255 & (e ^ r.charCodeAt(c)), e = e >>> 8 ^ crcTable[t];
    return 4294967295 ^ e
} 

const buildCrcTable = () => {
    let crcTable = [];
    for (var t = 0; t < 256; t++) {
        for (var e = t, c = 0; c < 8; c++) 1 == (1 & e) ? e = e >>> 1 ^ 3988292384 : e >>>= 1;
        crcTable[t] = e
    }

    return crcTable;
}

const encode = (t : any) => {
    return ['0123456789ABCDEF'.charAt(t >>> 28 & 15), '0123456789ABCDEF'.charAt(t >>> 24 & 15), '0123456789ABCDEF'.charAt(t >>> 20 & 15), '0123456789ABCDEF'.charAt(t >>> 16 & 15), '0123456789ABCDEF'.charAt(t >>> 12 & 15), '0123456789ABCDEF'.charAt(t >>> 8 & 15), '0123456789ABCDEF'.charAt(t >>> 4 & 15), '0123456789ABCDEF'.charAt(15 & t)].join('')
}

const genMetadata = () : string => {
   
    // return lsubid()

    let sthahah = crack()
    // let crc32 = crc32_js(sthahah)
    // console.log(crc32)
    // let hek = hex_js(crc32)
    // console.log(hek)
    let crc32 = calculate(sthahah)
    let hek = encode(crc32)
    // console.log(`hek: ${hek}`)
    // return '';
    let nstrkey = hek + '#' + sthahah
    let uf = doEncrypt(nstrkey)
    let bas = base64(uf)
    return ('ECdITeCs:' + bas);
}


export default genMetadata;