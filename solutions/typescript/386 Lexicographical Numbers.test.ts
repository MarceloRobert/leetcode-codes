// MEDIUM

// Given an integer n, return all the numbers in the range [1, n] sorted in lexicographical order.

// You must write an algorithm that runs in O(n) time and uses O(1) extra space. 

// Constraints:

// 1 <= n <= 5 * 104

function lexicalOrder(n: number): number[] {
    let middle:string[] = [];
    for (let i = 1; i<=n; i++) {
        middle.push(i.toString());
    };
    
    let result:number[] = [];
    middle.sort().forEach((element) => {
        result.push(Number(element));
    });

    return result;
};

describe("lexicalOrder test", () => {
    test("case 1", () => {
        expect(lexicalOrder(13)).toEqual([1,10,11,12,13,2,3,4,5,6,7,8,9]);
    });
});