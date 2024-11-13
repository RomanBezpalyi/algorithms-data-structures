/*
    DOUBLY LINKED LIST:
        * A data structure that contains a HEAD, TAIL and LENGTH property.
        * Linked Lists consist of NODES, and each node has a VALUE and a POINTER to NEXT node and PREVIOUS node (or null)
        * Easier access to the elements which are at the end of list (comparing with SLL)
        * Can be operated in reverse order (for SLL it's a problem, needs to be reversed)

    
    COMPARISON WITH SLL:
        * Takes more memory (because nodes have links in both directions)
        * Is more flexible (operations in both directions)
        * Better than SLL for finding nodes and can be done in half the time
    
    BIG O:
        * Insertion - O(1)
        * Removal - O(1) (unlike SLL, always constant);
        * Searching - O(n) (Arrays are better -> index access)
        * Access - O(n)
        * Technically searching is O(n/2), but that's stil O(n)
*/

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

var first = new Node('Hi');
first.next = new Node('there');

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    /* PUSH
        * Create a new node with the value passed to the function
        * If the head property is null set the head and tail to be the newly created node 
        * If not, set the next property on the tail to be that node
        * Set the previous property on the newly created node to be the tail
        * Set the tail to be the newly created node
        * Increment the length
        * Return the Doubly Linked List
    */
    push(val) {
        const newNode = new Node(val);

        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
        return this
    }

    /* POP
        * If there is no head, return undefined
        * Store the current tail in a variable to return later
        * If the length is 1, set the head and tail to be null
        * Update the tail to be the previous Node.
        * Set the newTail's next to null
        * Decrement the length
        * Return the value removed
    */
    pop() {
        if (!this.head) return undefined;
        const poppedNode = this.tail;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = poppedNode.prev;
            this.tail.next = null;
            poppedNode.prev = null;
        }
        this.length--;

        return poppedNode;
    }

    /* SHIFT
        * If length is 0, return undefined
        * Store the current head property in a variable (we'll call it old head)
        * If the length is one
            - set the head to be null
            - set the tail to be null
        * Update the head to be the next of the old head
        * Set the head's prev property to null
        * Set the old head's next to null
        * Decrement the length
        * Return old head
    */
   shift() {
        if (!this.head) return undefined;
        const oldHead = this.head;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = oldHead.next;
            this.head.prev = null;
            oldHead.next = null;
        }
        this.length--;
        return oldHead;
   }

    /* UNSHIFT
        * Create a new node with the value passed to the function
        * If the length is 0
            - Set the head to be the new node
            - Set the tail to be the new node
        * Otherwise
            - Set the prev property on the head of the list to be the new node
            - Set the next property on the new node to be the head property 
            - Update the head to be the new node
        * Increment the length
        * Return the list
    */
    unshift(val) {
        const newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
   }

    /* GET
        * If the index is less than 0 or greater or equal to the length, return null
        * If the index is less than or equal to half the length of the list
            - Loop through the list starting from the head and loop towards the middle
            - Return the node once it is found
        * If the index is greater than half the length of the list
        ​   - Loop through the list starting from the tail and loop towards the middle
           - Return the node once it is found
    */
    get(idx) {
        if (idx < 0 || idx >= this.length) return undefined;
        let count;
        let current;
        if (idx <= this.length / 2) {
            count = 0;
            current = this.head;
    
            while (count !== idx) {
                current = current.next;
                count++;
            }
        } else {
            count = this.length - 1;
            current = this.tail;

            while (count !== idx) {
                current = current.prev;
                count--;
            }
        }
        return current;
   }

    /* SET
        * Create a variable which is the result of the GET method at the index passed to the function
            - If the GET method returns a valid node, set the value of that node to be the value passed to the function
            - Return true
        * Otherwise, return false
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
        * If the index is less than zero or greater than or equal to the length return false
        * If the index is 0, UNSHIFT
        * If the index is the same as the length, PUSH
        * Use the GET method to access the index -1
        * Set the next and prev properties on the correct nodes to link everything together
        * Increment the length 
        * Return true
    */
    insert(idx, val) {
        if (idx < 0 || idx > this.length) return false;
        if (idx === 0) return !!this.unshift(val);
        if (idx === this.length) return !!this.push(val);

        const newNode = new Node(val);
        const beforeNode = this.get(idx - 1);
        const afterNode = beforeNode.next;
        newNode.prev = beforeNode;
        newNode.next = afterNode;
        beforeNode.next = newNode;
        afterNode.prev = newNode;
        this.length++;
        return true;
   }

    /* REMOVE
        * If the index is less than zero or greater than the length, return undefined
        * If the index is the same as the length-1, pop
        * If the index is 0, shift
        * Use the get method to retrieve the item to be removed
        * Update the next and prev properties to remove the found node from the list
        * Set next and prev to null on the found node
        * Decrement the length
        * Return the removed node.
    */
    remove(idx) {
        if (idx < 0 || idx >= this.length) return undefined;
        if (idx === 0) return this.shift();
        if (idx === this.length - 1) return this.pop();

        const removedNode = this.get(idx);
        const beforeNode = removedNode.prev;
        const afterNode = removedNode.next;
        beforeNode.next = afterNode;
        afterNode.prev = beforeNode;
        removedNode.prev = null;
        removedNode.next = null;
        this.length--;
        return removedNode;
   }
}

const list = new DoublyLinkedList();
list.push(1)
list.push(2)
list.push(3)
list.push(4)
list.push(5)
console.log(list);
