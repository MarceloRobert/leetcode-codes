// EASY - 476 Number Complement

// The complement of an integer is the integer you get when you flip all the 0's to 1's and all the 1's to 0's in its binary representation.

// For example, The integer 5 is "101" in binary and its complement is "010" which is the integer 2.
// Given an integer num, return its complement.

/// with the help of windows copilot 😉

function findComplement(num: number): number {
    return parseInt(((num.toString(2).split('').map(Number)).map((bnum) => Number(!bnum))).join(''), 2);
};

describe("complement test", () => {
    test("Case 1", () => {
        expect(findComplement(5)).toBe(2);
    })

    test("Case 2", () => {
        expect(findComplement(1)).toBe(0);
    })
})