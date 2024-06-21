import {
  Button,
  Text,
  Flex,
  Image,
  Heading,
  Tooltip,
  Divider,
  Badge,
} from "@chakra-ui/react";
import { LuPhoneOutgoing } from "react-icons/lu";
import { TfiEmail } from "react-icons/tfi";
import { SiWhatsapp } from "react-icons/si";
import { BsInfoCircleFill } from "react-icons/bs";
import { maskCPF, maskPhone } from "../../../../utils/mask/mascaras";
import { ReactNode } from "react";

export default function InteracaoComponent({ user, detalhesLeads }: any) {
  const isNovo = detalhesLeads.status === "NOVO";
  const telefone = isNovo
    ? "(**) *********"
    : maskPhone(detalhesLeads.telefone);
  const email = isNovo ? "email@exemple.com" : detalhesLeads.email;

  return (
    <Flex gap={10} w={"100%"}>
      <Flex
        w={"60%"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Image w={"150px"} src={user} alt="foto do usuario card" />
        <Heading mt={-4}>{detalhesLeads.nome}</Heading>
        <Text
          sx={isNovo ? { filter: "blur(5px)" } : {}}
          fontWeight={"semibold"}
        >
          {email}
        </Text>

        <Flex gap={6} mt={4}>
          <Tooltip hasArrow placement="bottom" label="Ir para discadora">
            <Button
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={2}
            >
              <Text>Discadora</Text>
              <LuPhoneOutgoing size={22} />
            </Button>
          </Tooltip>

          <Tooltip hasArrow placement="bottom" label="Ir para o email">
            <Button
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={2}
            >
              <Text>Email</Text>
              <TfiEmail size={22} />
            </Button>
          </Tooltip>

          <Tooltip hasArrow placement="bottom" label="Ir para o whatsapp">
            <Button
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={2}
            >
              <Text>WhatsApp</Text>
              <SiWhatsapp size={22} />
            </Button>
          </Tooltip>
        </Flex>

        <Flex
          gap={2}
          rounded={"xl"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          flexDir={"column"}
          bg={"gray.100"}
          w={"100%"}
          mt={6}
          ml={10}
          p={2}
          maxH={"300px"}
          overflowY={"scroll"}
        >
          {detalhesLeads?.logs?.map(
            (log: {
              data_atualizacao: any;
              status: ReactNode;
              responsavel: ReactNode;
            }) => (
              <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                w={"100%"}
                key={log.data_atualizacao}
                gap={4}
                bg={"white"}
                p={2}
                rounded={"xl"}
                boxShadow={"lg"}
              >
                <Text w={"100%"}>
                  <strong>Responsavel</strong> <br />
                  {log.responsavel}
                </Text>
                <Text w={"100%"} textAlign={"center"}>
                  <strong>Data</strong> <br />
                  {log.data_atualizacao}
                </Text>
                <Text w={"100%"} textAlign={"right"}>
                  <strong>Status</strong> <br />
                  <Badge
                    variant={"solid"}
                    bg={
                      log.status === "NOVO"
                        ? "#44B3CF"
                        : log.status === "CONTATO"
                          ? "#F4B61D"
                          : log.status === "NEGOCIANDO"
                            ? "#F44B1D"
                            : log.status === "FINALIZADO"
                              ? "#229544"
                              : "black"
                    }
                  >
                    {log.status}
                  </Badge>
                </Text>
              </Flex>
            ),
          )}
        </Flex>
      </Flex>

      <Flex p={2} flexDir={"column"} w={"40%"} borderLeft={"solid 1px gray"}>
        <Flex alignItems={"center"} justifyContent={"flex-start"} gap={2}>
          <BsInfoCircleFill color="#44B3CF" size={24} />
          <Heading mt={-0.5} size={"md"}>
            MAIS INFORMAÇÕES
          </Heading>
        </Flex>
        <Divider mt={2} />
        <Text
          mt={4}
          mb={4}
          boxShadow={"md"}
          p={2}
          rounded={"xl"}
          fontWeight={"semibold"}
        >
          <strong>Nome</strong> <br />
          {detalhesLeads.nome}
        </Text>
        <Text
          mb={4}
          display={"flex"}
          flexDir={"column"}
          boxShadow="md"
          p={2}
          rounded="xl"
          fontWeight="semibold"
        >
          <strong>Email</strong>
          <Text sx={isNovo ? { filter: "blur(5px)" } : {}}>{email}</Text>
        </Text>
        <Text
          mb={4}
          boxShadow={"md"}
          p={2}
          rounded={"xl"}
          fontWeight={"semibold"}
        >
          <strong>CPF</strong> <br />
          {maskCPF(detalhesLeads.cpf)}
        </Text>
        <Text
          mb={4}
          display={"flex"}
          flexDir={"column"}
          boxShadow="md"
          p={2}
          rounded="xl"
          fontWeight="semibold"
        >
          <strong>Telefone</strong>
          <Text sx={isNovo ? { filter: "blur(5px)" } : {}}>{telefone}</Text>
        </Text>
        <Text
          mb={4}
          boxShadow={"md"}
          p={2}
          rounded={"xl"}
          fontWeight={"semibold"}
        >
          <strong>Produto</strong> <br />
          {detalhesLeads.produto}
        </Text>
        <Text boxShadow={"md"} p={2} rounded={"xl"} fontWeight={"semibold"}>
          <strong>Origem</strong> <br />
          {detalhesLeads.origem}
        </Text>
      </Flex>
    </Flex>
  );
}
