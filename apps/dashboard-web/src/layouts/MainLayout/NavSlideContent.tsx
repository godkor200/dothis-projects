import { theme } from '@dothis/theme/dashboard/index';
import styled, { css } from 'styled-components';

import SvgComp from '@/components/share/SvgComp';

function NavSliderContent() {
  return (
    <ButtonContainer>
      <Button $active={true}>
        먹방
        <SvgComp icon="NavSlideDelete" size="1rem" />
      </Button>
      <Button $active={true}>
        먹방
        <SvgComp icon="NavSlideDelete" size="1rem" />
      </Button>
      <Button $active={true}>
        먹방맛집
        <SvgComp icon="NavSlideDelete" size="1rem" />
      </Button>
      <Button $active={true}>
        먹방맛집
        <SvgComp icon="NavSlideDelete" size="1rem" />
      </Button>
      <Button $active={true}>
        먹방맛집
        <SvgComp icon="NavSlideDelete" size="1rem" />
      </Button>
      <Button $active={true}>
        먹방맛집
        <SvgComp icon="NavSlideDelete" size="1rem" />
      </Button>
      <Button $active={true}>
        먹방맛집
        <SvgComp icon="NavSlideDelete" size="1rem" />
      </Button>
      <Button $active={true}>
        먹방맛집
        <SvgComp icon="NavSlideDelete" size="1rem" />
      </Button>
      <Button $active={true}>
        먹방맛집
        <SvgComp icon="NavSlideDelete" size="1rem" />
      </Button>
      <Button $active={true}>
        먹방맛집
        <SvgComp icon="NavSlideDelete" size="1rem" />
      </Button>
      <Button $active={true}>
        먹방맛집
        <SvgComp icon="NavSlideDelete" size="1rem" />
      </Button>
      <Button $active={true}>
        먹방맛집
        <SvgComp icon="NavSlideDelete" size="1rem" />
      </Button>
      <Button $active={true}>
        먹방맛집
        <SvgComp icon="NavSlideDelete" size="1rem" />
      </Button>
    </ButtonContainer>
  );
}

export default NavSliderContent;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;

  overflow-x: hidden;
`;

const Button = styled.button<{ $active: boolean }>`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-shrink: 0;

  position: relative;

  padding: 0.5rem 1.25rem;
  border: 1px solid white;
  border-radius: 0.5rem;
  box-sizing: border-box;

  font-size: 1rem;
  font-weight: 500;

  color: ${theme.colors.grey40};
  background-color: ${theme.colors.grey00};
  box-shadow: inset 0 0 0 2px ${theme.colors.grey40};

  ${({ $active }) =>
    $active &&
    css`
      border: 1px solid white;

      background-color: rgba(${theme.colors.primary10}, 0.1);
      color: ${theme.colors.primary40};
      box-shadow: inset 0 0 0 2px ${theme.colors.primary40};
    `}
`;
