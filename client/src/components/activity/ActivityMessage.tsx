import { TaskActivity } from "../../data/TaskActivity";
import { createFormatActivityMessageHook } from "../../hooks/createFormatActivityMessageHook";
import { formatDateToMonthNameDayTime } from "../../utils/DateFormat";

export const ActivityMessage = ({ activity }: { activity: TaskActivity }) => {
  const useFormat = createFormatActivityMessageHook(activity.type);
  const formattedMessage = useFormat(activity);
  const formattedDate = formatDateToMonthNameDayTime(
    new Date(activity.timestamp)
  );
  return (
    <div className="grid md:grid-cols-4 md:gap-4 mt-2 sm:grid-cols-1">
      <span className="col-span-3">{formattedMessage}</span>
      <span className="col-span-1 font-normal">{formattedDate}</span>
    </div>
  );
};
