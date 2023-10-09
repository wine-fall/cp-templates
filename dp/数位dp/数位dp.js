/**
 * @param {string[]} digits
 * @param {number} n
 * @return {number}
 */
var atMostNGivenDigitSet = function(digits, n) {
    const set = new Set(digits);
    const nums = [];
    while (n > 0) {
        nums.unshift(n % 10);
        n = Math.floor(n / 10);
    }
    const m = nums.length;
    const memo = new Map();
    const dfs = (pre, idx, isLimit, isSkip) => {
        const key = [pre, idx, isLimit, isSkip].join(',');
        if (memo.has(key)) {
            return memo.get(key);
        }
        if (idx === m) {
            return isSkip ? 0 : 1;
        }
        let ret = 0;
        if (isSkip) {
            ret += dfs(pre, idx + 1, false, true);
        }
        const top = isLimit ? nums[idx] : 9;
        for (let i = isSkip ? 1 : 0; i <= top; i++) {
            if (!set.has(i.toString())) {
                continue;
            }
            ret += dfs(i, idx + 1, isLimit && i === top, false);
        }
        memo.set(key, ret);
        return ret;
    };
    const ans = dfs(0, 0, true, true);
    return ans;
};

