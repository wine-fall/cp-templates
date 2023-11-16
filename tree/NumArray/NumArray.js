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
     * @param {number} num 
     * @returns {number}
     */
    lowbit(num) {
        return num & -num;
    }

    /**
     * 
     * @param {number} idx 
     * @param {number} val 
     */
    update(idx, val) {
        const tmp = val - this.nums[idx];
        this.nums[idx] = val;
        let i = idx + 1;
        while (i < this.tree.length) {
            this.tree[i] += tmp;
            i += this.lowbit(i);
        }
    }

    /**
     * @param {number} idx 
     * @returns {number}
     */
    preSum(idx) {
        let sum = 0;
        let i = idx + 1;
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
