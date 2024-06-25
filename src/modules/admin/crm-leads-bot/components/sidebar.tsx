import { Key } from "react";
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
import { Contato } from "../types/types";

export default function SidebarComponent({
  detalhesLeads,
  filteredContatos,
  openDetailsLeads,
}: {
  detalhesLeads: Contato;
  filteredContatos: Contato[];
  openDetailsLeads: (contato: Contato) => void;
}) {
  const getElapsedMinutes = (lastUpdateTime: string) => {
    const [hours, minutes] = lastUpdateTime.split(":").map(Number);
    const lastUpdate = new Date();
    lastUpdate.setHours(hours, minutes, 0, 0);
    const now = new Date();
    return Math.floor((now.getTime() - lastUpdate.getTime()) / 60000);
  };

  const getColor = (elapsedMinutes: number) => {
    if (elapsedMinutes <= 15) {
      return "green";
    } else if (elapsedMinutes <= 30) {
      return "orange";
    } else {
      return "red";
    }
  };

  const sortedContatos = filteredContatos.sort((a, b) => {
    // Ordenar por status
    const statusOrder = ["NOVO", "CONTATO", "NEGOCIANDO", "FINALIZADO"];
    const aStatusIndex = statusOrder.indexOf(a.status);
    const bStatusIndex = statusOrder.indexOf(b.status);

    if (aStatusIndex !== bStatusIndex) {
      return aStatusIndex - bStatusIndex;
    }

    const aLastLog = a.logs[a.logs.length - 1];
    const bLastLog = b.logs[b.logs.length - 1];
    const aElapsed = getElapsedMinutes(aLastLog.data_atualizacao.slice(12, 18));
    const bElapsed = getElapsedMinutes(bLastLog.data_atualizacao.slice(12, 18));

    return bElapsed - aElapsed;
  });

  return (
    <Box
      pos={"absolute"}
      left={0}
      bottom={0}
      h={"91.5vh"}
      overflowY={"scroll"}
      flexDir={"column"}
      w={"25%"}
      boxShadow={"lg"}
    >
      <Flex position={"relative"} h={"100vh"} flexDir={"column"}>
        {sortedContatos.map((contato, index: Key | null | undefined) => {
          const lastLog = contato.logs[contato.logs.length - 1];
          const lastUpdateTime = lastLog.data_atualizacao.slice(12, 18);
          const elapsedMinutes = getElapsedMinutes(lastUpdateTime);
          const color = getColor(elapsedMinutes);

          return (
            <Box
              bg={contato.id === detalhesLeads.id ? "gray.100" : ""}
              onClick={() => {
                openDetailsLeads(contato);
              }}
              cursor={"pointer"}
              p={2}
              boxShadow={"lg"}
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
                <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
                  {contato.score === "FRIO" && (
                    <GiIceCube color="#44B3CF" size={22} />
                  )}
                  {contato.score === "MEDIO" && (
                    <FaTemperatureArrowUp color="#F4B61D" size={22} />
                  )}
                  {contato.score === "QUENTE" && (
                    <SiFireship color="#F44B1D" size={22} />
                  )}
                  <Flex
                    gap={1}
                    flexDir={"column"}
                    alignItems={"flex-end"}
                    justifyContent={"flex-end"}
                  >
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
                    {contato.status === "NOVO" ? (
                      <Badge variant="solid" bg={color}>
                        {lastUpdateTime}
                      </Badge>
                    ) : (
                      <Badge variant="solid">{lastUpdateTime}</Badge>
                    )}
                  </Flex>
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
          );
        })}
      </Flex>
    </Box>
  );
}
