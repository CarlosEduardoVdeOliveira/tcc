export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}) {
  const baseClasses =
    "w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500 shadow-md hover:shadow-lg",
    secondary:
      "bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-500 shadow-md hover:shadow-lg",
    success:
      "bg-green-500 hover:bg-green-600 text-white focus:ring-green-500 shadow-md hover:shadow-lg",
    danger:
      "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 shadow-md hover:shadow-lg",
    info: "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500 shadow-md hover:shadow-lg",
    warning:
      "bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-500 shadow-md hover:shadow-lg",
    outline:
      "bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white focus:ring-yellow-500",
  };

  return (
    <button
      className={`cursor-pointer ${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
