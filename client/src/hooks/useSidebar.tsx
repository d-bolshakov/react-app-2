import { useState } from "react";

export const useSidebar = () => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(<></>);
  const [position, setPosition] = useState("left");

  const openSidebar = (
    content: React.JSX.Element,
    position: "left" | "right"
  ) => {
    setVisible(true);
    setPosition(position);
    setContent(content);
  };

  const closeSidebar = () => {
    setVisible(false);
    setContent(<></>);
  };

  return { visible, content, position, openSidebar, closeSidebar };
};
