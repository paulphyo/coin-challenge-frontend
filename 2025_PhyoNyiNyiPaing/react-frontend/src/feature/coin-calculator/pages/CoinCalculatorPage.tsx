import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useCoinCalculator } from "../hooks/useCoinCalculator";
import { CashAmountInput } from "../components/CashAmountInput";
import { DenominationSelector } from "../components/DenominationSelector";
import { ResultSection } from "../components/ResultSection";
import { GenerateButton } from "../components/GenerateButton";

const DENOMINATIONS = [0.01, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 50, 100, 1000];

export const CoinCalculatorPage = () => {
    const {
        targetAmount,
        setTargetAmount,
        setCoinInput,
        result,
        error,
        loading,
        handleCalculate,
    } = useCoinCalculator();

    const hasStarted = Boolean(
        loading || error || (result && result.length > 0)
    );

    const [selectedDenominations, setSelectedDenominations] = useState<number[]>([]);

    // Refs for animation targets
    const titleRef = useRef(null);
    const cashInputRef = useRef(null);
    const generateButtonRef = useRef(null);

    const toggleDenomination = (value: number) => {
        setSelectedDenominations((prev) => {
            const isSelected = prev.includes(value);
            const updated = isSelected
                ? prev.filter((v) => v !== value)
                : [...prev, value];
            setCoinInput(updated.sort((a, b) => a - b).join(","));
            return updated;
        });
    };

    useEffect(() => {
        gsap.set([titleRef.current, cashInputRef.current, generateButtonRef.current], {
            opacity: 0,
            y: 30,
        });

        const tl = gsap.timeline();

        tl.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
        })
            .to(cashInputRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
            }, "-=0.3")
            .to(generateButtonRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
            }, "-=0.3");

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <>
            <div className="flex">
                <a
                    href="https://github.com/paulphyo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto mr-20 mt-10 font-light uppercase"
                >
                    Phyo
                </a>
            </div>

            <div className="w-full flex flex-col items-center min-h-screen justify-around">
                <div ref={titleRef} className="title mb-15">
                    <h1 className="text-5xl font-extrabold text-gray-800 mb-6 text-center mt-25">
                        CashSplitter
                    </h1>
                    <p className="subheading text-center font-light text-sm">
                        Skip the math. Get the change.
                    </p>
                </div>

                <section
                    ref={cashInputRef}
                    className="cash-input-section flex flex-col md:flex-row mt-20 w-full justify-evenly mb-20"
                >
                    <CashAmountInput
                        targetAmount={targetAmount}
                        setTargetAmount={setTargetAmount}
                    />

                    <DenominationSelector
                        denominations={DENOMINATIONS}
                        selectedDenominations={selectedDenominations}
                        onToggleDenomination={toggleDenomination}
                    />
                </section>

                <ResultSection
                    loading={loading}
                    error={error}
                    result={result}
                    hasStarted={hasStarted}
                    denominations={DENOMINATIONS}
                />

                <div ref={generateButtonRef}>
                    <GenerateButton
                        loading={loading}
                        hasStarted={hasStarted}
                        onCalculate={handleCalculate}
                    />
                </div>
            </div>
        </>
    );
};