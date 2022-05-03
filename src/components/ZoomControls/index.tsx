import React from "react";
import styles from "./styles.module.scss";

interface IProps {
  zoomIn: VoidFunction;
  zoomOut: VoidFunction;
}

const Controls: React.FC<IProps> = ({ zoomIn, zoomOut }) => {
  return (
    <div className={styles.controls}>
      <button type="button" onClick={zoomOut}>
        -
      </button>
      <span>100%</span>
      <button type="button" onClick={zoomIn}>
        +
      </button>
    </div>
  );
};

export default Controls;
