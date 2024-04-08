import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MobileContext } from "../../context/mobile/MobileContext";

export const withPortalOnMobile = function <T>(
  Component: React.FC<T>,
  targetContainerId: string
) {
  return (
    props: React.ComponentProps<typeof Component> & { visible: boolean }
  ) => {
    const { isMobile } = useContext(MobileContext);
    const visibilityHandler = () => {
      if (props.visible && isMobile) {
        document.body.style.overflow = "hidden";
        document.body.style.height = "100dvh";
      } else document.body.style.overflow = "auto";
    };
    visibilityHandler();
    return (
      <>
        {props.visible ? (
          isMobile ? (
            createPortal(
              <div className="fixed w-full h-full top-0 overflow-y-scroll">
                <Component {...props} />
              </div>,
              document.getElementById(targetContainerId)!
            )
          ) : (
            <Component {...props} />
          )
        ) : null}
      </>
    );
  };
};
