/*
  * RADIX SORT:
    - Radix sort is a special sorting algorithm that works on lists of numbers
    - It never makes comparisons between elements!
    - It exploits the fact that information about the size of a number is encoded in the number of digits.  
    - More digits means a bigger number!

  Logic:
    1. Creats 10 buckets (from 0 to 9).
    2. Loops through the array, checks the last digit of the element and put it in the corresponding
    bucket (33 -> to 3, 934 -> to 4)
    3. Build the sorted elements into one array keeping the sorted bucket position.
    4. Loops through again and checks the next digit to the left. Sorts the digits to the buckets again.
    5. Repeats p.3.
    6. Moves to the next digit (3rd) and sorts again (the number of iteration depends on the length of 'longest' number)

  RADIX SORT HELPERS:
    - In order to implement radix sort, it's helpful to build a few helper functions first:
      * getDigit(num, place) - returns the digit in num at the given place value
          getDigit(12345, 0); // 5
          getDigit(12345, 1); // 4
          getDigit(12345, 2); // 3
          getDigit(12345, 3); // 2
      * digitCount(num) - returns the number of digits in num
          digitCount(1); // 1
          digitCount(25); // 2
          digitCount(314); // 3
      * mostDigits(nums) - Given an array of numbers, returns the number of digits in the largest numbers in the list
          mostDigits([1234, 56, 7]); // 4
          mostDigits([1, 1, 11111, 1]); // 5
          mostDigits([12, 34, 56, 78]); // 2
*/

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

/*
  Pseudo code:
  1. Define a function that accepts list of numbers
  2. Figure out how many digits the largest number has
  3. Loop from k = 0 up to this largest number of digits
  4. For each iteration of the loop:
      * Create buckets for each digit (0 to 9)
      * place each number in the corresponding bucket based on its kth digit
  5. Replace our existing array with values in our buckets, starting with 0 and going up to 9
  6. return list at the end!

  Big O:
    Time complexity:
      - Best: O(nk) / n - length of array, k - number of digit (average)
      - Average: O(nk)
      - Worst: O(nk)
    Space complexity - O(n + k)
    * Seems to be faster than (n log n) algs but there's a tricky thing - how computers stores digits in the memory
     -> has a tie with other (comparison) algs
*/

function radixSort(nums) {
  const maxDigitsCoun = mostDigits(nums);

  for (let k = 0; k < maxDigitsCoun; k++) {
    const digitBuckets = Array.from({ length: 10 }, () => []);

    for (let i = 0; i < nums.length; i++) {
      const digit = getDigit(nums[i], k);
      digitBuckets[digit].push(nums[i]);
    }
    nums = [].concat(...digitBuckets)
  }
  return nums;
}

console.log(radixSort([37, 45, 29, 432, 476567, 8, 17, 192, 44, 11, 535434, 6653]))