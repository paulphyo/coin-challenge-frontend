interface CoinInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    type?: "text" | "number";
    step?: string;
}

export function CoinInput({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    step,
}: CoinInputProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <input
                type={type}
                step={step}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    );
}
