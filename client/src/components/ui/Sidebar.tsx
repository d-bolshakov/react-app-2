import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { Header } from "./Header";
import { Button, ButtonTypes } from "./Button";

type Props = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};

export const Sidebar = ({ children, visible, onClose, title }: Props) => {
  useEffect(() => {
    if (visible) document.body.style.overflow = "clip";
    else document.body.style.overflow = "auto";
  }, [visible]);
  console.log("sidebar visible", visible);
  return (
    <>
      {visible &&
        createPortal(
          <Overlay visible={visible} onClose={onClose}>
            <MainContainer visible={visible}>
              <Header>
                <Header.Title>{title}</Header.Title>
                <Button
                  type={ButtonTypes.SECONDARY}
                  className="!border-none !shadow-none ml-auto mr-0"
                  onClick={() => {
                    onClose();
                    document.body.style.overflow = "unset";
                  }}
                >
                  <i className="fa-solid fa-x"></i>
                </Button>
              </Header>
              {children}
            </MainContainer>
          </Overlay>,
          document.getElementById("overlay")!
        )}
    </>
  );
};

type OverlayProps = {
  visible: boolean;
  onClose: (e?: React.MouseEvent<HTMLDivElement>) => void;
  children: ReactNode;
};

function Overlay({ visible, onClose, children }: OverlayProps) {
  return (
    <div
      onClick={() => {
        onClose();
        document.body.style.overflow = "unset";
      }}
      className={`fixed ${
        visible ? "block" : "hidden"
      } left-0 top-0 w-full h-full backdrop-blur-sm`}
    >
      {children}
    </div>
  );
}

type MainContainerProps = {
  visible: boolean;
  children: ReactNode;
};

function MainContainer({ visible, children }: MainContainerProps) {
  return (
    <div
      onClick={(event) => event.stopPropagation()}
      className={`fixed md:w-fit max-sm:w-full h-full right-0 ${
        visible ? "block" : "hidden"
      } bg-gray-200 shadow shadow-gray-500 overflow-auto`}
    >
      {children}
    </div>
  );
}
