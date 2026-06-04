/**
3635. Earliest Finish Time for Land and Water Rides II
Medium

You are given two categories of theme park attractions: land rides and water rides.
    Land rides
        landStartTime[i] – the earliest time the ith land ride can be boarded.
        landDuration[i] – how long the ith land ride lasts.
    Water rides
        waterStartTime[j] – the earliest time the jth water ride can be boarded.
        waterDuration[j] – how long the jth water ride lasts.

A tourist must experience exactly one ride from each category, in either order.
    A ride may be started at its opening time or any later moment.
    If a ride is started at time t, it finishes at time t + duration.
    Immediately after finishing one ride the tourist may board the other (if it is already open) or wait until it opens.
Return the earliest possible time at which the tourist can finish both rides.


Example 1:
    Input: landStartTime = [2,8], landDuration = [4,1], waterStartTime = [6], waterDuration = [3]
    Output: 9
    Explanation:​​​​​​​
        - Plan A (land ride 0 → water ride 0):
            Start land ride 0 at time landStartTime[0] = 2. Finish at 2 + landDuration[0] = 6.
            Water ride 0 opens at time waterStartTime[0] = 6. Start immediately at 6, finish at 6 + waterDuration[0] = 9.
        - Plan B (water ride 0 → land ride 1):
            Start water ride 0 at time waterStartTime[0] = 6. Finish at 6 + waterDuration[0] = 9.
            Land ride 1 opens at landStartTime[1] = 8. Start at time 9, finish at 9 + landDuration[1] = 10.
        - Plan C (land ride 1 → water ride 0):
            Start land ride 1 at time landStartTime[1] = 8. Finish at 8 + landDuration[1] = 9.
            Water ride 0 opened at waterStartTime[0] = 6. Start at time 9, finish at 9 + waterDuration[0] = 12.
        - Plan D (water ride 0 → land ride 0):
            Start water ride 0 at time waterStartTime[0] = 6. Finish at 6 + waterDuration[0] = 9.
            Land ride 0 opened at landStartTime[0] = 2. Start at time 9, finish at 9 + landDuration[0] = 13.
        Plan A gives the earliest finish time of 9.

Example 2:
    Input: landStartTime = [5], landDuration = [3], waterStartTime = [1], waterDuration = [10]
    Output: 14
    Explanation:​​​​​​​
        - Plan A (water ride 0 → land ride 0):
            Start water ride 0 at time waterStartTime[0] = 1. Finish at 1 + waterDuration[0] = 11.
            Land ride 0 opened at landStartTime[0] = 5. Start immediately at 11 and finish at 11 + landDuration[0] = 14.
        - Plan B (land ride 0 → water ride 0):
            Start land ride 0 at time landStartTime[0] = 5. Finish at 5 + landDuration[0] = 8.
            Water ride 0 opened at waterStartTime[0] = 1. Start immediately at 8 and finish at 8 + waterDuration[0] = 18.
        Plan A provides the earliest finish time of 14.​​​​​​​


Constraints:
    1 <= n, m <= 5 * 104
    landStartTime.length == landDuration.length == n
    waterStartTime.length == waterDuration.length == m
    1 <= landStartTime[i], landDuration[i], waterStartTime[j], waterDuration[j] <= 105
*/

const check = ({
    secondStartTime,
    secondFinishTime,
    firstFinishTime,
    secondDuration,
}: {
    secondStartTime: number;
    secondFinishTime: number;
    firstFinishTime: number;
    secondDuration: number;
}) => {
    const mismatch = secondStartTime - firstFinishTime;
    if (mismatch > 0) {
        return secondFinishTime;
    } else {
        return firstFinishTime + secondDuration;
    }
};

// Old solution was O(2*n*m) which is too slow.
// we should make one pass on n*m and a second pass on max(n, m), which will be O(n*m + n) or O(n*m + m)
// I think we can make O(2n + 2m)
// Can't do second pass on max(n, m) because we need to check all combinations, so it HAS t obe n*m somewhere; this also blocks the O(2n + 2m)
// but this means that we can do O(n + m + n*m)
// not really because we need to check both ways, so it falls back to O(2*n*m)
function earliestFinishTime(
    landStartTime: number[],
    landDuration: number[],
    waterStartTime: number[],
    waterDuration: number[],
): number {
    // Thought process:
    // The old approach is too slow. Maybe we can use a better structure really
    // make an array with land finish times, one with water finish times, then check agains each other + start time
    // have to be careful with the mismatch value
    // could we matrix this? add values in place?
    // one hint is to sort the arrays for better search.
    //
    // pass n and get land finish time
    // pass m and get water finish time
    // then maybe we can just pass again on both

    let earliestFinish = Infinity;

    const landLength = landStartTime.length;
    const waterLength = waterStartTime.length;

    for (let i = 0; i < landLength; i++) {
        for (let j = 0; j < waterLength; j++) {
            const rideFinish = check({
                secondStartTime: waterStartTime[j],
                secondFinishTime: waterStartTime[j] + waterDuration[j],
                firstFinishTime: landStartTime[i] + landDuration[i],
                secondDuration: waterDuration[j],
            });

            if (rideFinish < earliestFinish) {
                earliestFinish = rideFinish;
            }
        }
    }

    for (let j = 0; j < waterLength; j++) {
        for (let i = 0; i < landLength; i++) {
            const rideFinish = check({
                secondStartTime: landStartTime[i],
                secondFinishTime: landStartTime[i] + landDuration[i],
                firstFinishTime: waterStartTime[j] + waterDuration[j],
                secondDuration: landDuration[i],
            });
            if (rideFinish < earliestFinish) {
                earliestFinish = rideFinish;
            }
        }
    }

    return earliestFinish;
}

describe('3635. Earliest Finish Time for Land and Water Rides II', () => {
    test('Example 1', () => {
        expect(earliestFinishTime([2, 8], [4, 1], [6], [3])).toBe(9);
    });

    test('Example 2', () => {
        expect(earliestFinishTime([5], [3], [1], [10])).toBe(14);
    });

    test('case 480', () => {
        expect(earliestFinishTime([99], [59], [99, 54], [85, 20])).toBe(158);
    });

    // Time Exceeded
});
