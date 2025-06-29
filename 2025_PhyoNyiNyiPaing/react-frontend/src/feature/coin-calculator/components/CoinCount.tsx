interface CoinCountProps {
    denomination: number;
    count: number;
}

export const CoinCount = ({ denomination, count }: CoinCountProps) => (
    <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2 bg-gray-50">
        <span className="font-semibold">{count}x</span>
        <img
            src={`/images/cash/${denomination}.png`}
            alt={`$${denomination}`}
            className="h-10 w-auto object-contain"
        />
    </div>
);