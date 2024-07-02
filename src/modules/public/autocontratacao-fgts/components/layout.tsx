import { Box, Flex, Show } from "@chakra-ui/react";
import { Fragment, PropsWithChildren } from "react";

type Props = {};
function LayoutFlexComponent({ children }: PropsWithChildren) {
  return (
    <Flex
      flexDir={"column"}
      bg={"gray.100"}
      border={"solid black"}
      aspectRatio={14 / 16}
      h={"80vh"}
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
      <Show above="md">
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
      <Show below="md">
        <LayoutFlexComponent>{children}</LayoutFlexComponent>
      </Show>
    </Fragment>
  );
}
