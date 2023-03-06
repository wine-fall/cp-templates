/**
 * @description quick get all the prime which belongs to [left, right];
 * @param {number} left
 * @param {number} right
 * @returns {number[]}
 */
const eratosthenes = (left, right) => {
    const n = right + 1;
    const arr = Array(n).fill(true);
    const upperLimit = Math.sqrt(n);
    const ret = [];
    for (let i = 2; i <= upperLimit; i++) {
        if (arr[i]) {
            for (let j = i * i; j < n; j += i) {
                arr[j] = false;
            }
        }
    }
    for (let i = Math.max(2, left); i < n; i++) {
        if (arr[i]) {
            ret.push(i);
        }
    }
    return ret.length;
}
