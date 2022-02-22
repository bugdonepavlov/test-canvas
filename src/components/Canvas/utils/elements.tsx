export type FCArgs<TArgs extends any[], TReturn = any> = (
  ...args: TArgs
) => TReturn;

export const roundedRect: FCArgs<
  [CanvasRenderingContext2D, number, number, number, number, number]
> = (ctx, x, y, width, height, radius) => {
  ctx.beginPath();
  ctx.fillStyle = "#041422";
  ctx.moveTo(x, y + radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.fill();
};

export const makeCard: FCArgs<
  [CanvasRenderingContext2D, number, number, number, number, number]
> = (ctx, x, y, width, height, radius) => {
  roundedRect(ctx, x, y, 276, 45, 4);

  ctx.beginPath();
  ctx.arc(x + 24, y + 22.5, 14, 0, 2 * Math.PI);
  ctx.fillStyle = "#c4c4c4";
  ctx.fill();

  ctx.font = "16px Fira Sans Condensed";
  ctx.fillText("Super Team", x + 46, y + 27);
  ctx.fillText("0", x + 260, y + 27);
  ctx.fillStyle = "#fff";
  ctx.closePath();
};
