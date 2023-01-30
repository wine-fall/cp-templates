/**
 * @description 判断字符串 p 是不是字符串 s 的子序列
 * @param {string} s 
 * @param {string} p
 * @returns {boolean}
 */
const isSequence = (s, p) => {
    const n = s.length;
    const m = p.length;
    let i = 0;
    let j = 0;
    while (i < n && j < m) {
        if (s[i] === p[j]) {
            j++;
        }
        i++;
    }
    return j === m;
};
