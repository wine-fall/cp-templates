/**
 * @description 将一段字符串序列化为hash
 * @param {string} str
 * @returns {string}
 */
const stringHash = (str) => {
    const MOD = 1e9 + 7;
    const base = 31;
    const getCode = (char) => {
        return char.charCodeAt() - 'a'.charCodeAt() + 1;
    }
    const n = str.length;
    const prefix = Array(n + 1).fill(0);
    const mul = Array(n + 1).fill(1);
    for (let i = 1; i < n + 1; i++) {
        prefix[i] = (prefix[i - 1] * base + getCode(str[i - 1]) ) % MOD;
        mul[i] = mul[i - 1] * base % MOD;
    }
    const getHash = (l, r) => {
        return (prefix[l] - prefix[r] * mul[l - r] % MOD + MOD) % MOD;
    }
}