import { Outlet } from "react-router-dom";
import NavbarComponent from "./components/navbar";
import { Box, Flex } from "@chakra-ui/react";

export default function LayoutAdmin() {
  return (
    <Flex flexFlow={"column"} w={"100%"} overflowX={"hidden"} h={"100%"}>
      <NavbarComponent />
      <Box flexGrow={"1"} p={4} w={"100%"}>
        <Outlet />
      </Box>
    </Flex>
  );
}
