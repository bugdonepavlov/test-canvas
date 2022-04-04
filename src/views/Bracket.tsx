import React, { useRef } from "react";
import { Stage } from "@inlet/react-pixi";
import Viewport from "../components/Viewport";
import { useWindowSize } from "../hooks/useWindowSize";
import { tree } from "utils/binaryTree";
import Card from "../components/Card";

const resolution = Math.min(window.devicePixelRatio, 2);

const stageOptions = {
  antialias: resolution <= 1,
  autoDensity: true,
  backgroundColor: 0x000a14,
  resolution: resolution,
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
        {[...tree.preOrderTraversal()].map((node) => {
          const { positions, key } = node;

          return <Card {...positions} {...size} key={key} node={node} />;
        })}
      </Viewport>
    </Stage>
  );
};

export default Bracket;
