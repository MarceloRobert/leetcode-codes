/**
3121. Count the Number of Special Characters II
Medium

You are given a string word. A letter c is called special if it appears both in lowercase and uppercase in word, and every lowercase occurrence of c appears before the first uppercase occurrence of c.

Return the number of special letters in word.


Example 1:
    Input: word = "aaAbcBC"
    Output: 3
    Explanation:
    The special characters are 'a', 'b', and 'c'.

Example 2:
    Input: word = "abc"
    Output: 0
    Explanation:
    There are no special characters in word.

Example 3:
    Input: word = "AbBCab"
    Output: 0
    Explanation:
    There are no special characters in word.

Constraints:
    1 <= word.length <= 2 * 105
    word consists of only lowercase and uppercase English letters.

 */

function numberOfSpecialChars(word: string): number {
    type State = "lower" | "special" | "notSpecial";
    const charMap: Record<string, State> = {};
    const charSet: Set<string> = new Set();
    const rejectedCharSet: Set<string> = new Set();

    for (let i = 0; i < word.length; i++) {
        const char = word[i];
        const lowerChar = char.toLowerCase();
        const isCharLowercase = char == lowerChar;

        // early "return" if the char is already rejected, avoid unnecessary processing
        if (rejectedCharSet.has(lowerChar)) {
            continue;
        }

        if (!charSet.has(lowerChar)) {
            if (isCharLowercase) {
                charMap[lowerChar] = "lower";
            } else {
                charMap[lowerChar] = "notSpecial";
                rejectedCharSet.add(lowerChar);
            }
            charSet.add(lowerChar);
        } else {
            const state = charMap[lowerChar];
            switch (state) {
                case "lower":
                    if (isCharLowercase) {
                        // just continue searching
                        break;
                    } else {
                        // treat as special unless found otherwise
                        charMap[lowerChar] = "special";
                    }
                    break;
                
                case "special":
                    if (isCharLowercase) {
                        // if special -> lowercase, then the char CAN'T be special anymore
                        charMap[lowerChar] = "notSpecial";
                        rejectedCharSet.add(lowerChar);
                    }
                
                case "notSpecial":
                    // in theory doesn't reach here since the rejectedCharSet treats this case
                    break;

                default:
                    break;
            }
        }
    }

    const result = Object.values(charMap).reduce((acc, v) => acc + (v === "special" ? 1 : 0), 0);

    return result;
};

describe("numberOfSpecialChars test", () => {
    test("example 1", () => {
        expect(numberOfSpecialChars("aaAbcBC")).toEqual(3);
    });

    test("example 2", () => {
        expect(numberOfSpecialChars("abc")).toEqual(0);
    });

    test("example 3", () => {
        expect(numberOfSpecialChars("AbBCab")).toEqual(0);
    });
});