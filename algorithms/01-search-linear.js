/*
  1. Goes through array 1 by 1 and checks if the element matches the needed value.
  2. In-built Linear search methods: indexOf, includes, find, findIndex.
  3. Big O: 
      - O(1) - best case
      - O(n) - average case
      - O(n) - worst case
*/

function linearSearch(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) return i;
  }
  return -1;
};

const arr = [2, 1, 4, 5, 3, 2];

console.log(linearSearch(arr, 3));
console.log(linearSearch(arr, 2));
console.log(linearSearch(arr, 8));
