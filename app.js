import BinarySearchTree, {prettyPrint} from "./binary-search-tree.js";

const randomArray = (length) =>  Array.from({length}, () => Math.trunc(Math.random() * 100));
const array = randomArray(32);

const bst = new BinarySearchTree(array);

console.log('Binary Search Tree');
prettyPrint(bst.root);

console.log({balanced: bst.isBalanced});

console.log({
    levelOrder: bst.levelOrder(),
    preOrder: bst.preOrder(),
    inOrder: bst.inOrder(),
    postOrder: bst.postOrder(),
});

for (const i of [106, 110, 115, 120]) {
    bst.insert(i);
}

console.log('Unbalancing the tree...');
prettyPrint(bst.root);
console.log({balanced: bst.isBalanced});

console.log('Rebalancing the tree');
bst.rebalance();
prettyPrint(bst.root);
console.log({balanced: bst.isBalanced});
console.log({
    levelOrder: bst.levelOrder(),
    preOrder: bst.preOrder(),
    inOrder: bst.inOrder(),
    postOrder: bst.postOrder(),
});
