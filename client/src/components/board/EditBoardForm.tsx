import { useState } from "react";
import { Board } from "../../data/Board";
import { useUpdateBoardMutation } from "../../api/api";
import { updateBoardSchema, validator } from "../../utils/Validation";
import { toast } from "react-toastify";
import { Input } from "../ui/Input";
import { Button, ButtonTypes } from "../ui/Button";

type Props = {
  board: Board;
  onSubmitted: () => void;
};

export const EditBoardForm = ({ board, onSubmitted }: Props) => {
  const [formData, setFormData] = useState({ name: board.name });
  const [updateBoard] = useUpdateBoardMutation();
  const onSubmit = () => {
    if (formData.name === board.name) return;
    const errors = validator(updateBoardSchema)(formData);
    if (errors?.length) {
      errors.forEach((error) => toast(error.message, { type: "error" }));
      return;
    }
    updateBoard({ id: board.id, data: formData })
      .unwrap()
      .then(() => onSubmitted())
      .catch((error) => toast(error.message, { type: "error" }));
  };
  return (
    <div className="w-full p-2">
      <h1 className="text-lg font-medium mb-2 text-center">
        Edit {board.name}
      </h1>
      <Input
        type="text"
        id="name"
        value={formData.name}
        onChange={(event) =>
          setFormData((data) => ({ ...data, name: event.target.value }))
        }
        title="Name"
      />
      <Button
        type={ButtonTypes.PRIMARY}
        onClick={onSubmit}
        className="mt-2 w-full"
      >
        Save changes
      </Button>
    </div>
  );
};
