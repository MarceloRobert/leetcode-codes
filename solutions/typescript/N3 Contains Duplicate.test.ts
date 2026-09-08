/**
Contains Duplicate
Easy

Given an integer array nums, return true if any value appears more than once in the array, otherwise return false.

Example 1:
Input: nums = [1, 2, 3, 3]
Output: true


Example 2:
Input: nums = [1, 2, 3, 4]
Output: false

Constraints:
    0 <= nums.length <= 10^5
    -10^9 <= nums[i] <= 10^9
*/

// (NOT) brute force: get the number, add in an array/set of unique numbers. For each number n, traverse set S and check if n in S.
// One run through array, another through set. Worst case: traverse index i -1 for each n_i, n^log(n)

// direct array access: create an empty array B (filled with false) with the same size as input array A, for each number n mark B[n] as true.
//  For each n, access B[n], check boolean, return result.
// One run through A, one access per n. Worse case, last is repeated, 2*n
// Drawback: allocating memory for B with the same size as A
// WOULDN'T WORK, eg. B derived from array [1, 4] would not have access to B[4]
// workaround: make B the size of the limit (10^9 *2 for the negatives, with mapping overhead)

// hashed array access: map elements n to a dynamic array, keep them in order, when checking for n in B perform a binary search.
//  Would have overhead, maybe unnecessary

// the real brute force would be to get n and sweep A to check if n repeats, THEN it would be n checks for each n, so then it would be n^n

class N3Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    hasDuplicate(nums: number[]): boolean {
        const checked = new Set();
        for (const n of nums) {
            if (checked.has(n)) {
                return true;
            }
            checked.add(n);
        }
        return false;
    }
}


describe('N3. Contains Duplicate', () => {
    test('Example 1', () => {
        const solution = new N3Solution();
        expect(solution.hasDuplicate([1, 2, 3, 3])).toBe(true);
    });

    test('Example 2', () => {
        const solution = new N3Solution();
        expect(solution.hasDuplicate([1, 2, 3, 4])).toBe(false);
    });
});
