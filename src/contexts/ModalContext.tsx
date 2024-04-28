import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useState,
} from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ModalContextType {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = useCallback((content: ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setModalContent(null), 300);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>{modalContent}</DialogContent>
        </Dialog>
      )}
    </ModalContext.Provider>
  );
};
