import { create } from 'zustand';
import sublinks from '../utils/data';

interface UIState {
  isSidebarOpen: boolean;
  isSubmenuOpen: boolean;
  location: any;
  page: any;
  showAlert: boolean;
  alertText: string;
  alertType: string;
  showDashboardSidebar: boolean;
  
  // Actions
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  openSubmenu: (text: string, coordinates: any) => void;
  closeSubmenu: () => void;
  displayAlert: (text?: string, type?: string) => void;
  clearAlert: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  isSubmenuOpen: false,
  location: {},
  page: { page: '', links: [] },
  showAlert: false,
  alertText: '',
  alertType: '',
  showDashboardSidebar: false,

  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  toggleSidebar: () => set((state) => ({ showDashboardSidebar: !state.showDashboardSidebar })),
  
  openSubmenu: (text, coordinates) => {
    const page = sublinks.find((link: any) => link.page === text);
    set({
      isSubmenuOpen: true,
      location: coordinates,
      page: page || { page: '', links: [] }
    });
  },
  closeSubmenu: () => set({ isSubmenuOpen: false }),

  displayAlert: (text = 'Please provide all values!', type = 'danger') => {
    set({ showAlert: true, alertText: text, alertType: type });
    setTimeout(() => {
      set({ showAlert: false, alertText: '', alertType: '' });
    }, 3000);
  },
  
  clearAlert: () => set({ showAlert: false, alertText: '', alertType: '' }),
}));
