/*
  Ways of swapping elements:
    * ES5
      function swap(arr, idx1, idx2) {
        const temp = arr[idx1];
        arr[idx1] = arr[idx2];
        arr[idx2] = temp;
      }
    
    * ES2015
      const swap = (arr, idx1, idx2) => {
        [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
      }
*/

/*
  Logic:
    1. Compares an item to next one and checks if it's larger 
      -> if YES, swaps the places.
      -> if NO, makes the larger active and continues with it.
    2. Compares the largest to the next element and does the same thing.
    3. The larger element BUBBLES UP to the end.
  
  * Is good when the array is almost sorted.

  Pseudo code:
  1. Start looping from with a variable called i the end of the array towards the beginning
  2. Start an inner loop with a variable called j from the beginning until i - 1
  3. If arr[j] is greater than arr[j+1], swap those two values!
  4. Return the sorted array

  Big O:
    Time complexity:
      - Best - Nearly sorted: O(n)
      - Average: O(n^2)
      - Worst: O(n^2)
    Space complexity - O(1)
*/

function bubbleSort(arr) {
  let noSwaps; // To prevent iterations if the array is almost sorted
  for (let i = arr.length; i > 0; i--) {
    noSwaps = true;
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j+1]) {
        const temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
        noSwaps = false;
      }
    }
    if (noSwaps) break;
  }
  return arr;
}

console.log(bubbleSort([37, 45, 29, 8]))