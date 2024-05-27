import type { PropsWithChildren } from 'react';

const BlogLayout = ({ children }: PropsWithChildren) => {
  return <div className="py-[80px]">{children}</div>;
};

export default BlogLayout;
