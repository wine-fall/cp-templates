// 判断某个整数是否为素数
/**
 * @description check the n is a prime or not
 * @param {number} n 
 * @return {boolean}
 */
const isPrime = n => {
    const tmp = Math.floor(Math.sqrt(n));
    for (let i = 2; i <= tmp; i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}
