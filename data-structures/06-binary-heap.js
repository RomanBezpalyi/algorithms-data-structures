/*
    BINARY HEAP
        * Very similar to a binary search tree, but with some different rules!
        * In a MaxBinaryHeap, parent nodes are always larger than child nodes.
        * In a MinBinaryHeap, parent nodes are always smaller than child nodes
          * Binary Heaps are used to implement Priority Queues, which are very commonly used data structures
          * They are also used quite a bit, with graph traversal algorithms
    
    MAX BINARY HEAP:
        * Each parent has at most two child nodes
        * The value of each parent node is ALWAYS greater than its child nodes
        * In a max Binary Heap the parent is greater than the children, but there are no guarantees between sibling nodes.
        * A binary heap is as compact as possible. All the children of each node are as full
            as they can be and left children are filled out first
    
    HEAP BASED ON ARRAY
             100
          39     82
        23  22  35 72

        * => [100, 39, 82, 23, 22, 35, 72]
        * To find children of a node:
            - Left: 2n + 1
            - Right: 2n + 2
        * To find a parent of a node: Math.floor((n - 1)/2)


    BIG O:
        * Insertion - O(log n) (only compare once per a level)
        * Searching - O(log n)
        * Search - O(n) (not needed in BH - BH is not made for search)
*/

class MaxBinaryHeap {
    constructor() {
        this.values = [];
    }

    bubbleUp() {
        let idx = this.values.length - 1;
        const element = this.values[idx];

        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.values[parentIdx];

            if (element <= parent) break;
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }

    sinkDown() {
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];

        while (true) {
            const leftChildIdx = 2 * idx + 1;
            const rightChildIdx = 2 * idx + 2;
            let leftChild;
            let rightChild;
            let swapElementIdx = null;

            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if (leftChild > element) {
                    swapElementIdx = leftChildIdx;
                }
            }

            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if ((swapElementIdx === null && rightChild > element) || (swapElementIdx !== null && rightChild > leftChild)) {
                    swapElementIdx = rightChildIdx;
                }
            }

            if (swapElementIdx === null) break;
            this.values[idx] = this.values[swapElementIdx];
            this.values[swapElementIdx] = element;
            idx = swapElementIdx;
        }
    }

    /* INSERT
        * Push the value into the values property on the heap
        * Bubble Up the value:
            - Create a variable called index which is the length of the values property - 1
            - Create a variable called parentIndex which is the floor of (index-1)/2
            - Keep looping as long as the values element at the parentIndex is less than the values element at the child index
                * Swap the value of the values element at the parentIndex with the value of the element property at the child index
                * Set the index to be the parentIndex, and start over!
    */
    insert(val) {
        this.values.push(val);
        this.bubbleUp();
    }

    /* REMOVE (EXTRACTMAX)
        * Swap the first value in the values property with the last one
        * Pop from the values property, so you can return the value at the end.
        * Have the new root "sink down" to the correct spot...​
            - Your parent index starts at 0 (the root)
            - Find the index of the left child: 2 * index + 1 (make sure its not out of bounds)
            - Find the index of the right child: 2*index + 2 (make sure its not out of bounds)
            - If the left or right child is greater than the element...swap. If both left and
                right children are larger, swap with the largest child.
            - The child index you swapped to now becomes the new parent index.  
            - Keep looping and swapping until neither child is larger than the element.
            - Return the old root!
    */
    extractMax() {
        const max = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        return max;
    }
}

const heap = new MaxBinaryHeap();
heap.insert(41);
heap.insert(39);
heap.insert(33);
heap.insert(18);
heap.insert(27);
heap.insert(12);
heap.insert(55);
heap.insert(1);
console.log(heap.extractMax());
console.log(heap);
