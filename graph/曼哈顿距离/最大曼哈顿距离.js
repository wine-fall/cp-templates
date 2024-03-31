/**
 * 391s t4
 * 一个重要性质：
 *  - 现有一张 N 个点(xi, yi)的图，怎么求出这个图里最大的曼哈顿距离？
 *  - 现设 Ai = xi - yi，Bi = xi + yi，则这个最大距离为 A,B 排序后的 max(A[n - 1] - A[0], B[n - 1] - B[0])
 * 对于这道题：
 *  - 首先对原图做一次处理，找出可能与最大值有关的 4 个点
 *  - 分别遍历这 4 个点，对将其剔除后的图再做一次处理，求出最大值即可
 *  - 时间复杂度：排序 nlogn；计算 4 * n
 */
/**
 * @param {number[][]} points
 * @return {number}
 */
let minimumDistance = function(points) {
    const n = points.length;
    const A = points.map(([x, y], i) => [x - y, i]);
    const B = points.map(([x, y], i) => [x + y, i]);
    A.sort((o1, o2) => o1[0] - o2[0]);
    B.sort((o1, o2) => o1[0] - o2[0]);
    const candidates = [A[0][1], A[n - 1][1], B[0][1], B[n - 1][1]];
    const helper = (ban) => {
        const A = [];
        const B = [];
        for (let i = 0; i < n; i++) {
            if (i === ban) {
                continue;
            }
            A.push(points[i][0] - points[i][1]);
            B.push(points[i][0] + points[i][1]);
        }
        A.sort((o1, o2) => o1 - o2);
        B.sort((o1, o2) => o1 - o2);
        return Math.max(A[n - 2] - A[0], B[n - 2] - B[0]);
    };
    let ans = Infinity;
    for (let i = 0; i < 4; i++) {
        const ban = candidates[i];
        const v = helper(ban);
        ans = Math.min(ans, v);
    }
    return ans;
};
