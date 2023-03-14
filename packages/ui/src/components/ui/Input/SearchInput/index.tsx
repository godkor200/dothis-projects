import { polymorphicForwardRefPropsAsIs } from '@utils/reactUtils';
import React from 'react';

import SearchIcon from '../../../../assets/icon/search.svg';
import InputCompanions from '../companions/index';
import styles from './SearchInput.module.css';

const SearchInput = polymorphicForwardRefPropsAsIs(InputCompanions.Input)()(
  (props, ref) => {
    return (
      <InputCompanions.Root className={styles.root}>
        <SearchIcon />
        <InputCompanions.Input {...props} className="ml-2" ref={ref} />
      </InputCompanions.Root>
    );
  },
);

export default SearchInput;
