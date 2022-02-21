import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { roundedRect } from "./utils";

interface IProps {
  width: number;
  height: number;
}

const Canvas: React.FC<Partial<IProps>> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      ctx.scale(devicePixelRatio, devicePixelRatio);

      document.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });

      const draw = () => {
        roundedRect(ctx, 12, 12, 276, 45, 4);
        ctx.beginPath();
        ctx.arc(34, 34, 14, 0, 2 * Math.PI);
        ctx.fillStyle = "#c4c4c4";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.font = "16px, Fira Sans Condensed";
        ctx.fillText("Super Team", 64, 34);
        ctx.fillText("0", 64 * 2, 34);
        ctx.fillStyle = "#fff";
        ctx.closePath();
      };
      draw();
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
