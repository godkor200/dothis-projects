import styled from '@emotion/styled';

import { colors } from '@/styles/chakraTheme/variable';

const HorizonPostRequestItemWrap = styled.div`
  > * {
    display: block;
    margin-bottom: 32px;
  }
  > *:first-of-type {
    margin-top: 0;
  }
  > *:last-of-type {
    margin-bottom: 0;
    border-bottom: 0 none;
  }
`;
export default HorizonPostRequestItemWrap;
