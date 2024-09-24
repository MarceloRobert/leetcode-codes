// MEDIUM

// You are given two arrays with positive integers arr1 and arr2.

// A prefix of a positive integer is an integer formed by one or more of its digits, starting from its leftmost digit. For example, 123 is a prefix of the integer 12345, while 234 is not.

// A common prefix of two integers a and b is an integer c, such that c is a prefix of both a and b. For example, 5655359 and 56554 have a common prefix 565 while 1223 and 43456 do not have a common prefix.

// You need to find the length of the longest common prefix between all pairs of integers (x, y) such that x belongs to arr1 and y belongs to arr2.

// Return the length of the longest common prefix among all pairs. If no common prefix exists among them, return 0.

// Constraints:

// 1 <= arr1.length, arr2.length <= 5 * 10^4
// 1 <= arr1[i], arr2[i] <= 10^8

/// set theory problem
// find the common prefixes betwee a and b, store their largest length

// function that calculates the largest prefix of a given pair of strings
// function longestPrefixPairLength(a: string, b: string): number {
//     let longestPrefix = 0;
//     let firstSet = new Set<string>();
//     let secondSet = new Set<string>();
    
//     // populate first set with all possible prefixes of a
//     for (let i = 1; i <= a.length; i++) {
//         firstSet.add(a.substring(0, i));
//     }

//     // populate second set with all possible prefixes of b
//     for (let i = 1; i <= b.length; i++) {
//         secondSet.add(b.substring(0, i));
//     }

//     // get the common prefixes and stores the max length
//     firstSet.forEach(prefix => {
//         if (secondSet.has(prefix)) {
//             longestPrefix = Math.max(longestPrefix, prefix.length);
//         }
//     });

//     return longestPrefix;
// }

// this functions finds the largest prefix between two arrays
function longestCommonPrefix(arr1: number[], arr2: number[]): number {
    const str1 = arr1.map(String);
    const str2 = arr2.map(String);
    
    let fullFirstSet = new Set<string>();
    let fullSecondSet = new Set<string>();
    let prefix = "";

    let highestLenght = 0;
    
    for (let i = 0; i < str1.length; i++) {
        for (let j = 1; j <= str1[i].length; j++) {
            prefix = str1[i].substring(0, j);
            if (!fullFirstSet.has(prefix)) {
                fullFirstSet.add(prefix);
            }
        }
    }

    for (let i = 0; i < str2.length; i++) {
        for (let j = 1; j <= str2[i].length; j++) {
            prefix = str2[i].substring(0, j);
            if (!fullSecondSet.has(prefix)) {
                fullSecondSet.add(prefix);
            }
        }
    }
    
    fullFirstSet.forEach(prefix => {
        if (fullSecondSet.has(prefix)) {
            highestLenght = Math.max(highestLenght, prefix.length);
        }
    });

    return highestLenght;
};

describe("longestCommonPrefix test", () => {
    test("case 2", () => {
        expect(longestCommonPrefix([1, 2, 3], [4, 4, 4])).toBe(0);
    });

    test("case 1", () => {
        expect(longestCommonPrefix([1, 10, 100], [1000])).toBe(3);
    });
});