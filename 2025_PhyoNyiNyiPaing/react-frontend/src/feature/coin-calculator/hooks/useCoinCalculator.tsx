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
            return err.response?.data?.message ||
                `Request failed with status ${err.response?.status}` ||
                "Network error occurred";
        }

        if (err instanceof Error) {
            return err.message;
        }

        return "An unexpected error occurred";
    }, []);

    const handleCalculate = useCallback(async () => {
        updateState({ error: "", result: null, loading: true });

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