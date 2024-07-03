import { Box, Flex, Heading } from "@chakra-ui/react";
import BuscarTodasAsInstanciasComponenent from "./buscarInstancias";

export default function GerenciamentoInstanciasComponent() {
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
      <BuscarTodasAsInstanciasComponenent />
    </Box>
  );
}
