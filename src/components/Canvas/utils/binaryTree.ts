type Key = string | number | null;

class BinaryTreeNode {
  left: boolean | null;
  right: boolean | null;
  key: Key;
  value: Key;
  parent: Key;

  constructor(key: Key, value = key, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  get isLeaf() {
    return this.left === null && this.right === null;
  }

  get hasChildren() {
    return !this.isLeaf;
  }
}

class BinaryTree {
  root: BinaryTreeNode;
  key: any;

  constructor(key: any, value = key) {
    this.root = new BinaryTreeNode(key, value);
  }

  // @ts-ignore
  *inOrderTraversal(node = this.root) {
    // @ts-ignore
    if (node.left) yield* this.inOrderTraversal(node.left);
    yield node;
    // @ts-ignore
    if (node.right) yield* this.inOrderTraversal(node.right);
  }

  // @ts-ignore
  *postOrderTraversal(node = this.root) {
    // @ts-ignore
    if (node.left) yield* this.postOrderTraversal(node.left);
    // @ts-ignore
    if (node.right) yield* this.postOrderTraversal(node.right);
    yield node;
  }

  // @ts-ignore
  *preOrderTraversal(node = this.root) {
    yield node;
    // @ts-ignore
    if (node.left) yield* this.preOrderTraversal(node.left);
    // @ts-ignore
    if (node.right) yield* this.preOrderTraversal(node.right);
  }

  insert(
    parentNodeKey: number,
    key: string | number,
    value = key,
    { left, right } = { left: true, right: true }
  ) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === parentNodeKey) {
        const canInsertLeft = left && node.left === null;
        const canInsertRight = right && node.right === null;

        if (!canInsertLeft && !canInsertRight) return false;

        if (canInsertLeft) {
          node.left = new BinaryTreeNode(key, value, node);
          return true;
        }
        if (canInsertRight) {
          node.right = new BinaryTreeNode(key, value, node);
          return true;
        }
      }
    }

    return false;
  }

  remove(key: number) {
    for (let node of this.preOrderTraversal()) {
      if (node.left.key === key) {
        node.left = null;
        return true;
      }
      if (node.right.key === key) {
        node.right = null;
        return true;
      }
    }
    return false;
  }

  find(key: number) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === key) return node;
    }
    return undefined;
  }
}

export const tree = new BinaryTree(1, "GRAND_FINAL");

// @ts-ignore
tree.insert(1, 2, "FINAL", { left: true });
// @ts-ignore
tree.insert(1, 3, "FINAL", { right: true });

tree.insert(2, 4, "SEMI_FINAL");
tree.insert(2, 5, "SEMI_FINAL");

tree.insert(4, 6, "QUATER_FINAL");
tree.insert(4, 7, "QUATER_FINAL");
tree.insert(5, 8, "QUATER_FINAL");
tree.insert(5, 9, "QUATER_FINAL");
