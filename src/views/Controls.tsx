import React, { useContext } from "react";
import { MainAppContext } from "components/Main";
import AddedCard from "components/AddedCard";
import ZoomControls from "components/ZoomControls";

interface Props {
  zoomOut: any;
  zoomIn: any;
}

const Controls: React.FC<Props> = ({ zoomOut, zoomIn }) => {
  // const { modal } = useContext(MainAppContext);
  // const { isOpenAdd, onCloseAdd } = modal;

  return (
    <>
      <ZoomControls zoomOut={zoomOut} zoomIn={zoomIn} />
      {/* {isOpenAdd.openModal && (
        <RightBar onCloseAdd={onCloseAdd} {...isOpenAdd.args} />
      )} */}
    </>
  );
};

export default Controls;
