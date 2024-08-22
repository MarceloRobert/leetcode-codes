// MEDIUM - 1140 Stone Game II

// Alice and Bob continue their games with piles of stones.  There are a number of piles arranged in a row, and each pile has a positive integer number of stones piles[i].  The objective of the game is to end with the most stones. 
// Alice and Bob take turns, with Alice starting first.  Initially, M = 1.
// On each player's turn, that player can take all the stones in the first X remaining piles, where 1 <= X <= 2M.  Then, we set M = max(M, X).
// The game continues until all the stones have been taken.
// Assuming Alice and Bob play optimally, return the maximum number of stones Alice can get.

/// 

// let amount of piles left = P
// If P <= 2M, then take 2M

// Save the max number of stones that can be get at a certain position with a certain number of moves
// Test every possible chance to do now and check what is the best A would get after B plays
// That will be "test for X from 1 to 2M, move forward X, move forward B play, get most amount possible"
// Then save what is the best for this case and return

///
/// UNFINISHED
///

let M = 1;
var casesSeen: number[][][];

function max(a:number, b:number) {
    return a >= b ? a : b;
}

function maxStonesForRound(piles: number[], currentIndex:number, M:number) {
    let nStones = 0;

    if (piles.slice(currentIndex).length <= 2*M) {
        nStones = piles.slice(currentIndex).reduce((previous, current) => {return current += previous;});
        casesSeen[currentIndex][M][0] = nStones;
        casesSeen[currentIndex][M][1] = 2*M;
        return nStones;
    }
    for (let i = 1; i < 2*M; i++) {
        let firstStones = piles.slice(currentIndex, currentIndex + i).reduce((previous, current) => {return current += previous;});

        if (currentIndex + i < piles.length-1) {
            let bSum = maxStonesForRound(piles, currentIndex + i, max(i, M)); // will prepare casesSeen[currentIndex + i][max(i, M)][]
            
            let bMoves = casesSeen[currentIndex + i][max(i, M)][1];
            
            if (currentIndex + i + bMoves < piles.length) {
                let nextStones = maxStonesForRound(piles, currentIndex + i + bMoves, bMoves);
                nStones = max(nStones, firstStones + nextStones);
            } else {
                nStones = max(nStones, firstStones);
            }
        }
    }
    return nStones;
}

function stoneGameII(piles: number[]): number {
    // Initialize the matrix
    casesSeen = [];
    for (let i = 0; i<piles.length; i++){
        casesSeen[i] = [];
        for (let j = 0; j <= piles.length/2; j++) {
            casesSeen[i][j] = [0, 0]
        }
    }

    return maxStonesForRound(piles, 0, 1);
};

describe("stone test", () => {
    test("Case 0", () => {
        expect(stoneGameII([1, 2])).toBe(3);
    })

    test("Case 1", () => {
        expect(stoneGameII([2,7,9,4,4])).toBe(10);
    });

    // test("Case 2", () => {
    //     expect(stoneGameII([1,2,3,4,5,100])).toBe(104);
    // })

    // test("Case 3", () => {
    //     expect(stoneGameII([1, 4, 6, 8, 4, 5, 7, 2, 3, 9])).toBe(0);
    // })
})