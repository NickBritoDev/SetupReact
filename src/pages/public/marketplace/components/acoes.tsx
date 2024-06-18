import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { BiSearchAlt } from "react-icons/bi";
import { FcClearFilters, FcFilledFilter, FcGoodDecision } from "react-icons/fc";
import { useMobile } from "../../../../helpers/responsividade/useMediaQuery";
export default function AcoesComponents() {
  return (
    <Flex
      w={"100%"}
      alignItems={"center"}
      justifyContent={"space-between"}
      p={4}
      gap={useMobile() ? 2 : 4}
    >
      <Flex
        gap={2}
        w={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        bg={"gray.100"}
        p={2}
        rounded={"md"}
      >
        <BiSearchAlt size={22} />
        <Input
          variant={"unstyled"}
          placeholder={
            useMobile()
              ? "Pequise aqui..."
              : "Pesquise suas ferramentas aqui..."
          }
        />
      </Flex>

      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        gap={useMobile() ? 2 : 4}
      >
        <Button
          _hover={{ backgroundColor: "green", color: "white" }}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
        >
          <Text display={useMobile() ? "none" : ""}>Filtros</Text>
          <FcFilledFilter size={22} />
        </Button>
        <Button
          _hover={{ backgroundColor: "red", color: "white" }}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
        >
          <Text display={useMobile() ? "none" : ""}>Limpar filtros</Text>
          <FcClearFilters size={22} />
        </Button>
        <Button
          _hover={{ backgroundColor: "gray.600", color: "white" }}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
        >
          <Text display={useMobile() ? "none" : ""}>
            Criar grupo de confiança
          </Text>
          <FcGoodDecision size={22} />
        </Button>
      </Flex>
    </Flex>
  );
}
