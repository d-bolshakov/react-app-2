export enum ButtonTypes {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  DASHED = "dashed",
}

export type ButtonProps = {
  children: React.ReactNode;
  onClick: React.MouseEventHandler;
  className?: string;
  type: ButtonTypes;
};

const ButtonTypeStyles = {
  [ButtonTypes.PRIMARY]:
    "bg-gray-600 border-gray-600 hover:bg-white text-white hover:text-gray-600 shadow-sm",
  [ButtonTypes.SECONDARY]:
    "bg-white hover:bg-gray-600 text-gray-600 hover:text-white border-white hover:border-gray-600 shadow-sm",
  [ButtonTypes.DASHED]:
    "hover:bg-gray-200 hover:border-gray-200 hover:shadow border-dashed border-gray-300",
};

export const Button = ({ children, onClick, className, type }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${ButtonTypeStyles[type]} rounded-md border-2 shadow-gray-500 py-1 px-2 ${className}`}
    >
      {children}
    </button>
  );
};
