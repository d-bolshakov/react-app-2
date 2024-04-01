type Props = {
  children: React.ReactNode;
  onClick: React.MouseEventHandler;
  className?: string;
};

export const ButtonPrimary = ({ children, onClick, className }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`bg-gray-600 hover:bg-white text-white hover:text-gray-600 rounded-md shadow-sm border-2 border-gray-600 shadow-gray-500 w-full mt-1 py-1 px-2 ${className}`}
    >
      {children}
    </button>
  );
};
