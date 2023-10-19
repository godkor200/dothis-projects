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

export const combinedKeywordsAndTags = (
  arr1: string | undefined | null,
  arr2: string | undefined | null,
) => {
  if (!arr1) arr1 = '';
  if (!arr2) arr2 = '';

  // if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
  //   throw new Error('타입 에러발생 ');
  // }

  return arr1.split(',').concat(arr2.split(','));
};
