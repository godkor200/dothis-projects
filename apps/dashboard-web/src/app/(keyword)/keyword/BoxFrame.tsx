const BoxFrame = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border-grey400 rounded-10 relative border px-[30px] py-[20px]">
      {children}
    </div>
  );
};

export default BoxFrame;
