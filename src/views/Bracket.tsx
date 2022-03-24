import React, { useRef } from "react";
import { Stage } from "@inlet/react-pixi";
import Viewport from "../components/Viewport";
import { useWindowSize } from "../hooks/useWindowSize";
import { tree } from "utils/binaryTree";
import Card from "../components/Card";

const stageOptions = {
  antialias: true,
  autoDensity: true,
  backgroundColor: 0x000a14,
};

const Bracket = () => {
  const viewportRef = useRef(null);
  const [width, height] = useWindowSize();
  const { size } = tree;

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      options={stageOptions}
    >
      <Viewport ref={viewportRef} {...{ width, height }}>
        {[...tree.preOrderTraversal()].map(({ positions, key }) => (
          <Card {...positions} {...size} key={key} />
        ))}
      </Viewport>
    </Stage>
  );
};

export default Bracket;
