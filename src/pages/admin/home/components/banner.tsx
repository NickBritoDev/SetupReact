import { Box, Flex, Heading, Image, Text, Tooltip } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import banner from "../images/banner.jpg";
import { FaFileImport, FaRoad } from "react-icons/fa6";
import {
  BsCreditCard2Front,
  BsFillPatchCheckFill,
  BsRobot,
} from "react-icons/bs";
import { TbBrandSpeedtest } from "react-icons/tb";
import ferramentas from "../../../../json/home/data.json";

export default function BannerComponent() {
  const navigate = useNavigate();
  const permissoes = ferramentas[0].ferramentas[0];

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
        top={-2}
        pos={"absolute"}
        rounded={"2xl"}
        w={"100%"}
        h={"350px"}
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
        top={0}
        flexDir={"column"}
      >
        <Box textAlign={"center"} mt={52}>
          <Heading>Tudo que sua empresa precisa em um só lugar!</Heading>
          <Text fontSize={22} fontWeight={"semibold"}>
            Explore suas ferramentas e impulsione suas vendas.
          </Text>
        </Box>

        <Flex
          p={4}
          gap={4}
          alignItems={"center"}
          justifyContent={"center"}
          w={"100%"}
          color={"black"}
        >
          <Tooltip
            hasArrow
            label={
              permissoes.crm ? "acessar ferramenta" : "sem permissão de acesso"
            }
            placement="top"
          >
            <Box
              onClick={() => {
                navigate("/admin/crm");
              }}
              _hover={{
                transform: "translateY(-20px)",
                bg: permissoes.crm ? "#229544" : "red",
                color: "white",
              }}
              transition="transform 0.2s, background-color 0.2s, color 0.2s"
              boxShadow={"xl"}
              bg={"white"}
              cursor={permissoes.crm ? "pointer" : "not-allowed"}
              rounded={"2xl"}
              w={"200px"}
              h={"150px"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDir={"column"}
            >
              <FaRoad size={40} />
              <Text fontWeight={"semibold"} mt={4}>
                Esteira de Leads
              </Text>
            </Box>
          </Tooltip>

          <Tooltip
            hasArrow
            label={
              permissoes.chatbot
                ? "acessar ferramenta"
                : "sem permissão de acesso"
            }
            placement="top"
          >
            <Box
              _hover={{
                transform: "translateY(-20px)",
                bg: permissoes.chatbot ? "#229544" : "red",
                color: "white",
              }}
              transition="transform 0.2s, background-color 0.2s, color 0.2s"
              boxShadow={"xl"}
              bg={"white"}
              cursor={permissoes.chatbot ? "pointer" : "not-allowed"}
              rounded={"2xl"}
              w={"200px"}
              h={"150px"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDir={"column"}
            >
              <BsRobot size={40} />
              <Text fontWeight={"semibold"} mt={4}>
                Chatbot
              </Text>
            </Box>
          </Tooltip>

          <Tooltip
            hasArrow
            label={
              permissoes.confirmacao_proposta
                ? "acessar ferramenta"
                : "sem permissão de acesso"
            }
            placement="top"
          >
            <Box
              _hover={{
                transform: "translateY(-20px)",
                bg: permissoes.confirmacao_proposta ? "#229544" : "red",
                color: "white",
              }}
              transition="transform 0.2s, background-color 0.2s, color 0.2s"
              boxShadow={"xl"}
              bg={"white"}
              cursor={
                permissoes.confirmacao_proposta ? "pointer" : "not-allowed"
              }
              rounded={"2xl"}
              w={"200px"}
              h={"150px"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDir={"column"}
            >
              <BsFillPatchCheckFill size={40} />
              <Text fontWeight={"semibold"} mt={4}>
                Confirma propostas
              </Text>
            </Box>
          </Tooltip>

          <Tooltip
            hasArrow
            label={
              permissoes.simulador
                ? "acessar ferramenta"
                : "sem permissão de acesso"
            }
            placement="top"
          >
            <Box
              _hover={{
                transform: "translateY(-20px)",
                bg: permissoes.simulador ? "#229544" : "red",
                color: "white",
              }}
              transition="transform 0.2s, background-color 0.2s, color 0.2s"
              boxShadow={"xl"}
              bg={"white"}
              cursor={permissoes.simulador ? "pointer" : "not-allowed"}
              rounded={"2xl"}
              w={"200px"}
              h={"150px"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDir={"column"}
            >
              <TbBrandSpeedtest size={40} />
              <Text fontWeight={"semibold"} mt={4}>
                Simulador
              </Text>
            </Box>
          </Tooltip>

          <Tooltip
            hasArrow
            label={
              permissoes.importador_vagas
                ? "acessar ferramenta"
                : "sem permissão de acesso"
            }
            placement="top"
          >
            <Box
              _hover={{
                transform: "translateY(-20px)",
                bg: permissoes.importador_vagas ? "#229544" : "red",
                color: "white",
              }}
              transition="transform 0.2s, background-color 0.2s, color 0.2s"
              boxShadow={"xl"}
              bg={"white"}
              cursor={permissoes.importador_vagas ? "pointer" : "not-allowed"}
              rounded={"2xl"}
              w={"200px"}
              h={"150px"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDir={"column"}
            >
              <FaFileImport size={40} />
              <Text fontWeight={"semibold"} mt={4}>
                Importador de vagas
              </Text>
            </Box>
          </Tooltip>

          <Tooltip
            hasArrow
            label={
              permissoes.marketplace
                ? "acessar ferramenta"
                : "sem permissão de acesso"
            }
            placement="top"
          >
            <Box
              onClick={() => {
                navigate("/admin/marketplace");
              }}
              pointerEvents={permissoes.marketplace ? "all" : "none"}
              _hover={{
                transform: "translateY(-20px)",
                bg: "#229544",
                color: "white",
              }}
              transition="transform 0.2s, background-color 0.2s, color 0.2s"
              boxShadow={"xl"}
              bg={"white"}
              cursor={permissoes.marketplace ? "pointer" : "not-allowed"}
              rounded={"2xl"}
              w={"200px"}
              h={"150px"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDir={"column"}
            >
              <BsCreditCard2Front size={40} />
              <Text fontWeight={"semibold"} mt={4}>
                Marketplace
              </Text>
            </Box>
          </Tooltip>
        </Flex>
      </Flex>
    </Flex>
  );
}
