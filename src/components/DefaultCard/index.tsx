import React, { useContext } from "react";
import { PixiComponent } from "@inlet/react-pixi";
import { Graphics, Text, TextStyle } from "pixi.js";
import { BinaryTreeNode, TypeCard } from "utils/binaryTree";
import { MainAppContext } from "components/Main";

interface CardProps {
  node: BinaryTreeNode;
  onOpenAdd: any;
}

const styleText = new TextStyle({
  fill: "#637B93",
  letterSpacing: 0.3,
  fontSize: 14,
  lineHeight: 20,
});

const Card = PixiComponent<
  { positions: any; nodeKey: number; card: any },
  Graphics
>("Card", {
  create: () => new Graphics(),
  applyProps: (instance, oldProps, props) => {
    const { card } = props;
    const [x, y] = props.positions;
    const text = new Text(props.nodeKey.toString(), styleText);

    instance.removeChildren();
    instance
      .clear()
      .beginFill(0x041422)
      .drawRoundedRect(x, y, card.width, card.height, 4)
      .endFill();

    text.position.set(x, y);
    instance.addChild(text);

    instance.interactive = true;
    instance.buttonMode = true;
  },
  config: {},
});

const ConnectedLine = PixiComponent<
  {
    positions: any;
    node: any;
    card: any;
    line: any;
  },
  Graphics
>("ConnectedLine", {
  create: () => new Graphics(),
  applyProps: (instance, oldProps, props) => {
    const { node, positions, card, line } = props;
    const [x, y] = positions;
    instance.clear();
    instance.lineStyle(line.width, line.color);

    if (node.value.type === TypeCard.EMPTY) {
      instance.moveTo(x, y + card.height / 2);
      instance.lineTo(node.parent.value.positions[0], y + card.height / 2);
      return;
    }

    instance.moveTo(x + card.width, y + card.height / 2);
    instance.lineTo(
      node.parent.value.positions[0] - card.offset[0] / 2,
      y + card.height / 2
    );
    instance.lineTo(
      node.parent.value.positions[0] - card.offset[0] / 2,
      node.parent.value.positions[1] + card.height / 2
    );

    instance.moveTo(
      node.parent.value.positions[0],
      node.parent.value.positions[1] + card.height / 2
    );
    instance.lineTo(
      node.parent.value.positions[0] - card.offset[0] / 2,
      node.parent.value.positions[1] + card.height / 2
    );
  },
  config: {},
});

const DefaultCard: React.FC<CardProps> = (props) => {
  const { node } = props;
  const {
    state: { card, line },
  } = useContext(MainAppContext);

  return (
    <>
      {node.value.type !== TypeCard.EMPTY && (
        <Card positions={node.value.positions} nodeKey={node.key} card={card} />
      )}
      {node.parent && (
        <ConnectedLine
          positions={node.value.positions}
          node={node}
          card={card}
          line={line}
        />
      )}
    </>
  );
};

export default DefaultCard;
