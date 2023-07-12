import type { ComponentProps } from 'react';

function ArrowDown({ ...props }: ComponentProps<'svg'>) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.33317 3.75L4.99984 5.41667L6.6665 3.75"
        stroke="#A1A1AA"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default ArrowDown;
