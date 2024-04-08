import { useGetTaskByIdQuery } from "../api/api";
import { ActivityMessageTemplates } from "../templates/ActivityMessageTemplates";
import { PriorityTitleTemplates } from "../templates/PriorityTemplates";

export const useFormatTaskPriorityChangedMessage = (activity: any) => {
  const { data: task, isLoading: taskLoading } = useGetTaskByIdQuery(
    activity.taskId
  );
  if (taskLoading) return <></>;
  return ActivityMessageTemplates[activity.type](
    task.name,
    PriorityTitleTemplates[activity.payload.from],
    PriorityTitleTemplates[activity.payload.to]
  );
};
