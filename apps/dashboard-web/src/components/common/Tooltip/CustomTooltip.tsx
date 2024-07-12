'use client';

import './style.css';

import * as Tooltip from '@radix-ui/react-tooltip';
import React from 'react';

import SvgComp from '../SvgComp';

interface Props {
  title: string;
  children: React.ReactNode;
  tooltipOptions: Tooltip.TooltipContentProps;
}

const CustomTooltipComponent = ({ title, children, tooltipOptions }: Props) => {
  const splitEscape = title.split('\n');

  const { side, sideOffset, align, alignOffset } = tooltipOptions;
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={200}>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="TooltipContent bg-grey700"
            sideOffset={sideOffset}
            side={side}
            align={align}
            alignOffset={alignOffset}
          >
            {splitEscape.map((item) => (
              <p key={item}>{item}</p>
            ))}
            <Tooltip.TooltipArrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default CustomTooltipComponent;
