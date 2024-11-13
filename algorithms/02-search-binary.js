/*
  1. Is much faster version of search.
  2. Rather than eliminating one element at a time, you can
    eliminate half of the ramining elements at a time.
  3. Only works on sorted arrays.
  3. Big O: 
      - O(1) - best case
      - O(log n) - average case
      - O(log n) - worst case
*/

function binarySearch(arr, val) {
  let start = 0; // 0 => 2 => 3
  let end = arr.length - 1;

  while (start < end) {
    const middle = Math.ceil((start + end) / 2); // 2 => 3 => 4

    if (arr[middle] === val) {
      return middle;
    } else if (arr[middle] > val) {
      end = middle;
    } else if (arr[middle] < val) {
      start = middle
    }
  }

  return -1
};

console.log(binarySearch([1,2,3,4,5],2)) // 1
console.log(binarySearch([1,2,3,4,5],3)) // 2
console.log(binarySearch([1,2,3,4,5],5)) // 4
console.log(binarySearch([1,2,3,4,5],6)) // -1