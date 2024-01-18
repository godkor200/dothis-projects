import Blog2 from '@/components/Blog/Blog2';
import Blog3 from '@/components/Blog/Blog3';
import BlogDetail from '@/components/Blog/BlogDetail';

const blogObject: Record<string, JSX.Element> = {
  1: <BlogDetail />,
  2: <Blog2 />,
  3: <Blog3 />,
};

const BlogDetailPage = ({ params }: { params: { index: string } }) => {
  return <ul className="py-[160px]">{blogObject[params.index]}</ul>;
};

export default BlogDetailPage;
