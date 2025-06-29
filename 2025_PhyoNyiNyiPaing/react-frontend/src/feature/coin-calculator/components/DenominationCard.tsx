interface DenominationCardProps {
    value: number;
    isSelected: boolean;
    onToggle: () => void;
}

export const DenominationCard = ({ value, isSelected, onToggle }: DenominationCardProps) => (
    <div
        onClick={onToggle}
        className={`w-[calc(100%/6-1rem)] flex flex-col items-center cursor-pointer border-2 rounded-lg p-1 transition
            ${isSelected ? "border-gray-600 bg-gray-100" : "border-transparent hover:border-gray-300"}
        `}
    >
        <img
            src={`/images/cash/${value}.png`}
            alt={`$${value}`}
            className="h-16 w-auto max-w-full object-contain"
        />
        <label className="text-sm text-gray-700 mt-1">
            {value < 1 ? `${value * 100}¢` : `$${value}`}
        </label>
    </div>
);
