import { DenominationCard } from "./DenominationCard";

interface DenominationSelectorProps {
    denominations: number[];
    selectedDenominations: number[];
    onToggleDenomination: (value: number) => void;
}

export const DenominationSelector = ({
    denominations,
    selectedDenominations,
    onToggleDenomination
}: DenominationSelectorProps) => (
    <div className="max-w-lg flex flex-col items-center p-6">
        <img src="images/steppers/stepper-2.png" alt="Step 2" width={40} />
        <p className="text-gray-600 mb-4 text-sm font-semibold mt-5">Select the type of money you have</p>
        <div className="flex flex-wrap justify-center gap-4">
            {denominations.map((value) => (
                <DenominationCard
                    key={value}
                    value={value}
                    isSelected={selectedDenominations.includes(value)}
                    onToggle={() => onToggleDenomination(value)}
                />
            ))}
        </div>
    </div>
);