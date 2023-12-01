class UnionFind {
    constructor(n) {
        this.parent = Array.from({length: n}).map((_, i) => i);
    }

    find(x) {
        let tmp = x;
        while (x !== this.parent[x]) {
            x = this.parent[x];
        }
        this.parent[tmp] = x;
        return x;
    }

    union(x, y) {
        const px = this.find(x);
        const py = this.find(y);
        this.parent[px] = py;
        return;
    }

    isConnect(x, y) {
        const px = this.find(x);
        const py = this.find(y);
        return px === py;
    }
}