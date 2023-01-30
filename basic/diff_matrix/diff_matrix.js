/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[][]}
 */
var diffMatrix = function(n, queries) {
    const matrix = Array.from({length: n}).map(() => Array(n).fill(0));
    // 记数
    for (const [r1, c1, r2, c2] of queries) {
        matrix[r1][c1] += 1;
        if (c2 + 1 < n) {
            matrix[r1][c2 + 1] -= 1;
        }
        if (r2 + 1 < n) {
            matrix[r2 + 1][c1] -= 1;
        }
        if (r2 + 1 < n && c2 + 1 < n) {
            matrix[r2 + 1][c2 + 1] += 1;
        }
    }
    // 还原
    for (let i = 0; i < n; i++) {
        for (let j = 1; j < n; j++) {
            matrix[i][j] += matrix[i][j - 1];
        }
    }
    for (let j = 0; j < n; j++) {
        for (let i = 1; i < n; i++) {
            matrix[i][j] += matrix[i - 1][j];
        }
    }
    return matrix;
};
