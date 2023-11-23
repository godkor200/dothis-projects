import type { SVGProps } from 'react';

export function SvgArrowDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 16l-6-6h12l-6 6z" />
    </svg>
  );
}

