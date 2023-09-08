/**
 * 494. 目标和
 * 给你一个非负整数数组 nums 和一个整数 target 。
 * 向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 ：
 * 例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1" 。
 * 返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。
 */

/**
 * 由于 nums[i] 是非负的，所以这道题本质就是从 nums 中选一些数出来，使他们为负数，每个数只能选一次。
 * 设选出的数和为 k，则有 sum(nums) - 2 * k = target，变式得 k = (sum(nums) - target) / 2  (由正变负需要考虑两次，所以要除以2)
 */

/**
 * @description dfs
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function(nums, target) {
    const n = nums.length;
    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum += nums[i];
    }
    if ((sum - target) % 2 !== 0) {
        return 0;
    }
    const k = (sum - target) / 2;
    const memo = new Map();
    /**
     * @description 考虑到第 i 个数时，我们得到和为 c 的方案数
     * @param {number} i 
     * @param {number} c
     * @returns {number}
     */
    const dfs = (i, c) => {
        if (i < 0) {
            return c === k ? 1 : 0;
        }
        const key = [i, c].join(',');
        if (memo.has(key)) {
            return memo.get(key);
        }
        if (c + nums[i] > k) {
            // 当前这个选了就大于 k 了，所以直接返回『不能选』的结果
            const val = dfs(i - 1, c);
            memo.set(key, val);
            return val;
        }
        // 返回『不能选』+『能选』的结果
        const val = dfs(i - 1, c) + dfs(i - 1, c + nums[i]);
        memo.set(key, val);
        return val;
    };
    return dfs(n - 1, 0);
};

/**
 * @description 二维 dp
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays_2 = function (nums, target) {
    const n = nums.length;
    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum += nums[i];
    }
    if ((sum - target) % 2 !== 0 || sum < target) {
        return 0;
    }
    const k = (sum - target) / 2;
    // f[i][j] 表示选到第 i 个数，和为 j 的方案数
    const f = Array.from({length: n}).map(() => Array(k + 1).fill(0));
    // 合为 0 的方案数为 1（什么都不选）
    f[0][0] = 1;
    if (nums[0] <= k) {
        // 把选第一个数的 case 初始化，注意这里要 += 1 而不是 = 1，考虑某些边界 case
        f[0][nums[0]] += 1;
    }
    // 这里和 dfs 的逻辑一致
    for (let i = 1; i < n; i++) {
        for (let j = k; j >= 0; j--) {
            if (j < nums[i]) {
                f[i][j] = f[i - 1][j];
            } else {
                f[i][j] = f[i - 1][j] + f[i - 1][j - nums[i]];
            }
        }
    }
    return f[n - 1][k];
};

/**
 * @description 一维 dp
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
    const n = nums.length;
    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum += nums[i];
    }
    if ((sum - target) % 2 !== 0 || sum < target) {
        return 0;
    }
    const k = (sum - target) / 2;
    const f = Array(k + 1).fill(0);
    f[0] = 1;
    for (let i = 0; i < n; i++) {
        for (let j = k; j >= nums[i]; j--) {
            f[j] = f[j] + f[j - nums[i]];
        }
    }
    return f[k];
};

/**
 * 每个数只能选一次（01背包），就从 k 开始往 0 遍历
 * 每个数可以选多次（完全背包），就从 0 开始往 k 遍历
 * 至于为什么，可以看灵茶的视频：https://www.bilibili.com/video/BV16Y411v7Y6/?spm_id_from=333.999.0.0&vd_source=c544fb44a0bae3ac353bf8ce3bc79671
 * 额外练习：322, 2585（多重背包）
 */
