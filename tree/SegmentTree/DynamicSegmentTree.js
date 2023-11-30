class TreeNode {
    constructor(o) {
        this.val = o;
        this.left = null;
        this.right = null;
        this.max = -Infinity;
    }
}

/**
 * 本质和基本线段树一致，只不过将数组转化成树，适用于边界很大的情况（例如2736，边界是1e9）
 * 需要注意的是：单点 操作的出口是 l >= r
 *             而 范围 操作的出口是 L <= l && r <= R
 */
class SegmentTree {
    constructor(n) {
        this.n = n;
        this.root = new TreeNode(1);
    }
    update(node, l, r, index, val) {
        if (l >= r) {
            node.max = Math.max(node.max, val);
            return;
        }
        const mid = Math.floor((l + r) / 2);
        if (index <= mid) {
            if (!node.left) {
                node.left = new TreeNode(node.val * 2);
            }
            this.update(node.left, l, mid, index, val);
        } else {
            if (!node.right) {
                node.right = new TreeNode(node.val * 2 + 1);
            }
            this.update(node.right, mid + 1, r, index, val);
        }
        if (node.left) {
            node.max = Math.max(node.max, node.left.max);
        }
        if (node.right) {
            node.max = Math.max(node.max, node.right.max);
        }
    }

    query(node, l, r, L, R) {
        if (L <= l && r <= R) {
            return node.max;
        }
        const mid = Math.floor((l + r) / 2);
        let ret = -Infinity;
        if (L <= mid) {
            if (!node.left) {
                node.left = new TreeNode(node.val * 2);
            }
            ret = Math.max(ret, this.query(node.left, l, mid, L, R));
        }
        if (R > mid) {
            if (!node.right) {
                node.right = new TreeNode(node.val * 2 + 1);
            }
            ret = Math.max(ret, this.query(node.right, mid + 1, r, L, R));
        }
        return ret;
    }
}

// t2736
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[][]} queries
 * @return {number[]}
 */
var maximumSumQueries = function(nums1, nums2, queries) {
    const arr = [];
    const n = nums1.length;
    for (let i = 0; i < n; i++) {
        arr.push([nums1[i], nums2[i]]);
    }
    arr.sort((o1, o2) => o2[0] - o1[0]);
    const m = queries.length;
    queries = queries.map(([xi, yi], idx) => {
        return [xi, yi, idx];
    });
    queries.sort((o1, o2) => o2[0] - o1[0]);
    const N = 1e9;
    const segmentTree = new SegmentTree(N);
    const ans = Array(m).fill(-1);
    for (let i = 0, j = 0; i < m; i++) {
        while (j < n && arr[j][0] >= queries[i][0]) {
            // update
            segmentTree.update(segmentTree.root, 1, N, arr[j][1], arr[j][0] + arr[j][1]);
            j++;
        }
        const tmp = segmentTree.query(segmentTree.root, 1, N, queries[i][1], N);
        if (tmp !== -Infinity) {
            const idx = queries[i][2];
            ans[idx] = tmp;
        }
    }
    return ans;
};

