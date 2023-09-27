import { useFormContext, useWatch } from 'react-hook-form';

import type { KeywordSchema } from '@/constants/schema/login';

import * as Style from './style';

const Keywords = ({ keyword }: KeywordSchema) => {
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
    <>
      {keyword?.length > 0 ? (
        <ul className="mb-16 flex flex-wrap gap-[0.5rem]">
          {keyword?.map((mock) => (
            <Style.TagItem
              key={`editor-${mock}`}
              onClick={() => onToggleKeyword(mock)}
              $chosen={keywords?.includes(mock)}
            >
              {keywords.includes(mock) && <Style.StyledCheck />}
              {mock}
            </Style.TagItem>
          ))}
        </ul>
      ) : null}
    </>
  );
};
export default Keywords;
