import { CARD_HEIGHT, CARD_OFFSET, CARD_WIDTH } from "constants/sizes";
import React from "react";
import { useState } from "react";
import { tree } from "utils/binaryTree";
import styles from "./styles.module.scss";

interface IProps {
  instance: any;
  onCloseAdd: any;
  node: any;
}

const AddedCard: React.FC<IProps> = ({ onCloseAdd, instance, node }) => {
  const [cardType, setCardType] = useState("");
  // console.log("===instance===", instance, node);

  const onClick = (type: string) => {
    const [offsetX, offsetY] = CARD_OFFSET;

    const positions = [
      node.positions[0] - (CARD_OFFSET[0] + CARD_WIDTH),
      node.positions[1],
    ];

    if (type === "blank") {
      instance
        .clear()
        .lineStyle(2, 0x80d6ff)
        .moveTo(positions[0], positions[1] + CARD_HEIGHT / 2)
        .lineTo(positions[0] + CARD_WIDTH, positions[1] + CARD_HEIGHT / 2);

      setCardType(type);
      return;
    }

    if (type === "single") {
      instance
        .clear()
        .beginFill(0x80d6ff)
        .drawRoundedRect(...positions, CARD_WIDTH, CARD_HEIGHT / 2 - 2, 4)
        .drawRoundedRect(
          positions[0],
          positions[1] + CARD_HEIGHT / 2 + 4,
          CARD_WIDTH,
          CARD_HEIGHT / 2 - 2,
          4
        )
        .lineStyle(2, 0x80d6ff)
        .moveTo(positions[0] + CARD_WIDTH + 5, positions[1] + CARD_HEIGHT / 2)
        .lineTo(
          positions[0] + CARD_WIDTH + 5 + offsetX / 2,
          positions[1] + CARD_HEIGHT / 2
        )
        .endFill();

      setCardType(type);
      return;
    }
  };

  return (
    <div className={styles.rightBar}>
      <h2>Settings</h2>

      <h3>name card</h3>

      <div className={styles.cards}>
        <div className={styles.blank} onClick={() => onClick("blank")}></div>
        <div className={styles.single} onClick={() => onClick("single")}></div>
        <div className={styles.double}>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className={styles.btns}>
        <button
          type="button"
          onClick={() => {
            instance.clear();
            onCloseAdd();
          }}
        >
          cancel
        </button>
        <button type="button">accept</button>
      </div>
    </div>
  );
};

export default AddedCard;
