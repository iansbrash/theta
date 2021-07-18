// import genMetadata2 from "./genMetadata2";

const test = () => {
    var _Iii = ['X', 'toString', 1, 'hasOwnProperty', 'innerHTML', 'floor', 'slice', 4022871197, '-', 1e3, ' ', 4294967296, 'charCodeAt', ':', 0, 23283064365386964e-26, 2, '0000000000', .6762375199396113, 'body', .02519603282416938, 'userAgent', 2091639, 'length', .49233513279824925, null, 7, 'getTime'];
    var t = 4022871197;
    
    function e(e) {
        e = typeof e === undefined || null === e ? '' : e.toString();
        for (var r = 0; r < e.length; r++) {
            var n = 0.02519603282416938 * (t += e.charCodeAt(r));
            n -= t = n >>> 0, t = (n *= t) >>> 0, t += 4294967296 * (n -= t)
        }
        return 2.3283064365386963e-10 * (t >>> 0)
    }
    var r = e(' '),
        n = e(' '),
        i = e(' '),
        o = 1,
        a = [String('<div id="a-popover-root" style="z-index:-1;position:absolute;"></div>'), "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36", 
        (new Date()).getTime()];
    
        // Takes the entire HTML of the page and does something with it
        // and userAgent and time
    for (var u in a) a.hasOwnProperty(u) && ((r -= e(a[u])) < 0 && (r += 1), (n -= e(a[u])) < 0 && (n += 1), (i -= e(a[u])) < 0 && (i += 1));
    
    function s(t) {
        return (0000000000 + (4294967296 * (e = 2091639 * r + 2.3283064365386963e-10 * o, r = n, n = i, i = e - (o = 0 | e))).toString()).slice(-t);
        var e
    }
    return 'X' + s(2) + '-' +s(7) + '-' +s(7) +':' +Math.floor(new Date().getTime() / 1000)
}



console.log(test())