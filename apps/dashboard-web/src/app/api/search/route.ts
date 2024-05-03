// Set the runtime to edge for best performance
export const runtime = 'edge';

const request_body = ({
  keyword,
  relword,
  startDate,
  endDate,
}: {
  keyword: string;
  relword: string;
  startDate: string;
  endDate: string;
}) => {
  return {
    startDate,
    endDate,
    timeUnit: 'date',
    keywordGroups: [
      {
        groupName: keyword,
        keywords: [keyword, relword],
      },
    ],
    device: 'pc',
    // ages,
    // gender: gender ? gender : undefined,
  };
};

// 날짜랑 키워드,연관어만 안달라지면 무조건 캐시해도 되잖아.

export async function POST(req: Request) {
  const { keyword, relword, startDate, endDate } = await req.json();

  try {
    // 병렬로 처리할 fetch 요청을 배열에 담습니다.
    // const fetchPromises = [
    //   fetchWithNaverAPI(['1', '2']),
    //   fetchWithNaverAPI(['3', '4']),
    //   fetchWithNaverAPI(['5', '6']),
    //   fetchWithNaverAPI(['7', '8']),
    //   fetchWithNaverAPI(['9', '10', '11']),
    //   // 추가적인 fetch 요청을 필요한 만큼 배열에 추가합니다.
    // ];

    // Promise.all을 사용하여 모든 fetch 요청이 완료될 때까지 기다립니다. (해당 기능은 gender 나 age에 따른 조건이 추가될 때 삽입예정)
    const responseDataArray = await naverTrendKeywordAPI({
      keyword,
      relword,
      startDate,
      endDate,
    });

    // 모든 fetch 요청의 결과를 리턴합니다.
    return Response.json(responseDataArray);
  } catch (error) {
    console.error(error);
    // 에러가 발생한 경우에 대한 처리
    return Response.json({ error: 'An error occurred' });
  }
}

// async function fetchWithNaverAPI(ages: string[], gender?: string) {
//   const response = await fetch('https://openapi.naver.com/v1/datalab/search', {
//     method: 'POST',
//     headers: {
//       'X-Naver-Client-Id': process.env.NAVER_API_ID!,
//       'X-Naver-Client-Secret': process.env.NAVER_API_PWD!,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(request_body(ages, gender)),
//   });

//   return response.json();
// }

async function naverTrendKeywordAPI({
  keyword,
  relword,
  startDate,
  endDate,
}: {
  keyword: string;
  relword: string;
  startDate: string;
  endDate: string;
}) {
  const response = await fetch('https://openapi.naver.com/v1/datalab/search', {
    method: 'POST',
    headers: {
      'X-Naver-Client-Id': process.env.NAVER_API_ID!,
      'X-Naver-Client-Secret': process.env.NAVER_API_PWD!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      request_body({ keyword, relword, startDate, endDate }),
    ),
  });

  return response.json();
}
