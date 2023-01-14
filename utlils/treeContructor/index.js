class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
    
}

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
 var serialize = function(root) {
    if (root == null) {
        return ['#'];
    }
    const left = serialize(root.left);
    const right = serialize(root.right);
    return [root.val].concat(left.concat(right));
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    const first = data.shift();
    const root = new TreeNode(first);
    const queue = [root];
    while (data.length) {
        const cur = queue.shift();
        const l = data.shift() || null;
        const r = data.shift() || null;
        cur.left = l === null ? null : new TreeNode(l);
        cur.right = r === null ? null : new TreeNode(r);
        cur.left && queue.push(cur.left);
        cur.right && queue.push(cur.right);
    }
    return root;
};
