import create from "zustand";

type store = {
  isEditModalOpen: boolean;
  openEditModal: () => void;
  closeEditModal: () => void;
};

const openEditModal = (modal: boolean) => (modal = true);
const closeEditModal = (modal: boolean) => (modal = false);

const useEditModalStore = create<store>((set) => ({
  isEditModalOpen: false,
  openEditModal() {
    set((state) => ({
      isEditModalOpen: openEditModal(state.isEditModalOpen),
    }));
  },
  closeEditModal() {
    set((state) => ({
      isEditModalOpen: closeEditModal(state.isEditModalOpen),
    }));
  },
}));

export default useEditModalStore;
