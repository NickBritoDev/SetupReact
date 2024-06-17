import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import imgNaoAutorizado from "./image/nao-autorizado.png";
import { useMobile } from "../../../helpers/responsividade/useMediaQuery";
import { MdLogout } from "react-icons/md";

export default function NaoAutorizado401() {
  return (
    <Flex
      flexDir={"column"}
      w={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
      py={6}
      pos={"relative"}
    >
      <Box
        w={"450px"}
        boxShadow={"2px 2px 2000px 100px green"}
        pos={"absolute"}
        left={useMobile() ? -500 : -400}
        top={0}
      ></Box>
      <Box
        w={"450px"}
        boxShadow={"2px 2px 2000px 100px green"}
        pos={"absolute"}
        right={useMobile() ? -500 : -400}
        bottom={0}
      ></Box>

      <Heading>Permissão Negada 🔒</Heading>
      <Image src={imgNaoAutorizado} alt="imagem de nao autorizado mais valor" />
      <Text
        fontWeight={"semibold"}
        textAlign={"justify"}
        w={useMobile() ? "90%" : "70%"}
      >
        Você não contém as credenciais necessárias para acessar esta etapa da
        aplicação. Faça login no portal Mais Valor novamente e acesse a
        ferramenta. Caso o problema persista e você tenha acesso à ferramenta,
        entre em contato com o desenvolvimento.
      </Text>

      <a href="https://www.portalmaisvalor.com/paginas/home.html">
        <Tooltip mr={-4} hasArrow label="Sair" placement="right">
          <Button
            mt={4}
            gap={2}
            _hover={{ transform: "translateX(5px)" }}
            colorScheme="green"
          >
            <Text>Voltar ao Portal</Text>
            <MdLogout size={24} />
          </Button>
        </Tooltip>
      </a>
    </Flex>
  );
}
