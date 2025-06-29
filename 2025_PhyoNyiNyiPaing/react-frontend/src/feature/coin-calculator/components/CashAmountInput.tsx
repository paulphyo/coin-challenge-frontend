interface CashAmountInputProps {
    targetAmount: string;
    setTargetAmount: (amount: string) => void;
}

export const CashAmountInput = ({ targetAmount, setTargetAmount }: CashAmountInputProps) => (
    <div className="flex flex-col items-center p-6">
        <img src="/images/steppers/stepper-1.png" width={40} alt="Step 1" />
        <p className="text-gray-600 mb-4">Enter the cash amount to make</p>
        <input
            className="border-gray-400 border-1 rounded-full px-6 py-2"
            placeholder="11.50"
            type="number"
            onChange={(e) => setTargetAmount(e.target.value)}
            value={targetAmount}
            step={0.01}
        />
    </div>
);
