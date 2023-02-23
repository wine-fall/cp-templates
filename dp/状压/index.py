# 状态压缩
# leetcode题目：864, 473, 5992, 318
# 统计 (1 << n）个状态中，每个状态分别有多少个1
def batch_count_number_of_one(n: int) -> int:
    cnt = [0] * n
    for i in range(1 << n):
        cnt[i] = cnt[i >> 1] + (i & 1)


# 统计某个状态中有多少个1
def count_number_of_one(state: int) -> int:
    cnt = 0
    while state:
        if (state & 1):
            cnt += 1
        state = state >> 1
    return cnt


# 获取某一状态下的所有子集，例如 state = 11，获取的子集为：01, 10, 11
def get_submask(state: int) -> list[int]:
    ret = []
    i = state
    while i:
        ret.append(i)
        i = (i - 1) & state
    return ret


# 获取 x 的最低位（最右侧的）1
def get_low_bit(x: int):
    return x & -x


# 判断 subMask 是否为 state 的子集
def is_submask(submask, state):
    return submask == (submask & state)


# 判断 x 中是否『没有』连续的 1
def check_continue_bit(x):
    return (x & (x >> 1)) == 0


# 状压dp
# leetcode题目：1986-minimum-number-of-work-sessions-to-finish-the-tasks
# n: 任务数
# subsets: 可在1个单位时间内完成的任务
# f[i]表示 完成i状态对应任务 的最少时间
from typing import List
def dp(n: int, subsets: List[int]) -> int:
    m = 1 << n
    f = [float("inf")] * m
    f[0] = 0

    for i in range(1, m):
        if i in subsets:
            # 可在1个单位时间内完成
            f[i] = 1
            continue
        j = i
        while j:
            if j in subsets:
                # 状态转移：i ^ j 表示状态 i 的任务 - 状态 j 的任务
                f[i] = min(f[i], f[i ^ j] + 1)
            # 快速遍历子集
            j = (j - 1) & i

    return f[-1]

# 题号：2572-count-the-number-of-square-free-subsets
from typing import List
from collections import Counter
class Solution:
    def squareFreeSubsets(self, nums: List[int]) -> int:
        PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
        MOD = 10 ** 9 + 7
        num_mask = [0] * 31

        # 采用二进制存储每个无平方因子数所包含的质数
        for i in range(2, 31):
            for j, prime in enumerate(PRIMES):
                if i % prime == 0:
                    if i % (prime * prime) == 0:
                        num_mask[i] = -1
                        break
                    num_mask[i] |= 1 << j

        n = len(PRIMES)
        m = 1 << n
        
        # 统计每种组合对应的方案数
        f = [0] * m
        f[0] = 1
        cnt = Counter(nums)

        for i, c in cnt.items():
            mask = num_mask[i]
            if mask <= 0:
                continue
            # 取补集
            other = (m - 1) ^ mask
            j = other
            while True:
                f[j | mask] = (f[j | mask] + f[j] * c) % MOD
                j = (j - 1) & other # 当j为-1时，补码全为1，与other进行与运算得到other


        return (sum(f) * pow(2, cnt[1], MOD) - 1) % MOD
