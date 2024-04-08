import { ReactNode } from "react";
import { Button, ButtonTypes } from "./Button";

type Props = {
  children: ReactNode;
  className?: string;
};

export const NoContentWindow = ({ children, className }: Props) => {
  return (
    <div
      className={`block border-2 rounded-md shadow-md shadow-gray-500 p-2 ${className}`}
    >
      {children}
    </div>
  );
};

NoContentWindow.ActionButton = ActionButton;
NoContentWindow.Title = Title;

type ActionButtonProps = {
  children: ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

function ActionButton({ children, onClick }: ActionButtonProps) {
  return (
    <Button
      type={ButtonTypes.DASHED}
      onClick={onClick}
      className="w-full border-gray-500 hover:bg-gray-300 hover:border-gray-300 mt-2 p-5 text-lg"
    >
      {children}
    </Button>
  );
}

type TitleProps = {
  children: ReactNode;
};

function Title({ children }: TitleProps) {
  return <h1 className="font-medium text-2xl text-center">{children}</h1>;
}
