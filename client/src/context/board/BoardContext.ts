import { createContext } from "react";

type BoardContext = {
  boardId: number | null;
  setBoardId: (id: number) => void;
};

const defaultValue = {
  boardId: null,
  setBoardId: (id: number) => null,
};

export const BoardContext = createContext<BoardContext>(defaultValue);
