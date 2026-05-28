/**
3093. Longest Common Suffix Queries
Hard

You are given two arrays of strings wordsContainer and wordsQuery.
For each wordsQuery[i], you need to find a string from wordsContainer that has the longest common suffix with wordsQuery[i]. If there are two or more strings in wordsContainer that share the longest common suffix, find the string that is the smallest in length. If there are two or more such strings that have the same smallest length, find the one that occurred earlier in wordsContainer.
Return an array of integers ans, where ans[i] is the index of the string in wordsContainer that has the longest common suffix with wordsQuery[i].


Example 1:
    Input: wordsContainer = ["abcd","bcd","xbcd"], wordsQuery = ["cd","bcd","xyz"]
    Output: [1,1,1]
    Explanation:
    Let's look at each wordsQuery[i] separately:
        For wordsQuery[0] = "cd", strings from wordsContainer that share the longest common suffix "cd" are at indices 0, 1, and 2. Among these, the answer is the string at index 1 because it has the shortest length of 3.
        For wordsQuery[1] = "bcd", strings from wordsContainer that share the longest common suffix "bcd" are at indices 0, 1, and 2. Among these, the answer is the string at index 1 because it has the shortest length of 3.
        For wordsQuery[2] = "xyz", there is no string from wordsContainer that shares a common suffix. Hence the longest common suffix is "", that is shared with strings at index 0, 1, and 2. Among these, the answer is the string at index 1 because it has the shortest length of 3.

Example 2:
    Input: wordsContainer = ["abcdefgh","poiuygh","ghghgh"], wordsQuery = ["gh","acbfgh","acbfegh"]
    Output: [2,0,2]
    Explanation:
    Let's look at each wordsQuery[i] separately:
        For wordsQuery[0] = "gh", strings from wordsContainer that share the longest common suffix "gh" are at indices 0, 1, and 2. Among these, the answer is the string at index 2 because it has the shortest length of 6.
        For wordsQuery[1] = "acbfgh", only the string at index 0 shares the longest common suffix "fgh". Hence it is the answer, even though the string at index 2 is shorter.
        For wordsQuery[2] = "acbfegh", strings from wordsContainer that share the longest common suffix "gh" are at indices 0, 1, and 2. Among these, the answer is the string at index 2 because it has the shortest length of 6.


Constraints:
    1 <= wordsContainer.length, wordsQuery.length <= 104
    1 <= wordsContainer[i].length <= 5 * 103
    1 <= wordsQuery[i].length <= 5 * 103
    wordsContainer[i] consists only of lowercase English letters.
    wordsQuery[i] consists only of lowercase English letters.
    Sum of wordsContainer[i].length is at most 5 * 105.
    Sum of wordsQuery[i].length is at most 5 * 105.

*/

function stringIndices(wordsContainer: string[], wordsQuery: string[]): number[] {
    const answer: number[] = [];

    // Thought process:
    // add a map for each word, crossing each word with each query (matrix mxn)
    /**
     *     q1   q2
     * a |    |    |
     * b |    |    |
     * c |    |    |
     */
    // this map stores a score for which is which, then for each column choose the best answer
    // the loop could go either way, through the container or query

    // seems inefficient because that is just a mxn for each n (container m, query n)
    // could we make a third struct so that we can check multiple queries at once?
    // if we start from the words, we can find the matching word for each query each round, so the result is not mxnxn, but m*n*(n-r) per round r
    // but doing so wouldn't require a matrix, just remove the queries from the array and go about constructing the array

    // check each query
    while (wordsQuery.length != 0) {
        const query = wordsQuery.shift();
        // type narrowing
        if (query == undefined) {
            break;
        }
        const queryLength = query.length;
        let bestMatchIndex = 0;
        let bestMatchLength = 0;

        let currentMatchLength: number;
        // check each word for this query, replacing which one is the best match
        for (let i=0; i<wordsContainer.length; i++) {
            currentMatchLength = 0;
            const word = wordsContainer[i];
            const wordLength = word.length;
            // check if it matches and how much it matches
            for (let j=0; j<wordLength; j++) {
                // break when word.length > query.length
                if (j == queryLength) {
                    break;
                }
                // break when the char doesn't match
                if (word[wordLength-1-j] != query[queryLength-1-j]) {
                    break;
                }
                currentMatchLength = j+1; // +1 because the answer considers length, not index. Index 0 means length 1.
            }
            // after checking the match, check if it is stronger than the previous match.
            // the condition for a better match is, in order of priority:
            // - longest match
            // - shortest word
            // - first word
            if (currentMatchLength > bestMatchLength) {
                bestMatchLength = currentMatchLength;
                bestMatchIndex = i;
            } else if (currentMatchLength == bestMatchLength) {
                if (wordLength < wordsContainer[bestMatchIndex].length) {
                    bestMatchIndex = i;
                } else if (wordLength == wordsContainer[bestMatchIndex].length) {
                    // if the length is the same, we keep the previous best match because it is earlier in the container
                    // nothing to do
                }
            }
        }
        // after checking all the words for this query, set the index of the best match for this query
        answer.push(bestMatchIndex);
    }

    return answer;
};

describe('3093. Longest Common Suffix Queries', () => {
    test('example 1', () => {
        const wordsContainer = ["abcd","bcd","xbcd"];
        const wordsQuery = ["cd","bcd","xyz"];
        const expected = [1,1,1];
        expect(stringIndices(wordsContainer, wordsQuery)).toEqual(expected);
    });

    test('example 2', () => {
        const wordsContainer = ["abcdefgh","poiuygh","ghghgh"];
        const wordsQuery = ["gh","acbfgh","acbfegh"];
        const expected = [2,0,2];
        expect(stringIndices(wordsContainer, wordsQuery)).toEqual(expected);
    });

    test('case 39', () => {
        const wordsContainer = ["a","b"];
        const wordsQuery = ["a","b"];
        const expected = [0,1];
        expect(stringIndices(wordsContainer, wordsQuery)).toEqual(expected);
    });

    test('case 109', () => {
        const wordsContainer = ["dggjjdvdb","dgdjvjjg"];
        const wordsQuery = ["bdddv","bbggdbvv","vdvvv","djgvb","dbdgjddd","vvjbd","bdjdjjvb","gdbvjdbdvb","jvvgbbb","vgvbd","gbjjbb","dvvgvjd","gdgbddgjd","vvjbgdbjdv","vdbjbgbd"];
        const expected = [1,1,1,0,1,1,0,0,0,1,0,1,1,1,1];
        expect(stringIndices(wordsContainer, wordsQuery)).toEqual(expected);
    });

    test('manual 1', () => {
        const wordsContainer = ["dggjjdvdb", "dgdjvjjg"];
        const wordsQuery = ["djgvb"];
        const expected = [0];
        expect(stringIndices(wordsContainer, wordsQuery)).toEqual(expected);
    });

    // Time limit exceeded. The hint is to use a Trie.
});