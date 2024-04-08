import { createContext } from "react";

type HistoryContext = {
  visible: boolean;
  openHistory: () => void;
  closeHistory: () => void;
};

const defaultValue = {
  visible: false,
  openHistory: () => null,
  closeHistory: () => null,
};

export const HistoryContext = createContext<HistoryContext>(defaultValue);
