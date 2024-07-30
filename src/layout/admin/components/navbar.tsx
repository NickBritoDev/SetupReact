import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Text,
  Tooltip,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";
import { useMobile } from "../../../helpers/responsividade/useMediaQuery";
import logo from "../images/logo.png";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetMinhaConta } from "../../../hooks/useGetMinhaConta";
// import SidebarComponent from "./sidebar";

export default function NavbarComponent() {
  const { data } = useGetMinhaConta();
  const navigate = useNavigate();

  const deleteCookie = (name: string) => {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
  };

  const handleLogout = () => {
    deleteCookie("keyStatus");
    deleteCookie("token");
    window.location.href = window.location.origin;
  };

  return (
    <Flex
      boxShadow={"lg"}
      w={"100%"}
      alignItems={"center"}
      justifyContent={"space-between"}
      py={1}
      borderRadius={"0 0 20px 20px"}
    >
      <Flex
        ml={4}
        boxShadow={"lg"}
        pr={4}
        rounded={"2xl"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Image w={50} src={logo} alt="logo eagles software house" />
        <Text fontWeight={"semibold"}>Eagles Software House</Text>
      </Flex>
      {/* <SidebarComponent /> */}

      <Box>
        <Wrap>
          <WrapItem
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
          >
            <Avatar size={"sm"} name={data?.nome} src={data?.foto} />

            <Flex
              display={useMobile() ? "none" : "flex"}
              flexDir={"column"}
              alignItems={"flex-end"}
              justifyContent={"center"}
            >
              <Text fontWeight={"semibold"}>{data?.nome}</Text>
              <Text
                color={"brand.invert_color_subtitle"}
                fontWeight={"semibold"}
                fontSize={14}
                mt={-2}
              >
                {data?.cnpjMatriz}
              </Text>
            </Flex>

            <Tooltip mr={-4} hasArrow label="Sair" placement="left">
              <Button
                color={"brand.invert_colors"}
                _hover={{ transform: "translateX(5px)" }}
                colorScheme="transparent"
                bg={"none"}
                onClick={handleLogout}
              >
                <MdLogout size={24} />
              </Button>
            </Tooltip>

            <Tooltip hasArrow label="Ir para home" placement="left">
              <button>
                <FaHome
                  onClick={() => {
                    navigate("/admin/home");
                  }}
                  style={{ marginRight: "20px" }}
                  color={"black"}
                  size={24}
                />
              </button>
            </Tooltip>
          </WrapItem>
        </Wrap>
      </Box>
    </Flex>
  );
}
