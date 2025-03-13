import { create } from "zustand";
import { AsdApi } from "../api/service/asdApi";

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
            const response = await AsdApi.getLicenses()
            // console.log(response.contents)
            // console.log(response.totalElements, "totalElements")
            set({ licenses: response.contents });
        } catch (error) {
            console.log(error)
        }
    },
    getMinerMine: async () => {
        try {
            const response = await AsdApi.getMinersMine()
            // console.log(response.contents, "response")
            set({ minerMine: response.contents });
        } catch (error) {
            console.log(error)
        }
    }
}))