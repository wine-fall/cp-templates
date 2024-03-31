/**
 * t1584
 * 最小生成图逻辑：
 *  - 给你有一张图，且有 n 个节点，m 条边（edges）。现让你删除一些边，使得所有点能连接在一起且总距离最小
 *  - 利用并查集，首先遍历所有边，将已知的相邻节点的距离记录下来
 *  - 将 edges 按小到大排序后开始遍历，并记录一个总端点数 c
 *  - 若当前边的两个节点已经连接在一起了，则跳过
 *  - 否则，将两者连接起来，叠加该段距离，并且把总端点数 c 增加1
 *  - 当总端点数 c 到达 n 时，跳出循环
 * 曼哈顿距离的最小生成图：
 *  - 由于曼哈顿距离一般来说 n 个节点有 n * n 条边，直接遍历复杂度是 n2
 *  - 所以采用以下的方法，利用树状数组进行优化
 */
class DisjointSetUnion {
    constructor(n) {
        this.n = n;
        this.rank = new Array(n).fill(1);
        this.f = [...Array(n).keys()];
    }

    find(x) {
        return this.f[x] === x ? x : (this.f[x] = this.find(this.f[x]));
    }

    unionSet(x, y) {
        let fx = this.find(x);
        let fy = this.find(y);
        if (fx === fy) {
            return false;
        }
        if (this.rank[fx] < this.rank[fy]) {
            [fx, fy] = [fy, fx];
        }
        this.rank[fx] += this.rank[fy];
        this.f[fy] = fx;
        return true;
    }
}

class BIT {
    constructor(n) {
        this.n = n;
        this.tree = new Array(n).fill(Number.MAX_SAFE_INTEGER);
        this.idRec = new Array(n).fill(-1);
    }

    lowbit(k) {
        return k & (-k);
    }

    update(pos, val, id) {
        while (pos > 0) {
            if (this.tree[pos] > val) {
                this.tree[pos] = val;
                this.idRec[pos] = id;
            }
            pos -= this.lowbit(pos);
        }
    }

    query(pos) {
        let minval = Number.MAX_SAFE_INTEGER;
        let j = -1;
        while (pos < this.n) {
            if (minval > this.tree[pos]) {
                minval = this.tree[pos];
                j = this.idRec[pos];
            }
            pos += this.lowbit(pos);
        }
        return j;
    }
}

class Edge {
    constructor(len, x, y) {
        this.len = len;
        this.x = x;
        this.y = y;
    }
}

class Pos {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
    }
}

class Solution {
    constructor() {
        this.edges = [];
        this.pos = [];
    }

    minCostConnectPoints(points) {
        const n = points.length;
        this.solve(points, n);

        const dsu = new DisjointSetUnion(n);
        this.edges.sort((edge1, edge2) => edge1.len - edge2.len);
        let ret = 0;
        let num = 1;
        for (const edge of this.edges) {
            const {len, x, y} = edge;
            if (dsu.unionSet(x, y)) {
                ret += len;
                num++;
                if (num === n) {
                    break;
                }
            }
        }
        return ret;
    }

    solve(points, n) {
        this.pos = new Array(n);
        for (let i = 0; i < n; i++) {
            const [x, y] = points[i];
            this.pos[i] = new Pos(i, x, y);
        }
        this.build(n);
        for (let i = 0; i < n; i++) {
            const temp = this.pos[i].x;
            this.pos[i].x = this.pos[i].y;
            this.pos[i].y = temp;
        }
        this.build(n);
        for (let i = 0; i < n; i++) {
            this.pos[i].x = -this.pos[i].x;
        }
        this.build(n);
        for (let i = 0; i < n; i++) {
            const temp = this.pos[i].x;
            this.pos[i].x = this.pos[i].y;
            this.pos[i].y = temp;
        }
        this.build(n);
    }

    build(n) {
        this.pos.sort((pos1, pos2) => pos1.x === pos2.x ? pos1.y - pos2.y : pos1.x - pos2.x);
        const a = new Array(n);
        const set = new Set();
        for (let i = 0; i < n; i++) {
            a[i] = this.pos[i].y - this.pos[i].x;
            set.add(this.pos[i].y - this.pos[i].x);
        }
        const num = set.size;
        const b = [...set].sort((a, b) => a - b);
        const bit = new BIT(num + 1);
        for (let i = n - 1; i >= 0; i--) {
            const poss = this.binarySearch(b, a[i]) + 1;
            const j = bit.query(poss);
            if (j !== -1) {
                const dis = Math.abs(this.pos[i].x - this.pos[j].x) + Math.abs(this.pos[i].y - this.pos[j].y);
                this.edges.push(new Edge(dis, this.pos[i].id, this.pos[j].id));
            }
            bit.update(poss, this.pos[i].x + this.pos[i].y, i);
        }
    }

    binarySearch(array, target) {
        let low = 0;
        let high = array.length - 1;
        while (low < high) {
            const mid = Math.floor((high - low) / 2) + low;
            const num = array[mid];
            if (num < target) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }
}

/**
 * @param {number[][]} points
 * @return {number}
 */
var minCostConnectPoints = function(points) {
    const so = new Solution();
    return so.minCostConnectPoints(points);
};
