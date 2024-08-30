/**
 * ref:
 *  비디오 발행일 제한 6개월
 */

export const appGlobalConfig = {
  videoPublishedPeriodConstraint: 6,
  //비디오 히스토리 데이터스트림 임시날짜
  videoHistoryPeriodConstraint: new Date('2024-04-13').toISOString(),
};
