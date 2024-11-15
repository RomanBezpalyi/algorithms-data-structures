/*
    QUEUE
        * A FIFO data structure!
        * Data structure with only 2 operations - adding and removing
        * The first element added to the queue will be the first element removed from the queue
        * Are foundational for more complex DSs
        * Insertion and removal can be done in O(1)
    
    USE CASES
        * Background tasks
        * Uploading resources(*)
        * Printing / Task processing

    BIG O:
        * Insertion - O(1)
        * Removal - O(1);
        * Searching - O(n)
        * Access - O(n) (2 last don't matter - no such operations)
*/


class Node {
    constructor(val) {
        this.value = val;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    /* ENQUEUE
        * This function accepts some value
        * Create a new node using that value passed to the function
        * If there are no nodes in the queue, set this node to be the first and last property of the queue
        * Otherwise, set the next property on the current last to be that node,
           and then set the last property of the queue to be that node
        * Increment the size of the queue by 1
    */
    enqueue(val) {
        const newNode = new Node(val);

        if (!this.first) {
            this.first = newNode;
            this.last = newNode;
        } else {
            this.last.next = newNode;
            this.last = newNode;
        }
        return ++this.size;
    }

    /* DEQUEUE
        * If there is no first property, just return null
        * Store the first property in a variable
        * See if the first is the same as the last (check if there is only 1 node). If so, set the first and last to be null
        * If there is more than 1 node, set the first property to be the next property of first 
        * Decrement the size by 1
        * Return the value of the node dequeued
    */
    dequeue() {
        if (!this.size) return null;
        
        const temp = this.first;
        if (this.first === this.last) {
            this.last = null;
        }
        this.first = this.first.next;
        this.size--;
        return temp.value;
    }
}

const queue = new Queue();
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
console.log(queue);

