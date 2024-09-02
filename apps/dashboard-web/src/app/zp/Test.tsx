import { useState } from 'react';

const Test = ({
  test,
  children,
}: {
  test: boolean;
  children: React.ReactNode;
}) => {
  const [number, setNumber] = useState(0);

  if (test) {
    return <div onClick={() => setNumber((prev) => prev + 1)}>오류가 발생</div>;
  }
  return (
    <div onClick={() => setNumber((prev) => prev + 1)}>하이{children}</div>
  );
};

export default Test;
