# leetcode: 743-网络延迟时间


"""
graph : 有向加权图
n : 节点数
start : 出发点 
"""
# 优先队列实现
from typing import List
from math import inf
from heapq import heappop, heappush
def dijkstra(graph: List[List[int]], n: int, start: int) -> List[int]:
    adj = [[inf] * n for _ in range(n)]
    for u, v, w in graph:
        adj[u][v] = w
    vis = set()
    dist = [inf] * n
    dist[start] = 0
    pq = [(0, start)]

    while pq:
        _, u = heappop(pq)
        if u in vis: continue
        vis.add(u)
        for v, wt in enumerate(adj[u]):
            if dist[v] > dist[u] + wt:
                dist[v] = dist[u] + wt
                heappush(pq, (dist[v], v))
    return dist


# 暴力实现
def dijkstra(graph: List[List[int]], n: int, start: int) -> List[int]:
    adj = [[inf] * n for _ in range(n)]
    for u, v, w in graph:
        adj[u][v] = w
    dist = [inf] * n
    dist[start] = 0
    used = [False] * n

    for _ in range(n):
        x = -1
        for y in range(n):
            if not used[y] and (x == -1 or dist[y] < dist[x]):
                x = y
        used[x] = True
        for v, w in enumerate(adj[x]):
            dist[v] = min(dist[v], dist[x] + w)
    return dist
    