import { polymorphicForwardRefPropsAsIs } from '@utils/reactUtils';
import React from 'react';

const Input = polymorphicForwardRefPropsAsIs('input')()((props, ref) => {
  return <input {...props} ref={ref} />;
});

export default Input;
