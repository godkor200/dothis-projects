import SummaryTab from './summary/page';

const Page = ({
  params,
}: {
  params: { keyword: string; related_word: string };
}) => {
  const keyword = decodeURIComponent(params.keyword);
  const relatedWord = decodeURIComponent(params.related_word);

  return (
    <>
      <SummaryTab
        params={{
          keyword: keyword,
          related_word: relatedWord,
        }}
      />
    </>
  );
};

export default Page;
