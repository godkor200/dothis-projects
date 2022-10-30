import type { PopoverProps } from '@chakra-ui/react';
import { Menu, Popover } from '@chakra-ui/react';
import { createContext, useContext } from 'react';

import type { UseMatchReturn } from '@/hooks/useMatch';

type PickMatchParams = Pick<UseMatchReturn, 'isOpen' | 'matchList'> & {
  onSelect: (s: string) => void;
};
const MentionContext = createContext<PickMatchParams | null>(null);

export function useMentionContext() {
  const context = useContext(MentionContext);
  if (context === null) throw Error('유효하지 않은 Context');

  return context;
}

export type MentionProps = PickMatchParams & {
  children: PopoverProps['children'];
};

const Mention = ({ children, ...props }: MentionProps) => {
  return (
    <MentionContext.Provider value={props}>
      <Popover
        placement="bottom-start"
        strategy="absolute"
        isOpen={props.isOpen}
        isLazy
        lazyBehavior="keepMounted"
        autoFocus={false}
      >
        {children}
      </Popover>
    </MentionContext.Provider>
  );
};
export default Mention;
