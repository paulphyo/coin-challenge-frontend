interface ErrorDisplayProps {
    error: string;
}

export const ErrorDisplay = ({ error }: ErrorDisplayProps) => (
    <div className="text-center p-4">
        <div className="text-red-500 mb-2">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
        </div>
        <p className="text-red-600 font-medium">Error</p>
        <p className="text-gray-600 text-sm mt-1">{error}</p>
    </div>
);