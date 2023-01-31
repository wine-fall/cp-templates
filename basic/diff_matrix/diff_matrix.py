# 二维差分数组
class Solution:
    def rangeAddQueries(self, n: int, queries: List[List[int]]) -> List[List[int]]:
        # 差分数组
        diff = [[0] * (n + 1) for _ in range(n + 1)]
        for r1, c1, r2, c2 in queries:
            r2 += 1
            c2 += 1
            diff[r1][c1] += 1
            diff[r1][c2] -= 1
            diff[r2][c1] -= 1
            diff[r2][c2] += 1
        
        # 还原
        mat = [[0] * (n + 1) for _ in range(n + 1)]
        for i in range(1, n + 1):
            for j in range(1, n + 1):
                mat[i][j] = mat[i][j - 1] + mat[i - 1][j] - mat[i - 1][j - 1] + diff[i - 1][j - 1]
        ret = [[0] * n for _ in range(n)]
        for i in range(1, n + 1):
            for j in range(1, n + 1):
                ret[i - 1][j - 1] = mat[i][j]
                
        return ret
