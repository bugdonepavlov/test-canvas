export type FCArgs<TArgs extends any[], TReturn = any> = (
  ...args: TArgs
) => TReturn;

export const roundedRect: FCArgs<
  [CanvasRenderingContext2D, number, number, number, number, number]
> = (ctx, x, y, width, height, radius) => {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.fillStyle = "#041422";
  ctx.strokeStyle = "#041422";
  ctx.fill();
  ctx.stroke();
};
