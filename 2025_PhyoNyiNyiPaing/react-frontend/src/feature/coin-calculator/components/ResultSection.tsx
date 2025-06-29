import { CoinResultDisplay } from "./CoinResultDisplay";
import { ErrorDisplay } from "./ErrorDisplay";
import { LoadingSpinner } from "./LoadingSpinner";

interface ResultSectionProps {
    loading: boolean;
    error: string | null;
    result: number[] | null;
    hasStarted: boolean;
    denominations: number[];
}

export const ResultSection = ({ loading, error, result, denominations, hasStarted }: ResultSectionProps) => {

    if (!hasStarted) return null;

    return (
        <div className="w-full max-w-md bg-white rounded-lg ">
            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <ErrorDisplay error={error} />
            ) : (
                <CoinResultDisplay result={result!} denominations={denominations} />
            )}
        </div>
    );
};
