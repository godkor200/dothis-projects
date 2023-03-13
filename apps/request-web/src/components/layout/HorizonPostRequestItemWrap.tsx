import type { Theme } from '@emotion/react';
import type { StyledComponent } from '@emotion/styled';
import styled from '@emotion/styled';
import type { ElementType } from 'react';

const HorizonPostRequestItemWrap: StyledComponent<
  { theme?: Theme; as?: ElementType },
  JSX.IntrinsicElements['div'],
  {}
> = styled.div`
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
