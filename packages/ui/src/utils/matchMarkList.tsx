import Hangul from 'hangul-js';
import type { ReactNode } from 'react';
import { Fragment } from 'react';

type MatchRange = Array<[number, number]>;

export function matchMarkList(list: string[], searchText: string) {
  const markedList: [text: string, node: ReactNode][] = [];
  if (searchText === '') return [];
  for (const text of list) {
    const matchResult = Hangul.rangeSearch(text, searchText) as MatchRange;

    if (matchResult.length > 0)
      markedList.push([text, rangeMarking(matchResult, text)]);
  }
  return markedList;
}
export function matchMark(text: string, searchText: string) {
  const matchResult = Hangul.rangeSearch(text, searchText) as MatchRange;
  if (matchResult.length === 0) return text;

  return rangeMarking(matchResult, text);
}

export function rangeMarking(matchRange: MatchRange, text: string) {
  return matchRange.map((range, i) => {
    const end = range[1] + 1;
    const nextRange = matchRange[i + 1];
    // @ts-ignore
    const reduplicatedMark = i > 0 && matchRange[i][1] === matchRange[i - 1][1];
    return (
      <Fragment key={`${text}-${i}`}>
        {i === 0 && text.slice(0, range[0])}
        {!reduplicatedMark && (
          <mark>{String.prototype.slice.apply(text, [range[0], end])}</mark>
        )}
        {text.slice(end, nextRange ? nextRange[0] : text.length)}
      </Fragment>
    );
  });
}
