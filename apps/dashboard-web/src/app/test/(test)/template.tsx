const Template = ({
  children,
  storyboard,
}: {
  children: React.ReactNode;
  storyboard: React.ReactNode;
}) => {
  console.log(storyboard);
  if (storyboard) {
    return <>{children}</>;
  }
  return (
    <>
      <div className="text-chip-red text-[90px] font-bold">
        여기는 Template 컴포넌트입니다
      </div>

      <div>{children}</div>
    </>
  );
};

export default Template;
