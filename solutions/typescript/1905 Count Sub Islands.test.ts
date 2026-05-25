// MEDIUM

// You are given two m x n binary matrices grid1 and grid2 containing only 0's (representing water) and 1's (representing land). An island is a group of 1's connected 4-directionally (horizontal or vertical). Any cells outside of the grid are considered water cells.

// An island in grid2 is considered a sub-island if there is an island in grid1 that contains all the cells that make up this island in grid2.

// Return the number of islands in grid2 that are considered sub-islands.


/// Solution is not very efficient, however
// Doesn't use recursion
// Uses attributes to solve problem

function countSubIslands(grid1: number[][], grid2: number[][]): number {
    let isSubIsland:boolean[] = [false, false];
    let highestIslandID = 2;

    class StackItem {
        iPos: number
        jPos: number
        constructor(iPos:number, jPos:number) {
            this.iPos = iPos;
            this.jPos = jPos;
        }
    }

    let stack:StackItem[] = [];

    // Use flood fill to index islands on grid2
    for (let i = 0; i< grid2.length; i++) {
        for (let j = 0; j< grid2[0].length; j++) {

            // Only enter flood fill if haven't filled already
            if (grid2[i][j] == 1) {

                stack.push(new StackItem(i, j));
                let currentTile:StackItem;
                isSubIsland.push(true);
                do {
                    currentTile = stack.pop();

                    // paint tile, check if continues as subisland
                    grid2[currentTile.iPos][currentTile.jPos] = highestIslandID;
                    if (grid1[currentTile.iPos][currentTile.jPos] == 0) {
                        isSubIsland[highestIslandID] = false;
                    }

                    // add valid neighbours to stack
                    if (currentTile.iPos != 0 &&
                        grid2[currentTile.iPos-1][currentTile.jPos] != highestIslandID &&
                        grid2[currentTile.iPos-1][currentTile.jPos] != 0)
                        stack.push(new StackItem(currentTile.iPos-1, currentTile.jPos));
                    if (currentTile.jPos != 0 &&
                        grid2[currentTile.iPos][currentTile.jPos-1] != highestIslandID &&
                        grid2[currentTile.iPos][currentTile.jPos-1] != 0)
                        stack.push(new StackItem(currentTile.iPos, currentTile.jPos-1));
                    if (currentTile.iPos != grid2.length-1 &&
                        grid2[currentTile.iPos+1][currentTile.jPos] != highestIslandID &&
                        grid2[currentTile.iPos+1][currentTile.jPos] != 0)
                        stack.push(new StackItem(currentTile.iPos+1, currentTile.jPos));
                    if (currentTile.jPos != grid2[0].length-1 &&
                        grid2[currentTile.iPos][currentTile.jPos+1] != highestIslandID &&
                        grid2[currentTile.iPos][currentTile.jPos+1] != 0)
                        stack.push(new StackItem(currentTile.iPos, currentTile.jPos+1));
                } while (stack.length != 0);
                // increment highest id to paint next islands
                highestIslandID += 1;
            }
        }
    }

    return isSubIsland.filter((value) => {return value == true}).length;
};

describe("sub islands test", () => {
    test("case 1", () => {
        expect(countSubIslands(
            [[1, 1, 1, 0, 0],
             [0, 1, 1, 1, 1],
             [0, 0, 0, 0, 0],
             [1, 0, 0, 0, 0],
             [1, 1, 0, 1, 1,]],
            [[1, 1, 1, 0, 0],
             [0, 0, 1, 1, 1],
             [0, 1, 0, 0, 0],
             [1, 0, 1, 1, 0],
             [0, 1, 0, 1, 0]]
        )).toBe(3);
    });

    test("case 2", () => {
        expect(countSubIslands(
            [[1,0,1,0,1],[1,1,1,1,1],[0,0,0,0,0],[1,1,1,1,1],[1,0,1,0,1]],
            [[0,0,0,0,0],[1,1,1,1,1],[0,1,0,1,0],[0,1,0,1,0],[1,0,0,0,1]]
        )).toBe(2);
    })
})