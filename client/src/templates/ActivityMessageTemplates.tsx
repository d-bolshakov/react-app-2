export const ActivityMessageTemplates = Object.freeze({
  "task.added": (taskName: string, listName: string) => <>You added <span className="font-semibold"><i className="fa-regular fa-circle-dot"></i> {taskName}</span> to the <span className="font-medium">{listName}</span></>,
  "task.moved": (taskName: string, fromListName: string, toListName: string) => <>You moved <span className="font-semibold"><i className="fa-regular fa-circle-dot"></i> {taskName}</span> from <span className="font-medium">{fromListName}</span> to <span className="font-medium">{toListName}</span></>,
  "task.priority-changed":
    (taskName: string, fromPriority: string, toPriority: string) => <>You changed the priority <span className="font-semibold"><i className="fa-regular fa-circle-dot"></i> {taskName}</span> from <span className="font-medium">{fromPriority}</span> to <span className="font-medium">{toPriority}</span></>,
  "task.renamed": (fromName: string, toName: string) => <>You renamed <span className="font-semibold"><i className="fa-regular fa-circle-dot"></i> {fromName}</span> to <span className="font-semibold"><i className="fa-regular fa-circle-dot"></i> {toName}</span></>
});
