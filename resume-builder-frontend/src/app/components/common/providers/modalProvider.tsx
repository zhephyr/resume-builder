import React, { createContext, useContext } from "react";

const ModalContext = createContext({isOpen: false, openModal: () => {}, closeModal: () => {}});

export default function ModalProvider({children}: {children: React.ReactNode}) {
    const [isOpen, setIsOpen] = React.useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return(
        <ModalContext.Provider value={{isOpen, openModal, closeModal}}>
            {children}
        </ModalContext.Provider>
    );
}

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
}