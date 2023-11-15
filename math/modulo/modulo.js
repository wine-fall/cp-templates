const InverseElement = (a, mod) => power(a, mod - 2, mod);

/**
 * @description 考虑模的 pow 求法
 * @param {number} a 
 * @param {number} n 
 * @param {number} mod 
 * @returns {number}
 */
const power = (a, n, mod) => {
    if (n === 1) {
        return a;
    } else if (n % 2 === 1) {
        return product(a, power(a, n - 1, mod), mod);
    } else {
        return power(product(a, a, mod), n / 2, mod);
    }
};

/**
 * @description 考虑模的乘法
 * @param {number} a 
 * @param {number} b 
 * @param {number} mod 
 * @returns {number}
 */
const product = (a, b, mod) => {
    a = BigInt(a);
    b = BigInt(b);
    mod = BigInt(mod);
    const ret = (a % mod * b % mod) % mod;
    return Number(ret);
};
/**
 * @description 分数求模，分数为 (a/b)，也即求 (a/b)%mod
 * @param {number} a 
 * @param {number} b 
 * @param {number} mod 
 * @returns {number}
 */
const getFractionModulo = (a, b, mod) => {
    return product(a, InverseElement(b, mod), mod);
};

/**
 * @description 考虑模的情况下，求分数frac1 与 分数 frac2 / n的加法
 * frac* 为一个长度为2的数组，frac*[0]是分子 frac*[1]是分母
 * 也即求 ((frac1[0] / frac1[1]) + (frac2[0] / (frac2[0] * n)))
 * 其中的乘法加法均考虑模取余
 * @param {number[]} frac1 
 * @param {number[]} frac2 
 * @param {number} n 
 * @param {number} mod
 * @returns 
 */
const addFractionByN = (frac1, frac2, n, mod) => {
    if (frac2[0] + frac2[1] === 0) {
        return frac1;
    }
    if (frac1[0] + frac1[1] === 0) {
        return [frac2[0], product(frac2[1], n, mod)];
    }
    const [s1, m1] = frac1;
    const [s2, m2] = frac2;
    const ns = product(product(s1, n, mod), m2, mod) + product(m1, s2, mod);
    const nm = product(product(m1, n, mod), m2, mod);
    return [ns, nm];
};
