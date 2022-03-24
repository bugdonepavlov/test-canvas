import { PixiComponent } from "@inlet/react-pixi";
import { Viewport as PixiViewport } from "pixi-viewport";
import { Application } from "pixi.js";
import { ViewportProps } from "./";

interface PixiComponentViewportProps extends ViewportProps {
  app: Application;
}

const PixiComponentViewport = PixiComponent("Viewport", {
  create: (props: PixiComponentViewportProps) => {
    const viewport = new PixiViewport({
      screenWidth: props.width,
      screenHeight: props.height,
      // хз для чего
      worldHeight: props.height * 2,
      worldWidth: props.width * 2,
      // вроде для анимации
      ticker: props.app.ticker,
      // хз для чего, вроде для управление драга и прочего
      interaction: props.app.renderer.plugins.interaction,
    });

    viewport
      .drag()
      .pinch()
      .wheel()
      .clampZoom({ minScale: 0.3, maxScale: 2 })
      .setZoom(0.5)
      .moveCenter(props.width, props.height);

    return viewport;
  },
  applyProps: (viewport, _oldProps, newProps) => {
    viewport.resize(newProps.width, newProps.height);
  },
});

export default PixiComponentViewport;
