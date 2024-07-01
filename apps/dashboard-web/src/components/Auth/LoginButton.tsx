import type { colors } from '@dothis/theme/dashboard/colors';
import type { Route } from 'next';
import Link from 'next/link';

import { BaseURL } from '@/constants/dev';
import type { SVGIconType } from '@/constants/oauth';
import { cn } from '@/utils/cn';

import SvgComp from '../common/SvgComp';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
  iconName: SVGIconType;
  boderColor: keyof typeof colors;
}

const LoginButton = ({ iconName, boderColor, ...buttonProps }: Props) => {
  return (
    <Link
      className="mb-[12px] block w-[400px] "
      href={(BaseURL + '/v1/auth/google-login') as Route}
    >
      <div
        className={cn('rounded-[10px] border border-grey400 py-[20px]', {
          // [`border-${boderColor}`]: boderColor,
        })}
      >
        <button
          className="relative flex w-full  items-center pl-[27px]"
          {...buttonProps}
        >
          <SvgComp icon={iconName} size={30} />
          <p className="flex-1 text-center text-[16px] font-bold">
            {buttonProps['aria-label']}
          </p>
        </button>
      </div>
    </Link>
  );
};

export default LoginButton;
