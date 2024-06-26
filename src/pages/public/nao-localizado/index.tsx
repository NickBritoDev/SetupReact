import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import imgNaoLocalizado from "./image/nao-localizado.png";
import { useMobile } from "../../../helpers/responsividade/useMediaQuery";
import { MdLogout } from "react-icons/md";

export default function NaoLocalizado404() {
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

      <Heading>Pagina não encontrada 🤒</Heading>
      <Image w={400} src={imgNaoLocalizado} alt="imagem de não localizado" />
      <Text
        fontWeight={"semibold"}
        textAlign={"justify"}
        w={useMobile() ? "90%" : "70%"}
      >
        Ops! Parece que a página que você está procurando não existe. Isso pode
        ter acontecido por vários motivos: o link que você usou pode estar
        incorreto, a página pode ter sido movida ou removida, ou talvez você
        tenha digitado o endereço errado. Não se preocupe, estamos aqui para
        ajudar! Você pode voltar para a página inicial. Se precisar de mais
        assistência, sinta-se à vontade para entrar em contato com nosso
        suporte.
      </Text>

      <a href="http://localhost:5173/">
        <Tooltip mr={-4} hasArrow label="Sair" placement="right">
          <Button
            mt={4}
            gap={2}
            _hover={{ transform: "translateX(5px)" }}
            colorScheme="green"
          >
            <Text>Voltar para a página inicial</Text>
            <MdLogout size={24} />
          </Button>
        </Tooltip>
      </a>
    </Flex>
  );
}
