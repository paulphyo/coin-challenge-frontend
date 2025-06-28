export const parseCoins = (input: string): number[] =>
    input.split(",")
        .map(coin => parseFloat(coin.trim()))
        .filter(coin => !isNaN(coin) && coin > 0);

export const validateCoinInput = (target: number, coins: number[]): string => {
    if (isNaN(target) || target <= 0) return "Target amount must be greater than 0";
    if (!coins.length) return "Please enter valid coin denominations";
    return "";
};

export const formatCoinResult = (coins: number[] | null): string => {
    if (!coins?.length) return "No solution found";

    const coinCounts = coins.reduce<Record<string, number>>((acc, coin) => {
        const key = coin.toFixed(2);
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});

    return Object.entries(coinCounts)
        .sort(([a], [b]) => parseFloat(b) - parseFloat(a))
        .map(([coin, count]) => `${count} × ${coin}`)
        .join(", ");
};