'use client';

import * as Svgs from 'public/aseets/svg/index';
import type { SVGProps } from 'react';

export type SVGType = keyof typeof Svgs;

interface SVGCompProps extends SVGProps<SVGSVGElement> {
  icon: SVGType;
  title?: string;
  size?: number | string;
}

export default function SvgComp({
  icon,
  title,
  size,
  width,
  height,
  ...svgProps
}: SVGCompProps) {
  const SvgComponent = Svgs[icon];

  return (
    <SvgComponent
      title={title}
      width={size || width}
      height={size || height}
      {...svgProps}
    />
  );
}
