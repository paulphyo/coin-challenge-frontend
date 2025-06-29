import sparkles from "src/assets/sparkles-icon.png";

interface GenerateButtonProps {
    loading: boolean;
    hasStarted: boolean;
    onCalculate: () => void;
}

export const GenerateButton = ({ loading, onCalculate, hasStarted }: GenerateButtonProps) => (
    <div className="w-full max-w-md flex flex-col items-center p-6 mb-20">
        {!hasStarted && (
            <>
                <img src="images/steppers/stepper-3.png" width={40} alt="Step 3" />
                <p className="text-gray-600 mb-10 mt-5 text-lg font-semibold">Click Generate!</p>
            </>
        )}

        <button
            onClick={onCalculate}
            disabled={loading}
            className="bg-black flex gap-2 text-white rounded-full px-8 py-2 font-semibold disabled:opacity-50"
        >
            <img src={sparkles} width={20} height={10} alt="Sparkles" />
            {loading ? "Fetching..." : "Generate"}
        </button>
    </div>
);
