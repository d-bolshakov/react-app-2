import { useState } from "react";
import { useGetTaskListsQuery, useUpdateTaskMutation } from "../../api/api";
import { Task } from "../../data/Task";
import { TaskList } from "../../data/TaskList";
import { formatDateToWeekdayDateMonth } from "../../utils/DateFormat";
import { PriorityTitleTemplates } from "../../templates/PriorityTemplates";
import { TaskPriority } from "../../data/TaskPriority";
import { updateTaskSchema, validator } from "../../utils/Validation";
import { toast } from "react-toastify";
import { Button, ButtonTypes } from "../ui/Button";

export const TaskInfo = ({ task }: { task: Task }) => {
  const [editMode, setEditMode] = useState(false);
  const { data: lists } = useGetTaskListsQuery(null);
  const [updateTask] = useUpdateTaskMutation();
  const listOptions = lists!.map((list: TaskList) => ({
    value: list.id,
    name: list.name,
  }));
  const priorityOptions = Object.entries(PriorityTitleTemplates).map(
    ([value, name]) => ({ value: Number(value), name })
  );
  const [formData, setFormData] = useState({
    name: task.name,
    listId: task.listId,
    dueDate: task.dueDate,
    priority: task.priority,
    description: task.description,
  });
  const onSave = () => {
    const delta = Object.keys(task).reduce((acc, key) => {
      if (key === "id") return acc;
      if (task[key] !== formData[key]) acc[key] = formData[key];
      return acc;
    }, {});
    if (!Object.keys(delta).length) {
      setEditMode(false);
      return;
    }
    const errors = validator(updateTaskSchema)(delta);
    if (errors?.length) {
      errors.forEach((error) => toast(error.message, { type: "error" }));
      return;
    }
    updateTask({ id: task.id, data: delta }).catch((error) =>
      toast(error.message, { type: "error" })
    );
    setEditMode(false);
  };
  return (
    <div className="w-full p-2">
      <div className="relative">
        <EditableNameTitle
          name={formData.name}
          onChange={(e) =>
            setFormData((data) => ({ ...data, name: e.target.value }))
          }
          editMode
          containerClassName="w-fit absolute left-0 top-1"
        />
        <EditButton
          editMode={editMode}
          onClickInEditMode={onSave}
          onClickNotInEditMode={() => setEditMode(true)}
          containerClassName="w-1/5 absolute right-0 top-0"
        />
      </div>
      <div className="grid grid-cols-2 mt-10">
        <span className="col-span-1 font-normal">
          <i className="fa-solid fa-crosshairs"></i> Status
        </span>
        <EditableSelect
          value={formData.listId}
          options={listOptions}
          editMode={editMode}
          onChange={(e) =>
            setFormData((data) => ({
              ...data,
              listId: Number(e.target.value),
            }))
          }
          className="font-medium"
        />
        <span className="col-span-1 font-normal">
          <i className="fa-regular fa-calendar"></i> Due date
        </span>
        <EditableDatePicker
          editMode={editMode}
          value={formData.dueDate}
          onChange={(e) =>
            setFormData((data) => ({
              ...data,
              dueDate: new Date(e.target.value).toISOString(),
            }))
          }
          className="font-medium"
        />
        <span className="col-span-1 font-normal">
          <i className="fa-solid fa-tag"></i> Priority
        </span>
        <EditableSelect
          value={formData.priority}
          options={priorityOptions}
          editMode={editMode}
          onChange={(e) =>
            setFormData((data) => ({
              ...data,
              priority: Number(e.target.value) as TaskPriority,
            }))
          }
          className="font-medium"
        />
      </div>
      <div className="mt-2">
        <h2 className="text-lg font-sans font-semibold">Description</h2>
        <EditableTextArea
          editMode={editMode}
          value={formData.description}
          onChange={(e) =>
            setFormData((data) => ({ ...data, description: e.target.value }))
          }
          className="font-normal"
        />
      </div>
    </div>
  );
};

type EditableNameTitleProps = {
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  editMode: boolean;
  containerClassName?: string;
};

function EditableNameTitle({
  name,
  onChange,
  editMode,
  containerClassName,
}: EditableNameTitleProps) {
  return (
    <div className={containerClassName}>
      {editMode ? (
        <input
          className="text-xl font-sans font-semibold"
          type="text"
          value={name}
          onChange={onChange}
        />
      ) : (
        <h1 className="text-xl font-sans font-semibold">{name}</h1>
      )}
    </div>
  );
}

type EditButtonProps = {
  editMode: boolean;
  onClickInEditMode: React.MouseEventHandler<HTMLButtonElement>;
  onClickNotInEditMode: React.MouseEventHandler<HTMLButtonElement>;
  containerClassName?: string;
};

function EditButton({
  editMode,
  onClickInEditMode,
  onClickNotInEditMode,
  containerClassName,
}: EditButtonProps) {
  return (
    <div className={containerClassName}>
      {editMode ? (
        <Button
          type={ButtonTypes.SECONDARY}
          onClick={onClickInEditMode}
          className="p-3"
        >
          <i className="fa-solid fa-check"></i> Save
        </Button>
      ) : (
        <Button type={ButtonTypes.SECONDARY} onClick={onClickNotInEditMode}>
          <i className="fa-regular fa-pen-to-square"></i> Edit
        </Button>
      )}
    </div>
  );
}

type EditableSelectProps = {
  editMode: boolean;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: { name: string; value: string | number }[];
  className?: string;
};

function EditableSelect({
  editMode,
  value,
  onChange,
  options,
  className,
}: EditableSelectProps) {
  return (
    <>
      {editMode ? (
        <select className={`${className}`} value={value} onChange={onChange}>
          {options.map((option) => (
            <option value={option.value}>{option.name}</option>
          ))}
        </select>
      ) : (
        <span className={`px-1 ${className}`}>
          {options.find((item) => item.value === value)!.name}
        </span>
      )}
    </>
  );
}

type EditableDatePickerProps = {
  editMode: boolean;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
};

function EditableDatePicker({
  editMode,
  value,
  onChange,
  className,
}: EditableDatePickerProps) {
  const formatDate = (isoDateStr: string) => isoDateStr.slice(0, 10);
  return (
    <>
      {editMode ? (
        <input
          className={`h-6 pl-0.5 ${className}`}
          type="date"
          value={formatDate(value)}
          onChange={onChange}
        />
      ) : (
        <span className={`px-1 ${className}`}>
          {formatDateToWeekdayDateMonth(new Date(value))}
        </span>
      )}
    </>
  );
}

type EditableTextAreaProps = {
  editMode: boolean;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  className?: string;
};

function EditableTextArea({
  editMode,
  value,
  onChange,
  className,
}: EditableTextAreaProps) {
  return (
    <>
      {editMode ? (
        <textarea
          className={`w-full ${className}`}
          value={value}
          onChange={onChange}
        />
      ) : (
        <span className={`${className}`}>{value}</span>
      )}
    </>
  );
}
