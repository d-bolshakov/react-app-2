import { useContext } from "react";
import { createPortal } from "react-dom";
import { SidebarContext } from "../../context/sidebar.tsx/SidebarContext";

export const ContextSidebar = () => {
  const { visible, content, position, closeSidebar } =
    useContext(SidebarContext);
  return (
    <>
      {visible &&
        createPortal(
          <Overlay visible={visible} onClickOutside={closeSidebar}>
            <MainContainer visible={visible} position={position}>
              {content}
            </MainContainer>
          </Overlay>,
          document.getElementById("overlay")!
        )}
    </>
  );
};
type OverlayProps = {
  visible: boolean;
  onClickOutside: (e?: React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
};

function Overlay({ visible, onClickOutside, children }: OverlayProps) {
  return (
    <div
      onClick={() => {
        onClickOutside();
        document.body.style.overflow = "unset";
      }}
      className={`absolute ${
        visible ? "block" : "hidden"
      } left-0 top-0 w-full h-full backdrop-blur-sm`}
    >
      {children}
    </div>
  );
}

type MainContainerProps = {
  visible: boolean;
  children: React.ReactNode;
  position: "left" | "right";
};

function MainContainer({ visible, children, position }: MainContainerProps) {
  const positionClassNames = {
    left: "left-0",
    right: "right-0",
  };
  return (
    <div
      onClick={(event) => event.stopPropagation()}
      className={`fixed md:w-fit max-sm:w-full h-full ${
        positionClassNames[position]
      } ${
        visible ? "block" : "hidden"
      } bg-gray-200 shadow shadow-gray-500 overflow-auto`}
    >
      {children}
    </div>
  );
}
