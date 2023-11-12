"""
考虑树上的每个节点【选或不选、枚举选哪个】进行状态转移

小技巧：
    1. 通过入度判断根节点；
    2. 根节点的邻接节点可以加入 -1或0 ，避免和叶子节点弄混（建无向图时，叶子结点只有一个邻接节点）。

题目：
1377. T秒后青蛙的位置
2646. 最小化旅行的价格总和
2925. 在树上执行操作以后得到的最大分数
[洛谷]P1352. 没有上司的舞会
"""

from collections import defaultdict, Counter
from typing import List
class Solution:
    def frogPosition(self, n: int, edges: List[List[int]], t: int, target: int) -> float:
        """
        求概率的问题，可以先把分母算好，最后结果取倒数
        """
        g = defaultdict(list)
        g[1].append(-1) # 根节点添加一个值为 -1 的邻接节点，避免和叶子结点弄混
        for u, v in edges:
            g[u].append(v)
            g[v].append(u)
        
        def dfs(x, fa, left):
            if left == 0:
                return x == target
            if x == target:
                return len(g[x]) == 1
            for y in g[x]:
                if y != fa:
                    prod = dfs(y, x, left - 1)
                    if prod:
                        return prod * (len(g[x]) - 1)
            return 0
        prod = dfs(1, -1, t)
        return 1 / prod if prod else 0

class Solution:
    def minimumTotalPrice(self, n: int, edges: List[List[int]], price: List[int], trips: List[List[int]]) -> int:
        """
        返回值包含选或不选两种情况
        """
        cnt = Counter()
        adj = defaultdict(list)

        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        
        for st, ed in trips:
            # 先跑一遍dfs统计每个点会经过几次
            def dfs(x, fa):
                if x == ed:
                    cnt[x] += 1
                    return True
                for y in adj[x]:
                    if y == fa:
                        continue
                    if dfs(y, x):
                        cnt[x] += 1
                        return True
                return False
            dfs(st, -1)
        
        def dfs(x, fa):
            ret1 = price[x] * cnt[x]
            ret2 = ret1 // 2

            for y in adj[x]:
                if y == fa:
                    continue
                r1, r2 = dfs(y, x)
                ret1 += min(r1, r2)
                ret2 += r1
            return ret1, ret2
        return min(dfs(0, -1))

class Solution:
    def maximumScoreAfterOperations(self, edges: List[List[int]], values: List[int]) -> int:
        """
        最大值不好求，可以转变思路求最小值
        """
        ret = sum(values)
        adj = defaultdict(list)
        adj[0].append(-1)
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        def dfs(x, fa):
            if len(adj[x]) == 1:
                return values[x]
            # 选或不选
            ret1 = values[x]
            ret2 = 0
            for y in adj[x]:
                if y != fa:
                    ret2 += dfs(y, x)
            return min(ret1, ret2)
        return ret - dfs(0, -1)

import sys
def solution():
    """
    通过入度找根
    """
    sys.setrecursionlimit(int(1e9))

    def II():
        return int(input())
    def GMI():
        return map(lambda x: int(x) - 1, input().split())

    n = II()
    happy = []
    for _ in range(n):
        happy.append(II())

    g = defaultdict(list)
    in_deg = defaultdict(int)
    for _ in range(n - 1):
        l, k = GMI()
        g[k].append(l)
        in_deg[l] += 1

    def dfs(x, fa):
        ret1 = happy[x]
        ret2 = 0

        for y in g[x]:
            if y != fa:
                r1, r2 = dfs(y, x)
                ret1 += r2
                ret2 += max(r1, r2)
        return ret1, ret2

    root = None
    for i in range(n):
        if i not in in_deg:
            root = i
            break
    print(max(dfs(root, -1)))