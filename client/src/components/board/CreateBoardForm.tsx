import { useState } from "react";
import { Input } from "../ui/Input";
import { useCreateBoardMutation } from "../../api/api";
import { createBoardSchema, validator } from "../../utils/Validation";
import { toast } from "react-toastify";
import { Board } from "../../data/Board";
import { Button, ButtonTypes } from "../ui/Button";

type Props = {
  onSubmitted: (created: Board) => void;
};

export const CreateBoardForm = ({ onSubmitted }: Props) => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [createBoard] = useCreateBoardMutation();
  const onSubmit = () => {
    const errors = validator(createBoardSchema)(formData);
    if (errors?.length) {
      errors.forEach((error) => toast(error.message, { type: "error" }));
      return;
    }
    createBoard(formData)
      .unwrap()
      .then((data) => onSubmitted(data))
      .catch((error) => toast(error.message, { type: "error" }));
  };
  return (
    <div className="p-2">
      <h1 className="text-lg font-medium mb-2 text-center">Create new board</h1>
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
        type={ButtonTypes.PRIMARY}
        onClick={onSubmit}
        className="w-full mt-2"
      >
        Create
      </Button>
    </div>
  );
};
