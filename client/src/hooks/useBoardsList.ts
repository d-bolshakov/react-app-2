import { useState } from "react";

export const useBoardsList = () => {
  const [visible, setVisible] = useState(false);
  const openBoardsList = () => setVisible(true);
  const closeBoardsList = () => setVisible(false);
  return { visible, openBoardsList, closeBoardsList };
};
