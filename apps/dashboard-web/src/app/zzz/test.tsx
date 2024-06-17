// 'use client';

// import dayjs from 'dayjs';

// import {
//   useSearchRatioFormatter,
//   useSearchRatioFormatterD3,
// } from '@/hooks/contents/useChartFormatter';
// import { useGetRandomMedia } from '@/hooks/react-query/query/useGetRandomMedia';
// import useGetSingleNews from '@/hooks/react-query/query/useGetSingleNews';
// import useGetSingleVideo from '@/hooks/react-query/query/useGetSingleVideo';
// // import DashboardAreaChart from '@/components/common/Charts/DashboardAreaChart';
// import { useEndDate, useStartDate } from '@/store/dateStore';
// import { getDateObjTime } from '@/utils/contents/dateObject';

// const ZZZTEST = ({ randomChoice }: { randomChoice: string }) => {
//   const startDate = useStartDate();

//   // 1. true의 개수 세기

//   const rangeTargetData = [[0.59], [1.4], [2], [3], [0], [0]];

//   // const data = useSearchRatioFormatterD3({
//   //   keyword: '한국어',
//   //   relword: '한국어',
//   // });

//   // const a = useGetRandomMedia(randomChoice);

//   const rangeData = [
//     [0.55, 0.61],
//     [0, 0],
//     [0, 0],
//     [0, 0],
//     [0, 0],
//     [0, 0],
//   ];

//   const { data: data2 } = useGetSingleVideo(
//     { searchKeyword: '한국' },
//     { enabled: randomChoice === 'youtube' },
//   );
//   console.log(data2);

//   const { data: data3 } = useGetSingleNews(
//     { searchKeyword: '한국' },
//     { enabled: randomChoice === 'news' },
//   );

//   return (
//     <div>
//       <div className="ml-[2px] flex h-3/6 justify-center [&_svg]:overflow-visible">
//         <div>xptmxm</div>
//         {/* <DashboardAreaChart
//           series={[
//             {
//               type: 'rangeArea',
//               name: '평균성과 기대치',
//               data: rangeData.map((item, index) => ({
//                 x: getDateObjTime(
//                   dayjs(startDate).add(index, 'day').format('YYYY-MM-DD'),
//                 ),
//                 y: item,
//               })),
//             },

//             {
//               type: 'line',
//               name: '평균성과',
//               data: rangeTargetData.map((item, index) => ({
//                 x: getDateObjTime(
//                   dayjs(startDate).add(index, 'day').format('YYYY-MM-DD'),
//                 ),
//                 y: item,
//               })),
//             },
//           ]}
//         /> */}

//         {/* <DashboardLineChart
//           series={[
//             {
//               name: '일일 조회 수',
//               type: 'line',
//               color: '#F0516D',
//               data: [0.15, 0.45, 0.11, 0.22, 0.43, 0.02].map((item, index) => [
//                 getDateObjTime(
//                   dayjs(startDate).add(index, 'day').format('YYYY-MM-DD'),
//                 ),
//                 item,
//               ]),
//             },
//           ]}
//         /> */}
//       </div>
//     </div>
//   );
// };

// export default ZZZTEST;
