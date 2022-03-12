type Key = string | number | null;

type Value = {
  x: number;
  y: number;
  name: string;
};

type CardSize = {
  width: number;
  height: number;
};

const CARD_SIZES = {
  width: 276,
  height: 100,
};

class BinaryTreeNode {
  left: boolean | null;
  right: boolean | null;
  key: Key;
  value: Value;
  parent: Key;
  cardSize: CardSize;

  constructor(key: Key, value: Value, parent = null, cardSize: CardSize) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
    this.cardSize = cardSize;
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
  cardSize: CardSize;

  constructor(key: number, value: Value, cardSize: CardSize) {
    this.root = new BinaryTreeNode(key, value, null, cardSize);
    this.cardSize = cardSize;
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
    name: string,
    { left, right } = { left: true, right: true }
  ) {
    for (let node of this.preOrderTraversal()) {
      // console.log("===node", node);
      if (node.key === parentNodeKey) {
        const canInsertLeft = left && node.left === null;
        const canInsertRight = right && node.right === null;

        if (!canInsertLeft && !canInsertRight) return false;

        if (canInsertLeft) {
          // console.log("====§§", node.value.x - (this.cardSize.width + 100));
          node.left = new BinaryTreeNode(
            key,
            {
              name,
              x: node.value.x - (this.cardSize.width + 100),
              y: node.value.y - 140,
            },
            node,
            this.cardSize
          );
          return true;
        }

        if (canInsertRight) {
          node.right = new BinaryTreeNode(
            key,
            {
              name,
              x: node.value.x - (this.cardSize.width + 100),
              y: node.value.y + 140,
            },
            node,
            this.cardSize
          );
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

// const matches = {
//   ["ID_1"]: {
//     node_id: "ID_1",
//     node_group_id: 23,
//     name: "FINAL",
//     team_1_wins: null,
//     team_2_wins: null,
//   },
// };

// "571": {
//   node_id: 571,
//   node_group_id: 23, // айди группы, чтоб можно было все привязать, думаю использовать какую-то карту для отображения и туда сувать айди
//   winning_node_id: 574,
//   losing_node_id: 583,
//   actual_time: 1634108400,
//   scheduled_time: 1634108400, // дата начала турика
//   node_type: 2,
//   has_started: false,
//   is_completed: false,
//   team_1_wins: 2, // две победы
//   team_2_wins: 1, // одна
//   matches: [{
//     match_id: "6234234234",
//     winning_team_id: 15,
//   }, {
//     match_id: "6234234234",
//     winning_team_id: 15,
//   }, {
//     match_id: "6234234234",
//     winning_team_id: 15,
//   }],
// }
export const tree = new BinaryTree(
  1,
  {
    name: "GRAND_FINAL",
    x: window.innerWidth - (120 + CARD_SIZES.width),
    y: window.innerHeight / 2,
  },
  CARD_SIZES
);

// @ts-ignore
tree.insert(1, 11, "FINAL", { left: true });
// @ts-ignore
tree.insert(1, 12, "FINAL", { right: true });

tree.insert(11, 111, "SEMI_FINAL");
tree.insert(11, 112, "SEMI_FINAL");
tree.insert(12, 121, "SEMI_FINAL");
tree.insert(12, 122, "SEMI_FINAL");

// tree.insert(111, 1111, "QUATER_FINAL");
// tree.insert(111, 1111, "QUATER_FINAL");
// tree.insert(111, 1112, "QUATER_FINAL");
// tree.insert(111, 1112, "QUATER_FINAL");
