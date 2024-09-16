// MEDIUM

// Given a list of 24-hour clock time points in "HH:MM" format, return the minimum minutes difference between any two time-points in the list.

// Constraints:

// 2 <= timePoints.length <= 2 * 104
// timePoints[i] is in the format "HH:MM".


// convert everything to minutes - O(n)
// sort (if A < B < C, the difference between A and B is always less then A and C, so there's no need to compare A and C) - O(n log n)
// compare difference between pairs, considering in the same day or in the next day (+1440 minutes) - O(n)
//  ex.: if there is 22:00 and 01:00, we need to compare between 22 and 01 of the same day (22 - 01) and 22 and 01 of the next day (01+24 - 22 => 25 - 22)

function findMinDifference(timePoints: string[]): number {
    let minuteList:number[] = [];
    for (let timePoint of timePoints) {
        minuteList.push(Number(timePoint.split(":")[0]) * 60 + Number(timePoint.split(":")[1]));
    }

    let result = 1440;
    minuteList.sort((a, b) => a - b);
    // compare inside list
    for (let i = 1; i < minuteList.length; i++) {
        result = Math.min(result, minuteList[i] - minuteList[i-1]);
    }
    // compare between last and first elements
    result = Math.min(result, minuteList[minuteList.length-1] - minuteList[0]);
    result = Math.min(result, minuteList[0]+1440 - minuteList[minuteList.length-1]);

    console.log(minuteList);
    console.log(result);
    return result;
};

describe("findMinDifference test", () => {
    test("sub 3", () => {
        expect(findMinDifference(["05:31","22:08","00:35"])).toBe(147);
    });

    test("sub 2", () => {
        expect(findMinDifference(["00:00","04:00","22:00"])).toBe(120);
    });

    test("sub 1", () => {
        expect(findMinDifference(["01:01","02:01"])).toBe(60);
    });

    test("own 1", () => {
        expect(findMinDifference(["12:10", "12:15", "12:01"])).toBe(5);
    })

    test("case 2", () => {
        expect(findMinDifference(["00:00", "23:59","00:00"])).toBe(0);
    });

    test("case 1", () => {
        expect(findMinDifference(["23:59","00:00"])).toBe(1);
    });
});