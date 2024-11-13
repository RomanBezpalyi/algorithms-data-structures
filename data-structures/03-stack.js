/*
    STACK
        * A LIFO data structure!
        * The last element added to the stack will be the first element removed from the stack
    
    USE CASES
        * Managing function invocations
        * Undo / Redo
        * Routing (the history object) is treated like a stack!

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

class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    /* PUSH
        * The function should accept a value
        * Create a new node with that value
        * If there are no nodes in the stack, set the first and last property to be the newly created node 
        * If there is at least one node, create a variable that stores the current first property on the stack
        * Reset the first property to be the newly created node
        * Set the next property on the node to be the previously created variable
        * Increment the size of the stack by 1
    */
    push(val) {
        const newNode = new Node(val);

        if (!this.size) {
            this.first = newNode;
            this.last = newNode;
        } else {
            const temp = this.first;
            this.first = newNode;
            this.first.next = temp;
        }
        return ++this.size;
    }

    /* POP
        * If there are no nodes in the stack, return null
        * Create a temporary variable to store the first property on the stack
        * If there is only 1 node, set the first and last property to be null
        * If there is more than one node, set the first property to be the next property on the current first
        * Decrement the size by 1
        * Return the value of the node removed
    */
    pop() {
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

const stack = new Stack();
stack.push(1)
console.log(stack);

