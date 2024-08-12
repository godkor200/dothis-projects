import type {
  ActionMeta,
  MultiValue,
  MultiValueRemoveProps,
  StylesConfig,
} from 'react-select';
import Select, { components } from 'react-select';

import SvgComp from '@/components/common/SvgComp';
import { clustersCategoriesOptions } from '@/constants/clusterCategories';

interface Props {
  selectOptions: { value: number; label: string }[];
  setSelectOptions: React.Dispatch<
    React.SetStateAction<{ value: number; label: string }[]>
  >;
}
const MultiValueRemove = (
  props: MultiValueRemoveProps<{ value: number; label: string }>,
) => {
  return (
    <components.MultiValueRemove {...props}>
      <SvgComp
        icon="KeywordDelete"
        size="1rem"
        className="[&_path]:fill-[#818cf8] [&_path]:stroke-[#818cf8] [&_path]:group-hover/remove:stroke-[#fff] "
      />
    </components.MultiValueRemove>
  );
};

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
          ' hover:!shadow-[0_0_0_2px] hover:!shadow-grey600 !border-grey600 py-2 text-primary500	focus-within:!ring-2  focus-within:!ring-grey600',

        // label과 remove의 container
        multiValue: (styles) => {
          return '!border-0 !bg-chip-blueBg  !rounded-8  shadow-[0_0_0_2px_rgba(129,140,248,0.6)] ';
        },
        multiValueLabel: (styles) => {
          return 'bg-grey00 !text-[#818cf8] !bg-chip-blueBg !rounded-8 !py-[8px] !pl-[20px]';
        },
        multiValueRemove: (props) => {
          return ' text-[#818cf8] !bg-chip-blueBg !rounded-r-8 hover:!bg-chip-blueBg !pr-[20px] !pl-[8px] group/remove ';
          // 한가지의 className으로 group과 grouphover를 동시에 사용할 수 없음 ([&_path]:group-hover/remove:stroke-[#fff]) - 자식 css 제어하려고 시도했지만 실패
        },
        valueContainer: (props) => {
          return 'gap-[10px]';
        },
        menuList: (props) => {
          return 'py-10 text-prinmary500';
        },
      }}
      // 아... 이래서 isFocus가 있엇구나..
      options={clustersCategoriesOptions}
      value={selectOptions}
      onChange={handleSelectOptions}
      isMulti={true}
      components={{ MultiValueRemove }}
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
