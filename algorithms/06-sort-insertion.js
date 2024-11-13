/*
  Logic:
    1. Builds up the sort by gradually creating a
      larger left half of the array which is always sorted.
    2. Starts from the first element, checks the next element
      and INSERTS it in the right position. The left part of
      the array remains sorted.
      [5/, (3), 4, 1, 2] -> [3, 5/, (4), 1, 2]
      [3, 5/, (4), 1, 2] -> [3, 4, 5/, (1), 2]
    
  * Good for online algorithms - when new data keeps arriving

  Pseudo code:
  1. Start by picking the second element in the array
  2. Now compare the second element with the one before it and swap if necessary.
  3. Continue to the next element and if it is in the incorrect order,
    iterate through the sorted portion (i.e. the left side) to place the element in the correct place.
  4. Repeat until the array is sorted.

  Big O:
    Time complexity:
      - Best: O(n)
      - Average: O(n^2)
      - Worst: O(n^2)
    Space complexity - O(1)

  BUBBLE, INSERTION, SELECTION
    * Bubble sort, selection sort, and insertion sort are all roughly equivalent
    * All have average time complexities that are quadratic
    * Good for small amount of data
*/

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let currentVal = arr[i];
    let j;
    for (j = i - 1; j >= 0 && arr[j] > currentVal; j-- ) {
      arr[j+1] = arr[j]
    }
    arr[j+1] = currentVal;
  }
  return arr;
}

console.log(insertionSort([37, 45, 29, 8, 17]))