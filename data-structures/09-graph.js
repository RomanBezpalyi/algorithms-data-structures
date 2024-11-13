/*
    GRAPH
        * A graph data structure consists of a finite (and possibly mutable) set of VERTICES (NODES/POINTS),
            together with a set of UNORDERED PAIRS of these vertices for an undirected graph or a set of ORDERED
            PAIRS for a directed graph.
    
    USES FOR GRAPHS:
        * Social Networks (connections between friends)
        * Location / Mapping
        * Routing Algorithms
        * Visual Hierarchy
        * File System Optimizations
        * Recommendations (movies, music, games)
        * EVERYWHERE!
    
    ESSENTIAL GRAPH TERMS
        * Vertex - a node
        * Edge - connection between nodes
        * Weighted/Unweighted - values assigned to distances between vertices
        * Directed/Undirected - directions assigned to distanced between vertices

    WAYS OF STORING GRAPHS
        * ADJACENCY matrix - stroing conncetions between the vertices in a matrix
               A  B  C  D  E
            A  0  1  0  0  1
            B  1  0  1  0  0
            C  0  1  0  1  0
            D  0  0  1  0  1
            E  1  0  0  1  0
        * ADJACENCY list - storing connections in an array or a list
               [              {
        0:      [1, 5],        A: [B, F],
        1:      [0, 2],        B: [A, C],   
        2:      [1, 3],        C: [B, D],
        3:      [2, 4],        D: [C, E],
        4:      [3, 5],        E: [D, F],
        5:      [4, 0]         F: [E, A],
               ]               }

    ADJACENCY MATRIX vs. ADJACENCY LIST - BIG O
        V - number of vertices  E - number of edges 

        *                   AL              AM
        * ADD VERTEX        O(1)            O(V^2)
        * ADD EDGE          O(1)            O(1)
        * REMOVE VERTEX     O(V+E)          O(V^2)
        * REMOVE EDGE       O(E)            O(1)
        * QUERY             O(V+E)          O(1)
        * STORAGE           O(V+E)          O(V^2)
        
        * ADJACENCY LIST
            - Can take up less space (in sparse graphs)
            - Faster to iterate over all edges
            - Can be slower to lookup specific edge
        * ADJACENCY MATRIX
            - Takes up more space (in sparse graphs)
            - Slower to iterate over all edges
            - Faster to lookup specific edge

    GRAPH TRAVERSAL USES
        * Peer to peer networking
        * Web crawlers
        * Finding "closest" matches/recommendations
        * Shortest path problems
            - GPS Navigation
            - Solving mazes
            - AI (shortest path to win the game)

    DEPTH-FIRST TRAVERSAL
        * Explore as far as possible down one branch before "backtracking"

    BREADTH-FIRST TRAVERSAL
        * Visit neighbors at current depth first!
*/

class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    /* ADD VERTEX
        * Write a method called addVertex, which accepts a name of a vertex
        * It should add a key to the adjacency list with the name of the vertex and set its value to be an empty array
    */
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    /* ADD EDGE
        * This function should accept two vertices, we can call them vertex1 and vertex2
        * The function should find in the adjacency list the key of vertex1 and push vertex2 to the array
        * The function should find in the adjacency list the key of vertex2 and push vertex1 to the array
    */
    addEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1].push(vertex2);
        this.adjacencyList[vertex2].push(vertex1);
    }

    /* REMOVE EDGE
        * This function should accept two vertices, we'll call them vertex1 and vertex2
        * The function should reassign the key of vertex1 to be an array that does not contain vertex2
        * The function should reassign the key of vertex2 to be an array that does not contain vertex1
    */
    removeEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1]?.filter(v => v !== vertex2);
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2]?.filter(v => v !== vertex1);
    }

    /* REMOVE VERTEX
        * The function should accept a vertex to remove
        * The function should loop as long as there are any other vertices in the adjacency list for that vertex
        * Inside of the loop, call our removeEdge function with the vertex we are removing
         and any values in the adjacency list for that vertex
        * delete the key in the adjacency list for that vertex
    */
    removeVertex(vertex) {
        while (this.adjacencyList[vertex].length) {
            const adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(adjacentVertex, vertex);
        }
        delete this.adjacencyList[vertex];
    }

    /* DEPTH-FIRST TRAVERSAL - RECURSIVE
        * The function should accept a starting node
        * Create a list to store the end result, to be returned at the very end
        * Create an object to store visited vertices
        * Create a helper function which accepts a vertex
            - The helper function should return early if the vertex is empty
            - The helper function should place the vertex it accepts into the visited object and push that vertex into the result array.
            - Loop over all of the values in the adjacencyList for that vertex
            - If any of those values have not been visited, recursively invoke the helper function with that vertex
        * Invoke the helper function with the starting vertex
        * Return the result array
    */
    depthFirstRecursive(start) {
        const result = [];
        const visited = {};
        const adjacencyList = this.adjacencyList;

        (function dfs(vertex) {
            if (!vertex) return null;
            visited[vertex] = true;
            result.push(vertex);
            adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    return dfs(neighbor);
                }
            })
        })(start)

        return result;
    }

    /* DEPTH-FIRST TRAVERSAL - ITERATIVE
        * The function should accept a starting node
        * Create a stack to help use keep track of vertices (use a list/array)
        * Create a list to store the end result, to be returned at the very end
        * Create an object to store visited vertices
        * Add the starting vertex to the stack, and mark it visited
        * While the stack has something in it:
            - Pop the next vertex from the stack
            - If that vertex hasn't been visited yet:
                * ​Mark it as visited
                * Add it to the result list
                * Push all of its neighbors into the stack
        * Return the result array
    */
    depthFirstIterative(start) {
        const stack = [start];
        const result = [];
        const visited = {};
        let currentVertex;
        
        visited[start] = true;
        while (stack.length) {
            currentVertex = stack.pop();
            result.push(currentVertex);

            this.adjacencyList[currentVertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    stack.push(neighbor);
                }
            })
        }
        return result;
    }

    /* BREADTH-FIRST TRAVERSAL
        * TThis function should accept a starting vertex
        * Create a queue (you can use an array) and place the starting vertex in it
        * Create an array to store the nodes visited
        * Create an object to store nodes visited
        * Mark the starting vertex as visited
        * Loop as long as there is anything in the queue
        * Remove the first vertex from the queue and push it into the array that stores nodes visited
        * Loop over each vertex in the adjacency list for the vertex you are visiting.
        * If it is not inside the object that stores nodes visited, mark it as visited and enqueue that vertex
        * Once you have finished looping, return the array of visited nodes
    */
    breadthFirst(start) {
        const queue = [start];
        const result = [];
        const visited = {};
        let currentVertex;

        visited[start] = true;
        while (queue.length) {
            currentVertex = queue.shift();
            result.push(currentVertex);

            this.adjacencyList[currentVertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            })
        }
        return result;
    }
}

const graph = new Graph();
// graph.addVertex('Amsterdam');
// graph.addVertex('Paris');
// graph.addVertex('London');
// graph.addVertex('Istanbul');
// graph.addVertex('Singapore');
// graph.addEdge('Paris', "Amsterdam");
// graph.addEdge('Paris', "London");
// graph.addEdge('Istanbul', "Amsterdam");
// graph.addEdge('Istanbul', "Paris");
// graph.addEdge('Istanbul', "Singapore");
// graph.addEdge('Singapore', "Amsterdam");
graph.addVertex("A")
graph.addVertex("B")
graph.addVertex("C")
graph.addVertex("D")
graph.addVertex("E")
graph.addVertex("F")

graph.addEdge("A","B")
graph.addEdge("A","C")
graph.addEdge("B","D")
graph.addEdge("C","E")
graph.addEdge("D","E")
graph.addEdge("D","F")
graph.addEdge("E","F")
console.log(graph.depthFirstRecursive("A"));
console.log(graph.depthFirstIterative("A"));
console.log(graph.breadthFirst("A"));
console.log(graph);
