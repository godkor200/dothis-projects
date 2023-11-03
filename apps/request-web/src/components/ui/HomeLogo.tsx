import type { LinkProps } from 'next/link';
import Link from 'next/link';

import { SvgDothisLogo } from './Icons';

type Props = { href: LinkProps['href'] };

export function HomeLogo({ href }: Props) {
  return (
    <Link href={href} title="두디스 홈" style={{ width: '100%' }}>
      <SvgDothisLogo />
    </Link>
  );
}
