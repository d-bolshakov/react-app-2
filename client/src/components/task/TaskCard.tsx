import { Task } from "../../data/Task";
import {
  useDeleteTaskMutation,
  useGetTaskListsQuery,
  useMoveTaskToListMutation,
} from "../../api/api";
import { TaskList } from "../../data/TaskList";
import { Dropdown } from "../ui/Dropdown";
import { Modal } from "../ui/Modal";
import { ChangeEvent, useState } from "react";
import { PriorityTitleTemplates } from "../../templates/PriorityTemplates";
import { formatDateToWeekdayDateMonth } from "../../utils/DateFormat";
import { TaskDetailsCard } from "./TaskDetailsCard";
import { Select } from "../ui/Select";
import { TaskPriority } from "../../data/TaskPriority";

export const TaskCard = ({ task }: { task: Task }) => {
  const [modal, setModal] = useState(false);
  const { currentData } = useGetTaskListsQuery(null);
  const listOptions = currentData
    ?.filter((list) => list.id !== task.listId)
    .map((list: TaskList) => (
      <option value={list.id} key={list.id}>
        {list.name}
      </option>
    ));
  const [moveTaskToList] = useMoveTaskToListMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const onListSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const listId = event.target.value;
    moveTaskToList({
      taskId: task.id,
      newListId: Number(listId),
      oldListId: task.listId,
    });
  };
  const onClickDeleteTask = () => deleteTask(task.id);
  const onClickEditTask = () => setModal(true);
  return (
    <div className="border-1 rounded-md border-gray-400 my-2 mx-1 p-2 shadow-sm shadow-gray-500">
      <Header
        name={task.name}
        onClickEditTask={onClickEditTask}
        onClickDeleteTask={onClickDeleteTask}
      />
      <span className="block mt-1">{task.description}</span>
      <span className="block mt-1">
        <i className="fa-regular fa-calendar mr-1"></i>
        {formatDateToWeekdayDateMonth(new Date(task.dueDate))}
      </span>
      <PriorityBadge priority={task.priority} />
      <Select onChange={onListSelectChange} value="default" id="list">
        <option value="default" disabled>
          Move to:
        </option>
        {listOptions}
      </Select>
      <Modal openModal={modal} closeModal={() => setModal(false)}>
        <TaskDetailsCard task={task} />
      </Modal>
    </div>
  );
};

type HeaderProps = {
  name: string;
  onClickEditTask: React.MouseEventHandler;
  onClickDeleteTask: React.MouseEventHandler;
};

function Header({ name, onClickEditTask, onClickDeleteTask }: HeaderProps) {
  return (
    <div className="flex">
      <h3 className="font-medium text-lg w-fit">{name}</h3>
      <div className="space-x-3 mr-0 ml-auto">
        <Dropdown>
          <button onClick={onClickEditTask}>
            <i className="fa-regular fa-pen-to-square"></i> Edit
          </button>
          <button onClick={onClickDeleteTask} className="text-red-500">
            <i className="fa-regular fa-trash-can"></i> Delete
          </button>
        </Dropdown>
      </div>
    </div>
  );
}

type PriorityBadgeProps = {
  priority: TaskPriority;
};

function PriorityBadge({ priority }: PriorityBadgeProps) {
  const priorityColorMappings = {
    [TaskPriority.LOW]: "text-gray-300",
    [TaskPriority.MEDIUM]: "text-gray-500",
    [TaskPriority.HIGH]: "text-gray-700",
  };
  return (
    <div className="rounded-md bg-gray-200 px-2 w-fit mt-2">
      <i
        className={`fa-solid fa-circle fa-2xs ${priorityColorMappings[priority]}`}
      ></i>
      <span className="mx-1">{PriorityTitleTemplates[priority]}</span>
    </div>
  );
}
