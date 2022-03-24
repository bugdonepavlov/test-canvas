import { useApp } from "@inlet/react-pixi";
import React from "react";
import { Viewport as PixiViewport } from "pixi-viewport";
import PixiComponentViewport from "./PixiComponentViewport";

export interface ViewportProps {
  width: number;
  height: number;
  children?: any;
}

const Viewport = React.forwardRef<PixiViewport, ViewportProps>((props, ref) => {
  const app = useApp();

  return <PixiComponentViewport ref={ref} app={app} {...props} />;
});

export default Viewport;
