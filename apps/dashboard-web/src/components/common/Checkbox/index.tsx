import type { PropsWithChildren } from 'react';
import React, {
  createContext,
  forwardRef,
  ReactElement,
  useContext,
} from 'react';

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

const Checkbox = forwardRef(
  ({ as, ...props }: { as: React.ElementType }, ref) => {
    const { id, isChecked, onChange } = useCheckboxContext();

    const Trigger =
      as ||
      React.forwardRef<HTMLInputElement>(({ ...props }, ref) => (
        <input
          type="checkbox"
          id={id}
          checked={isChecked}
          onClick={onChange}
          readOnly
          {...props}
          ref={ref}
        />
      ));

    return (
      <>
        {/* <input type="checkbox" id={id} checked={isChecked} onClick={onChange} readOnly {...props} ref={ref} /> */}

        <Trigger isChecked={isChecked} onChange={onChange} id={id} ref={ref} />
      </>
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
