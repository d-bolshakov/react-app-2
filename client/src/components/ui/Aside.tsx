import { ReactNode } from "react";
import { Header } from "./Header";
import { Button, ButtonTypes } from "./Button";

export type AsideProps = {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  visible: boolean;
  title?: string;
  children: ReactNode;
  className?: string;
};

export const Aside: React.FC<AsideProps> = ({
  visible,
  title,
  children,
  onClose,
  className,
}: AsideProps) => {
  return (
    <aside
      className={`bg-gray-300 shadow-none shadow-gray-700 ${
        !visible ? "hidden" : ""
      } top-0  ${className}`}
    >
      <Header>
        <Header.Title>{title}</Header.Title>
        <Button
          onClick={onClose}
          className="!border-none !shadow-none py-0 ml-auto mr-0"
          type={ButtonTypes.SECONDARY}
        >
          <i className="fa-solid fa-x"></i>
        </Button>
      </Header>
      {children}
    </aside>
  );
};
