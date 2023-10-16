"""
数位dp模板，采用记忆化递归
902. 最大为 N 的数字组合
"""
from functools import cache
from typing import List
class Solution:
    def atMostNGivenDigitSet(self, digits: List[str], n: int) -> int:
        s = str(n)
        digits = set(digits)

        @cache
        def helper(i, is_num, is_limit):
            """ 数位DP模板
            Args:
                i: int 当前的位数
                is_num: bool 是否为数字，初始化为False
                is_limit: bool 上一位是否已达上界，初始化为True
            Returns:
                int
            """
            if i == len(s):
                return int(is_num)
            ret = 0
            if not is_num:
                ret = helper(i + 1, False, False)
            
            up = int(s[i]) if is_limit else 9
            for d in range(0 if is_num else 1, up + 1):
                if str(d) in digits:
                    ret += helper(i + 1, True, d == up and is_limit)
            return ret
        
        return helper(0, False, True)
