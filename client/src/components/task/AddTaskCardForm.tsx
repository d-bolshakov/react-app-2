import { useState } from "react";
import { useAddNewTaskMutation } from "../../api/api";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { DatePicker } from "../ui/DatePicker";
import { ButtonPrimary } from "../ui/ButtonPrimary";
import { Task } from "../../data/Task";
import { PriorityTitleTemplates } from "../../templates/PriorityTemplates";
import { addTaskSchema, validator } from "../../utils/Validation";
import { toast } from "react-toastify";
import { TaskPriority } from "../../data/TaskPriority";

export const AddTaskCardForm = ({
  listId,
  onSubmitted,
}: {
  listId: number;
  onSubmitted: (createdTask: Partial<Task>) => void;
}) => {
  const [addNewTask] = useAddNewTaskMutation();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dueDate: new Date().toISOString(),
    priority: TaskPriority.LOW,
    listId,
  });
  const selectPriorityOptions = Object.entries(PriorityTitleTemplates).map(
    ([value, name]) => ({ value, name })
  );
  const onSubmit = () => {
    const errors = validator(addTaskSchema)(formData);
    if (errors?.length) {
      errors.forEach((error) => toast(error.message, { type: "error" }));
      return;
    }
    addNewTask(formData)
      .then(() => onSubmitted(formData))
      .catch((error) => toast(error.message, { type: "error" }));
  };
  return (
    <div className="w-full p-2">
      <h1 className="text-lg font-medium mb-2 text-center">Add new card</h1>
      <Input
        type="text"
        id="name"
        value={formData.name}
        onChange={(event) =>
          setFormData((data) => ({ ...data, name: event.target.value }))
        }
        title="Name"
        required={true}
        containerClassName="mt-2"
      />
      <Input
        type="text"
        id="description"
        value={formData.description}
        onChange={(event) =>
          setFormData((data) => ({
            ...data,
            description: event.target.value,
          }))
        }
        title="Description"
        required={true}
        containerClassName="mt-2"
      />
      <DatePicker
        id="dueDate"
        title="Due date"
        value={formData.dueDate}
        onChange={(event) =>
          setFormData((data) => ({
            ...data,
            dueDate: new Date(event.target.value).toISOString(),
          }))
        }
        required={true}
        containerClassName="mt-2"
      />
      <Select
        id="priority"
        title="Priority"
        value={formData.priority}
        onChange={(event) =>
          setFormData((data) => ({
            ...data,
            priority: Number(event.target.value) as TaskPriority,
          }))
        }
        options={selectPriorityOptions}
        required={true}
        containerClassName="mt-2"
      />
      <ButtonPrimary onClick={onSubmit}>Add</ButtonPrimary>
    </div>
  );
};
