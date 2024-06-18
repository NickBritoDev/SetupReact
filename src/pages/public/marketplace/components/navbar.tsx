import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  Tooltip,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";
import { useMobile } from "../../../../helpers/responsividade/useMediaQuery";
import dadosUsuario from "../../../../json/usuario/data.json";

export default function NavbarComponent() {
  return (
    <Flex
      boxShadow={"lg"}
      alignItems={"center"}
      justifyContent={"space-between"}
      p={2}
    >
      <Text fontWeight={"semibold"} ml={2}>
        {dadosUsuario[0].empresa}
      </Text>

      <Box>
        <Wrap>
          <WrapItem
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
          >
            <Avatar
              size={"sm"}
              name={dadosUsuario[0].nome}
              src={dadosUsuario[0].foto}
            />

            <Flex
              display={useMobile() ? "none" : "flex"}
              flexDir={"column"}
              alignItems={"flex-start"}
              justifyContent={"center"}
            >
              <Text fontWeight={"semibold"}>{dadosUsuario[0].nome}</Text>
              <Text
                color={"brand.invert_color_subtitle"}
                fontWeight={"semibold"}
                fontSize={14}
                mt={-2}
              >
                {dadosUsuario[0].cargo}
              </Text>
            </Flex>

            <a href="https://www.portalmaisvalor.com/paginas/home.html">
              <Tooltip mr={-4} hasArrow label="Sair" placement="right">
                <Button
                  color={"brand.invert_colors"}
                  _hover={{ transform: "translateX(5px)" }}
                  colorScheme="transparent"
                  bg={"none"}
                >
                  <MdLogout size={24} />
                </Button>
              </Tooltip>
            </a>
          </WrapItem>
        </Wrap>
      </Box>
    </Flex>
  );
}
