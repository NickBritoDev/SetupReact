import { Flex, Heading } from "@chakra-ui/react";
import ModalComponent from "./modal";

export default function HeaderComponent() {
  return (
    <Flex alignItems={"center"} justifyContent={"space-between"}>
      <Heading size={"md"} mb={6}>
        Acompanhamento de leads
      </Heading>
      <ModalComponent />
    </Flex>
  );
}
