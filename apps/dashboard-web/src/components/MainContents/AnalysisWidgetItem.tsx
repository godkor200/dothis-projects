import TooltipComponent from '../common/Tooltip/Tooltip';

export interface AnalysisWidgetItemProps {
  title: string;
  content: string;
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
    <li className="rounded-8 bg-primary50 w-[18.1rem] grow py-5">
      <div className="border-primary500 border-l-2 pl-[25px] font-bold">
        <div className="text-primary500 text-[20px]">{content}</div>
        <div className="text-grey600 mb-1 flex gap-[4px]">
          <p> {title}</p>
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
