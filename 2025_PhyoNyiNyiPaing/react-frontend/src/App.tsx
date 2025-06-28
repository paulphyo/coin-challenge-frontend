import { useState } from "react";

const App = () => {
  const [targetAmount, setTargetAmount] = useState("");
  const [coinInput, setCoinInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Coin Change Calculator</h1>

        <div className="space-y-4">
          <input
            type="number"
            placeholder="Target Amount (e.g. 7.25)"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />

          <input
            type="text"
            placeholder="Coin Denominations (e.g. 1, 2, 0.5)"
            value={coinInput}
            onChange={(e) => setCoinInput(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Submit
          </button>
        </div>

        {submitted && (
          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Target Amount:</strong> {targetAmount}</p>
            <p><strong>Coin Denominations:</strong> {coinInput}</p>
            <p className="text-blue-600 mt-2">API response will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
