import { VideoAggregateService } from '@Apps/modules/video/service/video.aggregate.service';
import { fourToTen, oneToTen } from '@Apps/modules/video/service/__dummy__';

let handler: VideoAggregateService;
beforeEach(() => {
  handler = new VideoAggregateService();
});
describe('calculateIncrease 함수', () => {
  it('겹치는 일짜를 가진 쿼리로 받아진 데이터는 겹치는 날짜가 있어야 한다.', async () => {
    /**
     * oneToTen 은 12월 1일에서 12월 10일까지
     * fourToTen 은 12월 4일에서 12월 10일까지
     * 날짜가 겹쳐야함
     */
    const res = handler.calculateIncrease(oneToTen);
    const resp = handler.calculateIncrease(fourToTen); // 날짜가 같은 데이터를 찾는다
    const commonDates = res.filter((data1) =>
      resp.some((data2) => data2.date === data1.date),
    );
    console.log(res, resp);
    // 날짜가 같은 데이터가 존재하는지 확인한다
    expect(commonDates.length).toBeGreaterThan(0);

    // // 모든 공통 날짜가 res와 resp에 정확하게 존재하는지 확인한다
    // commonDates.forEach((commonData) => {
    //   expect(res).toContainEqual(commonData);
    //   expect(resp).toContainEqual(commonData);
    // });

    // console.log(
    //   'arg: oneToTen , keyword: 강아지 , relationKeyword: 반려견 , from: 2023-12-01 , to: 2023-12-10',
    //   res,
    //   // 'arg: fourToTen , keyword: 강아지 , relationKeyword: 반려견 , from: 2023-12-04 , to: 2023-12-10',
    //   // resp,
    // );
  });
  it('더미데이터 겹치는 날짜', async () => {
    // 각 데이터에서 hit 객체를 추출
    const oneToTenHits = oneToTen.flatMap(
      (oneHistory) => oneHistory.inner_hits.video_history.hits.hits,
    );

    const fourToTenHits = fourToTen.flatMap(
      (fourHistory) => fourHistory.inner_hits.video_history.hits.hits,
    );

    // // _id가 겹치는 hit 객체를 찾는다
    // const commonHits = oneToTenHits.filter((oneHit) =>
    //   fourToTenHits.some((fourHit) => fourHit._id === oneHit._id),
    // );mzwyOrDzCx8

    console.log('Common hits:', oneToTenHits);
  });
});
