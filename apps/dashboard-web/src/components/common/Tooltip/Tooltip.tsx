'use client';

import './style.css';

import * as Tooltip from '@radix-ui/react-tooltip';
import React from 'react';

import SvgComp from '../SvgComp';

interface Props {
  title: string;
}

const TooltipComponent = ({ title }: Props) => {
  const splitEscape = title.split('\n');
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={200}>
        <Tooltip.Trigger asChild>
          <button className="IconButton">
            <SvgComp icon="Question" size={18} />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="TooltipContent bg-grey700" sideOffset={5}>
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

export default TooltipComponent;
