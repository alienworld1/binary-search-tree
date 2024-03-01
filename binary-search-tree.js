function Node(value, left=null, right=null) {
    return {value, left, right};
}

export default class BinarySearchTree {

    #root;

    constructor(array) {
        this.#root = buildTree(array);
    }
}