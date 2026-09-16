import React, { createContext, useContext, useState } from 'react';

interface PrevidenciarioModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const PrevidenciarioModalContext = createContext<PrevidenciarioModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const PrevidenciarioModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <PrevidenciarioModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </PrevidenciarioModalContext.Provider>
  );
};

export const usePrevidenciarioModal = () => useContext(PrevidenciarioModalContext);
