import { polymorphicForwardRefPropsAsIs } from '@utils/reactUtils';
import React, { useId } from 'react';

import SearchIcon from '../../../../assets/icon/search.svg';
import InputCompanions from '../companions/index';
import styles from './SearchInput.module.css';

const SearchInput = polymorphicForwardRefPropsAsIs(InputCompanions.Input)()(
  (props, ref) => {
    const uniqueId = useId();
    const id = props.id ?? uniqueId;
    return (
      <InputCompanions.Root
        className={styles.root}
        onClick={(e) => {
          e.stopPropagation();
          document.getElementById(id)?.focus();
        }}
      >
        <label htmlFor={id}>
          <SearchIcon />
        </label>
        <InputCompanions.Input {...props} id={id} className="ml-2" ref={ref} />
      </InputCompanions.Root>
    );
  },
);

export default SearchInput;
