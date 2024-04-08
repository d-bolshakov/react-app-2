import { ReactNode, useContext, useState } from "react";
import { TaskList } from "../../data/TaskList";
import { TaskCard } from "../task/TaskCard";
import { Task } from "../../data/Task";
import { AddTaskCardForm } from "../task/AddTaskCardForm";
import {
  useDeleteTaskListMutation,
  useGetTasksByListIdQuery,
} from "../../api/api";
import { EditTaskListForm } from "./EditTaskListForm";
import { Dropdown } from "../ui/Dropdown";
import { Menu } from "../ui/Menu";
import { Button, ButtonTypes } from "../ui/Button";
import { ModalContext } from "../../context/modal/ModalContext";

export const TaskListColumn = ({ list }: { list: TaskList }) => {
  const { openModal, closeModal } = useContext(ModalContext);
  const [deleteTaskList] = useDeleteTaskListMutation();
  const { data: tasks, isLoading } = useGetTasksByListIdQuery({
    listId: list.id,
    params: { sortBy: "priority", order: "ASC" },
  });
  const onClickAddCard = () =>
    openModal(<AddTaskCardForm onSubmitted={closeModal} listId={list.id} />);
  const onClickDeleteTaskList = () => deleteTaskList(list.id);
  const onClickEditList = () =>
    openModal(<EditTaskListForm onSubmitted={closeModal} list={list} />);
  const headerActions = [
    {
      title: (
        <>
          <i className="fa-solid fa-plus"></i> Add new card
        </>
      ),
      handler: onClickAddCard,
    },
    {
      title: (
        <>
          <i className="fa-regular fa-pen-to-square"></i> Edit
        </>
      ),
      handler: onClickEditList,
    },
    {
      title: (
        <span className="text-red-500">
          <i className=" fa-regular fa-trash-can"></i> Delete
        </span>
      ),
      handler: onClickDeleteTaskList,
    },
  ];
  return (
    <div>
      <Header
        listName={list.name}
        tasksCount={tasks?.length || 0}
        actions={headerActions}
      />
      <Button
        type={ButtonTypes.DASHED}
        onClick={onClickAddCard}
        className="w-full py-3 mt-2"
      >
        <i className="fa-solid fa-plus"></i> Add new card
      </Button>
      {!isLoading && tasks?.length
        ? tasks.map((task: Task) => (
            <TaskCard task={task} key={task.id} boardId={list.boardId} />
          ))
        : null}
    </div>
  );
};

type HeaderProps = {
  actions: { title: string | ReactNode; handler: () => void }[];
  listName: string;
  tasksCount?: number | undefined;
};

function Header({ actions, listName, tasksCount }: HeaderProps) {
  return (
    <div className="px-2 border-y-2 flex border-gray-300">
      <h2 className="font-thin text-xl w-1/2">{listName}</h2>
      <div className="space-x-3 mr-0 ml-auto">
        <span className="font-thin text-xl">{tasksCount || 0}</span>
        <Dropdown>
          <Menu>
            {actions.map((action) => (
              <Menu.Item onClick={action.handler}>{action.title}</Menu.Item>
            ))}
          </Menu>
        </Dropdown>
      </div>
    </div>
  );
}
