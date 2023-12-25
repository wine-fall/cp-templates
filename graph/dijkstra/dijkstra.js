/**
 * t743
 */

/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime1 = function(times, n, k) {
    const g = Array.from({length: n + 1}).map(() => Array());
    for (const [u, v, w] of times) {
        g[u].push([v, w]);
    }
    const pq = new PriorityQueue({
        compare: (o1, o2) => {
            return o1[1] - o2[1];
        }
    });
    pq.enqueue([k, 0]);
    const dist = Array(n).fill(Infinity);
    dist[k - 1] = 0;
    while (!pq.isEmpty()) {
        const [v, w] = pq.dequeue();
        if (w > dist[v - 1]) {
            continue;
        }
        dist[v - 1] = w;
        for (const [neibor, w2] of g[v]) {
            if (dist[neibor - 1] > w2 + w) {
                dist[neibor - 1] = w2 + w;
                pq.enqueue([neibor, w2 + w]);
            }
        }
    }
    const ans = Math.max(...dist);
    return ans === Infinity ? -1 : ans;
};

/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime2 = function(times, n, k) {
    const graph = Array(n).fill(0).map(() => Array(n).fill(Infinity));
    for (const [u, v, w] of times) {
        graph[u - 1][v - 1] = w;
    }
    graph[k - 1][k - 1] = 0;
    const dist = Array(n).fill(Infinity);
    dist[k - 1] = 0;
    const visited = new Set();
    for (let i = 0; i < n; i++) {
        let x = -1;
        for (let y = 0; y < n; y++) {
            if (visited.has(y)) {
                continue;
            }
            if (x === -1 || dist[y] < dist[x]) {
                x = y;
            }
        }
        visited.add(x);
        for (let j = 0; j < n; j++) {
            dist[j] = Math.min(dist[j], dist[x] + graph[x][j]);
        }
    }
    let ans = 0;
    for (let d of dist) {
        if (d === Infinity) {
            return -1;
        }
        ans = Math.max(ans, d);
    }
    return ans;
};
