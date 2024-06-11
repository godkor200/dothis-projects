const Page = () => {
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns:
          'minmax(600px, 1.5fr) repeat(2, minmax(300px, 1fr))',
      }}
    >
      {/* Grid items go here */}
      <div className="bg-yellow">텍스트</div>
      <div className="bg-primary100">텍스트</div>
      <div className="bg-grey600">텍스트</div>
    </div>
  );
};

export default Page;
