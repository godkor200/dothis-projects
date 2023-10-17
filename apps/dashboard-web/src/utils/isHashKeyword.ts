export function isHashKeyword(arr: Array<string> | null | undefined) {
  if (arr === null || arr === undefined) {
    return false;
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].endsWith('#')) {
      return true; // '#'이 발견되면 true 반환
    }
  }
  return false; // 모든 문자열에서 '#'을 찾지 못하면 false 반환
}
