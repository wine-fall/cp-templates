"""
完全背包
每个物品可以不选，或者被选多次
先枚举物品，再 正序枚举 每个背包
因为可以取多次，注意状态转移时和01背包的差别，从 i 转移，不是从 i - 1，如 f[i][j] = min(f[i][j], f[i][j - coins[i - 1]] + 1)
题目：
322. 零钱兑换
518. 零钱兑换 II
"""
from typing import List
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        """
        求最少需要
        数组默认值初始化为正无穷
        base初始化为0
        """
        n = len(coins)
        inf = float('inf')
        f = [[inf] * (amount + 1) for _ in range(n + 1)]
        f[0][0] = 0

        for i in range(1, n + 1):
            for j in range(amount + 1):
                f[i][j] = f[i - 1][j]
                if coins[i - 1] <= j:
                    f[i][j] = min(f[i][j], f[i][j - coins[i - 1]] + 1)
        ret = f[-1][-1]
        return ret if ret < inf else -1

class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        """
        求组合数
        数组默认值初始化为0
        base初始化为1，用0个物品凑容量为0的背包组合数为1
        """
        n = len(coins)
        f = [[0] * (amount + 1) for _ in range(n + 1)]
        f[0][0] = 1
        for i in range(1, n + 1):
            for j in range(amount + 1):
                f[i][j] = f[i - 1][j]
                if coins[i - 1] <= j:
                    f[i][j] += f[i][j - coins[i - 1]]
        return f[-1][-1]