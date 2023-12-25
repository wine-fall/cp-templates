/**
 * 懒标记动态开点，懒标记要注意 lazy 数组的更新（run 函数中的更新逻辑），有些可以重复更新，有些则不行
 * 例题 t2276
 */

class TreeNode {
    constructor(v) {
        this.pos = v;
        this.val = 0;
        this.lazy = false;
        this.left = null;
        this.right = null;
    }
}

class LazySegmentTree {
    constructor() {
        this.root = new TreeNode(1);
    }

    maintain(o) {
        o.val = 0;
        if (o.left) {
            o.val += o.left.val;
        }
        if (o.right) {
            o.val += o.right.val;
        }
    };

    run(o, l, r) {
        o.val = r - l + 1;
        o.lazy = true;
    }

    isContinue(o) {
        return o.lazy;
    }

    update(o, l, r, L, R) {
        if (L <= l && r <= R) {
            this.run(o, l, r);
            return;
        }
        const mi = Math.floor((l + r) / 2);
        if (!o.left) {
            o.left = new TreeNode(o.pos * 2);
        }
        if (!o.right) {
            o.right = new TreeNode(o.pos * 2 + 1);
        }
        if (o.lazy) {
            this.run(o.left, l, mi);
            this.run(o.right, mi + 1, r);
            o.lazy = false;
        }
        if (L <= mi) {
            this.update(o.left, l, mi, L, R);
        }
        if (R > mi) {
            this.update(o.right, mi + 1, r, L, R);
        }
        this.maintain(o);
    }

    query(node, l, r, L, R) {
        if (L <= l && r <= R) {
            return node.val;
        }
        const mid = Math.floor((l + r) / 2);
        let ret = 0;
        if (L <= mid) {
            if (!node.left) {
                node.left = new TreeNode(o.pos * 2);
            }
            ret += this.query(node.left, l, mid, L, R);
        }
        if (R > mid) {
            if (!node.right) {
                node.right = new TreeNode(o.pos * 2 + 1);
            }
            ret = this.query(node.right, mid + 1, r, L, R);
        }
        return ret;
    }
}

class CountIntervals {
    constructor() {
        this.N = 1e9;
        // this.N = 100;
        this.tree = new LazySegmentTree();
    }

    add(left, right) {
        const root = this.tree.root;
        this.tree.update(root, 1, this.N, left, right);
        return;
    }

    count() {
        const root = this.tree.root;
        return this.tree.query(root, 1, this.N, 1, this.N);
    }
}
