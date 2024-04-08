import { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ToastContainer } from "react-toastify";
import { ModalContext } from "../../context/modal/ModalContext";

export const ContextModal = () => {
  const { modal, modalContent, closeModal } = useContext(ModalContext);
  const ref = useRef();
  useEffect(() => {
    if (modal) {
      ref.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      ref.current?.close();
      document.body.style.overflow = "unset";
    }
  }, [modal]);

  return (
    <>
      {modal &&
        createPortal(
          <dialog
            className="w-fit rounded-md shadow shadow-gray-500 backdrop:backdrop-blur"
            ref={ref}
            onCancel={() => closeModal()}
          >
            <ToastContainer style={{ zIndex: 1000 }} />
            <Header onClickClose={() => closeModal()} />
            {modalContent}
          </dialog>,
          document.getElementById("overlay")!
        )}
    </>
  );
};

type HeaderProps = {
  onClickClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;
};

function Header({ onClickClose, title }: HeaderProps) {
  return (
    <div className="h-fit w-full bg-gray-600 flex">
      <h3 className="text-white font-semibold text-lg pl-2 text-center">
        {title}
      </h3>
      <button
        onClick={onClickClose}
        className="text-white ml-auto mr-2 font-light"
      >
        <i className="fa-solid fa-x"></i>
      </button>
    </div>
  );
}
