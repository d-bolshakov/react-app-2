import { useState } from "react";
import { Input } from "../ui/Input";
import { ButtonPrimary } from "../ui/ButtonPrimary";
import { useCreateTaskListMutation } from "../../api/api";
import { TaskList } from "../../data/TaskList";
import { addTaskListSchema, validator } from "../../utils/Validation";
import { toast } from "react-toastify";

export const CreateTaskListForm = ({
  onSubmitted,
}: {
  onSubmitted: (createdList: Partial<TaskList>) => void;
}) => {
  const [formData, setFormData] = useState({ name: "" });
  const [createTaskList] = useCreateTaskListMutation();
  const onSubmit = () => {
    const errors = validator(addTaskListSchema)(formData);
    if (errors?.length) {
      errors.forEach((error) => toast(error.message, { type: "error" }));
      return;
    }
    createTaskList(formData)
      .then(() => onSubmitted(formData))
      .catch((error) => toast(error.message, { type: "error" }));
  };
  return (
    <div className="w-full p-2">
      <h1 className="text-lg font-medium mb-2 text-center">
        Add new task list
      </h1>
      <Input
        type="text"
        title="Name"
        id="name"
        value={formData.name}
        onChange={(event) => {
          setFormData((data) => ({ ...data, name: event.target.value }));
        }}
      />
      <ButtonPrimary onClick={onSubmit}>Add</ButtonPrimary>
    </div>
  );
};
