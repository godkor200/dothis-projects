import LoginKeyword from '@/components/Login/LoginKeyword';

async function ChooseKeywordPage() {
  const onLoading = async (ms: number) => {
    await delay(ms);

    return [
      '부동산',
      '서울',
      '원룸전세',
      '관악구',
      '아파트',
      '수도권 아파트 분양',
      '투룸전세',
      '은평구',
      '은평구 부동산',
    ];
  };

  const mock_keyword = await onLoading(3000);

  return <LoginKeyword keyword={mock_keyword} />;
}

export default ChooseKeywordPage;

// Loading 체크를 위한 임시 delay 함수
export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
