import { Outlet } from "react-router-dom";
import NavbarComponent from "./components/navbar";
import { Box } from "@chakra-ui/react";

export default function LayoutAdmin() {
  return (
    <Box w={"100%"} overflowX={"hidden"}>
      <NavbarComponent />
      <Outlet />
    </Box>
  );
}
