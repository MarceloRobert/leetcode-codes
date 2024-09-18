// MEDIUM

// Given a list of non-negative integers nums, arrange them such that they form the largest number and return it.

// Since the result may be very large, so you need to return a string instead of an integer.

// Constraints:

// 1 <= nums.length <= 100
// 0 <= nums[i] <= 109

/// find largest "first place" number, find largest second place, third place;
//  pick largest of them, add, remove from available numbers, repeat
// must save the next largest single digit number to verify if picking the "empty" next number is the best
// ex.: 30 = 3 + 0 + empty, 300 = 3 + 0 + 0;
//      [30, 300] => 30300 because in 30 when the third digit is empty, the next biggest digit is 3 from 300 while the third biggest number from 300 is 0

class numberDigit {
    first:number|null;
    second:number|null;
    third:number|null;

    constructor(first:number|null, second:number|null, third:number|null) {
        this.first = first;
        this.second = second;
        this.third = third;
    }

    static fromNumber(num:number):numberDigit {
        let first = Number(num.toString()[0]);
        let second = num.toString().length > 1 ? Number(num.toString()[1]) : null;
        let third = num.toString().length > 2 ? Number(num.toString()[2]) : null;
        return new numberDigit(first, second, third);
    }

    public toString():string {
        let result = this.first.toString();
        if (this.second != null)
            result += this.second.toString();
        if (this.third != null)
            result += this.third.toString();

        return result;
    }
}

function largestNumber(nums: number[]): string {
    let pool:numberDigit[] = [];

    // converts numbers to numberDigits
    for (let i = 0; i<nums.length; i++) {
        pool.push(numberDigit.fromNumber(nums[i]));
    }

    // sorts array from highest to lowest
    pool.sort((a, b) => {
        let score = 0;
        if (a.first != null && b.first != null) {
            if (a.first < b.first) {
                score += 100;
            } else if (a.first > b.first) {
                score -= 100;
            }
        } else if (a.first != null) {
            score += 100;
        } else if (b.first != null) {
            score -= 100;
        }

        if (a.second != null && b.second != null) {
            if (a.second < b.second) {
                score += 10;
            } else if (a.second > b.second) {
                score -= 10;
            }
        } else if (a.second != null) {
            score += 10;
        } else if (b.second != null) {
            score -= 10;
        }

        if (a.third != null && b.third != null) {
            if (a.third < b.third) {
                score += 1;
            } else if (a.third > b.third) {
                score -= 1;
            }
        } else if (a.third != null) {
            score += 1;
        } else if (b.third != null) {
            score -= 1;
        }

        return score;
    })
    console.log(pool);
    
    let result = "";
    pool.forEach((element) => {
        result += element.toString();
    })
    return result;
};

/*
// while (pool.length > 0) {
//     // From the pool, find the largest next number
//     let choice:numberDigit;
//     choice = findNextLargest(pool, 0, 1);

//     // remove that from the pool, add to result, repeat
//     result += choice.toString();
//     pool.splice(pool.indexOf(choice), 1);
// }
function findNextLargest(pool:numberDigit[], largest:number, index:number):numberDigit {
    // find next largest to compare to
    if (index == 1) {
        for (let i = 0; i<pool.length; i++) {
            if (pool[i].first > largest) {
                largest = pool[i].first;
            }
        }
    } else if (index == 2) {
        for (let i = 0; i<pool.length; i++) {
            if (pool[i].second != null && pool[i].second > largest) {
                largest = pool[i].second;
            }
        }
    } else if (index == 3) {
        for (let i = 0; i<pool.length; i++) {
            if (pool[i].third != null && pool[i].third > largest) {
                largest = pool[i].third;
            }
        }
    } else {
        return pool[0];
    }
    
    // find available numbers from pool
    let available:numberDigit[] = [];
    for (let i = 0; i<pool.length; i++) {
        if (index == 1) {
            if (pool[i].first >= largest) {
                available.push(pool[i]);
            }
        } else if (index == 2) {
            if (pool[i].second >= largest) {
                available.push(pool[i]);
            }
        } else {
            if (pool[i].third >= largest) {
                available.push(pool[i]);
            }
        }
    }

    return findNextLargest(available, largest, index+1);
}
    */

describe("largestNumber test", () => {
    test("own 5", () => {
        expect(largestNumber([20, 1])).toBe("201");
    });

    test("own 4", () => {
        expect(largestNumber([30, 300])).toBe("30300");
    });

    test("own 3", () => {
        expect(largestNumber([300, 30, 3, 2])).toBe("3303002");
    });

    test("own 2", () => {
        expect(largestNumber([300, 301, 30, 2])).toBe("303013002");
    });

    test("own 1", () => {
        expect(largestNumber([31, 30, 3, 2])).toBe("331302");
    });

    test("case 2", () => {
        expect(largestNumber([3,30,34,5,9])).toBe("9534330");
    });

    test("case 1", () => {
        expect(largestNumber([10,2])).toBe("210");
    });
})