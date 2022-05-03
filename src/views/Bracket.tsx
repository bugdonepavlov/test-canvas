import React, { useRef } from "react";
import { Viewport as PixiViewport } from "pixi-viewport";
import Viewport from "../components/Viewport";
import { useWindowSize } from "../hooks/useWindowSize";
import Cards from "../components/Cards";
import Main, { Stage } from "../components/Main";
import Controls from "./Controls";
import MainSettings from "components/Modals/MainSettings";
import styles from "./styles.module.scss";

const resolution = Math.min(window.devicePixelRatio, 2);

const stageOptions = {
  antialias: resolution <= 1,
  autoDensity: true,
  backgroundColor: 0x000a14,
  resolution: resolution,
};

const Bracket = () => {
  const viewportRef = useRef<PixiViewport>(null);
  const [width, height] = useWindowSize();

  const zoomIn = () => {
    (viewportRef.current as PixiViewport).zoom((-width * 2) / 10, true);
  };

  const zoomOut = () => {
    (viewportRef.current as PixiViewport).zoom((width * 2) / 10, true);
  };

  return (
    <Main>
      <div className={styles.container}>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          options={stageOptions}
        >
          <Viewport ref={viewportRef} {...{ width, height }}>
            <Cards />
          </Viewport>
        </Stage>
        <Controls zoomIn={zoomIn} zoomOut={zoomOut} />
        <MainSettings />
      </div>
    </Main>
  );
};

export default Bracket;
