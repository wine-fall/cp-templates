/**
 * t 1334
 * floyd 算法，n3 的复杂度，求得一张图内任意两点之间的最短距离
 */
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} distanceThreshold
 * @return {number}
 */
var findTheCity = function(n, edges, distanceThreshold) {
    const g = Array(n).fill(0).map(() => Array(n).fill(Infinity));
    const f = Array(n + 1).fill(0).map(() => Array(n).fill(0).map(() => Array(n).fill(Infinity)));
    for (const [a, b, w] of edges) {
        g[a][b] = w;
        g[b][a] = w;
    }
    f[0] = g;
    // f[k][i][j] 表示 i 到 j 的路径中最大端点的值小于等于 k 时的最短路径 
    for (let k = 1; k <= n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                f[k][i][j] = Math.min(
                    // 不选 k，那么中间节点的编号都小于等于 k - 1，所以是 f[k-1][i][j]
                    f[k - 1][i][j],
                    // 选 k，那么可以从 i 到 k（k - 1），再从 k（k - 1） 到 j（注意这两处的 k 要写成 k - 1，因为我们的 k 是从 1 开始遍历的）
                    // 既然是从 i 到 k - 1，再从 k - 1 到 j，那么这两段中间的节点必然也是小于等于 k - 1的，所以是 f[k - 1][i][k - 1] + f[k - 1][k - 1][j]
                    f[k - 1][i][k - 1] + f[k - 1][k - 1][j]
                );
            }
        }
    }
    let min = Infinity;
    let ans = -1;
    for (let i = 0; i < n; i++) {
        let c = 0;
        for (let j = 0; j < n; j++) {
            if (i !== j && f[n][i][j] <= distanceThreshold) {
                c++;
            }
        }
        if (c <= min) {
            min = c;
            ans = i;
        }
    }
    return ans;
};

const input = [
    [
        4,
        [[0, 1, 3], [1, 2, 1], [1, 3, 4], [2, 3, 1]],
        4
    ],
];

for (let i = 0; i < input.length; i++) {
    console.log(findTheCity(...input[i]));
}
