import type { CoinChangePayload } from "../types/CoinChangePayload";

export const calculateMinimumCoins = async (
    payload: CoinChangePayload
): Promise<number[]> => {
    const res = await fetch("http://localhost:8080/coins/min", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error(`Server error ${res.status}: ${await res.text()}`);
    }

    return await res.json();
};
