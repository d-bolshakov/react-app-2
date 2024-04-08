import { createContext } from "react";

type BoardsListContext = {
  visible: boolean;
  openBoardsList: () => void;
  closeBoardsList: () => void;
};

const defaultValue = {
  visible: false,
  openBoardsList: () => null,
  closeBoardsList: () => null,
};

export const BoardsListContext = createContext<BoardsListContext>(defaultValue);
