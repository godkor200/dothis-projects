import { useFormContext, useWatch } from 'react-hook-form';
import styled, { css, keyframes } from 'styled-components';

import type { KeywordSchema } from '@/constants/schema/login';

function Keywords({ keyword }: KeywordSchema) {
  const { control, setValue } = useFormContext<KeywordSchema>();
  const keywords = useWatch({ name: 'keyword', control });

  const onSetValue = (keywords: string[]) => {
    setValue('keyword', keywords);
  };

  const onToggleKeyword = (mock: string) => {
    if (keywords.includes(mock)) {
      onRemove(mock);
      return;
    }
    if (keywords.length > 4) {
      return;
    }

    onChoose(mock);
  };

  const onChoose = (mock: string) => {
    onSetValue([...keywords, mock]);
  };

  const onRemove = (mock: string) => {
    onSetValue(keywords.filter((value) => value !== mock));
  };

  return (
    <TagList>
      {0 < keyword.length &&
        keyword?.map((mock) => (
          <TagItem
            key={`editor-${mock}`}
            onClick={() => onToggleKeyword(mock)}
            chosen={keywords.includes(mock) || undefined}
          >
            {keywords.includes(mock) && <StyledCheck />}
            {mock}
          </TagItem>
        ))}
      <br />
    </TagList>
  );
}
export default Keywords;

const FADE_IN = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const TagList = styled.ul`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;

  margin-bottom: 4rem;
`;

const TagItem = styled.li<{ chosen: boolean | undefined }>`
  height: 2rem;
  padding: 0 0.75rem;

  border-radius: 0.5rem;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  font-size: 0.875rem;
  cursor: pointer;

  animation: 0.25s ${FADE_IN} cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);

  box-shadow: inset 0 0 0 2px #fafafa;

  ${({ style, chosen }) =>
    chosen
      ? css`
          font-weight: bold;

          background-color: #fef7f8;
          box-shadow: inset 0 0 0 2px #fde7eb;
        `
      : css``}
  @media (min-width: 768px) {
    height: 2.25rem;
    font-size: 1rem;
  }
`;

const StyledCheck = styled.i`
  display: block;
  position: relative;
  box-sizing: border-box;
  width: 22px;
  height: 22px;
  border: 2px solid transparent;

  &::after {
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    left: 3px;
    top: -1px;
    width: 6px;
    height: 10px;
    border-width: 0 1px 1px 0;
    border-color: #ff647d;
    transform-origin: bottom left;
    transform: rotate(45deg);
  }
`;
