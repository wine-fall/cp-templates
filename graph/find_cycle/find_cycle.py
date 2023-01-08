# DFS找环
# leetcode题目: 207-课程表，802-找到最终的安全状态
# graph[i]为i节点可以到达的所有节点
def find_cycle(graph: list[list[int]]):
    n = len(graph)
    flags = [0] * n
    
    def dfs(x):
        if flags[x] > 0:
            return flags[x] == 2
        flags[x] = 1
        for y in graph[x]:
            if not dfs(y):
                return False
        flags[x] = 2
        return True