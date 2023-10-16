/**
 * 834
 * 给定一个无向、连通的树。树中有 n 个标记为 0...n-1 的节点以及 n-1 条边 。
 * 给定整数 n 和数组 edges ， edges[i] = [ai, bi]表示树中的节点 ai 和 bi 之间有一条边。
 * 返回长度为 n 的数组 answer ，其中 answer[i] 是树中第 i 个节点与所有其他节点之间的距离之和。
 */

/**
 * reference: https://leetcode.cn/problems/sum-of-distances-in-tree/solutions/2345592/tu-jie-yi-zhang-tu-miao-dong-huan-gen-dp-6bgb/
 * 个人认为换根dp需要注意点：
 * 1. 什么场景使用？关键词：无向连通树 / n个点、n - 1 条边的图（可以转换成无向树）
 * 2. 大致流程：
 *  a. 从 0 为根节点先按照题目要求算一遍
 *  b. 如果有需要，计算子树的状态（例如子树大小，也可能是别的），注意这里是无向的，所以要区分 from 和 nxt。（a，b两步可以合并在一起）
 *  c. 其他的根以上一个根（from）为基础进行转换：
 *      - 最初的根即为 a 步骤算出来的 0 点
 *      - 当前 nxt 作为 from 的子树，算出来的结果考虑 **减少** 操作（nxt 这棵子树距离 nxt 相对于距离 from 来说更近了）
 *      - 而 from 的其他子树，算出来的结果考虑 **增加** 操作（其他子树距离 nxt 相对于距离 from 来说更远了）
 * 3. 回到本题的转换流程
 *  a. 设 nxt 这棵子树大小为 size[nxt]，那么 from 的其他子树就是 n - size[nxt] （一共就 n 个点）
 *  b. ans[nxt] 相对于 ans[from] 来说：
 *      - nxt 这棵子树上的点距离 nxt 距离更短了，每个点要 -1，一共要 -size[nxt]
 *      - from 的其他子树距离 nxt 的距离更远了，每个点要 +1，移动要加 n - size[nxt]
 *      - 所以 ans[nxt] = ans[from] + n - 2 * size[nxt];
 */

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var sumOfDistancesInTree = function(n, edges) {
    const g = Array.from({length: n}).map(() => Array());
    for (const [u, v] of edges) {
        g[u].push(v);
        g[v].push(u);
    }
    const ans = Array(n).fill(0);
    const size = Array(n).fill(0); // 计算子树大小
    const dfs = (from, node, depth) => {
        ans[0] += depth;
        let cnt = 1;
        for (const nxt of g[node]) {
            if (nxt === from) {
                continue;
            }
            cnt += dfs(node, nxt, depth + 1);
        }
        size[node] = cnt;
        return cnt;
    };
    const cal = (from, node) => {
        for (const nxt of g[node]) {
            if (nxt === from) {
                continue;
            }
            ans[nxt] = ans[node] + n - size[nxt] - size[nxt];
            cal(node, nxt);
        }
    };
    dfs(null, 0, 0);
    cal(null, 0);
    return ans;
};

/**
 * 其他题目：2858
 */
