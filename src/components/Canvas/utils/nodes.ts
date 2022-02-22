export const generateColumns = (ctx: CanvasRenderingContext2D, row = 3) => {
  // 276
  const columnWidth = 320;
  const matchCount = 8;

  return Array.from({ length: row }, (_, i) => i).reduce(
    (acc: Record<string, { x: number; y: number; matches: number }>, idx) => {
      return {
        ...acc,
        [`row_${idx + 1}`]: {
          x: idx * columnWidth + 24,
          y: 60,
          matches: Math.floor(matchCount / (idx + 1)),
        },
      };
    },
    {} as Record<string, { x: number; y: number; matches: number }>
  );
};
