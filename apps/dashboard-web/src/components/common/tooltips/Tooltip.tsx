import './style.css';

import * as Tooltip from '@radix-ui/react-tooltip';
import React from 'react';

import SvgComp from '../SvgComp';

const TooltipComponent = () => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button className="IconButton">
            <SvgComp icon="Question" size={26} />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="TooltipContent bg-primary400"
            sideOffset={5}
          >
            Add to library
            <Tooltip.TooltipArrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipComponent;
