import { create } from "zustand";

export interface IDashboardLayoutStore {
  isColorful: boolean;
  setIsColorful: (val: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
  onOpenChange: () => void;
  onClose: () => void;
  onOpen: () => void;
}

const useDashboardLayoutStore = create<IDashboardLayoutStore>((set, get) => ({
  isCollapsed: false,
  isColorful: false,
  setIsColorful: (val) => {
    set({ isColorful: val });
  },
  setIsCollapsed: (isCollapsed) => {
    set({ isCollapsed });
  },
  onOpenChange: () => {
    set({ isCollapsed: !get().isCollapsed });
  },
  onOpen: () => {
    set({ isCollapsed: false });
  },
  onClose: () => {
    set({ isCollapsed: true });
  },
}));

export default useDashboardLayoutStore;
