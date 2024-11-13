/*
  * BUBBLE, SELECTION, INSERTION - 
    - The sorting algorithms we've learned so far don't scale well
    - Try out bubble sort on an array of 100000 elements, it will take quite some time!
    - We need to be able to sort large arrays more quickly

  * FASTER SORTS
    - There is a family of sorting algorithms that can improve time complexity from O(n) to O(n log n)
    - There's a tradeoff between efficiency and simplicity (harder to understand)
    - The more efficient algorithms are much less simple, and generally take longer to understand

  * MERGE SORT:
    - It's a combination of two (3) things - merging and sorting (and splitting up)!
    - Exploits the fact that arrays of 0 or 1 element are always sorted
    - Works by decomposing an array into smaller arrays of 0 or 1 elements, then building up a newly sorted array

  Logic:
    1. Splits up the array into smaller array until all the smaller arrays
      consist of 0 or 1 elements.
    2. Builds a new array from a smaller arrays but sorts the elements
      before the building.
    3. Repeats until all the arrays are build in one array.

  MERGING ARRAYS:
    - In order to implement merge sort, it's useful to first implement a function
      responsible for merging two sorted arrays
    - Given two arrays which are sorted, this helper function should create a new array
      which is also sorted, and consists of all of the elements in the two input arrays
    - This function should run in O(n + m) time and O(n + m) space and should not modify
      the parameters passed to it.

      MA Pseudo code:
      - Create an empty array, take a look at the smallest values in each input array
      - While there are still values we haven't looked at...
          * If the value in the first array is smaller than the value in the second array,
        push the value in the first array into our results and move on to the next value in the first array
          * If the value in the first array is larger than the value in the second array,
        push the value in the second array into our results and move on to the next value in the second array
          * Once we exhaust one array, push in all remaining values from the other array
*/

function merge(arr1, arr2) {
  const results = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr2[j] >= arr1[i]) {
      results.push(arr1[i]);
      i++;
    } else {
      results.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    results.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    results.push(arr2[j]);
    j++;
  }

  return results;
}

/*
  Pseudo code:
  1. Break up the array into halves until you have arrays that are empty or have one element
  2. Once you have smaller sorted arrays, merge those arrays with other sorted
    arrays until you are back at the full length of the array
  3. Once the array has been merged back together, return the merged (and sorted!) array

  Big O:
    Time complexity:
      - Best: O(n log n) - (n log n is the best what we can get for sorthing alg)
      - Average: O(n log n)
      - Worst: O(n log n)
    Space complexity - O(n)
*/

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));

  return merge(left, right);
}


console.log(merge([37, 45, 202],  [8, 17, 93, 1001]));
console.log(mergeSort([37, 45, 29, 8, 17, 192, 44, 11]))