import { ReactNode } from "react";
import { useHistory } from "../../hooks/useHistory";
import { HistoryContext } from "./HistoryContext";

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const { visible, openHistory, closeHistory } = useHistory();
  return (
    <HistoryContext.Provider value={{ visible, openHistory, closeHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};
