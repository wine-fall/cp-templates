/**
 * 380 单周赛 t3
 */
/**
 * @param {number} k
 * @param {number} x
 * @return {number}
 */
var findMaximumNumber = function(k, x) {
    let l = 0;
    let r = 1e18;
    let pos = -1;
    const check = (mi) => {
        mi = mi.toString(2);
        const n = mi.length;
        const memo = new Map();
        const dfs = (i, isLimit, isSkip) => {
            if (i === n) {
                return [0, 1];
            }
            const key = [i, isLimit, isSkip].join(',');
            if (memo.has(key)) {
                return memo.get(key);
            }
            const ret = [0, 0];
            if (isSkip) {
                const [v1, v2] = dfs(i + 1, false, true);
                ret[0] += v1;
                ret[1] += v2;
                // 题目要求当前位必需是1，但在"跳过"的场景下，该位置必然是0，所以不再进一步判断
            }
            const top = isLimit ? +mi[i] : 1;
            for (let ii = isSkip ? 1 : 0; ii <= top; ii++) {
                const [v1, v2] = dfs(i + 1, isLimit && ii === top, false);
                ret[0] += v1;
                ret[1] += v2;
                if ((n - i) % x === 0 && ii === 1) {
                    ret[0] += v2;
                }
            }
            memo.set(key, ret);
            return ret;
        };
        const ret = dfs(0, true, true);
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