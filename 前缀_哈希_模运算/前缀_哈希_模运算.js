/**
 * t 2949
 * - 题目描述：
 *     给你一个字符串 s 和一个正整数 k 。
 *     用 vowels 和 consonants 分别表示字符串中元音字母和辅音字母的数量
 *     如果某个字符串满足以下条件，则称其为 美丽字符串 
 *     vowels == consonants，即元音字母和辅音字母的数量相等
 *     (vowels * consonants) % k == 0，即元音字母和辅音字母的数量的乘积能被 k 整除
 *     返回字符串 s 中 非空美丽子字符串 的数量
 *     子字符串是字符串中的一个连续字符序列
 *     英语中的 元音字母 为 'a'、'e'、'i'、'o' 和 'u' 
 *     英语中的 辅音字母 为除了元音字母之外的所有字母。
 * - 解释：
 *      1. 满足第一个条件：子字符串 [i, j] 的 元音数量 和 辅音数量 可以用前缀和来表示
 *         分别设为： vi - vj 与 ci - cj。（其中 vi 表示坐标i处 元音 的总数量，ci 表示坐标i处 辅音 的总数量）
 *         根据题意, 满足要求的字符串需要满足 vi - vj === ci - cj, 变式可得 vi - ci === vj - cj
 *         可令 xi = vi - ci, xj = vj - cj
 *         那么对于每个坐标的 xi，需要找到前缀的一个 xj，令 xj === xi，则满足第一个条件
 *      2. 满足第二个条件：根据 1 可得，满足第二个条件也就是满足 ((vi - vj) * (ci - cj)) % k === 0;
 *         又因为该字符串还需满足 vi - vj === ci - cj，所以也就是 ((vi - vj) * (vi - vj)) % k === 0;
 *         根据同余定理：(((vi - vj) % k) * ((vi - vj) % k)) % k === 0;
 *         令 w = (vi - vj) % k，也就是 (w * w) % k === 0。
 *         注意到 w <= k，而 k 的范围在 [1, 1000]，所以可以遍历出所有的 w
 *         对于每个坐标，我们遍历所有的 w，又有 vi % k - vj % k === w % k === w
 *         令 yi = vi % k，也即 yi - yj === w，也就是要令 yj === (yi - w + k) % k，则满足第二个条件（yi - w 可能为负数，所以要加个 k）
 *      3. 注意到，1，2两个条件需要同时满足
 *         也就是对于一个坐标 i 来说：
 *             - 这两个条件需要『成对』出现、并『成对』记录
 *             - 对于条件 1 我们要记录 xi，也就是 vi - ci;
 *             - 对于条件 2 我们要记录 yi，也就是 vi % k;
 *             - 由于两者需要成对出现，可令 keyi = `${xi},${yi}` （成对拼接起来，可用字符串表示，优化时也可用二进制表示），并记录这个 keyi
 *             - 对于该坐标的 xi、 yi来说，我们要找的是 xj、yj，根据上文，也就是要找 xi 和 yi - w 所拼接起来的 keyj
 *             - 代码实现中，自然要先去『找』有没有符合条件的 keyj, 再去『记录』当前的 keyi
 *      4. 用于记录的哈希表默认要存一个 '0,0'，其值为 1
 * 
 * - 总结：就是前缀和，求余，变式
 * 
 * - 类似例题：
 *   t560(https://leetcode.cn/problems/subarray-sum-equals-k/description/)
 *   t974(https://leetcode.cn/problems/subarray-sums-divisible-by-k/description/)
 *   t1490(https://leetcode.cn/problems/make-sum-divisible-by-p/description/)
 *   t523(https://leetcode.cn/problems/continuous-subarray-sum/description/)
 *   t525(https://leetcode.cn/problems/contiguous-array/description/)
 *   面试17.05(https://leetcode.cn/problems/find-longest-subarray-lcci/description/)
 *   t1915(https://leetcode.cn/problems/number-of-wonderful-substrings/description/)
 *   t930(https://leetcode.cn/problems/binary-subarrays-with-sum/description/)
 *   t1371(https://leetcode.cn/problems/find-the-longest-substring-containing-vowels-in-even-counts/description/)
 *   t1542(https://leetcode.cn/problems/find-longest-awesome-substring/description/)
 */


/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var beautifulSubstrings = function(s, k) {
    const wList = [];
    for (let w = 1; w <= k; w++) {
        if ((w * w) % k === 0) {
            wList.push(w);
        }
    }
    const set = new Set(['a', 'e', 'i', 'o', 'u']);
    const n = s.length;
    let sumv = 0;
    let sumw = 0;
    const map = new Map([[[0, 0].join(','), 1]]);
    let ans = 0;
    for (let i = 0; i < n; i++) {
        if (set.has(s[i])) {
            sumv++;
        } else {
            sumw++;
        }
        for (const w of wList) {
            const xj = sumv - sumw;
            const yj = (sumv % k - w % k + k) % k;
            if (map.has([xj, yj].join(','))) {
                ans += map.get([xj, yj].join(','));
            }
        }
        map.set(
            [sumv - sumw, sumv % k].join(','),
            (map.get([sumv - sumw, sumv % k].join(',')) || 0) + 1
        );
    }
    return ans;
};
