import { useState } from "react";
import { Key } from "react";
import { Text, Flex, Box, Badge, Input } from "@chakra-ui/react";
import { SiFireship } from "react-icons/si";
import { GiIceCube } from "react-icons/gi";
import { Contato } from "../types/types";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { formatDataHora } from "../../../../utils/mask/mascaras";
import { FcClock, FcGenealogy, FcNeutralTrading, FcVlc } from "react-icons/fc";
import { useGetLeads } from "../hooks/useGetLeads";
import { BsFillPinAngleFill } from "react-icons/bs";

export default function SidebarComponent({
  payload,
  detalhesLeads,
  openDetailsLeads,
}: {
  payload: any;
  detalhesLeads: any;
  openDetailsLeads: (contato: Contato) => void;
}) {
  const { data: contatos } = useGetLeads(payload);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [fixedCard, setFixedCard] = useState<Contato | null>(null);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleCardClick = (contato: Contato) => {
    setFixedCard(contato);
    openDetailsLeads(contato);
  };

  return (
    <Box
      bg={"white"}
      overflowX={"hidden"}
      pos={"absolute"}
      left={0}
      bottom={0}
      h={"92.5vh"}
      overflowY={"scroll"}
      flexDir={"column"}
      w={"25%"}
      boxShadow={"lg"}
    >
      <Box zIndex={9} w={"350px"} bg={"white"} pos={"relative"} p={1}>
        <Input
          top={1}
          left={182}
          boxShadow={"md"}
          bg={"white"}
          w={"340px"}
          pos={"fixed"}
          _placeholder={{ color: "#229544" }}
          placeholder="Buscar lead..."
          value={searchTerm}
          onChange={handleSearchInputChange}
          outline={"none"}
        />
      </Box>
      <Flex position={"relative"} h={"100vh"} flexDir={"column"}>
        {contatos?.length <= 0 && (
          <Text mx={"auto"} mt={2} fontWeight={"semibold"}>
            😅 Nenhum lead até o momento...
          </Text>
        )}

        {fixedCard && (
          <Box
            bg={"gray.100"}
            onClick={() => setFixedCard(null)}
            cursor={"pointer"}
            p={2}
            boxShadow={"lg"}
            pos={"sticky"}
            top={0}
            zIndex={10}
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
                pr={2}
                pl={2}
                gap={2}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Box boxShadow={"lg"} ml={-1.5} borderRadius={"50%"} p={2}>
                  {fixedCard.score === "Frio" && (
                    <GiIceCube color="#44B3CF" size={22} />
                  )}
                  {fixedCard.score === "Médio" && (
                    <FaTemperatureArrowUp color="#F4B61D" size={22} />
                  )}
                  {fixedCard.score === "Quente" && (
                    <SiFireship color="#F44B1D" size={22} />
                  )}
                </Box>
                <Text
                  fontSize={14}
                  fontWeight="semibold"
                  isTruncated
                  maxW="150px"
                >
                  {fixedCard.nome}
                </Text>
              </Flex>
              <Flex
                flexDir={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={2}
              >
                <Flex
                  pos={"relative"}
                  gap={1}
                  flexDir={"column"}
                  alignItems={"flex-end"}
                  justifyContent={"flex-end"}
                >
                  <Box pos={"absolute"} top={-1} right={0}>
                    <BsFillPinAngleFill color="gray" size={22} />
                  </Box>
                  <Flex
                    mt={4}
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                  >
                    <FcClock size={18} />
                    <Text fontSize={14} fontWeight={"semibold"}>
                      {formatDataHora(
                        fixedCard.logs[0]?.data_atualizacao,
                      ).slice(0, 6)}
                    </Text>
                    <Text
                      justifyContent={"center"}
                      alignItems={"center"}
                      textAlign={"center"}
                      w={"20px"}
                      h={"20px"}
                      ml={2}
                      fontSize={14}
                      bg={"red"}
                      px={1}
                      borderRadius={"50%"}
                      color={"white"}
                      display={fixedCard?.notificacao > 0 ? "flex" : "none"}
                    >
                      {fixedCard?.notificacao}
                    </Text>
                  </Flex>
                  <Badge
                    variant={"solid"}
                    bg={
                      fixedCard.status === "Novo"
                        ? "#44B3CF"
                        : fixedCard.status === "Pendente"
                          ? "#F4B61D"
                          : fixedCard.status === "Em Aberto"
                            ? "#F44B1D"
                            : fixedCard.status === "Concluído"
                              ? "#229544"
                              : "black"
                    }
                  >
                    {fixedCard.status}
                  </Badge>
                </Flex>
              </Flex>
            </Flex>
            <Flex
              flexDir={"column"}
              alignItems={"flex-start"}
              justifyContent={"flex-start"}
            >
              <Flex alignItems={"center"} justifyContent={"flex-start"} gap={1}>
                <FcVlc size={18} />
                <Text fontSize={14} fontWeight={"semibold"}>
                  {fixedCard.produto}
                </Text>
              </Flex>
              <Flex
                mt={-1}
                alignItems={"center"}
                justifyContent={"flex-start"}
                gap={1}
              >
                <FcNeutralTrading size={18} />
                <Text fontSize={14} fontWeight={"semibold"}>
                  {fixedCard.origem}
                </Text>
              </Flex>
              <Flex
                mt={-1}
                alignItems={"center"}
                justifyContent={"flex-start"}
                gap={1}
              >
                <FcGenealogy size={18} />
                <Text fontSize={14} fontWeight={"semibold"}>
                  {fixedCard.substatus}
                </Text>
              </Flex>
            </Flex>
          </Box>
        )}

        {contatos?.map((contato: Contato, index: Key | null | undefined) => {
          if (fixedCard?.idLead === contato.idLead) {
            return null; // Skip rendering the fixed card in the list
          }
          return (
            <Box
              bg={contato.idLead === detalhesLeads?.idLead ? "gray.100" : ""}
              onClick={() => handleCardClick(contato)}
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
                  pr={2}
                  pl={2}
                  gap={2}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Box boxShadow={"lg"} ml={-1.5} borderRadius={"50%"} p={2}>
                    {contato.score === "Frio" && (
                      <GiIceCube color="#44B3CF" size={22} />
                    )}
                    {contato.score === "Médio" && (
                      <FaTemperatureArrowUp color="#F4B61D" size={22} />
                    )}
                    {contato.score === "Quente" && (
                      <SiFireship color="#F44B1D" size={22} />
                    )}
                  </Box>
                  <Text
                    fontSize={14}
                    fontWeight="semibold"
                    isTruncated
                    maxW="150px"
                  >
                    {contato.nome}
                  </Text>
                </Flex>
                <Flex
                  flexDir={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={2}
                >
                  <Flex
                    gap={1}
                    flexDir={"column"}
                    alignItems={"flex-end"}
                    justifyContent={"flex-end"}
                  >
                    <Flex
                      mt={4}
                      alignItems={"center"}
                      justifyContent={"flex-start"}
                    >
                      <FcClock size={18} />
                      <Text fontSize={14} fontWeight={"semibold"}>
                        {formatDataHora(
                          contato.logs[0]?.data_atualizacao,
                        ).slice(0, 6)}
                      </Text>
                      <Text
                        justifyContent={"center"}
                        alignItems={"center"}
                        textAlign={"center"}
                        w={"20px"}
                        h={"20px"}
                        ml={2}
                        fontSize={14}
                        bg={"red"}
                        px={1}
                        borderRadius={"50%"}
                        color={"white"}
                        display={contato?.notificacao === 0 ? "none" : ""}
                      >
                        {contato?.notificacao}
                      </Text>
                    </Flex>
                    <Badge
                      variant={"solid"}
                      bg={
                        contato.status === "Novo"
                          ? "#44B3CF"
                          : contato.status === "Pendente"
                            ? "#F4B61D"
                            : contato.status === "Em Aberto"
                              ? "#F44B1D"
                              : contato.status === "Concluído"
                                ? "#229544"
                                : "black"
                      }
                    >
                      {contato.status}
                    </Badge>
                  </Flex>
                </Flex>
              </Flex>
              <Flex
                flexDir={"column"}
                alignItems={"flex-start"}
                justifyContent={"flex-start"}
              >
                <Flex
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={1}
                >
                  <FcVlc size={18} />
                  <Text fontSize={14} fontWeight={"semibold"}>
                    {contato.produto}
                  </Text>
                </Flex>
                <Flex
                  mt={-1}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={1}
                >
                  <FcNeutralTrading size={18} />
                  <Text fontSize={14} fontWeight={"semibold"}>
                    {contato.origem}
                  </Text>
                </Flex>
                <Flex
                  mt={-1}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={1}
                >
                  <FcGenealogy size={18} />
                  <Text fontSize={14} fontWeight={"semibold"}>
                    {contato.substatus}
                  </Text>
                </Flex>
              </Flex>
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
}
