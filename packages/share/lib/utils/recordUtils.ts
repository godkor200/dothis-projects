export const recordSwap = <
  K extends string | number | symbol,
  V extends string | number | symbol,
>(
  record: Record<K, V>,
) => {
  const swapRecord: any = {};

  for (const key in record) {
    const value = record[key];
    swapRecord[value] = key;
  }

  return swapRecord as Record<V, K>;
};

