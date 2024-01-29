export function handleZeroDivision(a: number, b: number) {
  if (b === 0) {
    return 0;
  }

  return Math.round((a / b) * 100) / 100;
}
