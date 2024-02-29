import axios from 'axios';

// Set the runtime to edge for best performance
export const runtime = 'edge';

const request_body = (ages: string[], gender?: string) => {
  return {
    startDate: '2017-01-01',
    endDate: '2017-04-30',
    timeUnit: 'month',
    keywordGroups: [
      {
        groupName: '한글',
        keywords: ['한글', 'korean'],
      },
    ],
    device: 'pc',
    ages,
    gender: gender ? gender : undefined,
  };
};

// 날짜랑 키워드,연관어만 안달라지면 무조건 캐시해도 되잖아.

export async function POST(req: Request) {
  try {
    // 병렬로 처리할 fetch 요청을 배열에 담습니다.
    const fetchPromises = [
      fetchWithNaverAPI(['1', '2']),
      fetchWithNaverAPI(['3', '4']),
      fetchWithNaverAPI(['5', '6']),
      fetchWithNaverAPI(['7', '8']),
      fetchWithNaverAPI(['9', '10', '11']),
      // 추가적인 fetch 요청을 필요한 만큼 배열에 추가합니다.
    ];

    // Promise.all을 사용하여 모든 fetch 요청이 완료될 때까지 기다립니다.
    const responseDataArray = await Promise.all(fetchPromises);

    // 모든 fetch 요청의 결과를 처리합니다.
    responseDataArray.forEach((data) => {
      console.log(data);
    });

    // 모든 fetch 요청의 결과를 리턴합니다.
    return Response.json(responseDataArray);
  } catch (error) {
    console.error(error);
    // 에러가 발생한 경우에 대한 처리
    return Response.json({ error: 'An error occurred' });
  }
}

async function fetchWithNaverAPI(ages: string[], gender?: string) {
  const response = await fetch('https://openapi.naver.com/v1/datalab/search', {
    method: 'POST',
    headers: {
      'X-Naver-Client-Id': 'w5hxMTJtn4za98VEUhnr',
      'X-Naver-Client-Secret': 'jzLwJId4wN',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request_body(ages, gender)),
  });

  return response.json();
}
