import { useState, useCallback } from "react";
import CoinApi from "../service/CoinApi";
import { parseCoins, validateCoinInput } from "../utils/CoinUtils";
import type { CoinRequest } from "../types/CoinRequest";

export const useCoinCalculator = () => {
    const [targetAmount, setTargetAmount] = useState("");
    const [coinInput, setCoinInput] = useState("");
    const [result, setResult] = useState<number[] | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCalculate = useCallback(async () => {
        setError("");
        setResult(null);
        setLoading(true);

        try {
            const target = parseFloat(targetAmount);
            const coins = parseCoins(coinInput);

            const validationError = validateCoinInput(target, coins);
            if (validationError) {
                setError(validationError);
                return;
            }

            const payload: CoinRequest = { targetAmount: target, coinDenominations: coins };
            const data = await CoinApi.getMinimumCoins(payload);
            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Connection failed");
        } finally {
            setLoading(false);
        }
    }, [targetAmount, coinInput]);

    const reset = useCallback(() => {
        setResult(null);
        setError("");
    }, []);

    return {
        targetAmount,
        setTargetAmount,
        coinInput,
        setCoinInput,
        result,
        error,
        loading,
        handleCalculate,
        reset,
    };
};