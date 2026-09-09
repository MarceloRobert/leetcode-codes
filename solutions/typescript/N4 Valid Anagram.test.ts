/**
Valid Anagram
Easy

Given two strings s and t, return true if the two strings are anagrams of each other, otherwise return false.
Two strings are anagrams if they contain the same characters, with each character appearing the same number of times, regardless of order.

Example 1:
    Input: s = "racecar", t = "carrace"
    Output: true

Example 2:
    Input: s = "jar", t = "jam"
    Output: false

Example 3:
    Input: s = "x", t = "x"
    Output: true

Constraints:
    1 <= s.length, t.length <= 5 * 10^4
    s and t consist of lowercase English letters.
*/

// first idea: make a dict (map) of character c to number of times n for each word, if dicts are equal then true

// improvement: make a single dict and add or subtract number of times a character appears in each word, if all characters end in 0 then true

// "char cancelling": for each c in word1 w1, travel word2 w2 and remove the character c. If c cannot be found (w1 has more c than w2) or if final w2 is not empty (w2 has more c than w1), then false


// NOTES
// constraints don't say that both words *will* be the same length, so that could be checked first to avoid edge cases

class N4Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isAnagram(s: string, t: string): boolean {
        // quick length check since it wasn't on constraints
        if (s.length != t.length) {
            return false;
        }

        const charMap: Record<string, number> = {}; // what's the difference between Record and Map?
        for (const char of s) { // what's the difference between for..of and for..in?
            charMap[char] = (charMap[char] || 0) + 1;
        }
        for (const char of t) {
            charMap[char] -= 1;
            if (charMap[char] < 0) {
                // Early return if we already find that t has more characters than s
                return false;
            }
        }
        // Still has to check in case s had more characters than t
        for (const count of Object.values(charMap)) {
            if (count !== 0) {
                return false;
            }
        }

        return true;
    }
}


describe("N4 Valid Anagram", () => {
    test("Example 1", () => {
        const solution = new N4Solution();
        expect(solution.isAnagram("racecar", "carrace")).toBe(true);
    });

    test("Example 2", () => {
        const solution = new N4Solution();
        expect(solution.isAnagram("jar", "jam")).toBe(false);
    });

    test("Example 3", () => {
        const solution = new N4Solution();
        expect(solution.isAnagram("x", "x")).toBe(true);
    });
})