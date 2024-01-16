import type { ActionMeta, MultiValue, StylesConfig } from 'react-select';
import Select from 'react-select';

import { clustersCategoriesOptions } from '@/constants/clusterCategories';

interface Props {
  selectOptions: { value: number; label: string }[];
  setSelectOptions: React.Dispatch<
    React.SetStateAction<{ value: number; label: string }[]>
  >;
}

const MultiSelector = ({ selectOptions, setSelectOptions }: Props) => {
  const handleSelectOptions = (
    newValue: MultiValue<{ value: number; label: string }>,
    actionMeta: ActionMeta<{ value: number; label: string }>,
  ) => {
    setSelectOptions(newValue as { value: number; label: string }[]);
  };

  return (
    <Select
      classNames={{
        control: (state) =>
          ' hover:!shadow-[0_0_0_2px] hover:!shadow-grey600 !border-grey600 	focus-within:!ring-2  focus-within:!ring-grey600',

        // label과 remove의 container
        multiValue: (styles) => {
          return 'border border-grey600 !bg-grey00 ';
        },
        multiValueLabel: (styles) => {
          return 'bg-grey00 ';
        },
        multiValueRemove: (props) => {
          return 'bg-grey00 hover:!bg-grey00 ';
        },
      }}
      // 아... 이래서 isFocus가 있엇구나..
      options={clustersCategoriesOptions}
      value={selectOptions}
      onChange={handleSelectOptions}
      isMulti={true}
      // styles={colourStyles}
      placeholder="카테고리 선택"
      theme={(theme) => {
        return {
          ...theme,
          borderRadius: 8,
          colors: {
            ...theme.colors,
          },
        };
      }}
    />
  );
};
export default MultiSelector;

// 아래는 Select styles로 커스텀 가능한 object
const colourStyles: StylesConfig<{ value: number; label: string }, true> = {
  control: (styles, { isFocused }) => {
    return {
      ...styles,

      boxShadow: `0 0 0 1px #3f3f46`,
    };
  },

  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
    };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: '#d4d4d8',
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: 'white',
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data,
    ':hover': {
      backgroundColor: '#555',
      color: 'white',
    },
  }),
};
