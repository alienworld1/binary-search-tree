function Node(data, left=null, right=null) {
    return {data, left, right};
}

const buildTree = (array, low = 0, high) => {
    if (low > high) {
        return null;
    }

    high = high ?? array.length - 1;
    const mid = Math.trunc((low + high) / 2);
    const root = Node(
        array[mid],
        buildTree(array, low, mid - 1),
        buildTree(array, mid + 1, high)
    );
    return root;
}

export default class BinarySearchTree {

    #root;

    constructor(array) {
        const sorted = array.sort((a, b) => a - b);
        this.#root = buildTree(sorted);
    }

    get root() {
        return this.#root;
    }


}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

export {prettyPrint};
