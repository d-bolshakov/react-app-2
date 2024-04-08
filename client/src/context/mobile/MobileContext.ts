import { createContext } from "react";

type MobileContext = {
  isMobile: boolean;
};

const defaultValue = { isMobile: false };

export const MobileContext = createContext<MobileContext>(defaultValue);
