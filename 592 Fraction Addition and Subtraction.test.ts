// MEDIUM - 592 Fraction Addition and Subtraction

// Given a string expression representing an expression of fraction addition and subtraction, return the calculation result in string format.

// The final result should be an irreducible fraction. If your final result is an integer, change it to the format of a fraction that has a denominator 1. So in this case, 2 should be converted to 2/1.

// Constraints:

// The input string only contains '0' to '9', '/', '+' and '-'. So does the output.
// Each fraction (input and output) has the format ±numerator/denominator. If the first input fraction or the output is positive, then '+' will be omitted.
// The input only contains valid irreducible fractions, where the numerator and denominator of each fraction will always be in the range [1, 10]. If the denominator is 1, it means this fraction is actually an integer in a fraction format defined above.
// The number of given fractions will be in the range [1, 10].
// The numerator and denominator of the final result are guaranteed to be valid and in the range of 32-bit int.

///

// "-1/2-2/3+1/2"
// [-, 1, /, 2, -, 2, /, 3, +, 1, /, 2]
// [-1, /, 2, -2, /, 3, 1, /, 2]
// [-1, -2, 1] [2, 3, 2]
// 


function fractionAddition(expression: string): string {
    // split every element while keeping >1 digit numbers and keeping the separators
    let partsOne = expression.split(/(?=[-+/])|(?<=[-+/])/g);

    // remove - and +
    for (let i=0; i < partsOne.length; i++) {
        if (partsOne[i] == "-" || partsOne[i] == "+") {
            partsOne[i+1] = partsOne[i] + partsOne[i+1];
        }
    }
    partsOne = partsOne.filter((part) => (part !== "-" && part !== "+"));

    // separate numerator and denominators
    var numerators: number[] = [];
    var denominators: number[] = [];
    for (let i=1; i< partsOne.length; i += 3) {
        numerators.push(Number(partsOne[i-1]));
        denominators.push(Number(partsOne[i+1]));
    }

    // get easiest common denominator
    let resultDen = denominators.reduce((previous, current) => {return current * previous});

    // multiply each numerator
    for (let i = 0; i<numerators.length; i++) {
        numerators[i] = (resultDen/denominators[i]) * numerators[i];
    }

    // sum numerators
    let resultNum = numerators.reduce((previous, current) => {return current + previous});

    // reduce
    let commonDivisor = 1;
    let tempNum = resultNum < 0 ? resultNum * -1 : resultNum;
    let tempDen = resultDen < 0 ? resultDen * -1 : resultDen;
    for (let i = 1; (i <= tempDen && i <= tempNum) || (tempNum == 0 && i <= tempDen); i++) {
        if (tempDen%i == 0 && tempNum%i == 0) {
            commonDivisor = i;
        }
    }
    resultDen /= commonDivisor;
    resultNum /= commonDivisor;

    // combine
    let result = String(resultNum) + "/" + String(resultDen);


    return result;
};

describe("fraction test", () => {
    test("case 1", () => {
        expect(fractionAddition("-1/2+1/2")).toBe("0/1");
    });

    test("case 2", () => {
        expect(fractionAddition("-1/2+1/2+1/3")).toBe("1/3");
    });

    test("case 3", () => {
        expect(fractionAddition("1/3-1/2")).toBe("-1/6");
    });

    test("sub1", () => {
        expect(fractionAddition("-5/2+10/3+7/9")).toBe("29/18");
    });

    test("sub2", () => {
        expect(fractionAddition("-1/4-4/5-1/4")).toBe("-13/10");
    })
})