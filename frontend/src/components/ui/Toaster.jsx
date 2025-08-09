const Toaster = ({ message, type = "success", visible }) => {
  if (!visible) return null;

  const bgColor = type === "success" ? "bg-green-100" : "bg-red-100";
  const textColor = type === "success" ? "text-green-800" : "text-red-800";

  return (
    <div
      className={`absolute top-0 right-0 flex items-center rounded-md ${bgColor} p-4 shadow-sm`}
    >
      <div>
        <p className={`text-gray-500 text-sm ${textColor}`}>
          Item successfully added!
        </p>
      </div>
    </div>
  );
};

export default Toaster;
