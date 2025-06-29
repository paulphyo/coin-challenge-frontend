import { useLayoutEffect, useRef } from "react";
import { CoinCount } from "./CoinCount";
import gsap from "gsap";

interface CoinResultDisplayProps {
    result: number[];
    denominations: number[];
}

export const CoinResultDisplay = ({ result, denominations }: CoinResultDisplayProps) => {
    const countMap: Record<number, number> = {};
    for (const coin of result) {
        countMap[coin] = (countMap[coin] || 0) + 1;
    }

    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!containerRef.current) return;

        const items = containerRef.current.querySelectorAll(".coin-animate");

        gsap.fromTo(
            items,
            {
                opacity: 0,
                x: 50,
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out",
            }
        );
    }, [result]);

    return (
        <div className="flex flex-col items-center gap-4" ref={containerRef}>
            <p>You need:</p>
            <div className="flex gap-4 justify-center flex-wrap">
                {denominations.map((denom) => {
                    const count = countMap[denom];
                    if (!count) return null;
                    return (
                        <div key={denom} className="coin-animate">
                            <CoinCount denomination={denom} count={count} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
