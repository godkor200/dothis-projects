import parse from 'html-react-parser';
import DOMPurify from 'isomorphic-dompurify';
import type { HTMLAttributes } from 'react';

interface ParseContentProps extends HTMLAttributes<HTMLDivElement> {
  content?: string | undefined;
}

export const ParserContent = ({ content, ...props }: ParseContentProps) => (
  <div {...props}>{content && parse(DOMPurify.sanitize(content))}</div>
);

export default ParserContent;
