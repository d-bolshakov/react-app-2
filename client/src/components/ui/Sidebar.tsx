import { ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  visible: boolean;
  title?: string;
  onClickOutside: () => void;
  children: React.ReactNode;
};

export const Sidebar = ({
  children,
  visible,
  onClickOutside,
  title,
}: Props) => {
  if (visible) document.body.style.overflow = "clip";
  return (
    <>
      {visible &&
        createPortal(
          <Overlay visible={visible} onClickOutside={onClickOutside}>
            <MainContainer visible={visible}>
              <Header onClickOutside={onClickOutside} title={title} />
              <div className="p-2">{children}</div>
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
  children: ReactNode;
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
      } left-0 top-0 w-full h-full backdrop-blur-sm z-10`}
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
      className={`fixed md:w-fit sm:w-full h-full right-0 ${
        visible ? "block" : "hidden"
      } bg-gray-300 shadow shadow-gray-500 z-20 overflow-auto`}
    >
      {children}
    </div>
  );
}

type HeaderProps = {
  title?: string;
  onClickOutside: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

function Header({ onClickOutside, title }: HeaderProps) {
  return (
    <div className="p-2 w-full bg-gray-600 flex shadow shadow-gray-500">
      {title && (
        <h3 className="text-white font-semibold text-lg pl-2">{title}</h3>
      )}
      <button
        onClick={() => {
          onClickOutside();
          document.body.style.overflow = "unset";
        }}
        className="text-white ml-auto mr-2 font-light"
      >
        <i className="fa-solid fa-x"></i>
      </button>
    </div>
  );
}
