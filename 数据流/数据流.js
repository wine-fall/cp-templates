/**
 * @param {number[]} nums
 * @return {number[]}
 */
var numsGame = function(nums) {
    const n = nums.length;
    nums = nums.map((item, i) => item - i);
    const q1 = new PriorityQueue((o1, o2) => o2 - o1);
    const q2 = new PriorityQueue((o1, o2) => o1 - o2);
    const ans = [];
    const getV = (sum1, sum2) => {
        const mid = q1.front();
        const less = mid * q1.size() - sum1;
        const more = sum2 - q2.size() * mid;
        ans.push((less + more) % mod);
    };
    const mod = 1e9 + 7;
    for (let i = 0, sum1 = 0, sum2 = 0; i < n; i++) {
        if (i % 2 === 0) {
            if (q1.isEmpty() || nums[i] <= q2.front()) {
                q1.enqueue(nums[i]);
                sum1 += nums[i];
            } else {
                const v2 = q2.dequeue();
                q1.enqueue(v2);
                sum1 += v2;
                sum2 -= v2;
                q2.enqueue(nums[i]);
                sum2 += nums[i];
            }
            getV(sum1, sum2);
        } else {
            if (nums[i] > q1.front()) {
                q2.enqueue(nums[i]);
                sum2 += nums[i];
            } else {
                const v1 = q1.dequeue();
                q2.enqueue(v1);
                sum1 -= v1;
                sum2 += v1;
                q1.enqueue(nums[i]);
                sum1 += nums[i];
            }
            getV(sum1, sum2);
        }
    }
    return ans;
};
