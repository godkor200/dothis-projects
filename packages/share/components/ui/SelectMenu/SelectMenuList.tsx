import type { MenuListProps } from '@chakra-ui/react';
import {
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  useMenuContext,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

import { elementOnceInterval, mapIterToArr } from '../../../lib';

export type ListMap<K> = Map<K, string>;

type Props<K> = MenuListProps & {
  listMap: ListMap<K>;
  selectedItemValue: K | undefined;
  onItemSelect: (value: K) => void;
};
export function SelectMenuList<K extends string>({
  listMap,
  selectedItemValue,
  onItemSelect,
  ...props
}: Props<K>) {
  const ref = useRef<HTMLDivElement>(null);
  const menu = useMenuContext();

  useEffect(() => {
    if (!menu.isOpen) return;
    const once = elementOnceInterval(
      () =>
        ref.current?.querySelector?.<HTMLButtonElement>('[aria-checked=true]'),
      10,
    );

    once((el) => {
      el.scrollIntoView({
        block: 'center',
      });
    });
  }, [menu.isOpen]);

  return (
    <MenuList className="ui_select-menu-list" zIndex={2} ref={ref} {...props}>
      <MenuOptionGroup
        value={selectedItemValue}
        onChange={(value) => {
          onItemSelect(value as K);
        }}
      >
        {mapIterToArr(listMap.entries(), ([value, name]) => (
          <MenuItemOption icon={null} key={value} value={value}>
            {name}
          </MenuItemOption>
        ))}
      </MenuOptionGroup>
    </MenuList>
  );
}
