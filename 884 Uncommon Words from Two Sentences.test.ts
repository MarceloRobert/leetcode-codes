// EASY

// A sentence is a string of single-space separated words where each word consists only of lowercase letters.

// A word is uncommon if it appears exactly once in one of the sentences, and does not appear in the other sentence.

// Given two sentences s1 and s2, return a list of all the uncommon words. You may return the answer in any order.

// Constraints:

// 1 <= s1.length, s2.length <= 200
// s1 and s2 consist of lowercase English letters and spaces.
// s1 and s2 do not have leading or trailing spaces.
// All the words in s1 and s2 are separated by a single space.

/// My solution works on simple sets, other solutions include:
//  - making a map for counting how many times a word appears on s1 U s2, whichever words appear only once are uncommon
//  - using a hash map to compare the word hashes

function uncommonFromSentences(s1: string, s2: string): string[] {
    let result: string[] = [];
    let firstList = new Set<string>();
    let secondList = new Set<string>();
    let repeated = new Set<string>();

    // makes a set for all words on s1 and remembers which are repeated
    s1.split(" ").forEach((word) => {
        if (firstList.has(word)) {
            repeated.add(word);
        } else {
            firstList.add(word);
        }
    });

    // makes a set for all words on s2 and remembers which are repeated
    s2.split(" ").forEach((word) => {
        if (secondList.has(word)) {
            repeated.add(word);
        } else {
            secondList.add(word);
        }
    });

    console.log(firstList);
    console.log(secondList);
    
    // checks which words are different starting at s1
    firstList.forEach((word) => {
        if (!secondList.has(word) && !repeated.has(word)) {
            result.push(word);
        } else if (secondList.has(word)) {
            secondList.delete(word);
        }
        firstList.delete(word);
    });
    // check remaining words on s2
    secondList.forEach((word) => {
        if (!firstList.has(word) && !repeated.has(word)) {
            result.push(word);
        }
    });

    console.log(repeated);
    console.log(result);

    return result;
};

describe("uncommonFromSentences test", () => {
    test("own 2", () => {
        expect(uncommonFromSentences("this is the", "this is different")).toEqual(["the", "different"]);
    });

    test("own 1", () => {
        expect(uncommonFromSentences("this is the", "this is the same")).toEqual(["same"]);
    });

    test("case 2", () => {
        expect(uncommonFromSentences("apple apple", "banana")).toEqual(["banana"]);
    });

    test("case 1", () => {
        expect(uncommonFromSentences("this apple is sweet", "this apple is sour")).toEqual(["sweet", "sour"]);
    });
});