// MEDIUM

// Given a binary tree root and a linked list with head as the first node. 

// Return True if all the elements in the linked list starting from the head correspond to some downward path connected in the binary tree otherwise return False.

// In this context downward path means a path that starts at some node and goes downwards.

// Constraints:

// The number of nodes in the tree will be in the range [1, 2500].
// The number of nodes in the list will be in the range [1, 100].
// 1 <= Node.val <= 100 for each node in the linked list and binary tree.

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

/** Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *    }
 * }
 */
import TreeNode from "./shared/treeNode";

// always check if the sequence continues on the right child, so there needs to be backtrack
// if the sequence doesn't continue at first, it might still be on the other side of the tree so there theres to be a full search
// always check if the current element is the start of the sequence

// edge case: searching for 4 2 4 8 and tree has 4 2 4 2 4 8

// one solution would be to create a list of the downward paths of the tree and check if they contain the sequence
// another, better, solution would be to follow the tree and when an element corresponding to the head is found, launch another function to check if a downward path is the list. That solves the edge case above since the checking function would be launched twice.

function isDownwardsPath(head: ListNode, root: TreeNode): boolean {
    // console.log("checking " + head.val + " " + root.val);
    if (root.val == head.val) {
        if (head.next == null) {
            return true;
        } else {
            let leftResult = false;
            let rightResult = false;
            if (root.left != null)
                leftResult = isDownwardsPath(head.next, root.left);
            if (root.right != null)
                rightResult = isDownwardsPath(head.next, root.right);
            return leftResult || rightResult;
        }
    }
    return false;
}

function isSubPath(head: ListNode | null, root: TreeNode | null): boolean {
    if (root.val == head.val) {
        if (isDownwardsPath(head, root)) {
            return true;
        }
    }

    let leftResult = false;
    let rightResult = false;
    if (root.left != null)
        leftResult = isSubPath(head, root.left);
    if (root.right != null)
        rightResult = isSubPath(head, root.right);
    return false || leftResult || rightResult;
};

describe("isSubPath test", () => {
    test("own 1", () => {
        const head = new ListNode(4, new ListNode(2, new ListNode(4, new ListNode(8))));
        const root = new TreeNode(
        1,
            new TreeNode(4,
                null,
                new TreeNode(2,
                    new TreeNode(1)
                )
            ),
            new TreeNode(4,
                new TreeNode(2,
                    new TreeNode(6,
                        new TreeNode(4,
                            new TreeNode(8)
                        )
                    ),
                    new TreeNode(4,
                        new TreeNode(2,
                            new TreeNode(3,
                                null,
                                new TreeNode(8)
                            )
                        ),
                        new TreeNode(3)
                    )
                )
            )
        )
        expect(isSubPath(head, root)).toEqual(false);
    });

    test("case 1", () => {
        const head = new ListNode(4, new ListNode(2, new ListNode(8)));
        const root = new TreeNode(
        1,
            new TreeNode(4,
                null,
                new TreeNode(2,
                    new TreeNode(1)
                )
            ),
            new TreeNode(4,
                new TreeNode(2,
                    new TreeNode(6),
                    new TreeNode(8,
                        new TreeNode(1),
                        new TreeNode(3)
                    )
                )
            )
        )
        expect(isSubPath(head, root)).toEqual(true);
    });
})