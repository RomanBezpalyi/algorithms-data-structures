function linearSearch (arr, val) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === val) return i;
    }
    return -1;
}

function binarySearch (arr, val) {
    let start = 0;
    let end = arr.length - 1;

    while (start < end) {
        const middle = Math.ceil((start + end) / 2);
        if (arr[middle] === val) {
            return middle;
        } else if (arr[middle] < val) {
            start = middle;
        } else if (arr[middle] > val) {
            end = middle;
        }
    }
    return -1;
}

function naiveSearch(long, short) {
    let count = 0;
    for (let i = 0; i < long.length; i++) {
        for (let j = 0; j < short.length; j++) {
            if (long[i+j] !== short[j]) break;
            if (j === short.length - 1) count++;
        }
    }
    return count;
}

function bubble (arr) {
    let noSwaps = true;

    for (let i = arr.length; i > 0; i--) {
        for (let j = 0; j < arr.length; j++) {
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

function selection(arr) {
    for (let i = 0; i < arr.length; i++) {
        let min = i;

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        if (i !== min) {
            const temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
    }
    return arr;
}

function insertion(arr) {
    for (let i = 1; i < arr.length; i++) {
        const currentVal = arr[i];
        let j;
        for (j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
            arr[j+1] = arr[j]
        }
        arr[j+1] = currentVal
    }
    return arr;
}

function merge(arr1, arr2) {
    const result = [];
    let i = 0;
    let j = 0;

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] <= arr2[j]) {
            result.push(arr1[i]);
            i++;
        } else {
            result.push(arr2[j]);
            j++;
        }
    }
    while (i < arr1.length) {
        result.push(arr1[i]);
        i++;
    }
    while (j < arr2.length) {
        result.push(arr2[j]);
        j++;
    }
    return result;
}

function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const middle = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, middle));
    const right = mergeSort(arr.slice(middle));
    return merge(left, right);
}

function pivot (arr, start = 0, end = arr.length - 1) {
    const pivot = arr[start];
    let swapIndex = start;

    for (let i = start + 1; i <= end; i++) {
        if (pivot > arr[i]) {
            swapIndex++;
            const temp = arr[i];
            arr[i] = arr[swapIndex];
            arr[swapIndex] = temp;
        }
    }
    arr[start] = arr[swapIndex];
    arr[swapIndex] = pivot;
    return swapIndex;
}

function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        const pivotIndex = pivot(arr, left, right);
        quickSort(arr, left, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, right);
    }
    return arr;
}

function radixSort(nums) {
    const maxDigits = mostDigits(nums);

    for (let k = 0; k < maxDigits; k++) {
        const buckets = Array.from({length: 10}, () => []);

        for (let i = 0; i < nums.length; i++) {
            const lastDigit = getDigit(nums[i], k);
            buckets[lastDigit].push(nums[i]);
        }
        nums = [].concat(...buckets);
    }
    return nums;
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
