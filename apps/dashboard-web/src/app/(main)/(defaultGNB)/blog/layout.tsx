import type { PropsWithChildren } from 'react';

const BlogLayout = ({ children }: PropsWithChildren) => {
  return <div className="py-[160px]">{children}</div>;
};

export default BlogLayout;
