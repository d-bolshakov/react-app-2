import { useContext } from "react";
import { Header } from "../ui/Header";
import { BoardsListContext } from "../../context/board-list/BoardsListContext";
import { HistoryContext } from "../../context/history/HistoryContext";
import { ModalContext } from "../../context/modal/ModalContext";
import { Button, ButtonTypes } from "../ui/Button";
import { EditBoardForm } from "./EditBoardForm";
import { useDeleteBoardMutation, useGetBoardByIdQuery } from "../../api/api";
import { ButtonGroup } from "../ui/ButtonGroup";
import { CreateTaskListForm } from "../task-list/CreateTaskListForm";

type Props = {
  boardId: number | null;
  onBoardDeleted: () => void;
};

export const BoardHeader = ({ boardId, onBoardDeleted }: Props) => {
  const { data: board } = useGetBoardByIdQuery(boardId!, {
    skip: !boardId,
  });
  const { visible, openBoardsList } = useContext(BoardsListContext);
  const { openHistory } = useContext(HistoryContext);
  const { openModal, closeModal } = useContext(ModalContext);
  const [deleteBoard] = useDeleteBoardMutation();
  return (
    <Header className="w-full">
      {visible ? null : (
        <Button
          onClick={openBoardsList}
          className="!border-none !shadow-none"
          type={ButtonTypes.SECONDARY}
        >
          <i className="fa-solid fa-bars"></i>
        </Button>
      )}
      <Header.Title>{boardId ? board?.name : "No board selected"}</Header.Title>
      {boardId && board ? (
        <ButtonGroup className="ml-auto mr-0 h-fit">
          <ButtonGroup.Item
            onClick={() =>
              openModal(
                <EditBoardForm board={board} onSubmitted={closeModal} />
              )
            }
            type={ButtonTypes.SECONDARY}
          >
            <i className="fa-regular fa-pen-to-square"></i> Edit
          </ButtonGroup.Item>
          <ButtonGroup.Item
            onClick={() => {
              onBoardDeleted();
              deleteBoard(board.id);
            }}
            type={ButtonTypes.SECONDARY}
            className="text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500"
          >
            <i className="fa-regular fa-trash-can"></i> Delete
          </ButtonGroup.Item>
          <ButtonGroup.Item onClick={openHistory} type={ButtonTypes.SECONDARY}>
            <i className="fa-solid fa-clock-rotate-left"></i> History
          </ButtonGroup.Item>
          <ButtonGroup.Item
            onClick={() =>
              openModal(
                <CreateTaskListForm
                  boardId={board?.id}
                  onSubmitted={() => closeModal()}
                />
              )
            }
            type={ButtonTypes.PRIMARY}
          >
            <i className="fa-solid fa-plus"></i> Create task list
          </ButtonGroup.Item>
        </ButtonGroup>
      ) : null}
      {/* //   <Header.Controls
      //     buttons={[
      //       {
      //         type: ButtonTypes.SECONDARY,
      //         onClick: () =>
      //           openModal(
      //             <EditBoardForm board={board} onSubmitted={closeModal} />
      //           ),
      //         text: (
      //           <>
      //             <i className="fa-regular fa-pen-to-square"></i> Edit
      //           </>
      //         ),
      //       },
      //       {
      //         type: ButtonTypes.PRIMARY,
      //         onClick: () => {
      //           onBoardDeleted();
      //           deleteBoard(board.id);
      //         },
      //         text: "Delete",
      //         className: "bg-red-500 border-red-500 hover:text-red-500",
      //       },
      //       {
      //         type: ButtonTypes.SECONDARY,
      //         onClick: openHistory,
      //         text: "History",
      //       },
      //       {
      //         type: ButtonTypes.PRIMARY,
      //         onClick: () =>
      //           openModal(
      //             <CreateTaskListForm
      //               boardId={board?.id}
      //               onSubmitted={() => closeModal()}
      //             />
      //           ),
      //         text: "Create new list",
      //       },
      //     ]}
      //   />
      // ) : null} */}
    </Header>
  );
};
