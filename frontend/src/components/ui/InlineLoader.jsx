const InlineLoader = () => {
  return (
    <div className="flex flex-row justify-center items-center px-4 py-2 gap-2">
      <div className="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
      <div className="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.3s]"></div>
      <div className="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
    </div>
  );
};

export default InlineLoader;
