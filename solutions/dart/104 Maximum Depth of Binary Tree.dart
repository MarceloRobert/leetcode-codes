// Given the root of a binary tree, return its maximum depth.

// A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

// Input: root = [3,9,20,null,null,15,7]
// Output: 3

// Definition for a binary tree node.
class TreeNode {
  int val;
  TreeNode? left;
  TreeNode? right;
  TreeNode([this.val = 0, this.left, this.right]);
}

class Solution {
  int maxDepth(TreeNode? root) {
    if (root == null) {
      return 0;
    } else {
      int left = maxDepth(root.left);
      int right = maxDepth(root.right);
      if (left > right) {
        return left + 1;
      } else {
        return right + 1;
      }
    }
  }
}

void main(List<String> args) {
  Solution a = Solution();
  TreeNode tree = TreeNode(3, TreeNode(9, null, null),
      TreeNode(20, TreeNode(5, null, null), TreeNode(7, null, null)));
  print(a.maxDepth(tree));
}

// Comentários:
// quando quiser comparar dois valores por máximo, não usar "if x > y", usar max(x, y)