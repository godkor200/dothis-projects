'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import SvgComp from '@/components/common/SvgComp';

const SORT_FILTER = [
  {
    title: '최신순',
    value: 'sort_newest',
  },
  {
    title: '오래된 순',
    value: 'sort_oldest',
  },
  {
    title: '조회수 순',
    value: 'sort_views',
  },
];

const DATE_PERIOD_FILTER = [
  {
    title: '최근7일',
    value: 'last_7days',
  },
  {
    title: '최근30일',
    value: 'last_30days',
  },
  {
    title: '최근90일',
    value: 'last_90days',
  },
  {
    title: '최근1년',
    value: 'last_year',
  },
];

const SearchFilterDropdown = () => {
  return (
    <div className=" flex">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <div className="border-grey400 rounded-s-10 group flex cursor-pointer items-center gap-[10px] border px-[20px] py-[16px]">
            {/* Step 2: Add peer class to the <p> tag */}
            <p className="text-grey500 text-[14px] font-[500]">최신순</p>
            <SvgComp
              icon="DropdownArrow"
              width={10}
              height={5}
              className="group-data-[state=open]:rotate-180"
            />
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
            {SORT_FILTER.map(({ title, value }) => (
              <DropdownMenu.CheckboxItem
                className="DropdownMenuCheckboxItem"
                checked={value === 'channel_category'}
                key={title + value}
              >
                <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                  <SvgComp icon="CheckIcon" size={12} />
                </DropdownMenu.ItemIndicator>
                {title}
              </DropdownMenu.CheckboxItem>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>{' '}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <div className="border-grey400 rounded-e-10 group  flex items-center gap-[10px] border px-[20px] py-[16px]">
            <p className="text-grey500 text-[14px] font-[500]">최근 7일</p>
            <SvgComp
              icon="DropdownArrow"
              width={10}
              height={5}
              className="group-data-[state=open]:rotate-180"
            />
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
            {DATE_PERIOD_FILTER.map(({ title, value }) => (
              <DropdownMenu.CheckboxItem
                className="DropdownMenuCheckboxItem"
                checked={value === 'channel_category'}
                key={title}
              >
                <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                  <SvgComp icon="CheckIcon" size={12} />
                </DropdownMenu.ItemIndicator>
                {title}
              </DropdownMenu.CheckboxItem>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};

export default SearchFilterDropdown;
