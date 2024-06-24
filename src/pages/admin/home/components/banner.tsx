import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import banner from "../images/banner.jpg";
import { FaFileImport, FaRoad } from "react-icons/fa6";
import {
  BsCreditCard2Front,
  BsFillPatchCheckFill,
  BsRobot,
} from "react-icons/bs";
import { TbBrandSpeedtest } from "react-icons/tb";

export default function BannerComponent() {
  const navigate = useNavigate();

  return (
    <Flex
      pos={"relative"}
      flexDir={"column"}
      h={"88vh"}
      w={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Image
        top={10}
        pos={"absolute"}
        rounded={"2xl"}
        w={"100%"}
        h={"450px"}
        src={banner}
        alt="banner home mais valor labs"
      />
      <Flex
        w={"100%"}
        h={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
        color={"white"}
        pos={"absolute"}
        flexDir={"column"}
      >
        <Box textAlign={"center"} mt={60}>
          <Heading>Tudo que sua empresa precisa em um só lugar!</Heading>
          <Text fontSize={18} fontWeight={"semibold"} mt={2}>
            Explore suas ferramentas e impulsione suas vendas.
          </Text>
        </Box>

        <Flex
          mb={10}
          gap={4}
          alignItems={"center"}
          justifyContent={"center"}
          w={"100%"}
          color={"black"}
        >
          <Box
            onClick={() => {
              navigate("/admin/crm");
            }}
            _hover={{
              transform: "translateY(-20px)",
              bg: "#229544",
              color: "white",
            }}
            transition="transform 0.2s, background-color 0.2s, color 0.2s"
            boxShadow={"xl"}
            bg={"white"}
            cursor={"pointer"}
            rounded={"2xl"}
            w={"230px"}
            h={"150px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDir={"column"}
          >
            <FaRoad size={40} />
            <Text fontSize={18} fontWeight={"semibold"} mt={4}>
              Esteira de Leads
            </Text>
          </Box>
          <Box
            _hover={{
              transform: "translateY(-20px)",
              bg: "#229544",
              color: "white",
            }}
            transition="transform 0.2s, background-color 0.2s, color 0.2s"
            boxShadow={"xl"}
            bg={"white"}
            cursor={"pointer"}
            rounded={"2xl"}
            w={"230px"}
            h={"150px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDir={"column"}
          >
            <BsRobot size={40} />
            <Text fontSize={18} fontWeight={"semibold"} mt={4}>
              Chatbot
            </Text>
          </Box>
          <Box
            _hover={{
              transform: "translateY(-20px)",
              bg: "#229544",
              color: "white",
            }}
            transition="transform 0.2s, background-color 0.2s, color 0.2s"
            boxShadow={"xl"}
            bg={"white"}
            cursor={"pointer"}
            rounded={"2xl"}
            w={"230px"}
            h={"150px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDir={"column"}
          >
            <BsFillPatchCheckFill size={40} />
            <Text fontSize={18} fontWeight={"semibold"} mt={4}>
              Confirmação de propostas
            </Text>
          </Box>
          <Box
            _hover={{
              transform: "translateY(-20px)",
              bg: "#229544",
              color: "white",
            }}
            transition="transform 0.2s, background-color 0.2s, color 0.2s"
            boxShadow={"xl"}
            bg={"white"}
            cursor={"pointer"}
            rounded={"2xl"}
            w={"230px"}
            h={"150px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDir={"column"}
          >
            <TbBrandSpeedtest size={40} />
            <Text fontSize={18} fontWeight={"semibold"} mt={4}>
              Simulador
            </Text>
          </Box>
          <Box
            _hover={{
              transform: "translateY(-20px)",
              bg: "#229544",
              color: "white",
            }}
            transition="transform 0.2s, background-color 0.2s, color 0.2s"
            boxShadow={"xl"}
            bg={"white"}
            cursor={"pointer"}
            rounded={"2xl"}
            w={"230px"}
            h={"150px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDir={"column"}
          >
            <FaFileImport size={40} />
            <Text fontSize={18} fontWeight={"semibold"} mt={4}>
              Importador de vagas
            </Text>
          </Box>
          <Box
            onClick={() => {
              navigate("/public/marketplace");
            }}
            _hover={{
              transform: "translateY(-20px)",
              bg: "#229544",
              color: "white",
            }}
            transition="transform 0.2s, background-color 0.2s, color 0.2s"
            boxShadow={"xl"}
            bg={"white"}
            cursor={"pointer"}
            rounded={"2xl"}
            w={"230px"}
            h={"150px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDir={"column"}
          >
            <BsCreditCard2Front size={40} />
            <Text fontSize={18} fontWeight={"semibold"} mt={4}>
              Marketplace
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
