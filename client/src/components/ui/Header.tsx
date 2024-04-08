import { ReactNode } from "react";

type HeaderProps = {
  children: ReactNode;
  className?: string;
};

export const Header = ({ children, className }: HeaderProps) => {
  return (
    <div
      className={`sticky top-0 flex border-b-2 bg-white border-gray-400 shadow-sm shadow-gray-300 p-2 ${className}`}
    >
      {children}
    </div>
  );
};

Header.Title = Title;

type TitleProps = {
  children: ReactNode;
};

function Title({ children }: TitleProps) {
  return <h1 className="sticky left-1 font-thin text-3xl">{children}</h1>;
}
