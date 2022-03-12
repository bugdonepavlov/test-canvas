import { RefObject, useCallback, useEffect, useState } from "react";
import { makeCard, roundedRect } from "./utils";
import { tree } from "./utils/binaryTree";

interface IProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  backgroundCanvas?: string;
}

const useCanvas = ({ canvasRef, backgroundCanvas = "#000a14" }: IProps) => {
  const [camera, setCamera] = useState(1);

  const draw = useCallback((ctx) => {
    console.log("=====", [...tree.preOrderTraversal()]);

    for (let node of tree.preOrderTraversal()) {
      makeCard(
        ctx,
        node.value.x,
        node.value.y,
        node.cardSize.width,
        node.cardSize.height,
        4
      );
    }
  }, []);

  // const adjustZoom = useCallback(() => {
  //   setCamera
  // }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      // @ts-ignore
      window.ctx = ctx;
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.padding = "0";
      canvas.style.margin = "0";
      canvas.style.border = "0";
      canvas.style.background = "transparent";
      canvas.style.position = "absolute";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";

      // ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
      // ctx.scale(camera, camera);
      // ctx.translate(
      //   -window.innerWidth / 2 + window.innerWidth / 2,
      //   -window.innerHeight / 2 + window.innerHeight / 2
      // );
      // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.fillStyle = backgroundCanvas;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // ctx.scale(2*devicePixelRatio, devicePixelRatio);
      // ctx.translate(-200, -400);
      // roundedRect(ctx, 40, 40, 240, 100, 4);
      // ctx.translate(-camera.x, -camera.y);
      // ctx.translate(-200, 1000);

      // document.addEventListener("resize", () => {
      //   canvas.width = window.innerWidth;
      //   canvas.height = window.innerHeight;
      //   draw(ctx);
      // });

      draw(ctx);
    }
  }, [draw, backgroundCanvas, canvasRef, camera]);

  return { a: 1 };
};

export default useCanvas;
