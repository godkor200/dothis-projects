const Page = ({
  params,
}: {
  params: { keyword: string; related_word: string };
}) => {
  const keyword = decodeURIComponent(params.keyword);
  const relatedWord = decodeURIComponent(params.related_word);

  return (
    <div>
      키워드 <span className="text-chip-red font-bold">{keyword}</span> 의
      연관어 <span className="text-chip-red font-bold">{relatedWord}</span>
    </div>
  );
};

export default Page;
