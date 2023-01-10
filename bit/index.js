// reference: https://leetcode.cn/problems/parallel-courses-ii/solution/cchao-qing-xi-de-si-lu-chao-xiang-xi-de-zqs3i/

/**
 * @description 统计 (1 << n）个状态中，每个状态分别有多少个 1
 * @param {number} n 
 * @return {number}
 */
const batchCountNumberOfOne = (n) => {
    const cnt = Array(n).fill(0);
    for (let i = 0; i < (1 << n); i++) {
        cnt[i] = cnt[i >> 1] + (i & 1);
    }
}

/**
 * @description 统计某个状态中有多少个 1
 * @param {number} state
 * @return {number} 
 */
const countNumberOfOne = state => {
    // 其他语言可能有一些工具函数
    let cnt = 0;
    let mask = 1;
    while (state !== 0) {
        if (state & mask) {
            cnt++;
        }
        mask = mask << 1;
        state = state >> 1;
    }
    return cnt;
}

/**
 * @description 获取某一状态下的所有子集，例如 state = 11，获取的子集为：01, 10, 11 
 * @param {*} state
 * @return {number[]}
 */
const getSubMask = (state) => {
    const subMasks = [];
    for (let i = state; i > 0; i = (i - 1) & state) {
        subMasks.push(i);
    }
    return subMasks;
}

/**
 * @description 获取 x 的最低位（最右侧的）1
 * @param {number} x 
 * @returns {number}
 */
const getLowBit = (x) => x & -x;

/**
 * @description 判断 subMask 是否为 state 的子集
 * @param {number} subMask 
 * @param {number} state 
 * @returns {boolean}
 */
const checkSubMask = (subMask, state) => {
    return subMask === (subMask & state);
}

/**
 * @description 判断 x 中是否『没有』连续的 1
 * @param {number} x 
 * @returns {boolean}
 */
const checkContinueBit = (x) => {
    return (x & (x >> 1)) == 0;
}

