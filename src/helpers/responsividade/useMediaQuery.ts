import { useMediaQuery } from "@chakra-ui/react";

export const mobileBreakpoint = "(max-width: 750px)";
export const useMobile = (): boolean => {
  const [isMobile] = useMediaQuery(mobileBreakpoint);
  return isMobile;
};

export const tabletBreakpoint = "(max-width: 950px)";
export const useTablet = (): boolean => {
  const [isTablet] = useMediaQuery(tabletBreakpoint);
  return isTablet;
};

export const desktopBreakpoint = "(min-width: 951px)";
export const useDesktop = (): boolean => {
  const [isDesktop] = useMediaQuery(desktopBreakpoint);
  return isDesktop;
};
