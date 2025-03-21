import { useAuthStore } from "./auth"
import { useMinerStore } from "./miner"

export const resetAllStores = () => {
    useMinerStore.setState({
        id: "",
        minerName: "",
        minerLicense: "",
        hashRate: "",
        walletAddress: "",
    })
    useAuthStore.setState({
        username: "",
        password: "",
        usernameError: null,
        passwordError: null,
    })
    
}