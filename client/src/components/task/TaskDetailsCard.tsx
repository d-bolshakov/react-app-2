import { useGetActivityByTaskIdQuery } from "../../api/api";
import { Task } from "../../data/Task";
import { ActivityList } from "../activity/ActivityList";
import { TaskInfo } from "./TaskInfo";

export const TaskDetailsCard = ({ task }: { task: Task }) => {
  const { data: activity } = useGetActivityByTaskIdQuery(task.id);

  return (
    <div className="w-full md:grid md:grid-flow-col md:grid-cols-2">
      <TaskInfo task={task} />
      <div className="bg-gray-300 p-2 overflow-y-scroll max-h-80">
        <h3 className="font-sans text-xl font-semibold">Activtity</h3>
        {activity?.length && <ActivityList activity={activity} />}
      </div>
    </div>
  );
};
