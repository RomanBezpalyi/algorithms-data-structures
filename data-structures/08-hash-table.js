/*
    HASH TABLE (HASH MAP)
        * Hash tables are used to store KEY-VALUE pairs.
        * They are like arrays, but the keys are not ordered.
        * Unlike arrays, hash tables are FAST for all of the following operations:
            finding values, adding new values, and removing values!
        * Nearly every programming language has some sort of hash table data structure
            (Python - dictionaries, JS - objects and maps (objects have some restrictions but still are HT),
            Java, Go, Scala - maps, Ruby - hashes)
        * Because of their speed, hash tables are very commonly used!
        * KEYS don't have to be a string
    
    IMPLEMENTATION
        * To implement a hash table, we'll be using an array.
        * In order to look up values by key, we need a way to convert keys into valid array indices.
        * A function that performs this task is called a HASH FUNCTION.
    
    HASH FUNCTION
        * Should accept an input of ANY size and return the output of FIXED size
        * Should be:
            - Fast (i.e. constant time (not loops))
            - Doesn't cluster outputs at specific indices, but distributes uniformly (distributes the values between 0 and arr.length-1)
            - Deterministic (same input yields same output)

    BIG O (average case):
        * Insertion - O(1)
        * Removal - O(1);
        * Access - O(1)
        * Speed depend on how good is hash func ((it can put elements in one index -> long loops) - it should distribute elements evenly)
        * Searching - O(n) - worst case (^p.4)
        

*/

// function hash(key, arrLength) {
//     let total = 0;
//     for (let char of key) {
//         let value = char.charCodeAt(0) - 96;
//         total = (total + value) % arrLength;
//     }
//     return total;
// }

/* ^ PROBLEMS OF THIS HF:
    * Only hashes strings (we won't worry about this)
    * Not constant time - linear in key length
    * Could be a little more random
*/

function hash(key, arrLength) {
    let total = 0;
    const PRIME_NUMBER = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
        const char = key[i];
        const value = char.charCodeAt(0) - 96;
        total = (total * PRIME_NUMBER + value) % arrLength;
    }
    return total;
}

/* ^ IMPROVED HF:
        * Optimized loop (for long keys will iterate no more than 100 times)
        * Added prime number to reduce collisions (same result for different keys) (also helps if arrLength is prime number)

    DEALING WITH COLLISIONS
        * Even with a large array and a great hash function, collisions are inevitable. 
        * There are many strategies for dealing with collisions, but we'll focus on two:
            1. Separate Chaining
            2. Linear Probing
    
    SEPARATE CHANING
        * With separate chaining, at each index in our array we store values using
            a more sophisticated data structure (e.g. an array or a linked list).
        * This allows us to store multiple key-value pairs at the same index.

    LINEAR PROBING
        * With linear probing, when we find a collision, we search through the array to find the next empty slot.
        * Unlike with separate chaining, this allows us to store a single key-value at each index.
*/

class HashTable {
    constructor(size = 53) { // default prime number
        this.keyMap = new Array(size);
    }

    _hash(key) {
        let total = 0;
        const PRIME_NUMBER = 31;
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            const char = key[i];
            const value = char.charCodeAt(0) - 96;
            total = (total * PRIME_NUMBER + value) % this.keyMap.length;
        }
        return total;
    }

    /* SET
        * Accepts a key and a value
        * Hashes the key
        * Stores the key-value pair in the hash table array via separate chaining
    */
    set(key, val) {
        const idx = this._hash(key);
        if (!this.keyMap[idx]) {
            this.keyMap[idx] = [];
        }
        this.keyMap[idx].push([key, val]);
    }

    /* GET
        * Accepts a key
        * Hashes the key
        * Retrieves the key-value pair in the hash table
        * If the key isn't found, returns undefined
    */
    get(key) {
        const idx = this._hash(key);
        if (this.keyMap[idx]) {
            for (let i = 0; i < this.keyMap[idx].length; i++) {
                if (this.keyMap[idx][i][0] === key) {
                    return this.keyMap[idx][i][1];
                }
            }
        }
        return undefined;
    }

    /* KEYS
        * Loops through the hash table array and returns an array of keys in the table
    */
    keys() {
        const keys = [];

        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    if (!keys.includes(this.keyMap[i][j][0])) {
                        keys.push(this.keyMap[i][j][0]);
                    }
                }
            }
        }
        return keys;
    }

    /* VALUES
        * Loops through the hash table array and returns an array of values in the table
    */
    values() {
        const values = [];

        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    if (!values.includes(this.keyMap[i][j][1])) {
                        values.push(this.keyMap[i][j][1]);
                    }
                }
            }
        }
        return values;
    }
}

const ht = new HashTable(17);
ht.set('maroon', '#FF5733');
ht.set('yellow', '#FFFF00');
ht.set('lightcoral', '#f08080');
ht.set('olive', '#9dae11');
ht.set('salmon', '#FA8072');
ht.set('mediumvioletred', '#C71585');
ht.set('plum', '#DDA0DD');
ht.set('purple', '#DDA0DD');
console.log(ht.keys());
console.log(ht.values());
console.log(ht);

