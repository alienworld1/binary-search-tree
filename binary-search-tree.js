import Queue from "./queue.js";

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

const search = (value, node) => {
  if (!node) return null;

  if (node.data === value) {
    return node;
  }
  else if (value > node.data) {
    return search(value, node.right);
  }
  else {
    return search(value, node.left);
  }
}

const preorder = (callback, node) => {
  if (!node) {
    return null;
  }

  callback(node);
  preorder(callback, node.left);
  preorder(callback, node.right);
}

const inorder = (callback, node) => {
  if (!node) {
    return null;
  }

  inorder(callback, node.left);
  callback(node);
  inorder(callback, node.right);
}

const postorder = (callback, node) => {
  if (!node) {
    return null;
  }

  postorder(callback, node.left);
  postorder(callback, node.right);
  callback(node);
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

    find(value) {
      return search(value, this.#root);
    }
    
    levelOrder(callback) {
      const nodeQueue = new Queue();
      let node = this.#root;
      const result = [];

      nodeQueue.enqueue(node);

      while (!nodeQueue.isEmpty) {
        node = nodeQueue.dequeue();
        if (node.left) {
          nodeQueue.enqueue(node.left);
        }

        if (node.right) {
          nodeQueue.enqueue(node.right);
        }

        if (callback) {
          callback(node);
        }
        else {
          result.push(node.data);
        }
      }

      if (!callback) {
        return result;
      }
    }

    preOrder(callback) {
      const array = [];

      if (!callback) {
        callback = node => {
          array.push(node.data);
        };
      }

      preorder(callback, this.#root);

      if (array.length > 0) return array;
    }

    inOrder(callback) {
      const array = [];

      if (!callback) {
        callback = node => {
          array.push(node.data);
        };
      }

      inorder(callback, this.#root);

      if (array.length > 0) return array;
    }

    postOrder(callback) {
      const array = [];

      if (!callback) {
        callback = node => {
          array.push(node.data);
        };
      }

      postorder(callback, this.#root);

      if (array.length > 0) return array;
    }

    height(node) {
      let leftCount = 0;
      let rightCount = 0;

      if (node.left) {
        leftCount++;
        leftCount += this.height(node.left);
      }

      if (node.right) {
        rightCount++;
        rightCount += this.height(node.right);
      }

      return (leftCount > rightCount)? leftCount: rightCount;
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
