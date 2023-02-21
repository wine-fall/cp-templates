class LazySegmentTree:
    def __init__(self, nums):
        self.n = len(nums)
        self.nums = nums
        self.ones = [0] * (4 * self.n)
        self.lazy = [True] * (4 * self.n)
        self._build(0, 0, self.n-1)

    def _build(self, tree_index, l, r):
        if l == r:
            self.ones[tree_index] = self.nums[l]
            return
        left, right = 2 * tree_index + 1, 2 * tree_index + 2
        mid = (l + r) // 2
        self._build(left, l, mid)
        self._build(right, mid+1, r)
        self.ones[tree_index] = self.ones[left] + self.ones[right]

    def update(self, ql, qr):
        self._update(0, 0, self.n-1, ql, qr)

    def _update(self, tree_index, l, r, ql, qr):
        if l == ql and r == qr:
            self.lazy[tree_index] = not self.lazy[tree_index]
            ones = self.ones[tree_index]
            zeros = r - l + 1 - ones
            self.ones[tree_index] = zeros
            return
        left, right = 2 * tree_index + 1, 2 * tree_index + 2
        mid = (l + r) // 2
        if not self.lazy[tree_index]:
            self._update(left, l, mid, l, mid)
            self._update(right, mid+1, r, mid+1, r)
            self.lazy[tree_index] = True
        if qr <= mid: self._update(left, l, mid, ql, qr)
        elif ql > mid: self._update(right, mid+1, r, ql, qr)
        else:
            self._update(left, l, mid, ql, mid)
            self._update(right, mid+1, r, mid+1, qr)
        self.ones[tree_index] = self.ones[left] + self.ones[right]

    def query(self, ql, qr):
        return self._query(0, 0, self.n-1, ql, qr)

    def _query(self, tree_index, l, r, ql, qr):
        if l == ql and r == qr:
            return self.ones[tree_index]
        left, right = 2 * tree_index + 1, 2 * tree_index + 2
        mid = (l + r) // 2
        if not self.lazy[tree_index]:
            self._update(left, l, mid, l, mid)
            self._update(right, mid+1, r, mid+1, r)
            self.lazy[tree_index] = True
        if qr <= mid: return self._query(left, l, mid, ql, qr)
        if ql > mid: return self._query(right, mid+1, r, ql, qr)
        ones1 = self._query(left, l, mid, ql, mid)
        ones2 = self._query(right, mid+1, r, mid+1, qr)
        return ones1 + ones2
    