const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert" className="p-4 bg-red-100 border border-red-400 rounded">
      <p className="font-bold">Something went wrong:</p>
      <pre className="text-sm text-red-600">{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorFallback;
