import { useState } from "react";
import { ButtonSecondary } from "./ButtonSecondary";
import { Sidebar } from "./Sidebar";

type Props = {
  children: React.ReactNode;
};

export const ControlsGroup = ({ children }: Props) => {
  const [matchesMobile, setMatchesMobile] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );
  window
    .matchMedia("(max-width: 768px)")
    .addEventListener("change", (event) => setMatchesMobile(event.matches));
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  return (
    <div className="space-x-2 inline-flex w-full">
      {!matchesMobile && children}
      {matchesMobile && (
        <>
          <ButtonSecondary
            onClick={() => setIsSidebarVisible(true)}
            className="border-none shadow-none py-0 mt-0"
          >
            <i className="fa-solid fa-bars"></i>
          </ButtonSecondary>
          {isSidebarVisible && (
            <Sidebar
              title="Actions"
              visible={isSidebarVisible}
              onClickOutside={() => setIsSidebarVisible(false)}
            >
              {children}
            </Sidebar>
          )}
        </>
      )}
    </div>
  );
};
