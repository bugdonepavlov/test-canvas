import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { makeCard } from "./utils";
import { tree } from "./utils/binaryTree";

interface IProps {
  width: number;
  height: number;
}

const Canvas: React.FC<Partial<IProps>> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  console.log(
    "=====",
    [...tree.preOrderTraversal()],
    [...tree.inOrderTraversal()],
    [...tree.postOrderTraversal()]
  );

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      ctx.fillStyle = "#000a14";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.scale(devicePixelRatio, devicePixelRatio);

      document.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // draw();
      });

      // const draw = () => {
      //   const columns = generateColumns(ctx);

      //   Object.keys(columns).forEach((key) => {
      //     const { matches, x, y } = columns[key];

      //     Array.from({ length: matches }).forEach((_, i) => {
      //       makeCard(ctx, x, y * i + 15, 276, 45, 4);

      //       if ((i + 1) % 2 === 0) {
      //         const yOverWidthPrev = y * (i - 1) + 15;
      //         const xOverWidth = x + 276;

      //         ctx.strokeStyle = "#fff";
      //         ctx.moveTo(xOverWidth, yOverWidthPrev + 23);
      //         ctx.lineTo(xOverWidth, yOverWidthPrev + 23);
      //         ctx.lineTo(xOverWidth + 12, yOverWidthPrev + 23);
      //         ctx.lineTo(xOverWidth + 12, y * i + 23 + 15);
      //         ctx.lineTo(xOverWidth, y * i + 23 + 15);
      //         ctx.stroke();
      //       }
      //     });
      //   });
      // };
      // draw();
    }
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};

Canvas.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export default Canvas;
