import {create } from "zustand"

type ModalContent = React.ReactNode

type ModalState = {
    isOpen: boolean,
    content: ModalContent,
    openModal: (content: ModalContent) => void,
    closeModal: () => void,
}

export const useModal = create<ModalState>((set) => ({
    isOpen: false,
    content: null,
    openModal: (content) => set({ isOpen: true, content}),
    closeModal: () => set({isOpen: false, content: null})
}))