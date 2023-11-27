import type { colors } from '@dothis/theme/dashboard/colors';
import type { Route } from 'next';
import Link from 'next/link';

import { BaseURL } from '@/constants/dev';
import type { OauthInterface, SVGIconType } from '@/constants/oauth';
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
      className="mb-[1rem] block w-[200px] "
      href={(BaseURL + '/v1/auth/google-login') as Route}
    >
      <div
        className={cn('rounded-lg border border-solid py-2', {
          [`border-${boderColor}`]: boderColor,
        })}
      >
        <button
          className="flex w-full items-center  gap-[0.7rem] px-[10px]"
          {...buttonProps}
        >
          <SvgComp icon={iconName} size={26} />
          <p className="flex-1 text-center font-bold">
            {buttonProps['aria-label']}
          </p>
        </button>
      </div>
    </Link>
  );
};

export default LoginButton;
