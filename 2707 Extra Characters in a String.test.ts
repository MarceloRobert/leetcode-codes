// MEDIUM

// You are given a 0-indexed string s and a dictionary of words dictionary. You have to break s into one or more non-overlapping substrings such that each substring is present in dictionary. There may be some extra characters in s which are not present in any of the substrings.

// Return the minimum number of extra characters left over if you break up s optimally.

// Constraints:

// 1 <= s.length <= 50
// 1 <= dictionary.length <= 50
// 1 <= dictionary[i].length <= 50
// dictionary[i] and s consists of only lowercase English letters
// dictionary contains distinct words

// need a function that returns the amount of extra characters from a string when it starts at certain position
// USE DYNAMIC PROGRAMMING

let minExtraHere:number[] = Array(51).fill(50);

function checkExtras(runCount:number, here:number, s:string, dictionary:string[]) {
    if (s.length == 0) {
        if (minExtraHere[here] == -1) {
            minExtraHere[here] = runCount;
        } else {
            minExtraHere[here] = Math.min(minExtraHere[here], runCount);
        }
        return 0;
    }

    let validWords:string[] = [];
    for (let word of dictionary) {
        if (s.slice(0, word.length) == word) {
            validWords.push(word);
        }
    }

    if (validWords.length == 0) {
        minExtraHere[here] = Math.min(minExtraHere[here], runCount);
        checkExtras(runCount+1, here, s.slice(1), dictionary);
    } else {
        for (let word of validWords) {
            minExtraHere[here] = Math.min(minExtraHere[here], runCount);
            checkExtras(runCount, here+word.length, s.slice(word.length), dictionary);
        }
    }

    return;
}


function minExtraChar(s: string, dictionary: string[]): number {
    // cleans dictionary before doing all the comparisons
    for (let i = 0; i<dictionary.length; i++) {
        if(!s.includes(dictionary[i])) {
            dictionary.splice(i, 1);
            i--;
        }
    }

    let runCountStart:number;
    for (let i = 0; i < s.length; i++) {
        if (minExtraHere[i] == 50) {
            runCountStart = i;
        } else {
            runCountStart = minExtraHere[i];
        }
        checkExtras(runCountStart, i, s.slice(i), dictionary)
    }

    console.log(minExtraHere);
    return minExtraHere[s.length];
};

// 4 --> -ae n -c -g p -gv s -c k -jr -qafkx -g -yzbe
// 3 --> a -encgp -gv s -c k -jr -qafkx -g -yzbe

// "ae"
// "c"
// "encgp"
// "g"
// "gv"
// "jr"
// "qafkx"
// "r"
// "x"
// "yzbe"


describe("minExtraChar test", () => {
    test("own 3", () => {
        expect(minExtraChar("aencgpgvsckjrqafkxgyzbe", ["r","g","qafkx","jr","encgp","yzbe","c","gv","x","ae"])).toBe(3);
    });

    test("own 2", () => {
        expect(minExtraChar("abcde", ["ab", "bcde"])).toBe(1);
    });

    test("sub 2", () => { // 71/2028 passed, time exceeded
        expect(minExtraChar("cmmcxfdepqalvjqphhzjjomjwtmlkidxdhhhlhbxe", ["e","lhbx","k","lxtv","hhz","j","n","deqfw","onxcv","dnq","dxy","z","py","sg","nycr","mcxfde","tmudaz","y","q","i","igo","msqki","p","ls","qmzng","errfl","hcnwcb","rbvov","h","ljvdp","erucpm","dxa","lvjqp","tbiic","jomjwt","mlkidx","dtu","qw","zn","o","dhhh"])).toBe(3);
    });

    test("sub 1", () => { // 2006/2028 passed, wrong answer
        expect(minExtraChar("metzeaencgpgvsckjrqafkxgyzbe", ["zdzz","lgrhy","r","ohk","zkowk","g","zqpn","anoni","ka","qafkx","t","jr","xdye","mppc","bqqb","encgp","yf","vl","ctsxk","gn","cujh","ce","rwrpq","tze","zxhg","yzbe","c","o","hnk","gv","uzbc","xn","kk","ujjd","vv","mxhmv","ugn","at","kumr","ensv","x","uy","gb","ae","jljuo","xqkgj"])).toBe(5);
    });

    test("extra 1", () => {
        expect(minExtraChar("dwmodizxvvbosxxw", ["ox","lb","diz","gu","v","ksv","o","nuq","r","txhe","e","wmo","cehy","tskz","ds","kzbu"])).toBe(7);
    });

    test("own 1", () => {
        expect(minExtraChar("leetcodes", [ "leetcode", "leet", "codes"])).toBe(0);
    });

    test("case 2", () => {
        expect(minExtraChar("sayhelloworld", ["hello", "world"])).toBe(3);
    });

    test("case 1", () => {
        expect(minExtraChar("leetscode", ["leet","code","leetcode"])).toBe(1);
    });
});
