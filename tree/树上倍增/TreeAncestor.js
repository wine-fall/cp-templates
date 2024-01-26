/**
 * t1483
 * 树上倍增算法：
 *  - 本题是从当前节点找到往上的第 k 层的祖先节点
 *  - 采用的是二进制的技巧：
 *  -    要从当前节点往上跳 k 步，例如跳 13 步，一步步考虑则要考虑 13 次
 *  -    那么如果将 13 转换为二进制 (1101)，则相当于先跳 1 步，再跳 4 步，再跳 8 步（二进制中 1 的位置），则只要考虑 3 次
 *  -    所以在数据量 1e5 的限制下，只用考虑 32 次方的二进制即可
 *  -    需要注意的是这里步数是**直接**叠加，也就是：先跳 1 步，再跳 4 步，再跳 8 步。而不是：先跳 1 步，再跳 (4 - 1) 步，再跳 (8 - (4 - 1)) 步
 */

/**
 * @param {number} n
 * @param {number[]} parent
 */
const TreeAncestor = function(n, parent) {
    const f = Array(n).fill(0).map(() => Array(32).fill(-1));
    for (let i = 0; i < n; i++) {
        const p = parent[i];
        f[i][0] = p;
    }
    for (let i = 0; i < 32; i++) {
        for (let x = 0; x < n; x++) {
            const p = f[x][i];
            f[x][i + 1] = p < 0 ? -1 : f[p][i];
        }
    }
    this.f = f;
};

/** 
 * @param {number} node 
 * @param {number} k
 * @return {number}
 */
TreeAncestor.prototype.getKthAncestor = function(node, k) {
    for (let i = 0; i < 32; i++) {
        if (k & (1 << i)) {
            node = this.f[node][i];
            if (node < 0) {
                break;
            }
        }
    }
    return node;
};


/**
 * t2846
 * - 这题每次查询都是找 x, y 之间的个数
 * - 假设我们知道 x, y之间的 lca (最近公共祖先)
 * - 那么 x 到 y 的个数也就是 cnt[x] + cnt[y] - 2 * cnt[lca]
 * - 所以难点在于 m 次查询找 m 次 lca 的时间复杂度
 * - 这里使用树上倍增的方法可以降到 O(m * 32) 详见：tree/LCA/LCA.js
 * - 如果求最值则不能用这个方法，详见提交记录
 */
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[][]} queries
 * @return {number[]}
 */
var minOperationsQueries = function(n, edges, queries) {
    const g = Array(n).fill(0).map(() => Array());
    const f = Array(n).fill(0).map(() => Array(32).fill(-1));
    const cnt = Array(n).fill(-1);
    const depth = Array(n).fill(0);
    for (const [u, v, w] of edges) {
        g[u].push([v, w]);
        g[v].push([u, w]);
    }

    const dfs = (node, from, c, memo) => {
        f[node][0] = from;
        depth[node] = c;
        cnt[node] = [...memo];
        for (const [nxt, w] of g[node]) {
            if (nxt === from) {
                continue;
            }
            memo[w] += 1;
            dfs(nxt, node, c + 1, memo);
            memo[w] -= 1;
        }
    };
    dfs(0, -1, 0, Array(27).fill(0));

    for (let i = 0; i < 32; i++) {
        for (let x = 0; x < n; x++) {
            const p = f[x][i];
            f[x][i + 1] = p < 0 ? -1 : f[p][i];
        }
    }

    const getKthAncestor = (node, k) => {
        for (let i = 0; i < 32; i++) {
            if (k & (1 << i)) {
                node = f[node][i];
                if (node < 0) {
                    break;
                }
            }
        }
        return node;
    };

    const lca = (x, y) => {
        if (depth[x] > depth[y]) {
            const tmp = x;
            x = y;
            y = tmp;
        }
        y = getKthAncestor(y, depth[y] - depth[x]);
        if (x === y) {
            return x;
        }
        for (let i = f[x].length - 1; i >= 0; i--) {
            const px = f[x][i];
            const py = f[y][i];
            if (px !== py) {
                x = px;
                y = py;
            }
        }
        return f[x][0];
    };

    const cal = (x, y) => {
        const _lca = lca(x, y);
        const v1 = depth[x] + depth[y] - 2 * depth[_lca];
        let v2 = 0;
        for (let i = 1; i <= 26; i++) {
            v2 = Math.max(v2, cnt[x][i] + cnt[y][i] - 2 * cnt[_lca][i]);
        }
        return v1 - v2;
    };
    const ans = [];
    for (const [x, y] of queries) {
        ans.push(cal(x, y));
    }
    return ans;
};
