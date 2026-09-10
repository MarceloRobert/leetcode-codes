/**
Two Sum
Easy

Given an array of integers nums and an integer target, return the indices i and j such that nums[i] + nums[j] == target and i != j.
You may assume that every input has exactly one pair of indices i and j that satisfy the condition.
Return the answer with the smaller index first.

Example 1:
    Input: nums = [3,4,5,6], target = 7
    Output: [0,1]
    Explanation: nums[0] + nums[1] == 7, so we return [0, 1].

Example 2:
    Input: nums = [4,5,6], target = 10
    Output: [0,2]

Example 3:
    Input: nums = [5,5], target = 10
    Output: [0,1]

Constraints:
    2 <= nums.length <= 1000
    -10,000,000 <= nums[i] <= 10,000,000
    -10,000,000 <= target <= 10,000,000
    Only one valid answer exists.
*/

// initial though: for each n, check the sum from n to all other nums, comparing with the target. If equal, return indices. O max = n*log(n)


class N5Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    twoSum(nums: number[], target: number): number[] {
        for (let i = 0; i<nums.length; i++) {
            for (let j = i+1; j<nums.length; j++) {
                if (nums[i] + nums[j] === target) {
                    return [i, j];
                } 
            }
        }
        throw Error("No solution found");
    }
}


describe('N5. Two Sum', () => {
    test('Example 1', () => {
        const solution = new N5Solution();
        expect(solution.twoSum([3, 4, 5, 6], 7)).toEqual([0, 1]);
    });

    test('Example 2', () => {
        const solution = new N5Solution();
        expect(solution.twoSum([4, 5, 6], 10)).toEqual([0, 2]);
    });

    test('Example 3', () => {
        const solution = new N5Solution();
        expect(solution.twoSum([5, 5], 10)).toEqual([0, 1]);
    });
});


/**
 * Another possibility is to use the concept of "complement".
 * Calculate - on the go - an array of the complement of n[i]. The complement of n[i] is "which element do I need to get from n[i] to target",
 * in other words, it is target - n[i]. This comes from the equation n[i] + n[j] = t, which means n[i] = t - n[j].
 * We can then, for each n[i], store complement[(n[i], i)] = t-n[i]; as we traverse n, check if complements contain n[i],
 * if so, the pair (n[i], complement[n[i]]) is the answer. Remember that we are traversing n *only once*, so after complement[n[i]] = i,
 * the later _i_ will be different from the one set in the complement map.
t = 7
n = 3, 4, 5, 6
c = 4, 3, 2, 1 // t-n
complement = {(4, 0), (3, 1), (2, 2), (1, 3)} // Map (n, i)
*/
