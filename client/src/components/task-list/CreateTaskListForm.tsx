import { useState } from "react";
import { Input } from "../ui/Input";
import { useCreateTaskListMutation } from "../../api/api";
import { addTaskListSchema, validator } from "../../utils/Validation";
import { toast } from "react-toastify";
import { Button, ButtonTypes } from "../ui/Button";

export const CreateTaskListForm = ({
  boardId,
  onSubmitted,
}: {
  boardId: number;
  onSubmitted: () => void;
}) => {
  const [formData, setFormData] = useState({ boardId, name: "" });
  const [createTaskList] = useCreateTaskListMutation();
  const onSubmit = () => {
    const errors = validator(addTaskListSchema)(formData);
    if (errors?.length) {
      errors.forEach((error) => toast(error.message, { type: "error" }));
      return;
    }
    createTaskList(formData)
      .unwrap()
      .then(() => onSubmitted)
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
      <Button
        onClick={onSubmit}
        type={ButtonTypes.PRIMARY}
        className="mt-2 w-full"
      >
        Add
      </Button>
    </div>
  );
};
