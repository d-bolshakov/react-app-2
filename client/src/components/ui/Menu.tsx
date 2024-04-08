import React from "react";
import { ReactNode } from "react";

type MenuProps = {
  children: ReactNode;
  className?: string;
};

export const Menu = ({ children, className }: MenuProps) => {
  return (
    <ul className={`w-fit ${className}`}>
      {React.Children.map(children, (child) => (
        <li key={Math.random()}>{child}</li>
      ))}
    </ul>
  );
};

Menu.Item = MenuItem;

type MenuItemProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  selected?: boolean;
  children: ReactNode;
  className?: string;
};

function MenuItem({ onClick, selected, children, className }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={`block w-full text-md p-2 text-left text-gray-700, hover:bg-gray-300 ${
        selected ? "bg-gray-700 text-white hover:!bg-gray-700" : ""
      } ${className}`}
      disabled={selected}
    >
      {children}
    </button>
  );
}
