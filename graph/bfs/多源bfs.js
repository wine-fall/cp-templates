/**
 * 多源 bfs，例题：1162
 * 从各个源点一圈一圈的往外迭代。
 * 对于每一个源点：设有第 n 圈，和第 n + 1 圈（其中第 n 圈要比第 n + 1 圈更靠近源点）
 * 本质是：第 n 圈可以推算出第 n + 1 圈的结果，而第 n + 1 圈的更新对第 n 圈没有影响。（通过内圈的结果计算外圈，而外圈的更新不会影响内圈）
 * 
 * reference: https://juejin.cn/post/6979044529680678920
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxDistance = function(grid) {
    const n = grid.length;
    const m = grid[0].length;
    let lands = [];
    const dist = Array(n).fill(0).map(() => Array(m).fill(-1));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] === 1){
                lands.push([i, j]);
                dist[i][j] = 0;
            }
        }
    }
    if (lands.length === 0) {
        return -1;
    }
    const steps = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let ans = -Infinity;
    while (lands.length) {
        const l = lands.length;
        const nxt = [];
        for (let i = 0; i < l; i++) {
            const [x, y] = lands[i];
            const d = dist[x][y];
            for (const [dx, dy] of steps) {
                const nx = dx + x;
                const ny = dy + y;
                if (nx >= 0 && nx < n && ny >= 0 && ny < m && dist[nx][ny] === -1 && grid[nx][ny] !== 1) {
                    dist[nx][ny] = d + 1;
                    ans = Math.max(ans, d + 1);
                    nxt.push([nx, ny]);
                }
            }
        }
        lands = nxt;
    }
    return ans === -Infinity ? -1 : ans;
};
