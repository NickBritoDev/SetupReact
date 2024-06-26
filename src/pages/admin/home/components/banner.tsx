import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import banner from "../images/banner.jpg";
import { FaFileImport, FaRoad } from "react-icons/fa";
import {
  BsCreditCard2Front,
  BsFillPatchCheckFill,
  BsRobot,
} from "react-icons/bs";
import { GrDashboard } from "react-icons/gr";
import { useAuthHelpers } from "../../../../helpers/conta/permissao";

export default function BannerComponent() {
  const navigate = useNavigate();
  const toast = useToast();
  const { isAdmin, temPermissao } = useAuthHelpers();

  const exibeToast = () => {
    return toast({
      title: "Eagle Software House",
      description:
        "Você não tem permissão de acesso a essa ferramenta, entre em contato com seu gestor para solicitação de uso.",
      status: "info",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

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
        <Box textAlign={"center"} mt={32}>
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
              temPermissao("CRM")
                ? "acessar ferramenta"
                : "sem permissão de acesso"
            }
            placement="top"
          >
            <Box
              cursor={temPermissao("CRM") ? "pointer" : "not-allowed"}
              onClick={() => {
                if (temPermissao("CRM")) {
                  navigate("/admin/crm");
                } else {
                  exibeToast();
                }
              }}
              _hover={{
                transform: "translateY(-20px)",
                bg: temPermissao("CRM") ? "#229544" : "red",
                color: "white",
              }}
              transition="transform 0.2s, background-color 0.2s, color 0.2s"
              boxShadow={"xl"}
              bg={"white"}
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
              temPermissao("Chatbot")
                ? "acessar ferramenta"
                : "sem permissão de acesso"
            }
            placement="top"
          >
            <Box
              cursor={temPermissao("Chatbot") ? "pointer" : "not-allowed"}
              onClick={() => {
                if (temPermissao("Chatbot")) {
                  navigate("/admin/chatbot");
                } else {
                  exibeToast();
                }
              }}
              _hover={{
                transform: "translateY(-20px)",
                bg: temPermissao("Chatbot") ? "#229544" : "red",
                color: "white",
              }}
              transition="transform 0.2s, background-color 0.2s, color 0.2s"
              boxShadow={"xl"}
              bg={"white"}
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

          <Tooltip hasArrow label={"acessar ferramenta"} placement="top">
            <Box
              cursor={
                temPermissao("ConfirmacaoProposta") ? "pointer" : "not-allowed"
              }
              onClick={() => {
                if (temPermissao("ConfirmacaoProposta")) {
                  navigate("/admin/confirmacao-proposta");
                } else {
                  exibeToast();
                }
              }}
              _hover={{
                transform: "translateY(-20px)",
                bg: temPermissao("ConfirmacaoProposta") ? "#229544" : "red",
                color: "white",
              }}
              transition="transform 0.2s, background-color 0.2s, color 0.2s"
              boxShadow={"xl"}
              bg={"white"}
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

          <Tooltip hasArrow label={"acessar ferramenta"} placement="top">
            <Box
              cursor={temPermissao("Simulador") ? "pointer" : "not-allowed"}
              onClick={() => {
                if (temPermissao("Simulador")) {
                  navigate("/admin/simulador");
                } else {
                  exibeToast();
                }
              }}
              _hover={{
                transform: "translateY(-20px)",
                bg: temPermissao("Simulador") ? "#229544" : "red",
                color: "white",
              }}
              transition="transform 0.2s, background-color 0.2s, color 0.2s"
              boxShadow={"xl"}
              bg={"white"}
              rounded={"2xl"}
              w={"200px"}
              h={"150px"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDir={"column"}
            >
              <GrDashboard size={40} />
              <Text fontWeight={"semibold"} mt={4}>
                Simulador
              </Text>
            </Box>
          </Tooltip>

          <Tooltip hasArrow label={"acessar ferramenta"} placement="top">
            <Box
              cursor={
                temPermissao("ImportadorVagas") ? "pointer" : "not-allowed"
              }
              onClick={() => {
                if (temPermissao("ImportadorVagas")) {
                  navigate("/admin/confirmacao-proposta");
                } else {
                  exibeToast();
                }
              }}
              _hover={{
                transform: "translateY(-20px)",
                bg: temPermissao("ImportadorVagas") ? "#229544" : "red",
                color: "white",
              }}
              transition="transform 0.2s, background-color 0.2s, color 0.2s"
              boxShadow={"xl"}
              bg={"white"}
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

          <Tooltip hasArrow label={"acessar ferramenta"} placement="top">
            <Box
              cursor={isAdmin ? "pointer" : "not-allowed"}
              onClick={() => {
                if (isAdmin) {
                  navigate("/admin/marketplace");
                } else {
                  exibeToast();
                }
              }}
              _hover={{
                transform: "translateY(-20px)",
                bg: isAdmin ? "#229544" : "red",
                color: "white",
              }}
              pointerEvents={"all"}
              transition="transform 0.2s, background-color 0.2s, color 0.2s"
              boxShadow={"xl"}
              bg={"white"}
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
