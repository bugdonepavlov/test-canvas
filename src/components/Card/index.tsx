import React from "react";
import { PixiComponent, useApp } from "@inlet/react-pixi";
import { InteractionEvent, Graphics, Text, TextStyle } from "pixi.js";

interface CardProps {
  x: number;
  y: number;
  width: number;
  height: number;
  node: any;
}

const styleText = new TextStyle({
  fill: "#637B93",
  letterSpacing: 0.3,
  fontSize: 14,
  lineHeight: 20,
});

interface GenerateTextProps {
  name: string;
  score: string;
}

const generateText = ({ name, score }: GenerateTextProps) => {
  const [teamName, scoreName] = [
    new Text(name, styleText),
    new Text(score, styleText),
  ];

  return [teamName, scoreName];
};

const WIDTH = 236;
const HEIGHT = 94;

const Card = PixiComponent<CardProps, Graphics>("Card", {
  create: () => new Graphics(),
  applyProps: (instance, oldProps, props) => {
    const { x, y, width, height, node } = props;
    const [teamName1, scoreName1] = generateText({
      name: "team secret",
      score: "0",
    });
    const [teamName2, scoreName2] = generateText({
      name: "OG",
      score: "1",
    });

    const drawLine = () => {
      instance.lineStyle(2, 0x5f72a6);

      if (node.left) {
        instance.moveTo(x - 5, y + HEIGHT / 2);
        instance.lineTo(x - 25, y + HEIGHT / 2);
        instance.lineTo(
          node.left.positions.x + WIDTH + 95,
          node.left.positions.y + HEIGHT / 2
        );
        instance.lineTo(
          node.left.positions.x + WIDTH + 5,
          node.left.positions.y + HEIGHT / 2
        );
      }

      if (node.right) {
        instance.moveTo(x - 5, y + HEIGHT / 2);
        instance.lineTo(x - 25, y + HEIGHT / 2);
        instance.lineTo(
          node.right.positions.x + WIDTH + 95,
          node.right.positions.y + HEIGHT / 2
        );
        instance.lineTo(
          node.right.positions.x + WIDTH + 5,
          node.right.positions.y + HEIGHT / 2
        );
      }
    };

    instance
      .clear()
      .beginFill(0x041422)
      .drawRoundedRect(x, y, WIDTH, 45, 4)
      .drawRoundedRect(x, y + 49, WIDTH, 45, 4)
      .endFill();

    drawLine();

    teamName1.position.set(x + 24, y + 12);
    scoreName1.position.set(x + (WIDTH - 24), y + 12);

    teamName2.position.set(x + 24, y + 12 + 49);
    scoreName2.position.set(x + (WIDTH - 24), y + 12 + 49);

    instance.addChild(teamName1, scoreName1, teamName2, scoreName2);

    instance.interactive = true;
    instance.buttonMode = true;
  },
  config: {},
});

export default Card;
