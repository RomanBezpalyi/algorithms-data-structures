/*
    PRIORITY QUEUE
        * A data structure where each element has a priority.
        * Elements with higher priorities are served before elements with lower priorities.
        * Is just an abstract concept which is not boud to BH (BH is just a way of implementation)
*/

class Node {
  constructor(val, priority) {
    this.value = val;
    this.priority = priority;
  }
}

class PriorityQueue {// Based on MIN BINARY HEAP
  constructor() {
    this.values = [];
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];

      if (element.priority >= parent.priority) break;
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
        if (leftChild.priority < element.priority) {
          swapElementIdx = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swapElementIdx === null && rightChild.priority < element.priority) ||
          (swapElementIdx !== null && rightChild.priority < leftChild.priority)
        ) {
          swapElementIdx = rightChildIdx;
        }
      }

      if (swapElementIdx === null) break;
      this.values[idx] = this.values[swapElementIdx];
      this.values[swapElementIdx] = element;
      idx = swapElementIdx;
    }
  }

  enqueue(val, priority) {
    const newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }

  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
  }
}

const priorityQueue = new PriorityQueue();
priorityQueue.enqueue('cold', 5);
priorityQueue.enqueue('gunshot', 1);
priorityQueue.enqueue('high fever', 4);
priorityQueue.enqueue('broken arm', 2);
priorityQueue.enqueue('glass in foot', 3);
console.log(priorityQueue);
