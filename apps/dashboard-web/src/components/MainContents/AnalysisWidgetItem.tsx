import TooltipComponent from '../common/Tooltip/Tooltip';

export interface AnalysisWidgetItemProps {
  title: string | null;
  content: string | null;
  hasTooltip: boolean;
  tooltipText: string;
}

const AnalysisWidgetItem = ({
  title,
  content,
  hasTooltip,
  tooltipText,
}: AnalysisWidgetItemProps) => {
  return (
    <li
      className="rounded-8 bg-primary50 min-h-[100px] min-w-[18.1rem] grow  py-5"
      key={title}
    >
      <div className="border-primary500 border-l-2 px-[25px]  font-bold">
        <div className="text-primary500 text-[20px]">{content}</div>
        <div className="text-grey600 mb-1 flex gap-[4px]">
          <p className="whitespace-pre-line">{title}</p>
          {hasTooltip && (
            <div className="flex items-center ">
              <TooltipComponent title={tooltipText} />
            </div>
          )}
        </div>
      </div>
    </li>
  );
};
export default AnalysisWidgetItem;
