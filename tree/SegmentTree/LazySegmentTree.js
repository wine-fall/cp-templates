/**
 * lazy 线段树：
 * lazy 线段树是用来解决『区间』更新、区间查询的问题（普通的线段树是用来解决单点更新、区间查询问题的）
 * 它做的优化在于：在当前访问区间（[l, r]）已完全被包含更新区间内时（[L, R]），直接返回这个顶部区间的值，而不继续往下递归
 * 至于何时继续往下递归，详见下面的代码
 * 
 * 例题：t2569
 */

class LazySegmentTree {
    /**
     * @param {number[]} nums 
     */
    constructor(nums) {
        this.nums = nums;
        const n = this.nums.length;
        const size = 1 << n.toString(2).length + 1;
        this.tree = Array(size).fill(0);
        this.lazy = Array(size).fill(false);
        this.build(1, 1, n);
    }

    /**
     * @description 根据左右子树更新父节点的值
     * @param {number} o 
     */
    maintain(o) {
        this.tree[o] = this.tree[o * 2] + this.tree[o * 2 + 1];
    };

    /**
     * @param {number} o 
     * @param {number} l 
     * @param {number} r 
     */
    build(o, l, r) {
        if (l >= r) {
            // l 从 1 开始
            this.tree[o] = this.nums[l - 1];
            return;
        }
        const mi = Math.floor((l + r) / 2);
        this.build(o * 2, l, mi);
        this.build(o * 2 + 1, mi + 1, r);
        this.maintain(o);
    }
    
    /**
     * @description 根据对 [l, r] 上的操作来更新父节点的值
     * @param {number} o 
     * @param {number} l 
     * @param {number} r 
     */
    run(o, l, r) {
        // 本题为反转操作，也就是将 [l, r] 上的 0、1 反转，那么反转后 [l, r] 上的和即为 r - l + 1 - this.tree[o]
        this.tree[o] = r - l + 1 - this.tree[o];
        this.lazy[o] = !this.lazy[o];
    }

    /**
     * @description 是否继续往子树递归：
     *              如果『本次更新』访问到该节点时，该节点的lazy状态与初始状态不同
     *              也就表明该节点在『之前的更新』中访问过，且储存了一部分内容
     *              那么这次再访问到时，需要将之前存储的内容下发到子树中去，要继续递归。否则不用继续递归
     * @param {number} o 
     * @returns {boolean}
     */
    isContinue(o) {
        return this.lazy[o];
    }

    update(o, l, r, L, R) {
        if (L <= l && r <= R) {
            // 如果前后两次访问的区间完全相同，那么即使该节点访问过，也会在这里提前返回，而并不会修改lazy的状态
            // 这里的直接返回也保证了 lazy 线段树的区间更新的复杂度会低（只更新顶部的区间）
            this.run(o, l, r);
            return;
        }
        const mi = Math.floor((l + r) / 2);
        if (this.isContinue(o)) {
            this.run(o * 2, l, mi);
            this.run(o * 2 + 1, mi + 1, r);
            this.lazy[o] = false;
        }
        if (L <= mi) {
            this.update(o * 2, l, mi, L, R);
        }
        if (R > mi) {
            this.update(o * 2 + 1, mi + 1, r, L, R);
        }
        this.maintain(o);
    }
}

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[][]} queries
 * @return {number[]}
 */
var handleQuery = function(nums1, nums2, queries) {
    const n = nums1.length;
    const segmentTree = new LazySegmentTree(nums1);
    let sum = nums2.reduce((pre, cur) => pre + cur, 0);
    const ans = [];
    for (const [o, A, B] of queries) {
        if (o === 1) {
            segmentTree.update(1, 1, n, A + 1, B + 1);
        } else if (o === 2) {
            sum += segmentTree.tree[1] * A;
        } else {
            ans.push(sum);
        }
    }
    return ans;
};
