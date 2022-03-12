export type FCArgs<TArgs extends any[], TReturn = any> = (
  ...args: TArgs
) => TReturn;

export const makeNode = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  data: any
) => {
  ctx.beginPath();
  ctx.arc(x, y, 30, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.stroke();
};

export const createText = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  data: any
) => {
  ctx.fillStyle = "black";
  ctx.fillText(data, x - 10, y + 5);
};

export const joinNode = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  toX: number,
  toY: number
) => {
  ctx.moveTo(x, y);
  ctx.lineTo(toX, toY);
  ctx.stroke();
};

export const roundedRect: FCArgs<
  [CanvasRenderingContext2D, number, number, number, number, number]
> = (ctx, x, y, width, height, radius) => {
  ctx.beginPath();
  ctx.fillStyle = "#041422";
  ctx.moveTo(x, y);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.fill();
};

export const makeCard: FCArgs<
  [CanvasRenderingContext2D, number, number, number, number, number]
> = (ctx, x, y, width, height, radius) => {
  roundedRect(ctx, x, y, width, height, radius);

  ctx.beginPath();
  ctx.arc(x, y, 14, 0, 2 * Math.PI);
  ctx.fillStyle = "#c4c4c4";
  ctx.fill();

  ctx.font = "16px Fira Sans Condensed";
  ctx.fillText("Super Team", x, y);
  ctx.fillText("0", x, y);
  ctx.fillStyle = "#fff";
  ctx.closePath();
};
