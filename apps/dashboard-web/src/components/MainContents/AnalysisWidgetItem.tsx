export interface AnalysisWidgetItemProps {
  title: string;
  content: string;
}

const AnalysisWidgetItem = ({ title, content }: AnalysisWidgetItemProps) => {
  return (
    <li className="rounded-8 bg-primary50 w-[18.1rem] grow py-5">
      <div className="border-primary500 border-l-2 pl-[25px] font-bold">
        <div className="text-primary500 text-[26px]">{content}</div>
        <div className="text-grey600 mb-1">{title}</div>
      </div>
    </li>
  );
};
export default AnalysisWidgetItem;
