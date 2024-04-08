import { createContext } from "react";

type ModalContext = {
  modal: boolean;
  modalContent: React.JSX.Element;
  openModal: (content: React.JSX.Element) => void;
  closeModal: () => void;
};

const defaultValue = {
  modal: false,
  modalContent: <></>,
  openModal: (content: React.JSX.Element) => null,
  closeModal: () => null,
};

export const ModalContext = createContext<ModalContext>(defaultValue);
