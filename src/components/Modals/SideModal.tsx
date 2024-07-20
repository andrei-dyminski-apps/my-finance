import { useViewport } from "@/hooks/viewport";
import { Preloader } from "@/components/Layout/Preloader.jsx";
import { ReactNode, useEffect } from "react";
import { useModalState } from "@/hooks/providers/modalState";
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("antd/es/drawer"));

export const SideModal = ({
  title,
  isOpen,
  isLoading = false,
  children,
  footer,
  onClose,
}: {
  title: string;
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  footer?: ReactNode;
  isLoading?: boolean;
}) => {
  const { isMobile } = useViewport();
  const placement = isMobile ? "bottom" : "right";
  const { isInitializedModal, setIsInitializedModal } = useModalState();

  useEffect(() => {
    if (isOpen && !isInitializedModal) setIsInitializedModal(true);
  }, [isOpen]);

  return (
    <>
      {isInitializedModal && (
        <Modal title={title} placement={placement} open={isOpen} height="100%" width={550} destroyOnClose={true} classNames={{ body: "flex flex-col" }} onClose={onClose}>
          <Preloader isLoading={isLoading}>
            {children}
            {footer && <div className="sticky -bottom-6 z-20 -mb-6 mt-auto flex flex-col gap-4 bg-white pb-6 pt-4 dark:bg-dark-modal">{footer}</div>}
          </Preloader>
        </Modal>
      )}
    </>
  );
};