// HARD

// You are given an array words of size n consisting of non-empty strings.

// We define the score of a string term as the number of strings words[i] such that term is a prefix of words[i].

// For example, if words = ["a", "ab", "abc", "cab"], then the score of "ab" is 2, since "ab" is a prefix of both "ab" and "abc".
// Return an array answer of size n where answer[i] is the sum of scores of every non-empty prefix of words[i].

// Note that a string is considered as a prefix of itself.

// Constraints:

// 1 <= words.length <= 1000
// 1 <= words[i].length <= 1000
// words[i] consists of lowercase English letters.

///
// make a trie datastructure
// store a head trie in the main function
// for every new term analyzed, check its score on the trie or make the score analysis and then add it to the trie

class trie {
    word:string;
    score:number;
    nexts:Set<string>;
    children:trie[];

    constructor (word:string) {
        this.word = word;
        this.score = 0;
        this.children = [];
        this.nexts = new Set();
    }

    // log() {
    //     let current = this;
    //     console.log(current.word + " - " + current.score);
    //     console.log("\tchildren of " + current.word + ":");
    //     for (let child of current.children) {
    //         child.log();
    //     }
    //     console.log("-----");
    // }
}

function sumPrefixScores(words: string[]): number[] {
    let head = new trie("");
    let result:number[] = Array(words.length).fill(0);

    for (let i = 0; i < words.length; i++) {
        let word = words[i];

        // for the word, check the score of each term (substring)
        // and then sum the termScore into wordScore
        for (let j = 1; j <= word.length; j++) {
            let term = word.substring(0, j);
            // console.log("word is " + word + " of length " + word.length);
            // console.log("term is " + term);
            let termScore = 0;

            // got the term, check if its score is in the trie first
            let current = head;
            let found = true;
            let k = 0;
            for (k = k; k < term.length; k++) {
                if (!current.nexts.has(term[k])) {
                    found = false;
                    break;
                } else {
                    let nexts = Array.from(current.nexts);
                    current = current.children[nexts.indexOf(term[k])];
                }
            }

            // if the term is in the trie, just sum the score
            if (found) {
                // console.log("score of " + term + " found - " + current.score);
                result[i] += current.score; // termScore is current.score
            } else {
                // console.log("score of " + term + " not found");
                // otherwise has to make the score analysis
                // which is checking for all the words in words[i] which of them has term as a prefix
                // and then sum it to wordScore 

                // find the current term score
                for (let element of words) {
                    if (element.substring(0, term.length) == term) {
                        termScore += 1;
                    }
                }
                // console.log("termScore is " + termScore);

                // got the term score, add it to the trie
                // current is already set to the right position, just continue to add it
                for (k = k; k < term.length; k++) {
                    if (!current.nexts.has(term[k])) {
                        let newStep = new trie(term[k]);
                        current.children.push(newStep);
                        current = newStep;
                    } else {
                        for (let children of current.children) {
                            if (children.word === term[k]) {
                                current = children;
                                break;
                            }
                        }
                        let nexts = Array.from(current.nexts);
                        current = current.children[nexts.indexOf(term[k])];
                    }
                }
// // old
// for (k = k; k < term.length; k++) {
//     let isInChildren = false;
//     for (let children of current.children) {
//         if (children.word === term[k]) {
//             current = children;
//             isInChildren = true;
//             break;
//         }
//     }
//     if (!isInChildren) {
//         let newStep = new trie(term[k]);
//         current.children.push(newStep);
//         current = newStep;
//     }
// }
                current.score = termScore;

                // sum it to wordScore
                result[i] += termScore;
                // console.log("step result is " + result[i]);
            }
        }
    }

    // head.log();
    // console.log(result);

    return result;
};

describe("sumPrefixScores test", () => {

    test("case 2", () => {
        expect(sumPrefixScores(["abcd"])).toEqual([4]);
    });

    test("case 1", () => {
        expect(sumPrefixScores(["abc","ab","bc","b"])).toEqual([5, 4, 3, 2]);
    });
});