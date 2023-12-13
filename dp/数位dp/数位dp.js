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

    // if `num1` is a string, get `+num1 - 1`
    // num1 = [...num1];
    // let i = num1.length - 1;
    // while (i >= 0 && num1[i] === '0') {
    //     i--;
    // }
    // num1[i] = String(+num1[i] - 1);
    // i++;
    // while (i < num1.length) {
    //     num1[i] = '9';
    //     i++;
    // }
    // num1 = num1.join('');

    const ans = dfs(0, 0, true, true);
    return ans;
};

