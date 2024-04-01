type Props = {
  children: React.ReactNode;
  onClick: React.MouseEventHandler;
  className?: string;
};

export const ButtonDashed = ({ children, onClick, className }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`hover:bg-gray-200 hover:border-gray-200 hover:shadow shadow-gray-500 border-dashed border-2 border-gray-300 w-full p-3 my-2 rounded-md ${className}`}
    >
      {children}
    </button>
  );
};
