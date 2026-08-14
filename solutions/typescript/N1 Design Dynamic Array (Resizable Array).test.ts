/**
Design Dynamic Array (Resizable Array)
Easy

Design a Dynamic Array (aka a resizable array) class, such as an ArrayList in Java or a vector in C++.

Your DynamicArray class should support the following operations:
    - DynamicArray(int capacity) will initialize an empty array with a capacity of capacity, where capacity > 0.
    - int get(int i) will return the element at index i. Assume that index i is valid.
    - void set(int i, int n) will set the element at index i to n. Assume that index i is valid.
    - void pushback(int n) will push the element n to the end of the array.
    - int popback() will pop and return the element at the end of the array. Assume that the array is non-empty.
    - void resize() will double the capacity of the array.
    - int getSize() will return the number of elements in the array.
    - int getCapacity() will return the capacity of the array.

*If we call pushback(int n) but the array is full, we should resize() the array first.*

Example 1:
    Input:
    ["Array", 1, "getSize", "getCapacity"]
    Output:
    [null, 0, 1]

Example 2:
    Input:
    ["Array", 1, "pushback", 1, "getCapacity", "pushback", 2, "getCapacity"]
    Output:
    [null, null, 1, null, 2]

Example 3:
    Input:
    ["Array", 1, "getSize", "getCapacity", "pushback", 1, "getSize", "getCapacity", "pushback", 2, "getSize", "getCapacity", "get", 1, "set", 1, 3, "get", 1, "popback", "getSize", "getCapacity"]
    Output:
    [null, 0, 1, null, 1, 1, null, 2, 2, 2, null, 3, 3, 1, 2]

Note:
The index i provided to get(int i) and set(int i) is guaranteed to be greater than or equal to 0 and less than the number of elements in the array.
*/

class DynamicArray {
    private storage: (number | undefined)[];
    private capacity: number;

    /**
     * @constructor
     * @param {number} capacity
     */
    constructor(capacity: number) {
        if (capacity <= 0) {
            throw new Error('Capacity must be greater than 0');
        }

        this.capacity = capacity;
        this.storage = new Array(capacity);
    }

    /**
     * @param {number} i
     * @returns {number}
     */
    get(i: number): number {
        if (i < 0 || i >= this.getSize()) {
            throw new Error('Index out of bounds');
        }
        return this.storage[i]!; // if I is within size, it will always be a number
    }

    /**
     * @param {number} i
     * @param {number} n
     * @returns {void}
     */
    set(i: number, n: number): void {
        // During tests, i will always be within the capacity
        this.storage[i] = n;
    }

    /**
     * @param {number} n
     * @returns {void}
     */
    pushback(n: number): void {
        // adds an element to the end of the array, if array is full, resize() the array first
        if (this.getSize() === this.capacity) {
            this.resize();
        }

        this.storage[this.getSize()] = n;
    }

    /**
     * @returns {number}
     */
    popback(): number {
        const lastIndex = this.getSize() - 1;

        if (lastIndex < 0) {
            throw new Error('Array is empty');
        }

        const popped = this.storage[lastIndex];
        this.storage[lastIndex] = undefined;

        return popped!; // if lastIndex is within size, it will always be a number
    }

    /**
     * @returns {void}
     */
    resize(): void {
        // doubles the capacity of the array
        const newCapacity = this.capacity * 2;
        const newStorage = new Array(newCapacity);

        for (let i = 0; i < this.getSize(); i++) {
            newStorage[i] = this.storage[i];
        }

        this.storage = newStorage;
        this.capacity = newCapacity;
    }

    /**
     * @returns {number}
     */
    getSize(): number {
        // The size is the number of elements in the array, not the capacity
        let count = 0;
        for (const value of this.storage) {
            if (value !== undefined) {
                count += 1;
            }
        };

        return count;
    }

    /**
     * @returns {number}
     */
    getCapacity(): number {
        return this.capacity;
    }
}

describe('N1. Design Dynamic Array (Resizable Array)', () => {
    test('Example 1', () => {
        const array = new DynamicArray(1); // []
        expect(array.getSize()).toEqual(0);
        expect(array.getCapacity()).toEqual(1);
    });

    test('Example 2', () => {
        const array = new DynamicArray(1); // []
        array.pushback(1); // [1]
        expect(array.getCapacity()).toEqual(1);
        array.pushback(2); // [1, 2]
        expect(array.getCapacity()).toEqual(2);
    });

    test('Example 3', () => {
        const array = new DynamicArray(1); // [-]
        expect(array.getSize()).toEqual(0);
        expect(array.getCapacity()).toEqual(1);
        array.pushback(1); // [1]
        expect(array.getSize()).toEqual(1);
        expect(array.getCapacity()).toEqual(1);
        array.pushback(2); // resize, [1, 2]
        expect(array.getSize()).toEqual(2);
        expect(array.getCapacity()).toEqual(2);
        expect(array.get(1)).toEqual(2);
        array.set(1, 3); // [1, 3]
        expect(array.get(1)).toEqual(3);
        expect(array.popback()).toEqual(3); // [1, -]
        expect(array.getSize()).toEqual(1);
        expect(array.getCapacity()).toEqual(2);
    });
});
