import { create } from "zustand";
import { AsdApi } from "../api/service/asdApi";
import showToast from "../utils/toastService";

interface License {
    id: number
    licenseKey: string
    price: number
    name: string
}
interface MinerMine {
    id: number
    name: string
    license: string
    hashRate: number | string
}

interface LicenseStore {
    licenses: License[];
    minerMine: MinerMine[];
    getLicense: () => void;
    getMinerMine: () => void;
}
export const getLicenseStore = create<LicenseStore>((set) => ({
    licenses: [],
    minerMine: [],

    getLicense: async () => {
        try {
            const response = await AsdApi.getLicenses(100)
            // console.log(response.contents)
            // console.log(response.totalElements, "totalElements")
            set({ licenses: response.contents });
        } catch (err: any) {
            console.log(err)
            showToast(err.message, "danger")
        }
    },
    getMinerMine: async () => {
        try {
            const response = await AsdApi.getMinersMine(100)
            // console.log(response.contents, "response")
            set({ minerMine: response.contents });
        } catch (err: any) {
            console.log(err)
            showToast(err.message, "danger")
        }
    }
}))