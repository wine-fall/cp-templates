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
