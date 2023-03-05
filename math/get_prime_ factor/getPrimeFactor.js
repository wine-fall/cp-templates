/**
 * @description get prime factor of a number
 * @param {number} num 
 * @returns {number[]}
 */
const getPrimeFactor = (num) => {
    const ret = [];
    let p = 2;
    while (p < num) {
        if (num % p === 0) {
            num = num / p;
            ret.push(p);
        } else {
            p++;
        }
    }
    if (p > 1) {
        ret.push(p);
    }
    return ret;
}
console.log(getPrimeFactor(5));