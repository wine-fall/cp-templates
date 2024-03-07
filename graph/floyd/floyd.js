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
    for (let k = 1; k <= n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                f[k][i][j] = Math.min(
                    f[k - 1][i][j],
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
