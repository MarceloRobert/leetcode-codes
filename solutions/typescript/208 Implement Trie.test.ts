/**
208. Implement Trie (Prefix Tree)
Medium

A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:
    Trie() Initializes the trie object.
    void insert(String word) Inserts the string word into the trie.
    boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
    boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.
 

Example 1:
    Input
    ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
    [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
    Output
    [null, null, true, false, true, null, true]
    Explanation
    Trie trie = new Trie();
    trie.insert("apple");
    trie.search("apple");   // return True
    trie.search("app");     // return False
    trie.startsWith("app"); // return True
    trie.insert("app");
    trie.search("app");     // return True
 

Constraints:
    1 <= word.length, prefix.length <= 2000
    word and prefix consist only of lowercase English letters.
    At most 3 * 104 calls in total will be made to insert, search, and startsWith.

*/


// The problem here is that it asked me to make the "Trie" class, which is only the root of the tree, so I need to make a separate TrieNode class in order to not lose the root reference. Otherwise it would be possible to make everything into a single class.

class TrieNode {
    value:string;
    isWord:boolean;
    children:Record<string, TrieNode>;

    constructor() {
        this.value = "";
        this.children = {};
        this.isWord = false;
    }
}


class Trie {
// aka TrieRoot
    root:TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string): void {
        let iterator: TrieNode = this.root;
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!iterator.children[char]) {
                iterator.children[char] = new TrieNode();
            }
            iterator = iterator.children[char];
        }
        iterator.isWord = true;

        return;
    }

    search(word: string): boolean {
        let iterator: TrieNode = this.root;
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!iterator.children[char]) {
                return false;
            }
            iterator = iterator.children[char];
        }
        return iterator.isWord;
    }

    startsWith(prefix: string): boolean {
        let iterator: TrieNode = this.root;
        for (let i = 0; i < prefix.length; i++) {
            const char = prefix[i];
            if (!iterator.children[char]) {
                return false;
            }
            iterator = iterator.children[char];
        }
        return true;
    }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

describe("208. Implement Trie (Prefix Tree)", () => {
    test("Example 1", () => {
        const trie = new Trie();
        trie.insert("apple");
        expect(trie.search("apple")).toBe(true);
        expect(trie.search("app")).toBe(false);
        expect(trie.startsWith("app")).toBe(true);
        trie.insert("app");
        expect(trie.search("app")).toBe(true);
    });

    test("case 13", () => {
        //  ["Trie", [[],
        //     "insert", ["app"],
        //     "insert", ["apple"],
        //     "insert", ["beer"],
        //     "insert", ["add"],
        //     "insert", ["jam"],
        //     "insert", ["rental"],
        //     "search", ["apps"],
        //     "search", ["app"],
        //     "search", ["ad"],
        //     "search", ["applepie"],
        //     "search", ["rest"],
        //     "search", ["jan"],
        //     "search", ["rent"],
        //     "search", ["beer"],
        //     "search", ["jam"],
        //     "startsWith", ["apps"],
        //     "startsWith", ["app"],
        //     "startsWith", ["ad"],
        //     "startsWith", ["applepie"],
        //     "startsWith", ["rest"],
        //     "startsWith", ["jan"],
        //     "startsWith", ["rent"],
        //     "startsWith", ["beer"],
        //     "startsWith"] ["jam"]]
 
        const trie = new Trie();
        trie.insert("app");
        trie.insert("apple");
        trie.insert("beer");
        trie.insert("add");
        trie.insert("jam");
        trie.insert("rental");
        expect(trie.search("apps")).toBe(false);
        expect(trie.search("app")).toBe(true);
        expect(trie.search("ad")).toBe(false);
        expect(trie.search("applepie")).toBe(false);
        expect(trie.search("rest")).toBe(false);
        expect(trie.search("jan")).toBe(false);
        expect(trie.search("rent")).toBe(false);
        expect(trie.search("beer")).toBe(true);
        expect(trie.search("jam")).toBe(true);
        expect(trie.startsWith("apps")).toBe(false);
        expect(trie.startsWith("app")).toBe(true);
        expect(trie.startsWith("ad")).toBe(true);
        expect(trie.startsWith("applepie")).toBe(false);
        expect(trie.startsWith("rest")).toBe(false);
        expect(trie.startsWith("jan")).toBe(false);
        expect(trie.startsWith("rent")).toBe(true);
        expect(trie.startsWith("beer")).toBe(true);
        expect(trie.startsWith("jam")).toBe(true);
    });
});
