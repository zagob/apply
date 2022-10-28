import { createContext, ReactNode, useState } from "react";

interface ModalContextProps {
  onSetModalOpen: (nameModal: string) => void;
  onCloseModal: () => void;
  modal: string;
}

export const ModalContext = createContext({} as ModalContextProps);

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modal, setModal] = useState("");

  function onSetModalOpen(nameModal: string) {
    setModal(nameModal);
  }

  function onCloseModal() {
    setModal("");
  }

  return (
    <ModalContext.Provider value={{ modal, onSetModalOpen, onCloseModal }}>
      {children}
    </ModalContext.Provider>
  );
}
