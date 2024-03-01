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

const insert = (data, node) => {
  if (!node) {
    return Node(data);
  }

  if (data === node.data) {
    return node;
  }

  else if (data > node.data) {
    node.right = insert(data, node.right);
  }

  else {
    node.left = insert(data, node.left);
  }

  return node;
}

const inorderSuccessor = (node) => {
  let current = node;
  while (current.left) {
    current = current.left;
  }
  return current;
}

const deleteItem = (root, data) => {
  if (!root) return root;

  if (data < root.data) {
    root.left = deleteItem(root.left, data);
  }
  else if (data > root.data) {
    root.right = deleteItem(root.right, data);
  }
  else {
    if (!root.left) {
      const temp = root.right;
      root = null;
      return temp;
    }

    else if (!root.right) {
      const temp = root.left;
      root = null;
      return temp;
    }

    else {
      const temp = inorderSuccessor(root.right);
      root.data = temp.data;
      root.right = deleteItem(root.right, temp.data);
    }
  }

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

    insert(data) {
      insert(data, this.#root);
    }

    deleteItem(data) {
      this.#root = deleteItem(this.#root, data);
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
