interface CoinCountProps {
    denomination: number;
    count: number;
}

export const CoinCount = ({ denomination, count }: CoinCountProps) => (
    <div className="flex items-center gap-3 border border-gray-300 rounded-lg p-3 bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-300">
        <span className="font-semibold text-lg">{count}x</span>
        <div className="flex items-center gap-2">
            <span className="text-gray-700 font-medium text-base">{denomination < 1 ? `${denomination * 100}¢` : `$${denomination}`}</span>
            <img
                src={`/images/cash/${denomination}.png`}
                alt={`$${denomination}`}
                className="h-10 w-auto object-contain"
            />
        </div>
    </div>
);
