/*
    TREE
        * A data structure that consists of nodes in a PARENT / CHILD relationship
        * Node can only point to a child (no siblings)
    
    TREE TERMINOLOGY:
        * Root - The top node in a tree.
        * Child -A node directly connected to another node when moving away from the Root.
        * Parent - The converse notion of a child.
        * Siblings -A group of nodes with the same parent.
        * Leaf - A node with no children.
        * Edge - The connection between one node and another.
    
    COMPARISON WITH LISTS:
        * List - linear (SLL is a special case of tree)
        * Tree - nonlinear
    
    USE CASES
        * HTML DOM
        * Network routing
        * Abstract syntax trees (logical code if/else-statements with branching out)
        * AI (decision trees)
        * Folders in Operating System
        * Computer File System
        * JSON object
    
    KIND OF TREES:
        * Trees
        * Binary trees:
           - each node can have no more than 2 children.
           - any type of children
        * Binary search trees (convinient for searching because it's sorted)
           - For each node, an element with a smaller values goes to the left side and elements with larger
             value go to the right
    
    BINARY TREES EXAMPLES:
        * Decision trees (true/false)
        * Datatable Indicies
        * Sorting algorithms
    
    HOW BINARY SEARCH TREES (BST) WORK
        * Every parent node has at most TWO children
        * Every node to the left of a parent node is ALWAYS LESS than the parent
        * Every node to the right of a parent node is ALWAYS GREATER than the parent

    BST BIG O:
        * Insertion - O(log n)
        * Searching - O(log n) (Doubling the number of nodes only increases the number of steps to insert/find by 1)
        * (Not guaranteed (Worst case - if BST is a SLL - all items are larger than the parent))
    
    TREE TRAVERSAL
        * Breadth First Search
        * Depth First Search
    
         10
      6     15
    3   8      20

    * BFS - [10, 6, 15, 3, 8, 20]
    * DFS InOrder - [3, 6, 8, 10, 15, 20]
    * DFS PreOrder - [10, 6, 3, 8, 15, 20]
    * DFS PostOrder - [3, 8, 6, 20, 15, 10]

    BFS vs. DFS - WHAT TO USE
        * Time Complexity is the same (every node is visited once)
        * Space Complexity is different 
             - for wide trees a lot of elements would be stored in the queue - BFS worse
             - for long trees (SLL) - DFS worse

    DFS - InOrder, PreOrder, PostOrder
        * InOrder 
            - returns the array from the smallest to the largest - in order
            - Used commonly with BST's
        * PreOrder - Can be used to "export" a tree structure so that it is easily reconstructed or copied
            (We wouldn't know the root with InOrder)
*/


class Node {
    constructor(val) {
        this.value = val;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    /* INSERT
        * Create a new node
        * Starting at the root
            - Check if there is a root, if not - the root now becomes that new node!
            - If there is a root, check if the value of the new node is greater than or less than the value of the root
            - If it is greater 
                * Check to see if there is a node to the right
                    - If there is, move to that node and repeat these steps
                    - If there is not, add that node as the right property
            - If it is less
                * Check to see if there is a node to the left
                    - If there is, move to that node and repeat these steps
                    - If there is not, add that node as the left property
    */
    insert(val) {
        const newNode = new Node(val);
        if (!this.root) {
            this.root = newNode;
            return this;
        } else {
            let current = this.root;
            
            while (true) {
                if (val === current.value) return undefined;
                if (val < current.value) {
                    if (!current.left) {
                        current.left = newNode;
                        return this;
                    } else {
                        current = current.left;
                    }
                } else if (val > current.value) { // } else {
                    if (!current.right) {
                        current.right = newNode;
                        return this;
                    } else {
                        current = current.right;
                    }
                }
            }
        }
    }

    /* FIND
        * Starting at the root
            - Check if there is a root, if not - we're done searching!
            - If there is a root, check if the value of the new node is the value we are looking for. If we found it, we're done!
            - If not, check to see if the value is greater than or less than the value of the root
            - If it is greater 
                * Check to see if there is a node to the right
                    - If there is, move to that node and repeat these steps
                    - If there is not, we're done searching!
            - If it is less
                * Check to see if there is a node to the left
                    - If there is, move to that node and repeat these steps
                    - If there is not, we're done searching!
    */
    find(val) {
        if (!this.root) return undefined;
        let current = this.root;
        let found = false;

        while (current && !found) {
            if (val < current.value) {
                current = current.left;
            } else if (val > current.value) {
                current = current.right;
            } else {
                found = true;
            }
        }
        if (!found) return undefined;
        return current;
    }

    // contains(val) {
    //     if (!this.root) return false;
    //     let found = false;
    //     let current = this.root;

    //     while (current && !found) {
    //         if (val < current.value) {
    //             current = current.left;
    //         } else if (val > current.value) {
    //             current = current.right;
    //         } else {
    //             found = true;
    //         }
    //     }
    //     return found;
    // }

    /* BREADTH-FIRST SEARCH 
        * Create a queue (this can be an array) and a variable to store the values of nodes visited
        * Place the root node in the queue
        * Loop as long as there is anything in the queue
            - Dequeue a node from the queue and push the value of the node into the variable that stores the nodes
            - If there is a left property on the node dequeued - add it to the queue
            - If there is a right property on the node dequeued - add it to the queue
        * Return the variable that stores the values
    */
    BFS() {
        let node = this.root;
        const data = [];
        const queue = [];

        queue.push(node);

        while (queue.length) {
            node = queue.shift();
            data.push(node.value);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        return data;
    }

    /* DEPTH-FIRST SEARCH - PreOrder
        * Create a variable to store the values of nodes visited
        * Store the root of the BST in a variable called current
        * Write a helper function which accepts a node
            - Push the value of the node to the variable that stores the values
            - If the node has a left property, call the helper function with the left property on the node
            - If the node has a right property, call the helper function with the right property on the node
        * Invoke the helper function with the current variable
        * Return the array of values
    */
    DFSPreOrder() {
        const data = [];
        function traverse(node) {
            data.push(node.value);
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
        }
        traverse(this.root);

        return data;
    }


    /* DEPTH-FIRST SEARCH - PostOrder
        * Create a variable to store the values of nodes visited
        * Store the root of the BST in a variable called current
        * Write a helper function which accepts a node
            - If the node has a left property, call the helper function with the left property on the node
            - If the node has a right property, call the helper function with the right property on the node
            - Push the value of the node to the variable that stores the values
        * Invoke the helper function with the current variable
        * Return the array of values
    */
    DFSPostOrder() {
        const data = [];
        function traverse(node) {
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
            data.push(node.value);
        }
        traverse(this.root);

        return data;
    }

    /* DEPTH-FIRST SEARCH - InOrder
        * Create a variable to store the values of nodes visited
        * Store the root of the BST in a variable called current
        * Write a helper function which accepts a node
            - If the node has a left property, call the helper function with the left property on the node
            - Push the value of the node to the variable that stores the values
            - If the node has a right property, call the helper function with the right property on the node
        * Invoke the helper function with the current variable
        * Return the array of values
    */
    DFSInOrder() {
        const data = [];
        function traverse(node) {
            if (node.left) traverse(node.left);
            data.push(node.value);
            if (node.right) traverse(node.right);
        }
        traverse(this.root);

        return data;
    }
}

const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(6);
bst.insert(15);
bst.insert(3);
bst.insert(8);
bst.insert(20);
console.log(bst);
console.log(bst.BFS());
console.log(bst.DFSPreOrder());
console.log(bst.DFSPostOrder());
console.log(bst.DFSInOrder());
