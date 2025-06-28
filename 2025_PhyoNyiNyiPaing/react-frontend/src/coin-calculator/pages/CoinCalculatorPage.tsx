import { useState, useCallback } from "react";
import { calculateMinimumCoins } from "../api/CoinApi";
import type { CoinChangePayload } from "../types/CoinChangePayload";

export const CoinCalculatorPage = () => {
    const [targetAmount, setTargetAmount] = useState("");
    const [coinInput, setCoinInput] = useState("");
    const [result, setResult] = useState<number[] | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const validateInput = (target: number, coins: number[]) => {
        if (isNaN(target) || target <= 0) {
            return "Please enter a valid target amount greater than 0";
        }
        if (coins.length === 0) {
            return "Please enter valid coin denominations";
        }
        return "";
    };

    const handleCalculate = useCallback(async () => {
        setError("");
        setResult(null);
        setLoading(true);

        const target = parseFloat(targetAmount);
        const coins = coinInput
            .split(",")
            .map((c) => parseFloat(c.trim()))
            .filter((c) => !isNaN(c) && c > 0);

        const validationError = validateInput(target, coins);
        if (validationError) {
            setError(validationError);
            setLoading(false);
            return;
        }

        const payload: CoinChangePayload = {
            targetAmount: target,
            coinDenominations: coins,
        };

        try {
            const data = await calculateMinimumCoins(payload);
            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Connection failed");
        } finally {
            setLoading(false);
        }
    }, [targetAmount, coinInput]);

    const formatResult = (coins: number[] | null) => {
        if (!coins?.length) return "No solution found";
        const counts = coins.reduce<Record<string, number>>((acc, coin) => {
            const key = coin.toFixed(2);
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(counts)
            .sort(([a], [b]) => parseFloat(b) - parseFloat(a))
            .map(([coin, count]) => `${count} × ${coin}`)
            .join(", ");
    };

    return (
        <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Coin Change Calculator
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Target Amount:
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={targetAmount}
                            onChange={(e) => setTargetAmount(e.target.value)}
                            placeholder="11.50"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Coin Denominations:
                        </label>
                        <input
                            type="text"
                            value={coinInput}
                            onChange={(e) => setCoinInput(e.target.value)}
                            placeholder="0.01, 0.05, 0.10, 0.25, 1.00"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <button
                        onClick={handleCalculate}
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                        {loading ? "Calculating..." : "Calculate"}
                    </button>
                </div>

                {error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-800">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {result && !error && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                        <h4 className="font-semibold text-green-800 mb-2">Result:</h4>
                        <p className="text-sm text-green-700 bg-white p-2 rounded border">
                            {formatResult(result)}
                        </p>
                        <p className="text-xs text-green-600 mt-2">
                            Total coins: {result.length}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
