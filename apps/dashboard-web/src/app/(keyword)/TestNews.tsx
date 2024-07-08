import useGetNaverSearchRatio from '@/hooks/react-query/query/useGetNaverSearchRatio';
import useGetNewsArticle from '@/hooks/react-query/query/useGetNewsArticle';
import useGetSingleNews from '@/hooks/react-query/query/useGetSingleNews';

const Test = () => {
  const { data, isError } = useGetNewsArticle();

  return <div>dasd</div>;
};

export default Test;
