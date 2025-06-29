import axios from "axios";
import type { CoinRequest } from "../types/CoinRequest";

const API_URL = import.meta.env.VITE_API_URL;

const CoinAPI = {
    async getMinimumCoins(payload: CoinRequest) {
        const response = await axios.post(API_URL + "/coins/min", payload);
        return response.data;
    }
}
export default CoinAPI;