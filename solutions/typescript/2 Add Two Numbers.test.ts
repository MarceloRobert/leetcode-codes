// MEDIUM

// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

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

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    if (l1 == null)
        l1 = new ListNode();
    if (l2 == null)
        l2 = new ListNode();
    let result = new ListNode();
    let current = new ListNode();
    let nextNode:ListNode;
    let addend = 0;

    // First iteration
    current.val = l1.val + l2.val + addend;
    if (current.val >= 10) {
        current.val -= 10;
        addend += 1;
    } else {
        addend = 0;
    }
    result = current;
    nextNode = result;

    if (l1.next != null) {
        l1 = l1.next;
    } else {
        l1 = new ListNode();
    }

    if (l2.next != null) {
        l2 = l2.next;
    } else {
        l2 = new ListNode();
    }
    
    // Loop iterations
    while (l1.next != null || l2.next != null) {
        current = new ListNode();
        current.val = l1.val + l2.val + addend;
        if (current.val >= 10) {
            current.val -= 10;
            addend = 1;
        } else {
            addend = 0;
        }

        nextNode.next = current;
        nextNode = nextNode.next;

        if (l1.next != null) {
            l1 = l1.next;
        } else {
            l1 = new ListNode();
        }

        if (l2.next != null) {
            l2 = l2.next;
        } else {
            l2 = new ListNode();
        }
    }

    // Last iteration
    if (l1.val != 0 || l2.val != 0 || addend == 1) {
        current = new ListNode(l1.val + l2.val + addend);
        if (current.val >= 10) {
            current.val -= 10;
            addend = 1;
        } else {
            addend = 0;
        }
        nextNode.next = current;
    }
    if (addend == 1) {
        nextNode = nextNode.next;
        nextNode.next = new ListNode(1);
    }
    result.log();


    return result;
};

describe("two numbers test", () => {
    test("case 2", () => {
        expect(addTwoNumbers(new ListNode(), new ListNode())).toEqual(new ListNode());
    })

    test("case 1", () => {
        let l1 = new ListNode(2, new ListNode(4, new ListNode(3)));
        let l2 = new ListNode(5, new ListNode(6, new ListNode(4)));
        let output = new ListNode(7, new ListNode(0, new ListNode(8)));
        expect(addTwoNumbers(l1, l2)).toEqual(output);
    });
    test("case 3", () => {
        let l1 = new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9)))))));
        let l2 = new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9))));
        let output = new ListNode(8, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(0, new ListNode(0, new ListNode(0, new ListNode(1))))))));
        expect(addTwoNumbers(l1, l2)).toEqual(output);
    });

})