import { createContext } from "react";

type SidebarContext = {
  visible: boolean;
  position: "left" | "right";
  content: React.JSX.Element;
  openSidebar: (content: React.JSX.Element, position: "left" | "right") => void;
  closeSidebar: () => void;
};

const defaultValue = {
  visible: false,
  position: "left" as const,
  content: <></>,
  openSidebar: (content: React.JSX.Element, position: "left" | "right") => null,
  closeSidebar: () => null,
};

export const SidebarContext = createContext<SidebarContext>(defaultValue);
