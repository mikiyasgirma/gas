import create from "zustand";

type store = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const openModal = (modal: boolean) => (modal = true);
const closeModal = (modal: boolean) => (modal = false);

const useModalStore = create<store>((set) => ({
  isModalOpen: false,
  openModal() {
    set((state) => ({
      isModalOpen: openModal(state.isModalOpen),
    }));
  },
  closeModal() {
    set((state) => ({
      isModalOpen: closeModal(state.isModalOpen),
    }));
  },
}));

export default useModalStore;
