import { TaskActivity } from "../../data/TaskActivity";
import { ActivityMessage } from "./ActivityMessage";

export const ActivityList = ({ activity }: { activity: TaskActivity[] }) => {
  return (
    <div className="">
      {activity &&
        activity.length &&
        activity.map((item) => <ActivityMessage activity={item} />)}
    </div>
  );
};
