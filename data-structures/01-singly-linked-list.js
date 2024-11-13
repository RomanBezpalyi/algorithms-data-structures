/*
    DATA STRUCTURE
        * Data structures are collections of values, the relationships among them,
          and the functions or operations that can be applied to the data

    SINGLY LINKED LIST:
        * A data structure that contains a HEAD, TAIL and LENGTH property.
        * Linked Lists consist of NODES, and each node has a VALUE and a POINTER to another node or null
        * Elements cant be accessed by index (like in arrays), to get element we need to go element by element
            using NEXT property.
        * Are good for insertion and deletion (esp in the beginning or the end)
            (because elements don't have to be reindexed like in arrays) <- THE USECASE
    
    COMPARISON WITH ARRAYS:
        Lists:
            * Do not have indexes!
            * Connected via nodes with a next pointer
            * Random access is not allowed
        
        Arrays
            * Indexed in order!
            * Insertion and deletion can be expensive
            * Can quickly be accessed at a specific index
    
    BIG O:
        * Insertion - O(1)
        * Removal - Best (beginnin of list) - O(1). Worst (end of list) - O(n);
        * Searching - O(n) (Arrays are better -> index access)
        * Access - O(n)
*/

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

var first = new Node('Hi');
first.next = new Node('there');

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    /* PUSH
        * This function should accept a value
        * Create a new node using the value passed to the function
        * If there is no head property on the list, set the head and tail to be the newly created node
        * Otherwise set the next property on the tail to be the new node and set the tail property
            on the list to be the newly created node
        * Increment the length by one
        * Return the linked list
    */
    push(val) {
        const newNode = new Node(val);

        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }

    // traverse() {
    //     let current = this.head;
    //     while(current) {
    //         console.log(current.val);
    //         current = current.next;
    //     }
    // }

    /* POP
        * If there are no nodes in the list, return undefined
        * Loop through the list until you reach the tail
        * Set the next property of the 2nd to last node to be null
        * Set the tail to be the 2nd to last node
        * Decrement the length of the list by 1
        * Return the value of the node removed
    */
    pop() {
        if (!this.head) return undefined;
        let current = this.head;
        let newTail = current;

        while(current.next) {
            newTail = current;
            current = current.next;
        }

        this.tail = newTail;
        this.tail.next = null;
        this.length--;
        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return current;
    }

    /* SHIFT
        * If there are no nodes in the list, return undefined
        * Store the current head property in a variable
        * Set the head property to be the current head's next property
        * Decrement the length of the list by 1
        * Return the value of the node removed
    */
   shift() {
        if (!this.head) return undefined;
        let currentHead = this.head;
        this.head = currentHead.next;
        this.length--;
        if (this.length === 0) {
            this.tail = null;
        }
        return currentHead;
   }

    /* UNSHIFT
        * This function should accept a value
        * Create a new node using the value passed to the function
        * If there is no head property on the list, set the head and tail to be the newly created node
        * Otherwise set the newly created node's next property to be the current head property on the list
        * Set the head property on the list to be that newly created node
        * Increment the length of the list by 1
        * Return the linked list
    */
    unshift(val) {
        const newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
   }

    /* GET
        * This function should accept an index
        * If the index is less than zero or greater than or equal to the length of the list, return null
        * Loop through the list until you reach the index and return the node at that specific index
    */
    get(idx) {
        if (idx < 0 || idx >= this.length) return null;
        let counter = 0;
        let current = this.head

        while (counter !== idx) {
            current = current.next;
            counter++;
        }
        return current;
   }

    /* SET
        * This function should accept a value and an index
        * Use your GET function to find the specific node.
        * If the node is not found, return false
        * If the node is found, set the value of that node to be the value passed to the function and return true
    */
    set(idx, val) {
        const foundNode = this.get(idx);
        if (foundNode) {
            foundNode.val = val;
            return true;
        }
        return false;
   }

    /* INSERT
        * If the index is less than zero or greater than the length, return false
        * If the index is the same as the length, push a new node to the end of the list
        * If the index is 0, unshift a new node to the start of the list
        * Otherwise, using the get method, access the node at the index - 1
        * Set the next property on that node to be the new node
        * Set the next property on the new node to be the previous next
        * Increment the length
        * Return true
    */
    insert(idx, val) {
        if (idx < 0 || idx > this.length) return false;
        if (idx === this.length) return !!this.push(val);
        if (idx === 0) return !!this.unshift(val);

        const newNode = new Node(val);
        const previous = this.get(idx - 1);
        newNode.next = previous.next;
        previous.next = newNode;
        this.length++;
        return true;
   }

    /* REMOVE
        * If the index is less than zero or greater than the length, return undefined
        * If the index is the same as the length-1, pop
        * If the index is 0, shift
        * Otherwise, using the get method, access the node at the index - 1
        * Set the next property on that node to be the next of the next node
        * Decrement the length
        * Return the value of the node removed
    */
    remove(idx) {
        if (idx < 0 || idx >= this.length) return undefined;
        if (idx === 0) return this.shift();
        if (idx === this.length - 1) return this.pop();

        const prevNode = this.get(idx - 1);
        const removed = prevNode.next;
        prevNode.next = removed.next;
        this.length--;
        return removed
   }

    /* REVERSE
        * Swap the head and tail
        * Create a variable called next
        * Create a variable called prev
        * Create a variable called node and initialize it to the head property
        * Loop through the list
        * Set next to be the next property on whatever node is
        * Set the next property on the node to be whatever prev is
        * Set prev to be the value of the node variable
        * Set the node variable to be the value of the next variable
        * Once you have finished looping, return the list
    */
    reverse() {
        let node = this.head;
        this.head = this.tail;
        this.tail = node;
        let next;
        let prev = null;

        for (let i = 0; i < this.length; i++) {
            next = node.next;
            node.next = prev;
            prev = node;
            node = next;
        }
        return this;
    }

    print() {
        const arr = [];
        let current = this.head;
        while (current) {
            arr.push(current.val);
            current = current.next;
        }
        console.log(arr);
    }
}

const list = new SinglyLinkedList();
list.push(1)
list.push(2)
list.push(3)
console.log(list);
