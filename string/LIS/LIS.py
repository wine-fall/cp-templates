# 最长上升子序列
from bisect import bisect_right


def LIS(nums: list[int]) -> int:
    n = len(nums)
    ans = [nums[0]]

    for i in range(1, n):
        # 如果严格递增改为大于
        if nums[i] >= ans[-1]:
            ans.append(nums[i])
        else:
            # 通过二分确定插入位置
            idx = bisect_right(ans, nums[i])
            ans[idx] = nums[i]

    return len(ans)
