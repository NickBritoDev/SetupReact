import { useMediaQuery } from "@chakra-ui/react";

export const useMobile = (): any => {
  const [isMobile] = useMediaQuery("(max-width: 750px)");
  return isMobile;
};

export const useTablet = (): any => {
  const [isTablet] = useMediaQuery("(max-width: 950px)");
  return isTablet;
};

export const useDesktop = (): any => {
  const [isDesktop] = useMediaQuery("(max-width: 1250px)");
  return isDesktop;
};
