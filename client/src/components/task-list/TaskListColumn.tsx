import { ReactNode, useState } from "react";
import { TaskList } from "../../data/TaskList";
import { TaskCard } from "../task/TaskCard";
import { Task } from "../../data/Task";
import { ButtonDashed } from "../ui/ButtonDashed";
import { Modal } from "../ui/Modal";
import { AddTaskCardForm } from "../task/AddTaskCardForm";
import {
  useDeleteTaskListMutation,
  useGetTasksByListIdQuery,
} from "../../api/api";
import { EditTaskListForm } from "./EditTaskListForm";
import { Dropdown } from "../ui/Dropdown";

export const TaskListColumn = ({ list }: { list: TaskList }) => {
  const [modalAddCard, setModalAddCard] = useState(false);
  const [modalEditList, setModalEditList] = useState(false);
  const [deleteTaskList] = useDeleteTaskListMutation();
  const { data: tasks, isLoading } = useGetTasksByListIdQuery({
    listId: list.id,
    params: { sortBy: "priority", order: "ASC" },
  });
  const onClickAddCard = () => setModalAddCard(true);
  const onClickDeleteTaskList = () => deleteTaskList(list.id);
  const onClickEditList = () => setModalEditList(true);
  const headerActions = [
    <button onClick={onClickAddCard}>
      <i className="fa-solid fa-plus"></i> Add new card
    </button>,
    <button onClick={onClickEditList}>
      <i className="fa-regular fa-pen-to-square"></i> Edit
    </button>,
    <button onClick={onClickDeleteTaskList} className="text-red-500">
      <i className="fa-regular fa-trash-can"></i> Delete
    </button>,
  ];
  return (
    <>
      <div>
        <Header
          listName={list.name}
          tasksCount={tasks?.length || 0}
          actions={headerActions}
        />
        <ButtonDashed onClick={onClickAddCard}>
          <i className="fa-solid fa-plus"></i> Add new card
        </ButtonDashed>
        {!isLoading && tasks?.length
          ? tasks.map((task: Task) => <TaskCard task={task} key={task.id} />)
          : null}
      </div>
      <Modal openModal={modalAddCard} closeModal={() => setModalAddCard(false)}>
        <AddTaskCardForm
          onSubmitted={() => setModalAddCard(false)}
          listId={list.id}
        />
      </Modal>
      <Modal
        openModal={modalEditList}
        closeModal={() => setModalEditList(false)}
      >
        <EditTaskListForm
          onSubmitted={() => setModalEditList(false)}
          list={list}
        />
      </Modal>
    </>
  );
};

type HeaderProps = {
  actions: ReactNode[];
  listName: string;
  tasksCount?: number | undefined;
};

function Header({ actions, listName, tasksCount }: HeaderProps) {
  return (
    <div className="px-2 border-y-2 flex border-gray-300">
      <h2 className="font-thin text-xl w-1/2">{listName}</h2>
      <div className="space-x-3 mr-0 ml-auto">
        <span className="font-thin text-xl">{tasksCount || 0}</span>
        <Dropdown>{actions}</Dropdown>
      </div>
    </div>
  );
}
