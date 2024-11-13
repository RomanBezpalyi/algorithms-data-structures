/*
    DIJKSTRA'S ALGORITHM
        * One of the most famous and widely used algorithms around!
        * Finds the shortest path between two vertices on a graph
        * "What's the fastest way to get from point A to point B?"
    
    USES CASES:
        * GPS - finding fastest route
        * Network Routing - finds open shortest path for data
        * Biology - used to model the spread of viruses among humans
        * Airline tickets - finding cheapest route to your destination
        * Many other uses!
    
    THE APPROACH
        1. Every time we look to visit a new node, we pick the node
            with the smallest known distance to visit first.
        2. Once we’ve moved to the node we’re going to visit, we look at each of its neighbors
        3. For each neighboring node, we calculate the distance by summing
            the total edges that lead to the node we’re checking from the starting node.
        4. If the new total distance to a node is less than the previous total, we
            store the new shorter distance for that node.
        5. Store the reference to the vertex with the lowest value edge for each node (to have a chain
            -> to know a path from node A to node B)

    PSEUDO CODE
        * This function should accept a starting and ending vertex
        * Create an object (we'll call it distances) and set each key to be every vertex in the adjacency list
            with a value of infinity, except for the starting vertex which should have a value of 0.
        * After setting a value in the distances object, add each vertex with a priority of
            Infinity to the priority queue, except the starting vertex, which should have
            a priority of 0 because that's where we begin.
        * Create another object called previous and set each key to be every vertex
            in the adjacency list with a value of null
        * Start looping as long as there is anything in the priority queue
            - dequeue a vertex from the priority queue
            - If that vertex is the same as the ending vertex - we are done!
            - Otherwise loop through each value in the adjacency list at that vertex
                * Calculate the distance to that vertex from the starting vertex
                * if the distance is less than what is currently stored in our distances object
                    - update the distances object with new lower distance
                    - update the previous object to contain that vertex
                    - enqueue the vertex with the total distance from the start node
*/

class PriorityQueue {
    constructor(){
      this.values = [];
    }

    enqueue(val, priority) {
      this.values.push({val, priority});
      this.sort();
    }

    dequeue() {
      return this.values.shift();
    }

    sort() {
      this.values.sort((a, b) => a.priority - b.priority);
    }
}

class WeightedGraph {
    constructor() {
        this.adjacencyList = {};

    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1].push({ node: vertex2, weight });
        this.adjacencyList[vertex2].push({ node: vertex1, weight });
    }

    Dijkstra(start, finish) {
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};
        const path = [];
        let smallest;

        // build up initial state
        for (let vertex in this.adjacencyList) {
            if (vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            } else {
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);
            }
            previous[vertex] = null;
        }

        // as long as there is something to visit
        while (nodes.values.length) {
            smallest = nodes.dequeue().val;

            if (smallest === finish) {
                while (previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }
            if (smallest || distances[smallest] !== Infinity) {
                for (let neighbor in this.adjacencyList[smallest]) {
                    // find neighboring node
                    const nextNode = this.adjacencyList[smallest][neighbor];
                    // calculate new distance to neighboring node
                    const potentialSmallestDistance = distances[smallest] + nextNode.weight;
                    const nextNeighbor = nextNode.node;
                    if (potentialSmallestDistance < distances[nextNeighbor]) {
                        // updating new smallest distance to neighbor
                        distances[nextNeighbor] = potentialSmallestDistance;
                        // updating previos - how we got to neighbor
                        previous[nextNeighbor] = smallest;
                        // enqueue in priority queue with new priority
                        nodes.enqueue(nextNeighbor, potentialSmallestDistance);
                    }
                }
            }
        }

        return path.concat(smallest).reverse();
    }
}

const graph = new WeightedGraph();
graph.addVertex("A")
graph.addVertex("B")
graph.addVertex("C")
graph.addVertex("D")
graph.addVertex("E")
graph.addVertex("F")

graph.addEdge("A","B", 4)
graph.addEdge("A","C", 2)
graph.addEdge("B","E", 3)
graph.addEdge("C","D", 2)
graph.addEdge("C","F", 4)
graph.addEdge("D","E", 3)
graph.addEdge("D","F", 1)
graph.addEdge("E","F", 1)

console.log(graph.Dijkstra("A", "E"));
