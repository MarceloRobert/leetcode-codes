// MEDIUM

// Given a list of non-negative integers nums, arrange them such that they form the largest number and return it.

// Since the result may be very large, so you need to return a string instead of an integer.

// Constraints:

// 1 <= nums.length <= 100
// 0 <= nums[i] <= 10^9

/// find largest "first place" number, find largest second place, third place;
//  pick largest of them, add, remove from available numbers, repeat
// must save the next largest single digit number to verify if picking the "empty" next number is the best
// ex.: 30 = 3 + 0 + empty, 300 = 3 + 0 + 0;
//      [30, 300] => 30300 because in 30 when the third digit is empty, the next biggest digit is 3 from 300 while the third biggest number from 300 is 0

class numberDigit {
    first:number;
    second:number|null;
    third:number|null;

    constructor(first:number, second:number|null, third:number|null) {
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
        // check if the first digit is different
        if (a.first < b.first) {
            return 1;
        } else if (a.first > b.first) {
            return -1;
        }

        // both firsts are equal
        // check if any of the seconds are null
        if (a.second == null && b.second != null) {
            if (b.second > b.first) {
                return 1;
            }
            return -1;
        } else if (a.second != null && b.second == null) {
            if (a.second > a.first) {
                return -1;
            }
            return 1;
        } else if (a.second == null && b.second == null) {
            return 0;
        }

        // both seconds aren't null
        // check if they are different
        if (a.second < b.second) {
            return 1;
        } else if (a.second > b.second) {
            return -1;
        }

        // both seconds are equal
        // check if any of the thirds are null
        if (a.third == null && b.third != null) {
            if (b.third > b.first) {
                return 1;
            }
            return -1;
        } else if (a.third != null && b.third == null) {
            if (a.third > a.first) {
                return 1;
            }
            return 1;
        } else if (a.third == null && b.third == null) {
            return 0;
        }

        // both thirds aren't null
        // check if they are different
        if (a.third < b.third) {
            return 1;
        } else if (a.third > b.third) {
            return -1;
        }

        // both thirds are equal
        return 0;
    })
    console.log(pool);
    
    let result = "";
    pool.forEach((element) => {
        result += element.toString();
    })
    return result;
};

describe("largestNumber test", () => {
    test("sub 1", () => {
        expect(largestNumber([432, 43243])).toBe("43243432");
    })

    test("own 6", () => {
        expect(largestNumber([343, 34])).toBe("34343");
    })

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