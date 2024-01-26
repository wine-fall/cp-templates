/**
 * 利用树上倍增法去求最低公共祖先，实现在节点为 n，查询次数为 m 次的情况下，时间复杂度为 O(n + m * 32)
 */

/**
 * @param {number} n
 * @param {number[]} parent
 */
var TreeAncestor = function(n, parent) {
    const f = Array(n).fill(0).map(() => Array(32).fill(-1));
    const g = Array(n).fill(0).map(() => Array());
    for (let i = 0; i < n; i++) {
        f[i][0] = parent[i];
        if (parent[i] !== -1) {
            g[parent[i]].push(i);
        }
    }
    for (let i = 0; i < 32; i++) {
        for (let x = 0; x < n; x++) {
            const p = f[x][i];
            f[x][i + 1] = p < 0 ? -1 : f[p][i];
        }
    }
    this.f = f;

    // 找一遍深度
    this.depth = Array(n).fill(-1);
    const dfs = (node, c) => {
        this.depth[node] = c;
        for (const nxt of g[node]) {
            dfs(nxt, c + 1);
        }
    };
    dfs(0, 0);
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
 * 
 * @param {number} x 
 * @param {number} y 
 * @returns {number}
 */
TreeAncestor.prototype.getLCA = function(x, y) {
    if (this.depth[x] > this.depth[y]) {
        // 初始化：保证 x 在 y 上面
        const tmp = x;
        x = y;
        y = tmp;
    }
    // 先让 x 和 y 处于同一层
    y = this.getKthAncestor(y, this.depth[x] - this.depth[y]);
    if (y === x) {
        return x;
    }
    /**
     * 这里每次跳都跳最大的一步
     * - 如果 x 和 y 的祖先是同一个，那么保持x, y不变，试一试当前状况下跳小一点行不行
     * - 否则，让 x 等于 x 的祖先、y 等于 y 的祖先，重复上述步骤
     * - 最终，LCA 会和最终状态的 x 差一步，也就是 this.f[x][0]
     */
    for (let i = this.f[x].length - 1; i >= 0; i--) {
        const px = this.f[x][i];
        const py = this.f[y][i];
        if (px !== py) {
            x = px;
            y = py;
        }
    }
    return this.f[x][0];
};
