import { css } from '@emotion/react';
import clsx from 'clsx';
import type { ChangeEvent } from 'react';
import { useCallback, useRef } from 'react';

import type { UseMatchReturn } from '../../../lib';
import { colors, shadows } from '../../../lib';
import { Mention, MentionContents,MentionTarget } from '../Mention';
import type { InputProps } from './index';
import { Input } from './Input';

export type MentionInputProps = InputProps & {
  match: Pick<
    UseMatchReturn,
    'matchList' | 'isOpen' | 'isHidden' | 'setIsHidden' | 'setValue'
  >;
  onItemSelect(s: string): void;
  theme?: InputProps['theme'];
  size?: 'md' | 'sm';
};

export const MentionInput = ({
  match,
  onItemSelect,
  onChange,
  onKeyDown,
  theme = 'gray',
  size = 'md',
  ...props
}: MentionInputProps) => {
  const contentsRef = useRef<HTMLUListElement>(null);
  const handleSelect = useCallback((v: string) => {
    match.setValue(v);
    onItemSelect(v);
    match.setIsHidden.on();
  }, []);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    match.setValue(e.target.value);
    onChange?.(e);
    match.setIsHidden.off();
  }, []);

  return (
    <div css={style} className={clsx('ui_mention-input', theme)}>
      <Mention {...match} onSelect={handleSelect}>
        <MentionTarget>
          <Input
            {...props}
            theme={theme}
            size={size}
            onKeyUp={(e) => {
              if (e.key === 'Enter' && match.matchList[0]) {
                onItemSelect(match.matchList[0][0]);
                match.setIsHidden.on();
              }
              onKeyDown?.(e);
            }}
            onChange={handleChange}
          />
        </MentionTarget>
        <MentionContents ref={contentsRef} left={-16} />
      </Mention>
    </div>
  );
};

const style = css`
  position: relative;
  z-index: 1;

  .chakra-popover__popper {
    width: 100%;
  }

  &.white {
    background-color: ${colors.white};

    .ui_mentions_list {
      width: 100%;
      box-shadow: ${shadows.md};
      border-radius: 4px;

      button {
        background-color: ${colors.white};
        padding: 12px;
      }
    }
  }
`;
