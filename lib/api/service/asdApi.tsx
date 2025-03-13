import { axiosClient } from "../config/axiosClient";

export const AsdApi = {
  login: async (username: string, password: string): Promise<any> => {
    return await axiosClient.post("user/login", {
      username,
      password,
    });
  },
  getMe: async (): Promise<any> => {
    return await axiosClient.get("user/me");
  },
  updateWallte: async (walletAddress: string): Promise<any> => {
    return await axiosClient.post("user/update-wallet", {
      walletAddress,
    });
  },
  getLicenses: async (): Promise<any> => {
    return await axiosClient.get("miners/licenses/mine");
  },
  minerConfig: async (minerData: {
    license: string;
    name: string;
    cpu: number;
    memory: number;
    device: string;
    hashRate: number;
  }): Promise<any>  => {
    return await axiosClient.post("miners", minerData);
  },

  getMinersMine: async (): Promise<any> => {
    return await axiosClient.get("miners/mine");
  }
};
