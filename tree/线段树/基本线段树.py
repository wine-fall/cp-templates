"""
基本线段树，包括功能：
    1. 单点修改；
    2. 范围查询。
    注意：区间范围为：[1, n]！！！

小技巧：
    1. 找满足条件索引时，可仿照线段树的query，如果找最左边索引，则先看能否在左边找到。

题目：
[leetcode]
2286. 以组为单位订音乐会的门票
2940. 找到 Alice 和 Bob 可以相遇的建筑
"""
from typing import Callable, List
class BasicSegmentTree:
    """基本线段树

    支持单点修改和范围查询
    """
    def __init__(self, data: List[int], func: Callable) -> None:
        """初始化线段树

        Args:
            n (Optional[int]): 数组长度
            func (Callable): 求最大、最小、总和，支持传入min、max、lambda x, y: x + y ....
        """
        self.data = data
        self.n = len(self.data)
        self.tree = [None] * (4 * self.n) # 节点i的左孩子为2i，右孩子为2i+1
        self._func = func
        self.build(1, 1, self.n)

    def build(self, o: int, l: int, r: int) -> None:
        """建树

        入口函数：build(1, 1, n)

        Args:
            o (int): 节点索引
            l (int): 左边界
            r (int): 右边界
        """
        if l == r:
            self.tree[o] = self.data[l - 1]
            return
        mid = (l + r) // 2
        self.build(2 * o, l, mid)
        self.build(2 * o + 1, mid + 1, r)
        self.tree[o] = self._func(self.tree[2 * o], self.tree[2 * o + 1])
    
    def update(self, o: int, l: int, r: int, idx: int, val: int) -> None:
        """单点修改

        入口函数：update(1, 1, n, idx, val)

        Args:
            o (int): 节点索引
            l (int): 左边界
            r (int): 右边界
            idx (int): 增加的值的索引
            val (int): 增加的值
        """
        if l == r:
            self.tree[o] += val
            return
        mid = (l + r) // 2
        if idx <= mid:
            self.update(2 * o, l, mid, idx, val)
        else:
            self.update(2 * o + 1, mid + 1, r, idx, val)
        self.tree[o] = self._func(self.tree[2 * o], self.tree[2 * o + 1])
    
    def query(self, o: int, l: int, r: int, L: int, R: int) -> int:
        """范围查询

        入口函数：query(1, 1, n, L, R)

        Args:
            o (int): 节点索引
            l (int): 左边界
            r (int): 右边界
            L (int): 查询范围左边界
            R (int): 查询范围右边界

        Returns:
            int: 查询结果
        """
        if l >= L and r <= R:
            return self.tree[o]
        mid = (l + r) // 2

        if R <= mid:
            # 查询区间全在左子树
            return self.query(2 * o, l, mid, L, R)
        if L > mid:
            # 查询区间全在右子树
            return self.query(2 * o + 1, mid + 1, r, L, R)
        else:
            # 查询区间覆盖左右子树
            return self._func(self.query(2 * o, l, mid, L, R), self.query(2 * o + 1, mid + 1, r, L, R))


# 2286. 以组为单位订音乐会的门票
class BookMyShow:
    def __init__(self, n: int, m: int):
        self.n = n
        self.m = m
        self.sum_tree = BasicSegmentTree([0] * self.n, lambda x, y: x + y)
        self.min_tree = BasicSegmentTree([0] * self.n, min)
    
    def index(self, o, l, r, L, R, val):
        """
        找小于等于val的最左边索引
        """
        if self.min_tree.tree[o] > val:
            return 0
        if l == r:
            return l
        mid = (l + r) // 2
        if L <= mid:
            idx = self.index(2 * o, l, mid, L, R, val)
            if idx > 0:
                return idx
        if R > mid:
            idx = self.index(2 * o + 1, mid + 1, r, L, R, val)
            if idx > 0:
                return idx
        return 0

    def gather(self, k: int, maxRow: int) -> List[int]:
        idx = self.index(1, 1, self.n, 1, maxRow + 1, self.m - k)
        if idx == 0:
            return []
        seats = self.sum_tree.query(1, 1, self.n, idx, idx)
        self.sum_tree.update(1, 1, self.n, idx, k)
        self.min_tree.update(1, 1, self.n, idx, k)
        return [idx - 1, seats]

    def scatter(self, k: int, maxRow: int) -> bool:
        left = (maxRow + 1) * self.m - self.sum_tree.query(1, 1, self.n, 1, maxRow + 1)
        if left < k:
            return False
        idx = self.index(1, 1, self.n, 1, maxRow + 1, self.m - 1)
        while True:
            left_seats = self.m - self.sum_tree.query(1, 1, self.n, idx, idx)
            if k <= left_seats:
                self.sum_tree.update(1, 1, self.n, idx, k)
                self.min_tree.update(1, 1, self.n, idx, k)
                return True
            k -= left_seats
            self.sum_tree.update(1, 1, self.n, idx, left_seats)
            self.min_tree.update(1, 1, self.n, idx, left_seats)
            idx += 1


# 2940. 找到 Alice 和 Bob 可以相遇的建筑
class Solution:
    def leftmostBuildingQueries(self, heights: List[int], queries: List[List[int]]) -> List[int]:
        n = len(heights)
        max_tree = BasicSegmentTree(heights, max)

        def index(o, l, r, L, R, val):
            """
            找大于val的最左边索引
            """
            if max_tree.tree[o] <= val:
                return 0
            if l == r:
                return l
            mid = (l + r) // 2
            if L <= mid:
                idx = index(2 * o, l, mid, L, R, val)
                if idx > 0:
                    return idx
            if R > mid:
                idx = index(2 * o + 1, mid + 1, r, L, R, val)
                if idx > 0:
                    return idx
            return 0

        ret = []
        for i, j in queries:
            if i > j:
                i, j = j, i
            if i == j or heights[i] < heights[j]:
                ret.append(j)
            else:
                idx = index(1, 1, n, j + 1, n, heights[i])
                ret.append(idx - 1)
        return ret