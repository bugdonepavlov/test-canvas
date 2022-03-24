import React, { useCallback } from "react";
import { Container, Graphics } from "@inlet/react-pixi";

const Card = ({ x, y, width, height }: any) => {
  const draw = useCallback(
    (g) => {
      g.clear();

      g.beginFill(0xff000);
      g.drawRoundedRect(x, y, width, height, 4);
      g.endFill();
    },
    [x, y, width, height]
  );

  return (
    <Container>
      <Graphics draw={draw} />
    </Container>
  );
};

export default Card;
