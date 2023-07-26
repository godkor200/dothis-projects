'use client';

import type { PropsWithChildren } from 'react';
import React, {
  createContext,
  forwardRef,
  ReactElement,
  useContext,
} from 'react';

import * as Style from './style';

type CheckboxContextProps = {
  id: string;
  isChecked: boolean;
  onChange: (event: React.MouseEvent<HTMLInputElement>) => void;
};

type CheckboxProps = CheckboxContextProps & React.PropsWithChildren<{}>;

const CheckboxContext = createContext<CheckboxContextProps>({
  id: '',
  isChecked: false,
  onChange: () => {},
});

const CheckboxContainer = ({
  id,
  isChecked,
  onChange,
  children,
}: CheckboxProps) => {
  const value = {
    id,
    isChecked,
    onChange,
  };

  return (
    <CheckboxContext.Provider value={value}>
      {children}
    </CheckboxContext.Provider>
  );
};
// Context

const useCheckboxContext = () => {
  const context = useContext(CheckboxContext);
  return context;
};
// useContext hook

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  $size?: Style.CheckBoxSize;
  disabled?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ $size = 'md', disabled = false, ...props }, ref) => {
    const { id, isChecked, onChange } = useCheckboxContext();

    return (
      <Style.CheckBox
        className="appearance-none w-[1.5rem] h-[1.5rem] border-2 rounded-[4px]  border-grey300 bg-grey00 focus:border-primary500 checked:border-primary500  checked:bg-primary500 checked:bg-[url('./Vector2.svg')] checked:bg-no-repeat bg-center "
        type="checkbox"
        id={id}
        checked={isChecked}
        onClick={onChange}
        $size={$size}
        disabled={disabled}
        {...props}
        ref={ref}
      />
    );
  },
);

const Label = ({ children, ...props }: PropsWithChildren<{}>) => {
  const { id } = useCheckboxContext();
  return (
    <label htmlFor={id} {...props}>
      {children}
    </label>
  );
};

CheckboxContainer.Checkbox = Checkbox;
CheckboxContainer.Label = Label;

export default CheckboxContainer;
