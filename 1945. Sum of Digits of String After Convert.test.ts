// EASY

// You are given a string s consisting of lowercase English letters, and an integer k.

// First, convert s into an integer by replacing each letter with its position in the alphabet (i.e., replace 'a' with 1, 'b' with 2, ..., 'z' with 26). Then, transform the integer by replacing it with the sum of its digits. Repeat the transform operation k times in total.

// For example, if s = "zbax" and k = 2, then the resulting integer would be 8 by the following operations:

// Convert: "zbax" ➝ "(26)(2)(1)(24)" ➝ "262124" ➝ 262124
// Transform #1: 262124 ➝ 2 + 6 + 2 + 1 + 2 + 4 ➝ 17
// Transform #2: 17 ➝ 1 + 7 ➝ 8
// Return the resulting integer after performing the operations described above.

function getLucky(s: string, k: number): number {
    let result = 0;
    let word = "";
    
    // initial conversion
    // subtract 96 from characters for unicode code
    for (let i = 0; i<s.length; i++) {
        word += String(s.charCodeAt(i)-96);
    }
    
    // next conversions
    for (let i = 0; i<k; i++) {
        if (i != 0)
            word = result.toString();
        result = 0;
        for (let j = 0; j<word.length; j++) {
            result += parseInt(word.charAt(j));
        }
    }

    return result;
};

// Another version
function getLucky2(s: string, k: number): number {
    let result = 0;
    
    // initial conversion
    // subtract 96 from characters for unicode code
    let word:number[] = Array.from(s).map((value) => value.charCodeAt(0)-96);
    let limit = word.length;
    for(let i=0; i< limit; i++) {
        if (word[i] > 9) {
            let value = word[i]%10;
            word[i] = Math.floor(word[i]/10);
            word.splice(i+1, 0, value);
            limit++;
        }
    }
    console.log(word);
    
    // next conversions
    for (let i = 0; i<k; i++) {
        result = word.reduce((previous, current) => {return current + previous});

        word = Array.from(result.toString()).map((value) => parseInt(value));
    }

    return result;
};

describe("get lucky test", () => {
    test("sub 2", () => {
        expect(getLucky("hvmhoasabaymnmsd", 1)).toBe(79);
    });

    test("own 1", () => {
        expect(getLucky("za", 1)).toBe(9);
    });

    test("sub 1", () => {
        expect(getLucky("dbvmfhnttvr", 5)).toBe(5);
    });

    test("case 3", () => {
        expect(getLucky("zbax", 2)).toBe(8);
    });

    test("case 2", () => {
        expect(getLucky("leetcode", 2)).toBe(6);
    });

    test("case 1", () => {
        expect(getLucky("iiii", 2)).toBe(9);
    });
})