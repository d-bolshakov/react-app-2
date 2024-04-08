import { useState } from "react";

export const useModal = () => {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);

  const openModal = (content: React.JSX.Element) => {
    setModal(true);
    setModalContent(content);
  };

  const closeModal = () => {
    setModal(false);
    setModalContent(<></>);
  };

  return { modal, modalContent, openModal, closeModal };
};
