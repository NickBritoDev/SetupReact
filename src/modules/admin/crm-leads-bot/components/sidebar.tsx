import { Text, Flex, Box, Badge } from "@chakra-ui/react";
import { RiUserHeartFill } from "react-icons/ri";
import {
  FaCartArrowDown,
  FaRoad,
  FaTemperatureArrowUp,
  FaUserCheck,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa6";
import { SiFireship } from "react-icons/si";
import { GiIceCube } from "react-icons/gi";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from "react";

export default function SidebarComponent({
  detalhesLeads,
  filteredContatos,
  openDetailsLeads,
}: any) {
  return (
    <Box
      pos={"absolute"}
      left={0}
      bottom={0}
      h={"91.5vh"}
      overflowY={"scroll"}
      flexDir={"column"}
      w={"25%"}
      borderRight={"solid 1px gray"}
    >
      <Flex position={"relative"} h={"100vh"} flexDir={"column"}>
        {filteredContatos.map(
          (
            contato: {
              id: any;
              status:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | null
                | undefined;
              nome:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | null
                | undefined;
              score: string;
              produto:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | null
                | undefined;
              origem:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | null
                | undefined;
            },
            index: Key | null | undefined,
          ) => (
            <Box
              bg={contato.id === detalhesLeads.id ? "gray.100" : ""}
              onClick={() => {
                openDetailsLeads(contato);
              }}
              cursor={"pointer"}
              p={2}
              borderBottom={"solid gray 1px"}
              key={index}
            >
              <Flex
                w={"100%"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Flex
                  mb={4}
                  mt={2}
                  boxShadow={"lg"}
                  rounded={"xl"}
                  pr={4}
                  gap={2}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Box
                    bg={"rgba(0,0,0,0.4)"}
                    boxShadow={"lg"}
                    ml={-1}
                    borderRadius={"50%"}
                    p={2}
                  >
                    {contato.status === "NOVO" && (
                      <FaUserPlus size={22} color="white" />
                    )}
                    {contato.status === "CONTATO" && (
                      <FaUsers size={22} color="white" />
                    )}
                    {contato.status === "NEGOCIANDO" && (
                      <RiUserHeartFill size={22} color="white" />
                    )}
                    {contato.status === "FINALIZADO" && (
                      <FaUserCheck size={22} color="white" />
                    )}
                  </Box>
                  <Text fontWeight={"semibold"}>{contato.nome}</Text>
                </Flex>
                <Flex gap={2}>
                  {contato.score === "FRIO" && (
                    <GiIceCube color="#44B3CF" size={22} />
                  )}
                  {contato.score === "MEDIO" && (
                    <FaTemperatureArrowUp color="#F4B61D" size={22} />
                  )}
                  {contato.score === "QUENTE" && (
                    <SiFireship color="#F44B1D" size={22} />
                  )}
                  <Badge
                    variant={"solid"}
                    bg={
                      contato.status === "NOVO"
                        ? "#44B3CF"
                        : contato.status === "CONTATO"
                          ? "#F4B61D"
                          : contato.status === "NEGOCIANDO"
                            ? "#F44B1D"
                            : contato.status === "FINALIZADO"
                              ? "#229544"
                              : "black"
                    }
                  >
                    {contato.status}
                  </Badge>
                </Flex>
              </Flex>
              <Flex flexDir={"column"}>
                <Flex
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={2}
                >
                  <FaCartArrowDown size={22} />
                  <Text fontWeight={"semibold"}>{contato.produto}</Text>
                </Flex>
                <Flex
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={2}
                >
                  <FaRoad size={22} />
                  <Text fontWeight={"semibold"}>{contato.origem}</Text>
                </Flex>
              </Flex>
            </Box>
          ),
        )}
      </Flex>
    </Box>
  );
}
