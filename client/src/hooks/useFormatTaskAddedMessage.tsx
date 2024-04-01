import { useGetTaskByIdQuery, useGetTaskListByIdQuery } from "../api/api"
import { ActivityMessageTemplates } from "../templates/ActivityMessageTemplates"

export const useFormatTaskAddedMessage = (activity: any) => {
    const { data: task, isLoading: taskLoading } = useGetTaskByIdQuery(activity.taskId)
    const { data: list, isLoading: listLoading } = useGetTaskListByIdQuery(activity.payload.listId)
    if (taskLoading || listLoading) return <></>
    return ActivityMessageTemplates[activity.type](task.name, list.name)
}
