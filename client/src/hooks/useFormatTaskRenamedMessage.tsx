import { ActivityMessageTemplates } from "../templates/ActivityMessageTemplates";

export const useFormatTaskRenamedMessage = (activity: any) => {
  return ActivityMessageTemplates[activity.type](
    activity.payload.from,
    activity.payload.to
  );
};
