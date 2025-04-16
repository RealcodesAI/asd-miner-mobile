import { create } from 'zustand';
import { axiosClient } from '../api/config/axiosClient';
import showToast from '../utils/toastService';

interface MinerStore {
  isDeleting: boolean;
  deleteError: any;
  deleteLicense: (id: string | number) => Promise<void>;
}

export const deleteMinerStore = create<MinerStore>((set) => ({
  isDeleting: false,
  deleteError: null,
  deleteLicense: async (id: string | number) => {
    set({ isDeleting: true, deleteError: null });
    try {
      await axiosClient.delete(`miners/${id}`);
      showToast('License deleted successfully', 'success');
    } catch (err: any) {
      set({ deleteError: err });
      showToast(err.message, 'danger')
      console.log('Error deleting license:', err);
      throw err; 
    } finally {
      set({ isDeleting: false });
    }
  },
}));