import type { SVGProps } from 'react';
import * as React from 'react';

import { colors } from '../../../lib/styles';

export const SvgAward = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    xmlns="http://www.w3.org/2000/svg"
    fill={colors.primary['60']}
    {...props}
  >
    <path d="M15.5833 13.9746V20.2739C15.5834 20.355 15.5619 20.4347 15.521 20.5047C15.4802 20.5748 15.4215 20.6328 15.351 20.6728C15.2804 20.7127 15.2005 20.7333 15.1194 20.7323C15.0384 20.7313 14.959 20.7088 14.8894 20.6672L11 18.3333L7.11058 20.6672C7.04096 20.7089 6.9615 20.7314 6.88033 20.7323C6.79916 20.7333 6.7192 20.7126 6.64862 20.6725C6.57804 20.6325 6.51938 20.5743 6.47862 20.5041C6.43787 20.4339 6.41649 20.3542 6.41667 20.273V13.9755C5.23064 13.0259 4.36883 11.7314 3.95034 10.2708C3.53185 8.81026 3.57734 7.25577 4.08053 5.82218C4.58372 4.38859 5.51977 3.14669 6.7593 2.26809C7.99884 1.38949 9.48066 0.917585 11 0.917585C12.5193 0.917585 14.0012 1.38949 15.2407 2.26809C16.4802 3.14669 17.4163 4.38859 17.9195 5.82218C18.4227 7.25577 18.4682 8.81026 18.0497 10.2708C17.6312 11.7314 16.7694 13.0259 15.5833 13.9755V13.9746ZM11 13.75C12.4587 13.75 13.8576 13.1705 14.8891 12.1391C15.9205 11.1076 16.5 9.70869 16.5 8.25C16.5 6.79131 15.9205 5.39236 14.8891 4.36091C13.8576 3.32946 12.4587 2.75 11 2.75C9.54131 2.75 8.14236 3.32946 7.11091 4.36091C6.07946 5.39236 5.5 6.79131 5.5 8.25C5.5 9.70869 6.07946 11.1076 7.11091 12.1391C8.14236 13.1705 9.54131 13.75 11 13.75ZM11 11.9167C10.0275 11.9167 9.09491 11.5304 8.40728 10.8427C7.71964 10.1551 7.33333 9.22246 7.33333 8.25C7.33333 7.27754 7.71964 6.34491 8.40728 5.65728C9.09491 4.96964 10.0275 4.58333 11 4.58333C11.9725 4.58333 12.9051 4.96964 13.5927 5.65728C14.2804 6.34491 14.6667 7.27754 14.6667 8.25C14.6667 9.22246 14.2804 10.1551 13.5927 10.8427C12.9051 11.5304 11.9725 11.9167 11 11.9167Z" />
  </svg>
);

