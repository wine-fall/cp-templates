/**
 * 根据字符串 s 建造 hash 表，并通过 get 函数快速获取该字符串某一段子字符串的 hash 值
 */
class Hash {
    /**
     * 
     * @param {string} s 
     */
    constructor(s) {
        const p = 13331;
        const MOD = 10000079;
        this.MOD = MOD;
        const n = s.length;
        const hash = new Array(n + 1).fill(0);
        const base = new Array(n + 1).fill(0);
        hash[0] = 0;
        base[0] = 1;
        for (let i = 1; i <= n; i++) {
            base[i] = (base[i - 1] * p) % MOD;
            hash[i] = (hash[i - 1] * p + s.charCodeAt(i - 1) - 96) % MOD;
        }
        this.hash = hash;
        this.base = base;
    }
    get(i, j) {
        const {hash, base, MOD} = this;
        return (((hash[j] - hash[i - 1] * base[j - i + 1]) % MOD) + MOD) % MOD;
    }
}