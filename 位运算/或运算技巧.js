/**
 * t 898
 * 或运算技巧本质：
 *  - 从当前坐标 i 开始往后遍历求所有以 i 开头的子数组的 或 的结果
 *  - 上述结果在 1e9 范围内最多有 30 种，因为或运算的1只能增加不能减少
 *  - 我们设 i+1 记录的所有右侧或运算结果位 orsi+1， 位由于子数组连续的特性，当前坐标的 orsi 只与 orsi+1 有关
 *  - 所以，我们将当前值（设为 x）与所有 orsi+1 的结果做或运算即可，注意这个时间复杂度最多是 30
 *  - 实际应用中我们常常需要记录当前这个或运算结果值对应的右端点坐标，所以 ors[i] = [或运算的值，有端点坐标]
 *  - 并且我们要去重，这里用双指针去重
 *  - 这道题我们只计算数量，不涉及右端点坐标的问题
 *  - 注意：& 运算也是一样的，因为和运算的1只能减少而不能增加
 * 
 * 相关题目：
 * t 2411
 * t 1521
 */
/**
 * @param {number[]} arr
 * @return {number}
 */
var subarrayBitwiseORs = function(arr) {
    const n = arr.length;
    let ors = [];
    const set = new Set();
    for (let i = n - 1; i >= 0; i--) {
        ors.push([0, i]);
        ors[0][0] |= arr[i];
        let k = 0;
        for (let j = 1; j < ors.length; j++) {
            ors[j][0] |= arr[i];
            if (ors[k][0] === ors[j][0]) {
                ors[k][1] = Math.min(ors[k][1], ors[j][1]);
            } else {
                k++;
                ors[k] = ors[j];
            }
        }
        ors = ors.slice(0, k + 1);
        for (let i = 0; i <= k; i++) {
            set.add(ors[i][0]);
        }
    }
    return set.size;
};

const input = [
    [[1, 1, 2]], // 3
    // [[1, 2, 4]],
];

for (let i = 0; i < input.length; i++) {
    console.log(subarrayBitwiseORs(...input[i]));
}
