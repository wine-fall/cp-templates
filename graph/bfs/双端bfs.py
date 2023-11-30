"""
适用数据量级：500以上
从起点和终点同时进行bfs，每次选择长度较小的栈进行遍历
存储到达每个 状态 的 步长

小技巧：
1. 封装带记忆化功能的双端队列

题目：
[leetcode]
752. 打开转盘锁
"""
from collections import deque
from typing import Tuple, List
class Queue:
    """记忆化BFS队列
    """
    def __init__(self):
        self.queue = deque()
        self.vis = {}
    
    def __len__(self):
        return len(self.queue)
    
    def __contains__(self, x: str) -> bool:
        """判断某个状态是否已经遍历过

        Args:
            x (str): 状态

        Returns:
            bool: 是否遍历
        """
        return x in self.vis
    
    def add(self, x: Tuple[str, int]) -> None:
        """添加状态和对应步长

        Args:
            x (Tuple[str, int]): 状态+步长
        """
        self.queue.append(x[0])
        self.vis[x[0]] = x[1]
    
    def pop(self) -> Tuple[str, int]:
        """弹出状态和步长

        Returns:
            Tuple[str, int]: 状态和步长
        """
        return self.queue.popleft()
    

# lc752. 打开转盘锁
class Solution:
    def openLock(self, deadends: List[str], target: str) -> int:
        deadends = set(deadends)
        if "0000" in deadends:
            return -1
        if target in deadends:
            return -1
        if target == "0000":
            return 0
        
        st = ("0000", 0)
        ed = (target, 0)
        front, back = Queue(), Queue()
        front.add(st)
        back.add(ed)

        def action(x):
            nxt = []
            for i in range(4):
                up = x[:i] + str((int(x[i]) + 1) % 10) + x[i + 1:]
                down = x[:i] + str((int(x[i]) - 1) % 10) + x[i + 1:]
                nxt.append(up)
                nxt.append(down)
            return nxt

        while front and back:
            if len(front) > len(back):
                # 每次选择长度较小的栈弹出
                ts, te = back, front
            else:
                ts, te = front, back
            num = ts.pop()
            for nxt in action(num):
                if nxt not in ts and nxt not in deadends:
                    if nxt in te.vis:
                        return ts.vis[num] + te.vis[nxt] + 1
                    ts.add((nxt, ts.vis[num] + 1))
        return -1