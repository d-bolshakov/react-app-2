type Props = {
  children: React.ReactNode;
  onClick: React.MouseEventHandler;
  className?: string;
};

export const ButtonSecondary = ({ children, onClick, className }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`bg-white hover:bg-gray-600 text-gray-600 hover:text-white rounded-md shadow-sm border-1 border-gray-600 shadow-gray-500 w-full mt-1 py-1 px-2 ${className}`}
    >
      {children}
    </button>
  );
};
