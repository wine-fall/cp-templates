/**
 * 在树状数组的应用中使用离散化处理
 * t 2926
 * PS: 树状数组本身并没有做逻辑上的改变
 * 离散化处理第 46 行的 b
 * 离散化的本质是建立一种新的映射关系，使得本身不连续的值在建立这种映射关系后变得连续，并且保留原有的相对位置，从而可以使用树状数组
 * 一般有三步：复制原数组、去重、排序
 * 例如有数组[1, -100, 100] 这三值本身不连续，但经过上述三步映射后变成 [0, 1, 2] 则连续（0 -> -100; 1 -> 1; 2 -> 100），从而可以放进树状数组
 */

class BIT {
    constructor(n) {
        this.n = n;
        this.tree = Array(n + 1).fill(-Infinity);
    }

    lowbit(i) {
        return i & -i;
    }

    update(idx, val) {
        let i = idx + 1;
        while (i <= this.n) {
            this.tree[i] = Math.max(this.tree[i], val);
            i += this.lowbit(i);
        }
    }

    query(idx) {
        let ret = -Infinity;
        let i = idx + 1;
        while (i >= 1) {
            ret = Math.max(ret, this.tree[i]);
            i -= this.lowbit(i);
        }
        return ret;
    }
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxBalancedSubsequenceSum = function(nums) {
    const n = nums.length;
    const b = Array.from(new Set(nums.map((item, idx) => item - idx)));
    b.sort((o1, o2) => o1 - o2);
    const m = b.length;
    const bit = new BIT(m);
    /**
     * 注意：对 b 的排序并不影响对 nums 的遍历顺序
     *      对 b 的操作仅仅用于建立一种映射关系
     */
    for (let i = 0; i < n; i++) {
        const x = nums[i] - i;
        let l = 0;
        let r = m - 1;
        let pos = -1;
        while (l <= r) {
            const mi = Math.floor((l + r) / 2);
            if (b[mi] <= x) {
                pos = mi;
                l = mi + 1;
            } else {
                r = mi - 1;
            }
        }
        /**
         * 例如此处：x 对应的映射坐标为 pos，那么要求 x 左侧的最大值也即要求 pos 左侧的最大值 
         */
        const max = bit.query(pos);
        bit.update(pos, Math.max(max, 0) + nums[i]);
    }
    const ans = bit.query(m - 1);
    return ans;
};

