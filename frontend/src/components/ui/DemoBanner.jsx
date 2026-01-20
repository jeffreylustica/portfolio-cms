const DemoBanner = () => {
  return (
   <div className="fixed bottom-4 right-4 w-auto max-w-xs flex items-center gap-2 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 p-3 rounded-md shadow-md z-50">
        <svg
            className="w-5 h-5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
        >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
        <span className="text-sm font-medium">
            Demo Mode — all actions are disabled, but you can click buttons to see toast messages.
        </span>
    </div>
  )
}

export default DemoBanner