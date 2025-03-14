import { axiosClient } from "../config/axiosClient"
import {Miner} from "@/types";

export const AsdApi = {
    login: async (username: string, password: string): Promise<any> => {
        return await axiosClient.post('user/login', {
            username,
            password
        })
    },
    getMe: async (): Promise<any> => {
        return await axiosClient.get('user/me')
    },
    updateWallte: async (walletAddress: string): Promise<any> => {
        return await axiosClient.post('user/update-wallet', {
            walletAddress
        })
    },
    getLicenses: async (limit: number): Promise<any> => {
        return await axiosClient.get(`miners/licenses/mine?limit=${limit}`);
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
    withdrawHistories: async (params = {}): Promise<{
        contents: any[];
        total: number;
        page: number;
        limit: number;
    }> => {
        return await axiosClient.get("rewards/withdraw-histories", { params });
    },
    rewards: async (params = {}, id: number): Promise<{
        contents: any[];
        total: number;
        page: number;
        limit: number;
    }> => {
        return await axiosClient.get(`rewards/${id}`, { params });
    },
    getMiner: async (id: number): Promise<Miner> => {
        return await axiosClient.get(`miners/${id}`);
    },
    getMinersMine: async (limit: number): Promise<any> => {
        return await axiosClient.get(`miners/mine?limit=${limit}`);
    },
    updateNameLicense: async (name: string, id: string) => {
        return await axiosClient.patch(`miners/${id}`, {
            name
        })
    }
};
