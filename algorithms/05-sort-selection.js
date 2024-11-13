/*
  Logic:
    1. Similar to Bubble Sort, but instead of first placing of
      large values into sorted position, it places small values
      into sorted position.
    2. Starts from the beginning of array, goes through the all
      array and SELECTS the minimum value.
    3. When finishes the loop, swaps the minimal element with the i-element
      of the array.
    4. Continues the algorithm with i+1 element.
    5. Is not very good. The advantage - only swaps elements once at the
      end of the loop. Good if the memory is an issue.

  Pseudo code:
  1. Store the first element as the smallest value you've seen so far.
  2. Compare this item to the next item in the array until you find a smaller number.
  3. If a smaller number is found, designate that smaller number to be the new "minimum" 
    and continue until the end of the array.
  4. If the "minimum" is not the value (index) you initially began with, swap the two values.
  5. Repeat this with the next element until the array is sorted.

  Big O:
    Time complexity:
      - Best: O(n^2)
      - Average: O(n^2)
      - Worst: O(n^2)
    Space complexity - O(1)
*/

function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    if(i !== min) {
      const temp = arr[i];
      arr[i] = arr[min];
      arr[min] = temp;
    }
  }
  return arr;
}

console.log(selectionSort([37, 45, 29, 8, 17]))