import { Box } from "@chakra-ui/react";
import NavbarComponent from "./components/navbar";
import AcoesComponents from "./components/acoes";
import CardsComponent from "./components/cards";
import { SetStateAction, useState } from "react";

export default function Marketplace() {
  const [filters, setFilters] = useState({
    ferramentas: [],
    status: [],
    grupos: [],
  });

  const handleApplyFilters = (
    newFilters: SetStateAction<{
      ferramentas: never[];
      status: never[];
      grupos: never[];
    }>,
  ) => {
    setFilters(newFilters);
  };
  return (
    <Box>
      <NavbarComponent />
      <AcoesComponents onApplyFilters={handleApplyFilters} />
      <Box p={4}>
        <CardsComponent filters={filters} />
      </Box>
    </Box>
  );
}
