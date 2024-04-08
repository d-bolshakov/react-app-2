import { useGetTaskListsByBoardIdQuery } from "../../api/api";
import { TaskListColumn } from "../task-list/TaskListColumn";
import { TaskList } from "../../data/TaskList";
import { NoContentWindow } from "../ui/NoContentWindow";
import { useContext } from "react";
import { ModalContext } from "../../context/modal/ModalContext";
import { CreateTaskListForm } from "../task-list/CreateTaskListForm";

type Props = {
  boardId: number;
};

export const BoardContainer = ({ boardId }: Props) => {
  const { openModal, closeModal } = useContext(ModalContext);
  const { data: taskLists, isLoading } = useGetTaskListsByBoardIdQuery(boardId);
  return (
    <>
      {!isLoading && taskLists?.length ? (
        <div className="w-full grid md:grid-flow-col md:auto-cols-fr sm:grid-cols-1 gap-4 p-2">
          {taskLists.map((list) => (
            <TaskListColumn list={list as TaskList} key={list.id} />
          ))}
        </div>
      ) : (
        <div className="w-full h-3/4 flex items-center justify-center">
          <NoContentWindow>
            <NoContentWindow.Title>No task lists</NoContentWindow.Title>
            <NoContentWindow.ActionButton
              onClick={() =>
                openModal(
                  <CreateTaskListForm
                    boardId={boardId}
                    onSubmitted={() => closeModal()}
                  />
                )
              }
            >
              <i className="fa-solid fa-plus"></i> Create new task list
            </NoContentWindow.ActionButton>
          </NoContentWindow>
        </div>
      )}
    </>
  );
};
