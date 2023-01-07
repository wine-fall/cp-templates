// DFS找环
// leetcode题目: 207-课程表，802-找到最终的安全状态

/**
 * 
 * @param {number} x 
 * @param {boolean[]} flags 
 * @param {number[][]} graph 
 */
const dfs = (x, flags, graph) => {
    if (flags[x] > 0) {
        return flags[x] === 2;
    }
    flags[x] = 1;
    for (const nxt of graph[x]) {
        if (!dfs(nxt)) {
            return false;
        }
    }
    flags[x] = 2;
    return true;
}
