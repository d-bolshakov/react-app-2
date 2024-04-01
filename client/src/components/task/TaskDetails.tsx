import { useState } from "react";
import { useUpdateTaskMutation } from "../../api/api";
import { Task } from "../../data/Task";
import { ButtonPrimary } from "../ui/ButtonPrimary";
import { DatePicker } from "../ui/DatePicker";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { PriorityTitleTemplates } from "../../templates/PriorityTemplates";
import { TaskPriority } from "../../data/TaskPriority";

export const TaskDetails = ({ task }: { task: Task }) => {
  const [updateTask] = useUpdateTaskMutation();
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(new Date(task.dueDate));
  const [priority, setPriority] = useState(task.priority);
  const selectPriorityOptions = Object.entries(PriorityTitleTemplates).map(
    ([value, name]) => ({ value, name })
  );
  const formatDate = (isoDateStr: string) => isoDateStr.slice(0, 16);
  const onSubmit = () =>
    updateTask({
      id: task.id,
      name,
      description,
      dueDate: dueDate.toISOString(),
      priority,
    });
  return (
    <div className="p-2">
      <Input
        type="text"
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        title="Name"
      />
      <Input
        type="text"
        id="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        title="Description"
      />
      <DatePicker
        id="dueDate"
        title="Due date"
        value={formatDate(dueDate.toISOString())}
        onChange={(event) => setDueDate(new Date(event.target.value))}
      />
      <Select
        id="priority"
        title="Priority"
        value={priority}
        onChange={(event) => setPriority(event.target.value as TaskPriority)}
        options={selectPriorityOptions}
      />
      <ButtonPrimary onClick={onSubmit}>Save changes</ButtonPrimary>
    </div>
  );
};
