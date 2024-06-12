export const Button = ({
    onClick,
    children,
    className,
  }) => {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 text-xl bg-green-500 text-white font-bold rounded ${className}`}
      >
        {children}
      </button>
    );
  };