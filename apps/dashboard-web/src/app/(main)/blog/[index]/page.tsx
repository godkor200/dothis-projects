import BlogDetail from '@/components/Blog/BlogDetail';

const blogObject: Record<string, JSX.Element> = {
  1: <BlogDetail />,
  2: <BlogDetail />,
};

const BlogDetailPage = ({ params }: { params: { index: string } }) => {
  return <ul className="py-[160px]">{blogObject[params.index]}</ul>;
};

export default BlogDetailPage;
