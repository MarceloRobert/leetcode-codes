// EASY

// A bit flip of a number x is choosing a bit in the binary representation of x and flipping it from either 0 to 1 or 1 to 0.

// For example, for x = 7, the binary representation is 111 and we may choose any bit (including any leading zeros not shown) and flip it. We can flip the first bit from the right to get 110, flip the second bit from the right to get 101, flip the fifth bit from the right (a leading zero) to get 10111, etc.
// Given two integers start and goal, return the minimum number of bit flips to convert start to goal.


// convert both numbers to binary arrays and check how many positions are different
function minBitFlips(start: number, goal: number): number {
    // convert start to a binary array
    let startBinary:boolean[] = [];
    while (start > 0) {
        startBinary.push(start % 2 == 1);
        start = Math.floor(start / 2);
    }
    if (startBinary.length === 0) {
        startBinary.push(false);
    }

    // convert goal to a binary array
    let goalBinary:boolean[] = [];
    while (goal > 0) {
        goalBinary.push(goal % 2 == 1);
        goal = Math.floor(goal / 2);
    }
    if (goalBinary.length === 0) {
        goalBinary.push(false);
    }

    // check if they are the same length
    if (startBinary.length > goalBinary.length) {
        goalBinary = goalBinary.concat(Array(startBinary.length - goalBinary.length).fill(false));
    } else if (startBinary.length < goalBinary.length) {
        startBinary = startBinary.concat(Array(goalBinary.length - startBinary.length).fill(false));
    }
    console.log("start " + startBinary);
    console.log("goal " + goalBinary);

    // check how many positions are different
    let count = 0;
    startBinary.forEach((element, index) => {
        if (element == !(goalBinary[index])) {
            count += 1;
        }
    });

    return count;
};

describe("minBitFlips test", () => {
    test("case 2", () => {
        expect(minBitFlips(3, 4)).toBe(3);
    });

    test("case 1", () => {
        expect(minBitFlips(10, 7)).toBe(3);
    });
});