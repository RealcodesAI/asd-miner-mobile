import { create } from "zustand";
import { AsdApi } from "../api/service/asdApi";
import showToast from "../utils/toastService";

interface Pools {
    id: number
    name: string
    hashRate: number
    totalTokenMined: number,
    type: string,
    difficulty: number,
    latestBlock: number,
    fee: string
}

interface PollStore {
    pools: Pools[];
    getPool: () => void;
}
export const getPoolStore = create<PollStore>((set) => ({
    pools: [],

    getPool: async () => {
        try {
            const response = await AsdApi.getPools()
            // console.log(response, "response")
            set({ pools: response });
        } catch (err: any) {
            console.log(err)
            showToast(err.message, "danger")
        }
    },
}))