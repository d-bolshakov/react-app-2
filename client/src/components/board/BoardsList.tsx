import { useContext } from "react";
import { useGetBoardsQuery } from "../../api/api";
import { Aside } from "../ui/Aside";
import { Menu } from "../ui/Menu";
import { CreateBoardForm } from "./CreateBoardForm";
import { ModalContext } from "../../context/modal/ModalContext";
import { BoardsListContext } from "../../context/board-list/BoardsListContext";
import { MobileContext } from "../../context/mobile/MobileContext";
import { Sidebar } from "../ui/Sidebar";
import { BoardContext } from "../../context/board/BoardContext";

export const BoardsList = () => {
  const { boardId, setBoardId } = useContext(BoardContext);
  const { isMobile } = useContext(MobileContext);
  const { openModal, closeModal } = useContext(ModalContext);
  const { data: boards } = useGetBoardsQuery(null);
  const { visible, closeBoardsList } = useContext(BoardsListContext);
  return (
    <>
      {visible ? (
        isMobile ? (
          <Sidebar onClose={closeBoardsList} title="Boards" visible={visible}>
            <Menu className="w-full">
              {boards?.map((board) => (
                <Menu.Item
                  onClick={() => setBoardId(board.id)}
                  selected={board.id === boardId}
                >
                  {board.name}
                </Menu.Item>
              ))}
              <Menu.Item
                onClick={() =>
                  openModal(
                    <CreateBoardForm onSubmitted={() => closeModal()} />
                  )
                }
                className=" hover:!bg-slate-400 !bg-gray-300"
              >
                <i className="fa-solid fa-plus"></i> Create new board
              </Menu.Item>
            </Menu>
          </Sidebar>
        ) : (
          <Aside
            visible={visible}
            title="Boards"
            onClose={closeBoardsList}
            className="min-w-fit"
          >
            <Menu className="w-full">
              {boards?.map((board) => (
                <Menu.Item
                  onClick={() => setBoardId(board.id)}
                  selected={board.id === boardId}
                >
                  {board.name}
                </Menu.Item>
              ))}
              <Menu.Item
                onClick={() =>
                  openModal(
                    <CreateBoardForm onSubmitted={() => closeModal()} />
                  )
                }
                className=" hover:!bg-slate-400 !bg-gray-300"
              >
                <i className="fa-solid fa-plus"></i> Create new board
              </Menu.Item>
            </Menu>
          </Aside>
        )
      ) : null}
    </>
  );
};
