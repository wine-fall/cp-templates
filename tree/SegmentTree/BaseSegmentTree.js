class SegmentTree {
    /**
     * @param {number} n 
     * @param {number} m 
     */
    constructor(n, m) {
        this.n = n;
        this.m = m;
        const size = this.n.toString(2).length;
        this.sum = Array(1 << size).fill(0);
        this.min = Array(1 << size).fill(0);
    }

    /**
     * @description o 代表树的节点；l，r 代表区间的左右端点；index 代表区间的端点；val 则是增加的值。
     *              也就是给所有包括 index 的区间都加上 val。同时也可以操作最小值。
     * @param {number} o 
     * @param {number} l 
     * @param {number} r 
     * @param {number} index 
     * @param {number} val 
     */
    add(o, l, r, index, val) {
        if (l >= r) {
            this.sum[o] += val;
            /**
             * 注意下面这个最值应该是 += 操作，当 l >= r 时，也就是操作形如：[1,1],[2,2],[a,a]的区间。
             * 在这些区间上加了 val，显然这种区间的最值也要直接加上 val。
             */
            this.min[o] += val;
            return;
        }
        const mid = Math.floor((l + r) / 2);
        if (index <= mid) {
            this.add(o * 2, l, mid, index, val);
        } else {
            this.add(o * 2 + 1, mid + 1, r, index, val);
        }
        this.sum[o] = this.sum[o * 2] + this.sum[o * 2 + 1];
        this.min[o] = Math.min(this.min[o * 2], this.min[o * 2 + 1]);
    }

    /**
     * @description o 代表树的节点；l，r 代表区间的左右端点；L, R 代表要查询的区间。
     *              也就是查询 [L, R] 区间上的和（也可以是其他值）。
     * @param {number} o 
     * @param {number} l 
     * @param {number} r 
     * @param {number} L 
     * @param {number} R 
     */
    querrySum(o, l, r, L, R) {
        if (l >= L && r <= R) {
            return this.sum[o];
        }
        let ret = 0;
        const mid = Math.floor((l + r) / 2);
        if (L <= mid) {
            ret += this.querrySum(o * 2, l, mid, L, R);
        }
        if (R > mid) {
            ret += this.querrySum(o * 2 + 1, mid + 1, r, L, R);
        }
        return ret;
    }

    /**
     * @description o 代表树的节点；l，r 代表区间的左右端点；val 代表要查询的最值。
     *              也就是查询[L,R]区间上『小于 val 』的坐标，没有则返回 -1。
     *              注意：『小于 val 』可视情况换成其他条件，本质还是左右递归。
     *              注意：这个func只适用于 t2286
     * @param {number} o 
     * @param {number} l 
     * @param {number} r
     * @param {number} L
     * @param {number} R
     * @param {number} val 
     */
    index(o, l, r, L, R, val) {
        if (this.min[val] > val) {
            return -1;
        }
        if (l >= r) {
            return l;
        }
        const mid = Math.floor((l + r) / 2);
        // 下面这几个条件是为了适配 t2286
        if (this.min[o * 2] <= val) {
            return this.index(o * 2, l, mid, L, R, val);
        } else if (R > mid) {
            return this.index(o * 2 + 1, mid + 1, r, L, R, val);
        } else {
            return -1;
        }
    }
}

// t2286 音乐会

/**
 * @param {number} n
 * @param {number} m
 */
var BookMyShow = function(n, m) {
    this.n = n;
    this.m = m;
    this.segmentTree = new SegmentTree(n, m);
};

/** 
 * @param {number} k 
 * @param {number} maxRow
 * @return {number[]}
 */
BookMyShow.prototype.gather = function(k, maxRow) {
    const idx = this.segmentTree.index(1, 1, this.n, 1, maxRow + 1, this.m - k);
    if (idx === -1) {
        return [];
    }
    const seats = this.segmentTree.querrySum(1, 1, this.n, idx, idx);
    this.segmentTree.add(1, 1, this.n, idx, k);
    return [idx - 1, seats];
};

/** 
 * @param {number} k 
 * @param {number} maxRow
 * @return {boolean}
 */
BookMyShow.prototype.scatter = function(k, maxRow) {
    const sum = this.segmentTree.querrySum(1, 1, this.n, 1, maxRow + 1);
    if ((maxRow + 1) * this.m - sum < k) {
        return false;
    }
    let idx = this.segmentTree.index(1, 1, this.n, 1, maxRow + 1, this.m - 1);
    while (k > 0) {
        const val = this.m - this.segmentTree.querrySum(1, 1, this.n, idx, idx);
        if (k > val) {
            this.segmentTree.add(1, 1, this.n, idx, val);
        } else {
            this.segmentTree.add(1, 1, this.n, idx, k);
        }
        k -= val;
        idx++;
    }
    return true;
};

