// EASY

// You are given a string allowed consisting of distinct characters and an array of strings words. A string is consistent if all characters in the string appear in the string allowed.

// Return the number of consistent strings in the array words.

// Constraints:

// 1 <= words.length <= 104
// 1 <= allowed.length <= 26
// 1 <= words[i].length <= 10
// The characters in allowed are distinct.
// words[i] and allowed contain only lowercase English letters.

function countConsistentStrings(allowed: string, words: string[]): number {
    let count = 0;
    words.forEach((word) => {
        if (word.split('').filter((char) => !allowed.includes(char)).length == 0) {
            count += 1;
        }
    })
    
    return count;
};

describe("countConsistentStrings test", () => {
    test("case 3", () => {
        expect(countConsistentStrings("cad", ["cc","acd","b","ba","bac","bad","ac","d"])).toBe(4);
    });

    test("case 2", () => {
        expect(countConsistentStrings("abc", ["a","b","c","ab","ac","bc","abc"])).toBe(7);
    });

    test("case 1", () => {
        expect(countConsistentStrings("ab", ["ad", "bd", "aaab", "baa", "badab"])).toBe(2);
    });
});