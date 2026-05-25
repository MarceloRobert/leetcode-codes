// MEDIUM

// You are given two integers m and n, which represent the dimensions of a matrix.

// You are also given the head of a linked list of integers.

// Generate an m x n matrix that contains the integers in the linked list presented in spiral order (clockwise), starting from the top-left of the matrix. If there are remaining empty spaces, fill them with -1.

// Return the generated matrix.

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
import ListNode from "./shared/listNode";

// one solution would be using a state machine
function spiralMatrix(m: number, n: number, head: ListNode | null): number[][] {
    if (head == null) {
        return [];
    }

    // 0 = right, 1 = down, 2 = left, 3 = up
    let state = 0;
    let matrix = Array.from({ length: m }, () => Array(n).fill(-1));
    let i = 0;
    let j = 0;

    // first move, then place number
    matrix[i][j] = head.val;
    head = head.next;

    while (head != null) {
        if (state == 0) {
            if (j == n-1 || matrix[i][j+1] != -1) {
                state = 1;
                i++;
            } else {
                j++;
            }
        } else if (state == 1) {
            if (i == m-1 || matrix[i+1][j] != -1) {
                state = 2;
                j--;
            } else {
                i++;
            }
        } else if (state == 2) {
            if (j == 0 || matrix[i][j-1] != -1) {
                state = 3;
                i--;
            } else {
                j--;
            }
        } else if (state == 3) {
            if (i == 0 || matrix[i-1][j] != -1) {
                state = 0;
                j++;
            } else {
                i--;
            }
        }
        matrix[i][j] = head.val;
        head = head.next;
    }
    return matrix;
};

describe("spiralMatrixIV test", () => {
    test("case 1", () => {
        const head = ListNode.fromArray([3,0,2,6,8,1,7,9,4,2,5,5,0]);
        expect(spiralMatrix(3, 5, head)).toEqual([[3,0,2,6,8],[5,0,-1,-1,1],[5,2,4,9,7]]);
    });
});