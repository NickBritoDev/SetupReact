import { Flex, Heading, Spinner } from "@chakra-ui/react";

export default function LoadingComponent() {
  return (
    <Flex alignItems={"center"} justifyContent={"flex-start"} p={4} gap={4}>
      <Heading>Carregando Configurações...</Heading>
      <Spinner size={"lg"} />
    </Flex>
  );
}
