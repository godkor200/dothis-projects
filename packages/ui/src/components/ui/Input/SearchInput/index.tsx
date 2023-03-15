import { useBoolean } from '@hooks/useBoolean';
import { isBrowser } from '@utils/domUtils';
import { polymorphicForwardRefPropsAsIs } from '@utils/reactUtils';
import React, {
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import CloseCircleIcon from '../../../../assets/icon/close-circle.svg';
import SearchIcon from '../../../../assets/icon/search.svg';
import InputCompanions from '../companions/index';
import styles from './SearchInput.module.css';

const SearchInput = polymorphicForwardRefPropsAsIs(InputCompanions.Input)()(
  (props, ref) => {
    const uniqueId = useId();
    const inputRef = useRef<HTMLInputElement | null>();
    const [hasValue, hasValueFlag] = useBoolean();
    const id = props.id ?? uniqueId;

    useImperativeHandle(ref, () => inputRef.current, [ref]);

    useEffect(() => {
      function event() {
        if (inputRef.current.value.length > 0) return hasValueFlag.on();
        hasValueFlag.off();
      }
      inputRef.current.addEventListener('keyup', event);
      return () => inputRef.current.removeEventListener('keyup', event);
    }, [inputRef.current, hasValueFlag]);
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
        <InputCompanions.Input
          {...props}
          data-hasvalue={hasValue}
          id={id}
          className="ml-2"
          ref={inputRef}
        />
        <button
          type="button"
          onClick={(e) => {
            inputRef.current.value = '';
            inputRef.current.dispatchEvent(
              new Event('keyup', { bubbles: true }),
            );
            inputRef.current.focus();
            e.stopPropagation();
          }}
        >
          <CloseCircleIcon />
        </button>
      </InputCompanions.Root>
    );
  },
);

export default SearchInput;
