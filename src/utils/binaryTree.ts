const CARD_SIZES = {
  width: 276,
  height: 80,
  offset: {
    x: 40,
    y: 60,
  },
};

type Size = {
  width: number;
  height: number;
};

type Offset = {
  x: number;
  y: number;
};

interface IPropsTree {
  key?: number;
  name?: string;
  size: Size;
  offset: Offset;
  maxCardInColumn?: number;
}

interface INodeTree extends IPropsTree {
  parent?: any;
  left: BinaryTreeNode | null;
  right: BinaryTreeNode | null;
  positions: {
    x: number;
    y: number;
  };
}

export class BinaryTreeNode {
  left: INodeTree["left"];
  right: INodeTree["right"];
  name: INodeTree["name"];
  key: INodeTree["key"];
  positions: INodeTree["positions"];
  parent: BinaryTreeNode;

  constructor({
    key,
    name,
    parent = null,
    positions,
  }: Omit<
    INodeTree,
    "left" | "right" | "maxCardInColumn" | "size" | "offset"
  >) {
    this.key = key;
    this.name = name;
    this.parent = parent;
    this.left = null;
    this.right = null;
    this.positions = positions;
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
  maxCardInColumn: number;
  maxHeightColumnWithCard: number = 0;
  size: Size = {
    width: 0,
    height: 0,
  };
  offset: Offset = {
    x: 0,
    y: 0,
  };

  constructor({
    key = 1,
    name = "GRAND_FINAL",
    size,
    offset,
    maxCardInColumn = 8,
  }: IPropsTree) {
    // TODO generate dynamic max cards in column
    this.maxCardInColumn = maxCardInColumn;
    this.maxHeightColumnWithCard =
      this.maxCardInColumn * size.height + this.maxCardInColumn * offset.y;
    this.size = size;
    this.offset = offset;

    this.root = new BinaryTreeNode({
      key,
      name,
      positions: {
        x: window.innerWidth - (this.offset.x + this.size.width),
        y: this.maxHeightColumnWithCard / 2,
      },
    });
  }

  getParentCount(node: BinaryTreeNode, count = 0): number {
    if (!node.parent) return count;

    return this.getParentCount(node.parent, count + 1);
  }

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
    { left, right } = { left: true, right: true }
  ) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === parentNodeKey) {
        const offsetHeight =
          this.maxHeightColumnWithCard /
          Math.pow(2, this.getParentCount(node) + 2);
        const canInsertLeft = left && node.left === null;
        const canInsertRight = right && node.right === null;

        if (!canInsertLeft && !canInsertRight) return false;

        if (canInsertLeft) {
          node.left = new BinaryTreeNode({
            key,
            name,
            positions: {
              x: node.positions.x - (this.offset.x + this.size.width),
              y: node.positions.y - offsetHeight,
            },
            parent: node,
          });
          return true;
        }

        if (canInsertRight) {
          node.right = new BinaryTreeNode({
            key,
            name,
            positions: {
              x: node.positions.x - (this.offset.x + this.size.width),
              y: node.positions.y + offsetHeight,
            },
            parent: node,
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

export const tree = new BinaryTree({
  size: {
    width: CARD_SIZES.width,
    height: CARD_SIZES.height,
  },
  offset: { ...CARD_SIZES.offset },
});

// @ts-ignore
tree.insert(1, 11, "FINAL", { left: true });
// @ts-ignore
tree.insert(1, 12, "FINAL", { right: true });

tree.insert(11, 111, "SEMI_FINAL");
tree.insert(11, 112, "SEMI_FINAL");
tree.insert(12, 121, "SEMI_FINAL");
tree.insert(12, 122, "SEMI_FINAL");

tree.insert(121, 1111, "QUATER_FINAL");
tree.insert(121, 1112, "QUATER_FINAL");
tree.insert(122, 1113, "QUATER_FINAL");
tree.insert(122, 1114, "QUATER_FINAL");
