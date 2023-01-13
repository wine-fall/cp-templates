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
def dp(n: int, subsets: list[int]) -> int:
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
