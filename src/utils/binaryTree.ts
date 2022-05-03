export enum TypeCard {
  DUAL = "DUAL",
  SINGLE = "SINGLE",
  EMPTY = "EMPTY",
}

interface ValueNode {
  name: string;
  type?: TypeCard;
  positions?: [number | null, number | null];
}

export class BinaryTreeNode {
  key: number;
  parent: any;
  left: BinaryTreeNode | null;
  right: BinaryTreeNode | null;
  value: ValueNode;

  constructor(key: number, parent: any, value: Omit<ValueNode, "positions">) {
    this.key = key;
    this.parent = parent;
    this.left = null;
    this.right = null;
    this.value = { ...value, positions: [null, null] };
  }

  setPositions(x: number, y: number) {
    this.value = { ...this.value, positions: [x, y] };
  }

  get isLeaf(): boolean {
    return this.left === null && this.right === null;
  }

  get hasChildren(): boolean {
    return !this.isLeaf;
  }
}

class BinaryTree {
  root: BinaryTreeNode;

  constructor(key = 1, name = "GRAND_FINAL") {
    const value = {
      name,
      type: TypeCard.DUAL,
    };

    this.root = new BinaryTreeNode(key, null, value);
  }

  setPositions = (node = this.root) => {
    return (props: any) => {
      const { positions, width, height, offset } = props;
      const [x, y] = positions;
      const [offsetX, offsetY] = offset;
      const maxHeightColumnWithCard = 8 * height + 8 * offsetY;
      const offsetHeight =
        maxHeightColumnWithCard / Math.pow(2, this.getParentCount(node) + 2);

      node.setPositions(x, y);

      if (node.left) {
        const { type } = node.left.value;
        const isSingle = type === TypeCard.SINGLE || type === TypeCard.EMPTY;

        const positions = [
          x - (offsetX + width),
          y - offsetHeight * Number(!isSingle),
        ];
        this.setPositions(node.left)({ ...props, positions });
      }

      if (node.right) {
        const positions = [x - (offsetX + width), y + offsetHeight];
        this.setPositions(node.right)({ ...props, positions });
      }

      return true;
    };
  };

  getParentCount = (node: BinaryTreeNode, count = 0): number => {
    if (!node.parent) return count;

    return this.getParentCount(
      node.parent,
      node.value.type === TypeCard.DUAL ? count + 1 : count
    );
  };

  *inOrderTraversal(node = this.root): Generator<BinaryTreeNode> {
    if (node.left) yield* this.inOrderTraversal(node.left);
    yield node;
    if (node.right) yield* this.inOrderTraversal(node.right);
  }

  *postOrderTraversal(node = this.root): Generator<BinaryTreeNode> {
    if (node.left) yield* this.postOrderTraversal(node.left);
    if (node.right) yield* this.postOrderTraversal(node.right);
    yield node;
  }

  *preOrderTraversal(node = this.root): Generator<BinaryTreeNode> {
    yield node;
    if (node.left) yield* this.preOrderTraversal(node.left);
    if (node.right) yield* this.preOrderTraversal(node.right);
  }

  insert(
    parentNodeKey: number,
    key: number,
    name: string,
    { left, right } = { left: true, right: true },
    type = TypeCard.DUAL
  ) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === parentNodeKey) {
        const canInsertLeft = left && node.left === null;
        const canInsertRight = right && node.right === null;

        if (!canInsertLeft && !canInsertRight) return false;

        if (
          (type === TypeCard.SINGLE || type === TypeCard.EMPTY) &&
          node.left === null
        ) {
          node.left = new BinaryTreeNode(key, node, { name, type });
          return true;
        }

        if (canInsertLeft) {
          node.left = new BinaryTreeNode(key, node, {
            name,
            type: TypeCard.DUAL,
          });
          return true;
        }

        if (canInsertRight) {
          node.right = new BinaryTreeNode(key, node, {
            name,
            type: TypeCard.DUAL,
          });
          return true;
        }
      }
    }

    return false;
  }

  remove(key: number) {
    for (let node of this.preOrderTraversal()) {
      // @ts-ignore
      if (node.left.key === key) {
        node.left = null;
        return true;
      }
      // @ts-ignore
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

export const tree = new BinaryTree();

// @ts-ignore
tree.insert(1, 11, "FINAL", { left: true });
// @ts-ignore
tree.insert(11, 111, "FINAL_1", { left: true });
// @ts-ignore
tree.insert(11, 112, "FINAL_1", { right: true });
// @ts-ignore
tree.insert(1, 12, "FINAL", { right: true });

// @ts-ignore
tree.insert(12, 113, "5_ROUND", { left: true }, TypeCard.SINGLE);
