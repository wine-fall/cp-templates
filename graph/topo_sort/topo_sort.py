# 拓扑排序
# 参考资料: https://oi-wiki.org/graph/topo/
# leetcode题目: 210-课程表 II
def topo_sort(graph: list[list[int]],):
    n = len(graph)
    adj = defaultdict(list)
    for y, x in graph:
        adj[x].append(y)

    flags = [0] * n
    ret = []

    def dfs(x):
        flags[x] = 1
        for y in adj[x]:
            if flags[y] == 1:
                return False
            if flags[y] == 0 and not dfs(y):
                return False
        flags[x] = 2
        ret.append(x)
        return True

    for i in range(n):
        if not flags[i]:
            dfs(i)

    return ret[::-1] if len(ret) == n else []