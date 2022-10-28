import { ReactNode, useContext, useState } from "react";
import { ModalContext } from "../contexts/ModalContextProvider";

interface ModalProps {
  children: ReactNode;
}

export function Modal({ children }: ModalProps) {
  return (
    <>
      <div className="inset-0 fixed bg-black opacity-50" />
      <div
        className={`h-screen fixed bg-transparent w-full flex justify-center items-center`}
      >
        {children}
      </div>
    </>
  );
}
