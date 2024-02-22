/**
 * @description  z[i] 的定义是后缀 t[i:] 与 t 的最长公共前缀的长度
 * @param {string} str
 * @returns {number[]}
 */
const buildZ = (str) => {
    const n = str.length;
    const z = Array(n).fill(0);
    let l = 0, r = 0;
    for (let i = 1; i < n; i++) {
        if (i <= r) {
            z[i] = Math.min(z[i - l], r - i + 1);
        }
        while (i + z[i] < n && str[z[i]] === str[i + z[i]]) {
            l = i;
            r = i + z[i];
            z[i]++;
        }
    }
    z[0] = n;
    return z;
};
