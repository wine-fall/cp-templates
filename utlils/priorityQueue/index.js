/**
* https://bigfrontend.dev/problem/create-a-priority-queue-in-JavaScript
* DIFFICULT
* https://codeburst.io/how-to-create-a-priority-queue-with-javascript-c56a970f29a8
*/
const leftChild = (index) => index * 2 + 1;
const rightChild = (index) => index * 2 + 2;
const parent = (index) => Math.floor((index - 1) / 2);

/**
 * Heaps are a tree-based data structure, usually implemented as an array, which represent a priority queue
 */
class _PriorityQueue {
    /**
    * @param {(a: any, b: any) => -1 | 0 | 1} compare - 
    * compare function, similar to parameter of Array.prototype.sort
    * Default min heap
    */
    constructor(compare = (a, b) => a - b) {
        this.compare = (a, b) => compare(a, b) > 0; // we just compare if a > b
        this.heap = [];
    }
    /**
    * return {number} amount of items
    */
    size() {
        return this.heap.length;
    }
    
    /**
    * returns the head element
    */
    peek() {
        // the root is always the highest priority item
        return this.heap[0];
    }
    
    /**
    * Insert
    Insert pushes an element on to our heap.
    After we have inserted the element, we correctly position the element in our heap by comparing the values of the newly inserted element with its parent.
    If the newly inserted elements priority is greater, then the newly inserted element is swapped with its parent. 
    This is recursively called until the element is rightly positioned.
    */
    add(element) {
        // push element to the end of the heap
        this.heap.push(element);
        if (this.heap.length > 1) {
            this.moveUp(this.heap.length - 1);
        }
    }
    moveUp(index) {
        if (index === 0) {
            return;
        }
        
        const parentIdx = parent(index);
        if (this.compare(this.heap[parentIdx], this.heap[index])) {
            // if the element is greater than its parent:
            // swap element with its parent, keep doing until elt is at its right pos
            this.swap(parentIdx, index);
            this.moveUp(parentIdx);
        }
    }
    
    /**
    * poll extracts the root from the heap and calls heapify to reposition the rest of the heap,
    * placing the next highest priority item at the root.
    */
    poll() {
        // remove the first element from the heap
        const root = this.heap[0];
        this.swap(0, this.heap.length - 1);
        
        // put the last element to the front of the heap
        // and remove the last element from the heap as it now
        // sits at the front of the heap
        this.heap.pop();
        
        // correctly re-position heap
        this.heapify(0);
        
        return root;
    }
    /**
    Heapify re-positions the heap by comparing the left and right child of a specific node and swapping them as necessary.
    This is recursively called until the heap is correctly repositioned.} index 
    */
    heapify(index) {
        const childIdx = this.getChildIdx(index); // child index with which we need to swap
        //if(!childIdx) return;
        
        // if the value of index has changed, then some swapping needs to be done
        // and this method needs to be called again with the swapped element
        if (index !== childIdx) {
            this.swap(index, childIdx);
            this.heapify(childIdx);
        }
    }
    
    getChildIdx(index) {
        let left = leftChild(index);
        let right = rightChild(index);
        
        // if the left child has higher priority than the node we are looking at
        // Min heap: a-b : index-Left > 0 means index > left and so we have to give priority to left
        // Max heap: b-a: Left-index > 0 means left > index and so we have to give priority to left
        if (left < this.heap.length && this.compare(this.heap[index], this.heap[left])) {
            index = left;
        }
        
        // if the right child has higher priority than the node we are looking at
        if (right < this.heap.length && this.compare(this.heap[index], this.heap[right])) {
            index = right;
        }
        return index;
    }
    
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
}