import React, { ReactNode, useContext } from "react";
import { useState } from "react";
import { Button, ButtonTypes } from "./Button";
import { Sidebar } from "./Sidebar";
import { Menu } from "./Menu";
import { MobileContext } from "../../context/mobile/MobileContext";

export type ButtonGroupItem = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type: ButtonTypes;
};

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const ButtonGroup = ({ children, className }: Props) => {
  const { isMobile } = useContext(MobileContext);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  return (
    <div className={className}>
      {isMobile ? (
        <>
          <Button
            onClick={() => setIsSidebarVisible(true)}
            type={ButtonTypes.SECONDARY}
            className="!border-none !shadow-none py-1"
          >
            <i className="fa-solid fa-bars"></i>
          </Button>
          {isSidebarVisible && (
            <Sidebar
              onClose={() => setIsSidebarVisible(false)}
              title="Actions"
              visible={isSidebarVisible}
            >
              <Menu className="!w-full">{children}</Menu>
            </Sidebar>
          )}
        </>
      ) : (
        <div className="space-x-2">{children}</div>
      )}
    </div>
  );
};

ButtonGroup.Item = Item;

function Item({
  onClick,
  type,
  className,
  children,
}: Omit<ButtonGroupItem, "text"> & { children: ReactNode }) {
  const { isMobile } = useContext(MobileContext);
  return (
    <>
      {isMobile ? (
        <Menu.Item onClick={onClick} className={className}>
          {children}
        </Menu.Item>
      ) : (
        <Button onClick={onClick} type={type} className={className}>
          {children}
        </Button>
      )}
    </>
  );
}
