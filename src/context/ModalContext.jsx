import React, { createContext, useContext, useState, useCallback } from 'react';

const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
    const [modalConfig, setModalConfig] = useState(null);

    const openModal = useCallback((config) => {
        setModalConfig(config);
    }, []);

    const closeModal = useCallback(() => {
        setModalConfig(null);
    }, []);

    const confirm = useCallback((config) => {
        return new Promise((resolve) => {
            openModal({
                ...config,
                onConfirm: () => {
                    resolve(true);
                    closeModal();
                },
                onCancel: () => {
                    resolve(false);
                    closeModal();
                }
            });
        });
    }, [openModal, closeModal]);

    return (
        <ModalContext.Provider value={{ openModal, closeModal, confirm, modalConfig }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
