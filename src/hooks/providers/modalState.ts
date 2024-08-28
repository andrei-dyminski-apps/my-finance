import { useContext } from "react";
import { ModalStateContext } from "@/providers/modal-state";
import type { ModalStateContextType } from "@/types/providers/modalStateProvider";

export const useModalState = (): ModalStateContextType => {
  const state = useContext(ModalStateContext);
  if (state === undefined) throw new Error("useModalState must be used within a ModalStateProvider");
  return state;
};
