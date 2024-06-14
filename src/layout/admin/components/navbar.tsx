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
import SidebarComponent from "./sidebar";
import { MdLogout } from "react-icons/md";
import { useMobile } from "../../../helpers/responsividade/useMediaQuery";

export default function NavbarComponent() {
  return (
    <Flex
      boxShadow={"lg"}
      w={"100%"}
      alignItems={"center"}
      justifyContent={"space-between"}
      py={1}
    >
      <SidebarComponent />

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
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
            />

            <Flex
              display={useMobile() ? "none" : "flex"}
              flexDir={"column"}
              alignItems={"flex-start"}
              justifyContent={"center"}
            >
              <Text fontWeight={"semibold"}>Nicolas Brito da Cruz</Text>
              <Text
                color={"brand.invert_color_subtitle"}
                fontWeight={"semibold"}
                fontSize={14}
                mt={-2}
              >
                Desenvolvimento
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
