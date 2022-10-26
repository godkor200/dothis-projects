import styled from '@emotion/styled';

import { colors, fontWeights, typo } from '@/styles/chakraTheme/variable';

const Label = styled.label`
  color: ${colors.gray['70']};
  ${typo.t4};
  font-weight: ${fontWeights.b};
`;

export default Label;
