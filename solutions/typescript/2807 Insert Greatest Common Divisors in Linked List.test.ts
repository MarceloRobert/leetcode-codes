// MEDIUM

// Given the head of a linked list head, in which each node contains an integer value.

// Between every pair of adjacent nodes, insert a new node with a value equal to the greatest common divisor of them.

// Return the linked list after insertion.

// The greatest common divisor of two numbers is the largest positive integer that evenly divides both numbers.

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

function insertGreatestCommonDivisors(head: ListNode | null): ListNode | null {
    if (head == null || head.next == null) {
        return head;
    }
    let current = head;
    let middle:ListNode;

    // if the next is null, then it's the last element, add nothing
    while(current?.next != null) {

        // get greatest common divisor
        middle = new ListNode(euclidianGCD(current.val, current.next.val));

        // add that between the current and next nodes
        middle.next = current.next;
        current.next = middle;
        current = middle.next;
    }
    return head;
};

// finds greatest common divisor using the euclidean algorithm
function euclidianGCD(a:number, b:number):number {
    let left:number;
    let middle:number;
    let rest:number;

    if (a > b) {
        middle = a;
        rest = b;
    } else if (b > a) {
        middle = b;
        rest = a;
    } else {
        return a;
    }

    while (rest > 0) {
        left = middle;
        middle = rest;
        rest = left % middle;
    }

    return middle;
}


describe("insertGreatestCommonDivisors test", () => {
    test("case 1", () => {
        const head = ListNode.fromArray([18,6,10,3]);
        const result = ListNode.fromArray([18,6,6,2,10,1,3]);
        expect(insertGreatestCommonDivisors(head)).toEqual(result);
    });
});