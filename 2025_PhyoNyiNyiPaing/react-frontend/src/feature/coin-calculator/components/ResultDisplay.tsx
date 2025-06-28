import { formatCoinResult } from "../utils/CoinUtils";

interface ResultDisplayProps {
    result: number[] | null;
    error: string;
}

export function ResultDisplay({ result, error }: ResultDisplayProps) {
    if (error) {
        return (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-800">
                <strong>Error:</strong> {error}
            </div>
        );
    }

    if (!result) return null;

    return (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <h4 className="font-semibold text-green-800 mb-2">Result:</h4>
            <p className="text-sm text-green-700 bg-white p-2 rounded border">
                {formatCoinResult(result)}
            </p>
            <p className="text-xs text-green-600 mt-2">
                Total coins: {result.length}
            </p>
        </div>
    );
}
