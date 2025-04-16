import { create } from 'zustand';
import { AsdApi } from '../api/service/asdApi';
import showToast from '../utils/toastService';


interface Qr2FAState {
  qrCodeUrl: string ;
  secret: string
  isLoadingQrCode: boolean;
  errorQrCode: any;
  getQrCode2FA: () => Promise<void>;
  isVerifyingQrCode: boolean;
  errorVerifyingQrCode: any;
  vertfyQrCode2FA: (token: string) => Promise<boolean>;
  is2FAEnabledGlobal: boolean;
  set2FAEnabledGlobal: (enabled: boolean) => void;
}

export const qrCode2FAStore = create<Qr2FAState>((set) => ({
    qrCodeUrl: '',
    secret: '',
    isLoadingQrCode: false,
    errorQrCode: null,
    isVerifyingQrCode: false,
    errorVerifyingQrCode: null,
    is2FAEnabledGlobal: false,
  set2FAEnabledGlobal: (enabled) => set({ is2FAEnabledGlobal: enabled }),
  getQrCode2FA: async () => {
    set({ isLoadingQrCode: true, errorQrCode: null });
    try {
      const response = await AsdApi.getQrCode2FA() ;
      set({ qrCodeUrl: response?.qrCode,secret: response?.secret, isLoadingQrCode: false });
      return response.data; 
    } catch (error) {
      set({ errorQrCode: error, isLoadingQrCode: false, qrCodeUrl: '' });
      throw error;
    }
  },
  vertfyQrCode2FA: async (token: string): Promise<boolean> => {
    set({ isVerifyingQrCode: true, errorVerifyingQrCode: null });
    try {
      const response = await AsdApi.vertfyQrCode2FA(token);
      console.log('vertfyQrCode2FA response:', response);
      showToast('Two-Factor Authentication enabled successfully!', 'success');
      set({ isVerifyingQrCode: false, errorVerifyingQrCode: null });
      return response?.data?.success === true; 
    } catch (err: any) {
      console.log('Error verifying 2FA:', err);
      showToast(err.message, 'danger');
      set({ isVerifyingQrCode: false, errorVerifyingQrCode: err });
      throw err;
    }
  },
}));