// EASY

// Given the root of a binary tree, return the postorder traversal of its nodes' values.

// Example 1:
// Input: root = [1,null,2,3]
// Output: [3,2,1]

// Example 2:
// Input: root = []
// Output: []

// Example 3:
// Input: root = [1]
// Output: [1]

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

function postorderTraversal(root: TreeNode | null): number[] {
    if (root == null) {
        return [];
    }

    var final = postorderTraversal(root.left).concat(postorderTraversal(root.right)).concat(root.val);
    console.log(final);
    return final;
};

describe("BTree postorder test", () => {
    test("sub 1", () => {
        expect(postorderTraversal(new TreeNode(3, new TreeNode(1), new TreeNode(2)))).toEqual([1, 2, 3]);
    });

    test("case 1", () => {
        expect(postorderTraversal(new TreeNode(1, null, new TreeNode(2, new TreeNode(3))))).toEqual([3, 2, 1]);
    });

    test("case 2", () => {
        expect(postorderTraversal(null)).toEqual([]);
    });

    test("case 3", () => {
        expect(postorderTraversal(new TreeNode(1, null, null))).toEqual([1]);
    });

}) 