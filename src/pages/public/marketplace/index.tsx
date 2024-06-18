import { Box } from "@chakra-ui/react";
import NavbarComponent from "./components/navbar";
import AcoesComponents from "./components/acoes";
import CardsComponent from "./components/cards";

export default function Marketplace() {
  return (
    <Box>
      <NavbarComponent />
      <AcoesComponents />
      <Box p={4}>
        <CardsComponent />
      </Box>
    </Box>
  );
}
