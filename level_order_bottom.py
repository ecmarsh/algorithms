# 107. Binary Tree Level Order Traversal II

# Given a binary tree, return the
# bottom-up level order traversal of its nodes' values.
# (ie, from left to right, level by level from leaf to root).

# Example
# Input:
#      3
#    /   \
#   9    20
#       /  \
#     15    7
# Output:
# [
#   [15,7],
#   [9,20],
#   [3]
# ]

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

from collections import deque


class Solution:
    def levelOrderBottom(self, root: TreeNode) -> List[List[int]]:
        if not root:
            return root

        q = deque([root])
        res = deque()

        while q:
            size = len(q)
            level = []
            while size > 0:
                node = q.popleft()
                level.append(node.val)
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
                size -= 1
            res.appendleft(level)

        return list(res)
