import { useState } from "react";

export const useHistory = () => {
  const [visible, setVisible] = useState(false);
  const openHistory = () => setVisible(true);
  const closeHistory = () => setVisible(false);
  return { visible, openHistory, closeHistory };
};
