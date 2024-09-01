// EASY

// You are given a 0-indexed 1-dimensional (1D) integer array original, and two integers, m and n. You are tasked with creating a 2-dimensional (2D) array with  m rows and n columns using all the elements from original.

// The elements from indices 0 to n - 1 (inclusive) of original should form the first row of the constructed 2D array, the elements from indices n to 2 * n - 1 (inclusive) should form the second row of the constructed 2D array, and so on.

// Return an m x n 2D array constructed according to the above procedure, or an empty 2D array if it is impossible.

function construct2DArray(original: number[], m: number, n: number): number[][] {
    if (original.length != m*n) {
        return [];
    }

    let result:number[][] = [];
    for (let i = 0; i<m; i++) {
        result.push(original.slice(i*n, (i+1)*n));
    }

    return result;
};

describe("convert array test", () => {
    test("own 1", () => {
        expect(construct2DArray([1, 2, 3, 4, 5, 6], 3, 2)).toEqual([[1, 2], [3, 4], [5, 6]]);
    })

    test("case 3", () => {
        expect(construct2DArray([1, 2], 1, 1)).toEqual([]);
    })

    test("case 2", () => {
        expect(construct2DArray([1, 2, 3], 1, 3)).toEqual([[1, 2, 3]]);
    });

    test("case 1", () => {
        expect(construct2DArray([1, 2, 3, 4], 2, 2)).toEqual([[1, 2], [3, 4]]);
    });
})