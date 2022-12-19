export function thousandsSeparators(num: string | number) {
  const numParts = (typeof num === 'string' ? num : num.toString()).split('.');
  if (!numParts[0]) return String(num);
  numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return numParts.join('.');
}
export function removeSeparators(str: string) {
  return str.replaceAll(',', '');
}
export function random(length = 7) {
  let n = Math.random();
  for (let i = 0; i < length; i++) {
    n = n * 10;
  }
  return Math.round(n);
}
export const predRandom =
  (pred: (num: number) => boolean) =>
  (max: number) =>
  () => {
    let n: number;

    while (true) {
      n = random(length);
      if (pred(n)) return n;
    }
  };
