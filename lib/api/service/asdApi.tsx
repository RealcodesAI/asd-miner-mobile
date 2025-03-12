import { axiosClient } from "../config/axiosClient"

export const AsdApi = {
    register: async (username: string, password: string): Promise<any> => {
        return await axiosClient.post('auth/register', {
            username,
            password
        })
    },
    login: async (username: string, password: string): Promise<any> => {
        return await axiosClient.post('auth/login', {
            username,
            password
        })
    },
    getMe: async () => {
        return await axiosClient.get('auth/me')
    },
    connetWallte: async (message: string, signature: string): Promise<any> => {
        return await axiosClient.post('auth/connect-wallet', {
            message,
            signature
        })
    },
    getLicenses: async () => {
        return await axiosClient.get('licenses/me')
    },
    licensesBuy: async (hash: string): Promise<any> => {
        return await axiosClient.post('licenses/buy', {
            hash
        })
    },
    minerConfig: async (license: string, name: string) => {
        return await axiosClient.post('miners', {
            license,
            name
        })
    }
}