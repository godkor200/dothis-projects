export function cursorPaginationArgs<T>(take: number, cursor?: T) {
  const skip = cursor ? 1 : 0;

  return cursor
    ? {
        take,
        skip,
        cursor,
      }
    : {
        take,
      };
}
