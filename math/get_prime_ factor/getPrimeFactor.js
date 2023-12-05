/**
 * @description get prime factor of a number
 * @param {number} num 
 * @returns {number[]}
 */
const getPrimeFactor = (num) => {
    const ret = [];
    let p = 2;
    const boundary = Math.sqrt(num);
    while (p <= boundary) {
        if (num % p === 0) {
            num = num / p;
            ret.push(p);
        } else {
            p++;
        }
    }
    if (num > 1) {
        ret.push(num)
    }
    return ret;
}
console.log(getPrimeFactor(5));