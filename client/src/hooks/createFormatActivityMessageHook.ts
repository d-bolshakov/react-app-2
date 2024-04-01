import { useFormatTaskAddedMessage } from "./useFormatTaskAddedMessage";
import { useFormatTaskMovedMessage } from "./useFormatTaskMovedMessage";
import { useFormatTaskPriorityChangedMessage } from "./useFormatTaskPriorityChangedMessage";
import { useFormatTaskRenamedMessage } from "./useFormatTaskRenamedMessage";

export const createFormatActivityMessageHook = (activityType: string) => {
  switch (activityType) {
    case "task.added":
      return useFormatTaskAddedMessage;

    case "task.moved":
      return useFormatTaskMovedMessage;

    case "task.renamed":
      return useFormatTaskRenamedMessage;

    case "task.priority-changed":
      return useFormatTaskPriorityChangedMessage;

    default:
      throw Error("Unknown task activity type");
      break;
  }
};
