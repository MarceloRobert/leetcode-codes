// MEDIUM

// You have observations of n + m 6-sided dice rolls with each face numbered from 1 to 6. n of the observations went missing, and you only have the observations of m rolls. Fortunately, you have also calculated the average value of the n + m rolls.

// You are given an integer array rolls of length m where rolls[i] is the value of the ith observation. You are also given the two integers mean and n.

// Return an array of length n containing the missing observations such that the average value of the n + m rolls is exactly mean. If there are multiple valid answers, return any of them. If no such array exists, return an empty array.

// The average value of a set of k numbers is the sum of the numbers divided by k.

// Note that mean is an integer, so the sum of the n + m rolls should be divisible by n + m.


/// example solution
// 3 + 2 + 4 + 3 + x + y / 6 = 4
// 12 + s / 6 = 4
// 12 + s = 24
// s = 12
// x + y = 12


function missingRolls(rolls: number[], mean: number, n: number): number[] {
    let msum = rolls.reduce((previous, current) => previous+current);
    let divisor = rolls.length + n;
    let expectedResult = mean * divisor;
    let nsum = expectedResult - msum;

    let result:number[] = [];

    let rest = nsum%n;
    let piece = Math.floor(nsum/n);
    console.log(nsum + " and " + n + " turns " + rest);
    console.log(piece + " by piece");
    // needs to roll higher than 6 or less than 1
    if (piece > 6 || piece == 0) {
        return [];
    }

    // needs extra rolls
    if (piece == 6 && rest != 0) {
        return [];
    }

    while (nsum > 0) {
        // console.log("nsum is " + nsum);
        if (rest > 0) {
            result.push(piece + 1);
            nsum -= piece+1;
            rest -= 1;
        } else {
            result.push(piece);
            nsum -= piece;
        }
    }
    
    console.log("result is " + result);
    return result;
};

describe("missing rolls test", () => {
    test("sub 2", () => {
        expect(missingRolls([4,2,2,5,4,5,4,5,3,3,6,1,2,4,2,1,6,5,4,2,3,4,2,3,3,5,4,1,4,4,5,3,6,1,5,2,3,3,6,1,6,4,1,3], 2, 53)).toEqual([]);
    });

    test("sub 1", () => {
        expect(missingRolls([4,5,6,2,3,6,5,4,6,4,5,1,6,3,1,4,5,5,3,2,3,5,3,2,1,5,4,3,5,1,5], 4, 40)).toEqual([5,5,5,5,5,5,5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]);
    });

    test("case 1", () => {
        expect(missingRolls([3, 2, 4, 3], 4, 2)).toEqual([6, 6]);
    });

    test("case 2", () => {
        expect(missingRolls([1, 5, 6], 3, 4)).toEqual([3, 2, 2, 2]);
    });

    test("case 3", () => {
        expect(missingRolls([1, 2, 3, 4], 6, 4)).toEqual([]);
    });
})