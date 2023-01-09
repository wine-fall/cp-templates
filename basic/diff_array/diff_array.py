# 差分数组
# leetcode题目: 2528-maximize-the-minimum-powered-city, 1109-corporate-flight-bookings
# intervals[i] = [st, ed, cnt]: 在区间[st, ed]内，每个地点均有cnt个站点
# n: 地点数
class Solution:
    def diff_array(self, intervals: list[list[int]], n: int) -> list[int]:
        # 开n+1的目的为某个区间的上界可能会大于等于地点总数
        diffs = [0] * (n + 1)
        # 统计每个地点的站点总数
        ret = [0] * n
        # 初始化站点数
        status = 0
        d = defaultdict(list)

        for st, ed, cnt in intervals:
            d[st].append([ed, cnt])
        
        for i in range(n):
            if i in d:
                for arr in d[i]:        
                    status += arr[1]
                    # 超出上界的部分统一放到diffs[n]，不会对统计站点数造成影响
                    diffs[min(arr[0] + 1, n)] -= arr[1]
            status += diffs[i]
            ret[i] = status
            
        return ret
