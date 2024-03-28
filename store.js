import { create } from "zustand";

const useStore = create((set) => ({
  isCreateMode: false,
  setIsCreateMode: (value) => set({ isCreateMode: value }),
  isEditMode: false,
  setIsEditMode: (value) => set({ isEditMode: value }),
  handleCreateClick: () => set({ isCreateMode: true }),
  handleCloseClick: () => set({ isCreateMode: false }),
  handleEditClick: () => set({ isEditMode: true }),
}));

export default useStore;
