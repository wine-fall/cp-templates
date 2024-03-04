/**
 * 在树状数组的应用求和、并使用离散化处理
 * t 3072
 */

class BIT {
    constructor(n) {
        this.n = n;
        this.tree = Array(n + 1).fill(0);
    }

    lowbit(i) {
        return i & -i;
    }

    update(i, val) {
        while (i <= this.n) {
            this.tree[i] += val;
            // 注意此处必需是 +=，所以要注意排序顺序：求大于某值，就要倒排；否则顺排
            i += this.lowbit(i);
        }
    }

    query(i) {
        if (i === 0) {
            return 0;
        }
        let ret = 0;
        while (i >= 1) {
            ret += this.tree[i];
            // 注意此处必需是 -=，所以要注意排序顺序：求大于某值，就要倒排；否则顺排
            i -= this.lowbit(i);
        }
        return ret;
    }
}

/**
 * @param {number[]} nums
 * @return {number[]}
 */
let resultArray = function(nums) {
    const n = nums.length;
    const b = Array.from(new Set(nums));
    b.sort((o1, o2) => o2 - o1);
    const m = b.length;
    const map = new Map();
    for (let i = 0; i < m; i++) {
        map.set(b[i], i);
    }
    const bit1 = new BIT(m);
    const bit2 = new BIT(m);
    const arr1 = [nums[0]];
    bit1.update(map.get(nums[0]) + 1, 1);
    const arr2 = [nums[1]];
    bit2.update(map.get(nums[1]) + 1, 1);
    for (let i = 2; i < n; i++) {
        const pos = map.get(nums[i]);
        const v1 = bit1.query(pos);
        const v2 = bit2.query(pos);
        if (v1 > v2) {
            arr1.push(nums[i]);
            bit1.update(pos + 1, 1);
        } else if (v2 > v1) {
            arr2.push(nums[i]);
            bit2.update(pos + 1, 1);
        } else {
            if (arr1.length <= arr2.length) {
                arr1.push(nums[i]);
                bit1.update(pos + 1, 1);
            } else {
                arr2.push(nums[i]);
                bit2.update(pos + 1, 1);
            }
        }
    }
    const ret = arr1.concat(arr2);
    return ret;
};