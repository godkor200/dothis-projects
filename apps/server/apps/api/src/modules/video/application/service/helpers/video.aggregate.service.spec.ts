import { VideoAggregateService } from '@Apps/modules/video/application/service/helpers/video.aggregate.service';
import {
  fourToTen,
  mergedVideoHistoryDummy,
  oneToTen,
  views,
} from '@Apps/modules/video/application/service/__dummy__';
import { VideoAggregateHelper } from '@Apps/modules/video/application/service/helpers/video.aggregate.helper';

let handler: VideoAggregateService;
beforeEach(() => {
  handler = new VideoAggregateService();
});
describe('calculateIncrease 함수', () => {
  // it.todo(
  //   '겹치는 일짜를 가진 쿼리로 받아진 데이터는 겹치는 날짜가 있어야 한다.',
  //   async () => {
  //     /**
  //      * oneToTen 은 12월 1일에서 12월 10일까지
  //      * fourToTen 은 12월 4일에서 12월 10일까지
  //      * 날짜가 겹쳐야함
  //      */
  //     // const res = handler.calculateIncrease(oneToTen);
  //     // const resp = handler.calculateIncrease(fourToTen); // 날짜가 같은 데이터를 찾는다
  //     // const commonDates = res.filter((data1) =>
  //     //   resp.some((data2) => data2.date === data1.date),
  //     // );
  //     // console.log(res, resp);
  //     // 날짜가 같은 데이터가 존재하는지 확인한다
  //     // expect(commonDates.length).toBeGreaterThan(0);
  //     // // 모든 공통 날짜가 res와 resp에 정확하게 존재하는지 확인한다
  //     // commonDates.forEach((commonData) => {
  //     //   expect(res).toContainEqual(commonData);
  //     //   expect(resp).toContainEqual(commonData);
  //     // });
  //     // console.log(
  //     //   'arg: oneToTen , keyword: 강아지 , relationKeyword: 반려견 , from: 2023-12-01 , to: 2023-12-10',
  //     //   res,
  //     //   // 'arg: fourToTen , keyword: 강아지 , relationKeyword: 반려견 , from: 2023-12-04 , to: 2023-12-10',
  //     //   // resp,
  //     // );
  //   },
  // );
  // it.todo('더미데이터 겹치는 날짜', async () => {
  //   // 각 데이터에서 hit 객체를 추출
  //   const oneToTenHits = oneToTen.flatMap(
  //     (oneHistory) => oneHistory.inner_hits.video_history.hits.hits,
  //   );
  //
  //   const fourToTenHits = fourToTen.flatMap(
  //     (fourHistory) => fourHistory.inner_hits.video_history.hits.hits,
  //   );
  //
  //   // // _id가 겹치는 hit 객체를 찾는다
  //   // const commonHits = oneToTenHits.filter((oneHit) =>
  //   //   fourToTenHits.some((fourHit) => fourHit._id === oneHit._id),
  //   // );mzwyOrDzCx8
  //
  //   console.log('Common hits:', oneToTenHits);
  // });

  describe('calculateMetrics 함수', () => {
    const separationResult = {
      '43': {
        '2024-05-03': {
          dailyViews: 2653,
          expectedViews: 1.3308,
        },
        '2024-05-04': {
          dailyViews: 316,
          expectedViews: 0.1509,
        },
        '2024-05-05': {
          dailyViews: 222,
          expectedViews: 0.1077,
        },
        '2024-05-08': {
          dailyViews: 3207,
          expectedViews: 1.4655,
        },
      },
      '93': {
        '2024-05-03': {
          dailyViews: 300,
          expectedViews: 0.4617,
        },
        '2024-05-04': {
          dailyViews: 4426,
          expectedViews: 0.7833,
        },
        '2024-05-05': {
          dailyViews: 1842,
          expectedViews: 0.5099,
        },
        '2024-05-08': {
          dailyViews: 738,
          expectedViews: 1.012,
        },
      },
      '21': {
        '2024-05-03': {
          dailyViews: 2048,
          expectedViews: 0.0432,
        },
        '2024-05-04': {
          dailyViews: 2079,
          expectedViews: 0.0439,
        },
        '2024-05-05': {
          dailyViews: 603,
          expectedViews: 0.0127,
        },
        '2024-05-08': {
          dailyViews: 875,
          expectedViews: 0.0184,
        },
      },
      '68': {
        '2024-05-03': {
          dailyViews: 239,
          expectedViews: 0.3261,
        },
        '2024-05-04': {
          dailyViews: 14,
          expectedViews: 0.0133,
        },
        '2024-05-05': {
          dailyViews: 8,
          expectedViews: 0.0109,
        },
        '2024-05-08': {
          dailyViews: 18,
          expectedViews: 0.0246,
        },
      },
    };

    /**
     * 1,6,7 일 데이터가 없음
     * 이렇게 때문에 결과는 3일 4일 5일의 데이터만 나오는게 정상
     *
     */
    it('should ', () => {
      const res = VideoAggregateHelper.calculateMetrics(
        mergedVideoHistoryDummy,
      );
      expect(res).toBe({
        '3': 35999,
        '4': 10457,
        '5': 6892,
        '8': 32386,
      });
    });
  });
});
