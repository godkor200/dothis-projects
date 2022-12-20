export function flip(f) {
  return function () {
    const argumentsA = arguments;
    return function () {
      const argumentsB = arguments;
      return f.apply(this, argumentsA).apply(this, argumentsB);
    };
  };
}
