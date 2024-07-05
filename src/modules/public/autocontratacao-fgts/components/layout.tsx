import { Flex, Show } from "@chakra-ui/react";
import {
  desktopBreakpoint,
  tabletBreakpoint,
  useTablet,
} from "@helpers/responsividade/useMediaQuery";
import { Fragment, PropsWithChildren } from "react";

type Props = {};
function LayoutFlexComponent({ children }: PropsWithChildren) {
  const isMobile = useTablet();
  return (
    <Flex
      flexDir={"column"}
      bg={"whitesmoke"}
      {...(isMobile
        ? {
            w: "100vw",
            h: "100vh",
            border: "none",
          }
        : {
            h: "80vh",
            boxShadow: "0px 0px 56px -18px rgba(0,0,0,0.75)",
            border: "solid gray",
            aspectRatio: 14 / 16,
            rounded: "25px",
            p: "10px",
          })}
    >
      {children}
    </Flex>
  );
}

export default function LayoutComponent({
  children,
}: PropsWithChildren<Props>) {
  return (
    <Fragment>
      <Show breakpoint={desktopBreakpoint}>
        <Flex
          bg={"gray.400"}
          w={"100vw"}
          h={"100vh"}
          justify={"center"}
          align={"center"}
        >
          <LayoutFlexComponent>{children}</LayoutFlexComponent>
        </Flex>
      </Show>
      <Show breakpoint={tabletBreakpoint}>
        <LayoutFlexComponent>{children}</LayoutFlexComponent>
      </Show>
    </Fragment>
  );
}
