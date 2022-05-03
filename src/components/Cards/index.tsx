import { useContext, useLayoutEffect, useState } from "react";
import { useApp } from "@inlet/react-pixi";
import { MainAppContext } from "components/Main";
import DefaultCard from "../DefaultCard";
import { BinaryTreeNode, tree } from "utils/binaryTree";

const Cards = () => {
  const [data, setData] = useState<BinaryTreeNode[]>([]);
  const app = useApp();
  const screenWidth = app.renderer.screen.width;
  const { state } = useContext(MainAppContext);
  const { maxHeightColumnWithCard } = state;

  useLayoutEffect(() => {
    const { offset, width } = state.card;
    const [offsetX] = offset;

    tree.setPositions()({
      positions: [screenWidth - (offsetX - width), maxHeightColumnWithCard / 2],
      ...state.card,
    });
    setData([...tree.postOrderTraversal()]);
  }, [state.card, maxHeightColumnWithCard, screenWidth]);

  return (
    <>
      {data.map((node) => (
        <DefaultCard key={node.key} node={node} onOpenAdd={() => {}} />
      ))}
    </>
  );
};

export default Cards;
