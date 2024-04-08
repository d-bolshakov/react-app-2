import { useIsMobile } from "../../hooks/useIsMobile";
import { MobileContext } from "./MobileContext";

export const MobileContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isMobile } = useIsMobile();
  return (
    <MobileContext.Provider value={{ isMobile }}>
      {children}
    </MobileContext.Provider>
  );
};
