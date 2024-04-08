import { ReactNode } from "react";
import { useModal } from "../../hooks/useModal";
import { ModalContext } from "./ModalContext";
import { ContextModal } from "../../components/ui/ContextModal";

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const { modal, modalContent, openModal, closeModal } = useModal();
  return (
    <ModalContext.Provider
      value={{ modal, modalContent, openModal, closeModal }}
    >
      {children}
      <ContextModal />
    </ModalContext.Provider>
  );
};
