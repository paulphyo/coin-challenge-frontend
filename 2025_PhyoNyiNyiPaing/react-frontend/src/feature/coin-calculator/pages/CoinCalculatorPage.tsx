import { CoinInput } from "../components/CoinInput";
import { ResultDisplay } from "../components/ResultDisplay";
import { useCoinCalculator } from "../hooks/useCoinCalculator";

export const CoinCalculatorPage = () => {
    const {
        targetAmount,
        setTargetAmount,
        coinInput,
        setCoinInput,
        result,
        error,
        loading,
        handleCalculate,
    } = useCoinCalculator();

    return (
        <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Coin Change Calculator
                </h2>

                <div className="space-y-4">
                    <CoinInput
                        label="Target Amount:"
                        value={targetAmount}
                        onChange={setTargetAmount}
                        placeholder="11.50"
                        type="number"
                        step="0.01"
                    />

                    <CoinInput
                        label="Coin Denominations:"
                        value={coinInput}
                        onChange={setCoinInput}
                        placeholder="0.01, 0.05, 0.10, 0.25, 1.00"
                    />

                    <button
                        onClick={handleCalculate}
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                        {loading ? "Calculating..." : "Calculate"}
                    </button>
                </div>

                <ResultDisplay result={result} error={error} />
            </div>
        </div>
    );
};