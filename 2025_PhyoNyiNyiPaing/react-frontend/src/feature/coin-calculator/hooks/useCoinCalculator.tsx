import { useState, useCallback } from "react";
import CoinApi from "../service/CoinApi";
import { parseCoins, validateCoinInput } from "../utils/CoinUtils";
import type { CoinRequest } from "../types/CoinRequest";
import { AxiosError } from "axios";

interface CoinCalculatorState {
    targetAmount: string;
    coinInput: string;
    result: number[] | null;
    error: string;
    loading: boolean;
}

const initialState: CoinCalculatorState = {
    targetAmount: "",
    coinInput: "",
    result: null,
    error: "",
    loading: false,
};

export const useCoinCalculator = () => {
    const [state, setState] = useState<CoinCalculatorState>(initialState);

    const updateState = useCallback((updates: Partial<CoinCalculatorState>) => {
        setState(prev => ({ ...prev, ...updates }));
    }, []);

    const setTargetAmount = useCallback((targetAmount: string) => {
        updateState({ targetAmount, error: "", result: null });
    }, [updateState]);

    const setCoinInput = useCallback((coinInput: string) => {
        updateState({ coinInput, error: "", result: null });
    }, [updateState]);

    const extractErrorMessage = useCallback((err: unknown): string => {
        if (err instanceof AxiosError) {
            const data = err.response?.data;

            // Handle array of validation errors
            if (Array.isArray(data?.errors)) {
                return data.errors.join(", ");
            }

            // Handle single message error
            if (typeof data?.message === "string") {
                return data.message;
            }
            console.log("hi");

            // Fallback for status error
            return `Request failed with status ${err.response?.status}`;
        }

        if (err instanceof Error) {
            return err.message;
        }

        return "An unexpected error occurred";
    }, []);


    const handleCalculate = useCallback(async () => {
        updateState({ error: "", result: null, loading: true });
        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            const target = parseFloat(state.targetAmount);
            const coins = parseCoins(state.coinInput);

            const validationError = validateCoinInput(target, coins);
            if (validationError) {
                updateState({ error: validationError, loading: false });
                return;
            }

            const payload: CoinRequest = {
                targetAmount: target,
                coinDenominations: coins
            };

            const data = await CoinApi.getMinimumCoins(payload);
            updateState({ result: data, loading: false });

        } catch (err) {
            const errorMessage = extractErrorMessage(err);
            updateState({ error: errorMessage, loading: false });
        }
    }, [state.targetAmount, state.coinInput, updateState, extractErrorMessage]);

    const reset = useCallback(() => {
        setState(initialState);
    }, []);

    const clearError = useCallback(() => {
        updateState({ error: "" });
    }, [updateState]);

    return {
        // State values
        targetAmount: state.targetAmount,
        coinInput: state.coinInput,
        result: state.result,
        error: state.error,
        loading: state.loading,

        // Actions
        setTargetAmount,
        setCoinInput,
        handleCalculate,
        reset,
        clearError,

        // Computed values
        hasResult: state.result !== null,
        hasError: Boolean(state.error),
        canCalculate: Boolean(state.targetAmount && state.coinInput && !state.loading),
    };
};