import { ReactNode } from "react";
import { useBoardsList } from "../../hooks/useBoardsList";
import { BoardsListContext } from "./BoardsListContext";

export const BoardsListProvider = ({ children }: { children: ReactNode }) => {
  const { visible, openBoardsList, closeBoardsList } = useBoardsList();
  return (
    <BoardsListContext.Provider
      value={{ visible, openBoardsList, closeBoardsList }}
    >
      {children}
    </BoardsListContext.Provider>
  );
};
