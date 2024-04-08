import { useGetTaskByIdQuery, useGetTaskListByIdQuery } from "../api/api";
import { ActivityMessageTemplates } from "../templates/ActivityMessageTemplates";

export const useFormatTaskMovedMessage = (activity: any) => {
  const { data: task, isLoading: taskLoading } = useGetTaskByIdQuery(
    activity.taskId
  );
  const { data: fromList, isLoading: fromListLoading } =
    useGetTaskListByIdQuery(activity.payload.fromListId);
  const { data: toList, isLoading: toListLoading } = useGetTaskListByIdQuery(
    activity.payload.toListId
  );
  if (taskLoading || fromListLoading || toListLoading) return <></>;
  return ActivityMessageTemplates[activity.type](
    task.name,
    fromList?.name,
    toList.name
  );
};
