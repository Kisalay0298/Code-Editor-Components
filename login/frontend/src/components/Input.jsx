

export const Input = ({ icon: Icon, iconRight, ...props }) => {
  return (
    <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon className="size-5 text-green-500" />
        </div>
        <input
            {...props}
            className="w-full pl-10 pr-10 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
        />
        {iconRight && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {iconRight}
            </div>
        )}
    </div>
  );
};
