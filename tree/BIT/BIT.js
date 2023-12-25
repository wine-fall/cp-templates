/**
 * 树状数组
 * t307
 */

class BIT {
    /**
     * @param {number[]} nums 
     */
    constructor(nums) {
        const n = nums.length;
        this.nums = nums;
        this.tree = Array(n + 1).fill(0);
        for (let i = 1; i <= n; i++) {
            this.tree[i] += this.nums[i - 1];
            const nxt = i + this.lowbit(i);
            if (nxt <= n) {
                this.tree[nxt] += this.tree[i];
            }
        }
    }

    /**
     * @param {number} i 
     * @returns {number}
     */
    lowbit(i) {
        return i & -i;
    }

    /**
     * 
     * @param {number} i 
     * @param {number} val 
     */
    update(i, val) {
        this.nums[i] = val;
        while (i < this.tree.length) {
            this.tree[i] = val;
            i += this.lowbit(i);
        }
    }

    /**
     * @param {number} i 
     * @returns {number}
     */
    preSum(i) {
        let sum = 0;
        while (i >= 1) {
            sum += this.tree[i];
            i -= this.lowbit(i);
        }
        return sum;
    }

    /**
     * 
     * @param {number} left 
     * @param {number} right 
     * @returns {number}
     */
    sumRange(left, right) {
        return this.preSum(right) - this.preSum(left - 1);
    }
}
