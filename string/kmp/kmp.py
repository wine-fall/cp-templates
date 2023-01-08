# 前缀函数: fail[i]表示在s[:i + 1]中最长的既是前缀又是后缀的子串长度
def kmp(s: str):
    n = len(s)
    fail = [-1] * n

    for i in range(1, n):
        j = fail[i - 1]
        while j != -1 and s[i] != s[j + 1]:
            j = fail[j]
        if s[i] == s[j + 1]:
            fail[i] = j + 1
