import { useState } from "react";
import { Input } from "../ui/Input";
import { ButtonPrimary } from "../ui/ButtonPrimary";
import { useUpdateTaskListMutation } from "../../api/api";
import { TaskList } from "../../data/TaskList";
import { updateTaskListSchema, validator } from "../../utils/Validation";
import { toast } from "react-toastify";

export const EditTaskListForm = ({
  list,
  onSubmitted,
}: {
  list: TaskList;
  onSubmitted: (updatedList: TaskList) => void;
}) => {
  const [formData, setFormData] = useState({ name: list.name });
  const [updateTaskList] = useUpdateTaskListMutation();
  const onSubmit = () => {
    if (formData.name === list.name) return;
    const errors = validator(updateTaskListSchema)(formData);
    if (errors?.length) {
      errors.forEach((error) => toast(error.message, { type: "error" }));
      return;
    }
    updateTaskList({ id: list.id, data: formData })
      .then(() => onSubmitted(formData))
      .catch((error) => toast(error.message, { type: "error" }));
  };
  return (
    <div className="w-full p-2">
      <h1 className="text-lg font-medium mb-2 text-center">Edit {list.name}</h1>
      <Input
        type="text"
        id="name"
        value={formData.name}
        onChange={(event) =>
          setFormData((data) => ({ ...data, name: event.target.value }))
        }
        title="Name"
      />
      <ButtonPrimary onClick={onSubmit}>Save changes</ButtonPrimary>
    </div>
  );
};
