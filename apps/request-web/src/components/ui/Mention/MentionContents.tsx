import type { PopoverContentProps } from '@chakra-ui/react';
import { Box, Button, forwardRef, PopoverContent } from '@chakra-ui/react';
import { css } from '@emotion/react';
import clsx from 'clsx';

import { useMentionContext } from '@/components/ui/Mention/Mention';
import { commonStyle } from '@/styles/commonStyle';
import { shadows } from '@/styles/dothisTheme';

type Props = Omit<PopoverContentProps, 'children' | 'as'>;

// as 타입을 맞추기 위해 chakra-ui의 forwardRef을 사용
// https://chakra-ui-git-fix-typescript-autocomplete.chakra-ui.vercel.app/guides/as-prop#option-1-using-forwardref-from-chakra-uireact
export const MentionContents = forwardRef<Props, 'ul'>(
  ({ className, ...props }, ref) => {
    const { matchList, onSelect } = useMentionContext();

    return (
      <PopoverContent zIndex={2} {...props}>
        <Box
          as="ul"
          css={style}
          className={clsx('ui_mentions_list', className)}
          ref={ref}
        >
          {matchList.length > 0 &&
            matchList.map(([text, matchNode], i) => (
              <li key={`${i}`}>
                <Button onClick={() => onSelect(text)}>{matchNode}</Button>
              </li>
            ))}
        </Box>
      </PopoverContent>
    );
  },
);

const style = css`
  position: relative;
  z-index: 1;
  overflow-y: auto;
  ${commonStyle.scrollBarHidden};
  box-shadow: ${shadows.md};
  border-radius: 12px;
  max-height: 240px;

  button {
    display: flex;
    align-items: center;
    justify-content: start;
    ${commonStyle.grayBox};
    border-radius: 0;
    padding: 16px;
    width: 100%;
    height: 100%;
  }
`;
