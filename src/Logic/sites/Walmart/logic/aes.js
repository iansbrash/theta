let cipher = {};

cipher.aes = function(e) {
    this._tables[0][0][0] || this._precompute();
    var t, n, a, i, o, c = this._tables[0][4], u = this._tables[1], s = e.length, d = 1;
    if (4 !== s && 6 !== s && 8 !== s)
        throw new r.exception.invalid("invalid aes key size");
    for (this._key = [i = e.slice(0), o = []],
    t = s; t < 4 * s + 28; t++)
        a = i[t - 1],
        (t % s == 0 || 8 === s && t % s == 4) && (a = c[a >>> 24] << 24 ^ c[a >> 16 & 255] << 16 ^ c[a >> 8 & 255] << 8 ^ c[255 & a],
        t % s == 0 && (a = a << 8 ^ a >>> 24 ^ d << 24,
        d = d << 1 ^ 283 * (d >> 7))),
        i[t] = i[t - s] ^ a;
    for (n = 0; t; n++,
    t--)
        a = i[3 & n ? t : t - 4],
        o[n] = t <= 4 || n < 4 ? a : u[0][c[a >>> 24]] ^ u[1][c[a >> 16 & 255]] ^ u[2][c[a >> 8 & 255]] ^ u[3][c[255 & a]]
}
cipher.aes.prototype = {
    encrypt: function(e) {
        return this._crypt(e, 0)
    },
    decrypt: function(e) {
        return this._crypt(e, 1)
    },
    _tables: [[[], [], [], [], []], [[], [], [], [], []]],
    _precompute: function() {
        var e, t, n, r, a, i, o, c, u = this._tables[0], s = this._tables[1], d = u[4], l = s[4], f = [], p = [];
        for (e = 0; e < 256; e++)
            p[(f[e] = e << 1 ^ 283 * (e >> 7)) ^ e] = e;
        for (t = n = 0; !d[t]; t ^= 0 == r ? 1 : r,
        n = 0 == p[n] ? 1 : p[n])
            for (i = (i = n ^ n << 1 ^ n << 2 ^ n << 3 ^ n << 4) >> 8 ^ 255 & i ^ 99,
            d[t] = i,
            l[i] = t,
            c = 16843009 * f[a = f[r = f[t]]] ^ 65537 * a ^ 257 * r ^ 16843008 * t,
            o = 257 * f[i] ^ 16843008 * i,
            e = 0; e < 4; e++)
                u[e][t] = o = o << 24 ^ o >>> 8,
                s[e][i] = c = c << 24 ^ c >>> 8;
        for (e = 0; e < 5; e++)
            u[e] = u[e].slice(0),
            s[e] = s[e].slice(0)
    },
    _crypt: function(e, t) {
        if (4 !== e.length)
            throw new r.exception.invalid("invalid aes block size");
        var n, a, i, o, c = this._key[t], u = e[0] ^ c[0], s = e[t ? 3 : 1] ^ c[1], d = e[2] ^ c[2], l = e[t ? 1 : 3] ^ c[3], f = c.length / 4 - 2, p = 4, m = [0, 0, 0, 0], E = this._tables[t], b = E[0], h = E[1], _ = E[2], v = E[3], y = E[4];
        for (o = 0; o < f; o++)
            n = b[u >>> 24] ^ h[s >> 16 & 255] ^ _[d >> 8 & 255] ^ v[255 & l] ^ c[p],
            a = b[s >>> 24] ^ h[d >> 16 & 255] ^ _[l >> 8 & 255] ^ v[255 & u] ^ c[p + 1],
            i = b[d >>> 24] ^ h[l >> 16 & 255] ^ _[u >> 8 & 255] ^ v[255 & s] ^ c[p + 2],
            l = b[l >>> 24] ^ h[u >> 16 & 255] ^ _[s >> 8 & 255] ^ v[255 & d] ^ c[p + 3],
            p += 4,
            u = n,
            s = a,
            d = i;
        for (o = 0; o < 4; o++)
            m[t ? 3 & -o : o] = y[u >>> 24] << 24 ^ y[s >> 16 & 255] << 16 ^ y[d >> 8 & 255] << 8 ^ y[255 & l] ^ c[p++],
            n = u,
            u = s,
            s = d,
            d = l,
            l = n;
        return m
    }
};

module.exports = {
    cipher,
};