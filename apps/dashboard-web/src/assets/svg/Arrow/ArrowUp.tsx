import type { ComponentProps } from 'react';

function ArrowUp({ ...props }: ComponentProps<'svg'>) {
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
        d="M6.66634 5.41602L4.99967 3.74935L3.33301 5.41602"
        stroke="#FF647D"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default ArrowUp;
