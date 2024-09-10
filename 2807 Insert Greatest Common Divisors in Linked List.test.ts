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
    let gcd:number;
    let middle:ListNode;

    // if the next is null, then it's the last element, add nothing
    while(current?.next != null) {

        // get greatest common divisor
        // scans from highest possible down, the first that divides both is the greatest divisor
        if (current.next.val > current.val) {
            gcd = current.val;
        } else {
            gcd = current.next.val;
        }
        for (let i = gcd; i>=1; i--) {
            if (current.val%i == 0 && current.next.val%i == 0) {
                gcd = i;
                break;
            }
        }
        middle = new ListNode(gcd);
        middle.next = current.next;
        current.next = middle;
        current = middle.next;
    }
    return head;
};

describe("insertGreatestCommonDivisors test", () => {
    test("case 1", () => {
        const head = ListNode.fromArray([18,6,10,3]);
        const result = ListNode.fromArray([18,6,6,2,10,1,3]);
        expect(insertGreatestCommonDivisors(head)).toEqual(result);
    });
});