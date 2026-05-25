/**
1871. Jump Game VII
Medium

You are given a 0-indexed binary string s and two integers minJump and maxJump. In the beginning, you are standing at index 0, which is equal to '0'. You can move from index i to index j if the following conditions are fulfilled:

    i + minJump <= j <= min(i + maxJump, s.length - 1), and
    s[j] == '0'.

Return true if you can reach index s.length - 1 in s, or false otherwise.

 

Example 1:

Input: s = "011010", minJump = 2, maxJump = 3
Output: true
Explanation:
In the first step, move from index 0 to index 3. 
In the second step, move from index 3 to index 5.

Example 2:

Input: s = "01101110", minJump = 2, maxJump = 3
Output: false

 

Constraints:

    2 <= s.length <= 105
    s[i] is either '0' or '1'.
    s[0] == '0'
    1 <= minJump <= maxJump < s.length


 */


// names:
// s: binary string
// minJump: number
// maxJump: number
// i, j: indexes

// conditions:
// i + minJump <= j -- target index can't be less than minJump
// j <= i + maxJump OR j <= s.length - 1 -- can't jump more than maxJump nor jump outside of string
// s[j] == '0' -- each target step must land on a 0
// No limit of number of steps

function canReach(s: string, minJump: number, maxJump: number): boolean {
    // Return true if you can reach index s.length - 1 in s, or false otherwise.

    // thought process:
    // options:
    // - exhaustive approach: open the possibilities recursively until reaching last char
    // - backtrack approach: go from j to i
    // - other
    // doesn't matter how many steps to use, which means that it doesn't matter how I reach any position, just matters if I *can* reach that position
    // after that, what matters is if that position is useful or not

    // store the list of visited positions
    // store list of open positions, ones that still have paths
    // store list of closed positions, ones that were tested but lead nowhere
    // go over step by step, checking the step range for which positions are definitely closed (for being a 1); out of the open positions, do the same; repeat until final position is found.
    // in each step, check the range from the furthest position

    
    const openPositions: number[] = [0];
    const closedPositions: number[] = [];
    const targetPosition: number = s.length - 1;
    let currentPosition: number = 0;
    while (!openPositions.includes(targetPosition)) {
        // if no more open positions, can't arrive at destiny
        if (openPositions.length == 0) {
            return false;
        }

        // pop furthest position for checking
        currentPosition = openPositions.pop()!;

        // check in the next step range which positions are open and add them to the list
        for (let i = currentPosition + minJump; i <= s.length - 1 && i <= currentPosition + maxJump; i++) {
            const char: string = s[i];
            if (char === '0') {
                // only add to new open position if it isn't already present, nad if we haven't analyzed it before (closed)
                if (!openPositions.includes(i) && !closedPositions.includes(i)) {
                    openPositions.push(i);
                }
            } else {
                closedPositions.push(i);
            }
        }
    }
    return true;
};

describe("jumpGameVII test", () => {
    test("example 1", () => {
        expect(canReach("011010", 2, 3)).toBe(true);
    });

    test("example 2", () => {
        expect(canReach("01101110", 2, 3)).toBe(false);
    });
});

// Result: time exceeded.