function linearSearch (arr, val) {
}

function binarySearch (arr, val) {
}

function naiveSearch(long, short) {
}

function bubble (arr) {
}

function selection(arr) {
}

function insertion(arr) {
}

function merge(arr1, arr2) {
}

function mergeSort(arr) {
}

function pivot (arr, start = 0, end = arr.length - 1) {
}

function quickSort(arr, left = 0, right = arr.length - 1) {
}

function getDigit(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(nums) {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]));
  }
  return maxDigits;
}

function radixSort(nums) {
}

console.log(linearSearch([2, 1, 4, 5, 3, 2], 3)); // 4
console.log(linearSearch([2, 1, 4, 5, 3, 2], 2)); // 0
console.log(linearSearch([2, 1, 4, 5, 3, 2], 8)); // -1

console.log(binarySearch([1,2,3,4,5],2)) // 1
console.log(binarySearch([1,2,3,4,5],3)) // 2
console.log(binarySearch([1,2,3,4,5],5)) // 4
console.log(binarySearch([1,2,3,4,5],6)) // -1

console.log(naiveSearch('lorie loled', 'lol'));
console.log(naiveSearch('lorie loled', 'lo'));

console.log(bubble([37, 45, 29, 8]))
console.log(selection([37, 45, 29, 8, 17]))
console.log(insertion([37, 45, 29, 8, 17, 5]))

console.log(merge([37, 45, 202],  [8, 17, 93, 1001]));
console.log(mergeSort([37, 45, 29, 8, 17, 192, 44, 11]))

console.log(pivot([37, 6, 45, 202, 8, 17, 93, 1001]));
console.log(quickSort([37, 45, 29, 8, 17, 192, 484, 11, 47, 33, 923, 95]))

console.log(radixSort([37, 45, 29, 432, 476567, 8, 17, 192, 44, 11, 535434, 6653]))
