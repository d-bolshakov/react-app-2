import { useState } from "react";
import { useGetActivityQuery, useGetTaskListsQuery } from "../api/api";
import { CreateTaskListForm } from "../components/task-list/CreateTaskListForm";
import { TaskListColumn } from "../components/task-list/TaskListColumn";
import { ButtonPrimary } from "../components/ui/ButtonPrimary";
import { ButtonSecondary } from "../components/ui/ButtonSecondary";
import { Modal } from "../components/ui/Modal";
import { Sidebar } from "../components/ui/Sidebar";
import { TaskList } from "../data/TaskList";
import { ControlsGroup } from "../components/ui/ControlsGroup";
import { ActivityList } from "../components/activity/ActivityList";

export const TasksPage = () => {
  const [addListmodal, setAddListModal] = useState(false);
  const [sidebarVisibility, setSidebarVisibility] = useState(false);
  const { data: activity } = useGetActivityQuery(null, {
    skip: !sidebarVisibility,
  });
  const { data: taskLists, isLoading } = useGetTaskListsQuery(null);
  return (
    <>
      <Sidebar
        title="History"
        visible={sidebarVisibility}
        onClickOutside={() => setSidebarVisibility(false)}
      >
        {activity?.length && <ActivityList activity={activity} />}
      </Sidebar>
      <Header
        onClickHistory={() => setSidebarVisibility(true)}
        onClickCreateNewList={() => setAddListModal(true)}
      />
      <div className="grid md:grid-flow-col md:auto-cols-fr sm:grid-cols-1 gap-4 mt-4">
        {!isLoading && taskLists?.length
          ? taskLists.map((list) => (
              <TaskListColumn list={list as TaskList} key={list.id} />
            ))
          : null}
      </div>
      <Modal openModal={addListmodal} closeModal={() => setAddListModal(false)}>
        <CreateTaskListForm onSubmitted={() => setAddListModal(false)} />
      </Modal>
    </>
  );
};

type HeaderProps = {
  onClickHistory: React.MouseEventHandler;
  onClickCreateNewList: React.MouseEventHandler;
};

function Header({ onClickHistory, onClickCreateNewList }: HeaderProps) {
  return (
    <div className="relative">
      <h1 className="font-thin text-3xl w-1/2">My Task Board</h1>
      <div className="space-2 absolute w-1/3 right-1 top-1 max-md:w-9 max-md:top-3 max-md:right-3">
        <ControlsGroup>
          <ButtonSecondary onClick={onClickHistory}>History</ButtonSecondary>
          <ButtonPrimary onClick={onClickCreateNewList}>
            Create new list
          </ButtonPrimary>
        </ControlsGroup>
      </div>
    </div>
  );
}
