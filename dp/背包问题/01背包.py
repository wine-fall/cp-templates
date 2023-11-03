"""
01背包，每个物品最多用一次，选或不选
先枚举每个物品，再 倒序枚举 背包容量
题目：
494. 目标和
2915. 和为目标值的最长子序列的长度
"""
from typing import List
class Solution:
    def lengthOfLongestSubsequence(self, nums: List[int], target: int) -> int:
        """求最长子序列

        Args:
            nums (List[int]): 物品列表
            target (int): 背包容量

        Returns:
            int: 最长子序列
        """
        def max(a, b):
            if a > b:
                return a
            return b
        n = len(nums)
        f = [[float('-inf')] * (target + 1) for _ in range(n + 1)]
        f[0][0] = 0
        
        for i in range(1, n + 1):
            for j in range(target, -1, -1):
                f[i][j] = f[i - 1][j]
                if nums[i - 1] <= j:
                    f[i][j] = max(f[i][j], f[i - 1][j - nums[i - 1]] + 1)
        return f[-1][-1] if f[-1][-1] != float('-inf') else -1

class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        """求方案数

        Args:
            nums (List[int]): 物品列表
            target (int): 目标容量

        Returns:
            int: 方案数
        """
        n = len(nums)
        target += sum(nums)
        if target % 2 or target < 0:
            return 0
        target //= 2
        f = [[0] * (target + 1) for _ in range(n + 1)]
        f[0][0] = 1
        
        for i in range(1, n + 1):
            for j in range(target, -1, -1):
                f[i][j] = f[i - 1][j]
                if j >= nums[i - 1]:
                    f[i][j] += f[i - 1][j - nums[i - 1]]
        return f[-1][-1]