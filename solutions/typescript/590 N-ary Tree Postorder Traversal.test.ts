// EASY

// Given the root of an n-ary tree, return the postorder traversal of its nodes' values.

// Nary-Tree input serialization is represented in their level order traversal. Each group of children is separated by the null value (See examples)

// Constraints:

// The number of nodes in the tree is in the range [0, 104].
// 0 <= Node.val <= 104
// The height of the n-ary tree is less than or equal to 1000.

// Challenge:

// Make it non-recursive


// Definition for node.
class _Node {
    val: number
    children: _Node[]
    constructor(val?: number, children?: _Node[]) {
        this.val = (val===undefined ? 0 : val)
        this.children = (children===undefined ? [] : children)
    }
}


function postorder(root: _Node | null): number[] {
    if (root == null) {
        return [];
    }
    
    let childrenSeq: number[] = [];

    class NodeStack {
        node: _Node
        childIndex: number
        constructor(node: _Node, childIndex:number) {
            this.node = node;
            this.childIndex = childIndex;
        }
    }

    var stack: NodeStack[] = [];
    var currentNode: _Node;
    var lastIndex: number;

    stack.push(new NodeStack(root, 0));
    while (stack.length != 0) {
        lastIndex = stack.length - 1;
        currentNode = stack[lastIndex].node;
        if (currentNode.children.length - 1 < stack[lastIndex].childIndex) {
            childrenSeq.push(currentNode.val);
            stack.pop();
        } else {
            stack[lastIndex].childIndex += 1;
            stack.push(new NodeStack(currentNode.children[stack[lastIndex].childIndex-1], 0));
        }
    }
    
    console.log(childrenSeq);
    return childrenSeq;
};

describe("nary tree postorder test", () => {
    test("case 1", () => {
        // 1, null, 3, 2, 4, null, 5, 6
        expect(postorder(new _Node(1, [new _Node(3, [new _Node(5), new _Node(6)]), new _Node(2), new _Node(4)]))).toEqual([5, 6, 3, 2, 4, 1]);
    });

    test("case 2", () => {
        // [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
        const testNode = 
            new _Node(1, [
                new _Node(2),
                new _Node(3, [
                    new _Node(6),
                    new _Node(7, [
                        new _Node(11, [
                            new _Node(14)
                        ])
                    ])
                ]),
                new _Node(4, [
                    new _Node(8, [
                        new _Node(12)
                    ])
                ]),
                new _Node(5, [
                    new _Node(9, [
                        new _Node(13)
                    ]),
                    new _Node(10)
                ]),
            ]
        );
        expect(postorder(testNode)).toEqual([2,6,14,11,7,3,12,8,4,13,9,10,5,1]);
    })
})