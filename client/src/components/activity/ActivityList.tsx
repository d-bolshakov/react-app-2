import { TaskActivity } from "../../data/TaskActivity";
import { ActivityMessage } from "./ActivityMessage";

export const ActivityList = ({ activity }: { activity: TaskActivity[] }) => {
  return (
    <div className="p-2">
      {activity && activity.length
        ? activity.map((item) => <ActivityMessage activity={item} />)
        : null}
    </div>
  );
};
