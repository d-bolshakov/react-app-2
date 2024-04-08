import { ContextSidebar } from "../../components/ui/ContextSidebar";
import { useSidebar } from "../../hooks/useSidebar";
import { SidebarContext } from "./SidebarContext";

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { visible, position, content, openSidebar, closeSidebar } =
    useSidebar();
  return (
    <SidebarContext.Provider
      value={{ visible, position, content, openSidebar, closeSidebar }}
    >
      {children}
      <ContextSidebar />
    </SidebarContext.Provider>
  );
};
