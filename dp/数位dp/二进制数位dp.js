/**
 * 380 单周赛 t3
 */
/**
 * @param {number} k
 * @param {number} x
 * @return {number}
 */
let findMaximumNumber = function(k, x) {
    let l = 0;
    let r = 1e18;
    let pos = -1;
    const check = (mi) => {
        mi = mi.toString(2);
        const n = mi.length;
        const memo = new Map();
        const dfs = (idx, isLimit) => {
            if (idx === n) {
                return [0, 1];
            }
            const key = [idx, isLimit].join(',');
            if (memo.has(key)) {
                return memo.get(key);
            }
            const ret = [0, 0];
            const top = isLimit ? +mi[idx] : 1;
            for (let i = 0; i <= top; i++) {
                const [a, b] = dfs(idx + 1, isLimit && i === top);
                ret[0] += a;
                ret[1] += b;
                if ((n - idx) % x === 0 && i === 1) {
                    ret[0] += b;
                }
            }
            memo.set(key, ret);
            return ret;
        };
        const ret = dfs(0, true);
        return ret[0] <= k;
    };
    while (l <= r) {
        const mi = Math.floor((l + r) / 2);
        if (check(mi)) {
            pos = mi;
            l = mi + 1;
        } else {
            r = mi - 1;
        }
    }
    return pos;
};