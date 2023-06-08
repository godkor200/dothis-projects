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
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  font-size: 0.875rem;
  cursor: pointer;

  animation: 0.25s ${FADE_IN} cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);

  ${({ style, chosen }) =>
    chosen
      ? css`
          color: red;
          box-shadow: inset 0 0 0 2px red;
        `
      : css`
          color: #ffffff;
          background-color: red;
        `}
  @media (min-width: 768px) {
    height: 2.25rem;
    font-size: 1rem;
  }
`;
