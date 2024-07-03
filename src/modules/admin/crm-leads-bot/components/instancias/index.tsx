import { Box, Flex, Heading } from "@chakra-ui/react";
import BuscarTodasAsInstancias from "./components/BuscarTodasAsInstancias";

export default function Instancias() {
  return (
    <Box w={"100%"}>
      <Flex
        w={"100%"}
        gap={2}
        p={4}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Heading>Gerenciamento de Instâncias</Heading>
      </Flex>
      <BuscarTodasAsInstancias />
    </Box>
  );
}
