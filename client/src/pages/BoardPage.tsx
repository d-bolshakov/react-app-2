import { useContext, useState } from "react";
import { BoardContainer } from "../components/board/BoardContainer";
import { BoardHistory } from "../components/board/BoardHistory";
import { BoardsList } from "../components/board/BoardsList";
import { BoardHeader } from "../components/board/BoardHeader";
import { NoContentWindow } from "../components/ui/NoContentWindow";
import { CreateBoardForm } from "../components/board/CreateBoardForm";
import { BoardsListProvider } from "../context/board-list/BoardsListProvider";
import { ModalContext } from "../context/modal/ModalContext";
import { HistoryProvider } from "../context/history/HistoryContextProvider";

export const BoardPage = () => {
  const { openModal, closeModal } = useContext(ModalContext);
  const [boardId, setBoardId] = useState<number | null>(null);
  return (
    <div className="flex w-full min-h-screen h-full">
      <HistoryProvider>
        <BoardsListProvider>
          <BoardsList
            selectedId={boardId}
            onSelected={(id) => setBoardId(id)}
          />
          <div className="w-full">
            <BoardHeader
              boardId={boardId}
              onBoardDeleted={() => {
                setBoardId(null);
              }}
            />
            {boardId ? (
              <BoardContainer boardId={boardId} />
            ) : (
              <div className="w-full h-3/4 flex items-center justify-center">
                <NoContentWindow>
                  <NoContentWindow.Title>
                    No board selected
                  </NoContentWindow.Title>
                  <NoContentWindow.ActionButton
                    onClick={() =>
                      openModal(
                        <CreateBoardForm
                          onSubmitted={(board) => {
                            closeModal();
                            setBoardId(board.id);
                          }}
                        />
                      )
                    }
                  >
                    <i className="fa-solid fa-plus"></i> Create new board
                  </NoContentWindow.ActionButton>
                </NoContentWindow>
              </div>
            )}
          </div>
        </BoardsListProvider>
        {boardId ? <BoardHistory boardId={boardId} /> : null}
      </HistoryProvider>
    </div>
  );
};
