import styled from 'styled-components';

export const Calendar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 24px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 2px 0px 25px 7px rgba(156, 156, 156, 0.15);
  max-width: ${'302px'};
`;

export const Date = styled.span`
  color: black;
`;

export const ArrowIcon = styled.span`
  height: 24px;
  width: 16px;
  display: flex;
  align-items: center;
`;

export const ArrowBlock = styled.span`
  display: flex;

  gap: 12px;
  cursor: pointer;
`;

export const FlexGap = styled.div`
  display: flex;
  gap: 4px;
`;

export const Week = styled(FlexGap)``;
export const DayTitle = styled(FlexGap)``;

export const Day = styled.div<{
  isSunday: boolean;
  isToday?: boolean;
  isSelected?: boolean;
  isOtherMonth?: boolean;
  isInvalid?: boolean;
}>`
  width: ${'34px'};
  height: ${'34px'};
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;

  border: ${({ theme, isToday, isInvalid }) =>
    isToday && !isInvalid && '2px solid rgba(255,100,125,0.5)'};
  border-radius: 6px;

  background-color: ${({ isSelected }) => isSelected && '#FF647D'};

  color: ${({ theme, isSunday, isOtherMonth, isInvalid, isSelected }) =>
    isInvalid
      ? '#bdbdbd'
      : isSelected
      ? '#fff'
      : isOtherMonth
      ? '#bdbdbd'
      : isSunday
      ? '#cc4419'
      : '#2d2d2d'};
  &:hover {
    background-color: ${({ theme, isInvalid, isSelected }) =>
      !isSelected && !isInvalid && '#f1f2f3'};
  }

  cursor: ${({ theme, isInvalid }) => !isInvalid && 'pointer'};
`;

export const DateTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  /* align-items: center; */
`;

export const DayType = styled(Day)`
  color: ${({ theme, isSunday }) => (isSunday ? '#cc4419' : '#6e6e6e')};
  background-color: white;
  &:hover {
    background-color: white;
  }
`;

export const Trigger = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  margin-top: 8px;
`;
