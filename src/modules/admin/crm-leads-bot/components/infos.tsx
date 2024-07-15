import { Text, Flex, Heading, Divider } from "@chakra-ui/react";
import { BsInfoCircleFill } from "react-icons/bs";
import { maskCPF } from "../../../../utils/mask/mascaras";
import DialogStatusComponent from "./dialogStatus";
import DialogObservacoesComponent from "./dialogObservacoes";

export default function InfosComponent({
  detalhesLeads,
  isNovo,
  telefone,
  email,
}: any) {
  return (
    <Flex p={2} flexDir={"column"} w={"40%"} rounded={"2xl"} boxShadow={"lg"}>
      <Flex display={"none"} flexDir={"column"} mb={2} gap={1} w={"100%"}>
        <DialogStatusComponent detalhesLeads={detalhesLeads} />
        <DialogObservacoesComponent />
      </Flex>

      <Flex flexDir={"column"} mb={2} gap={1} w={"100%"}>
        <DialogStatusComponent detalhesLeads={detalhesLeads} />
      </Flex>

      <Divider mb={2} />
      <Flex alignItems={"center"} justifyContent={"flex-start"} gap={2}>
        <BsInfoCircleFill color="#44B3CF" size={24} />
        <Heading mt={-0.5} size={"md"}>
          MAIS INFORMAÇÕES
        </Heading>
      </Flex>
      <Divider mt={2} />
      <Text
        mt={4}
        mb={2}
        boxShadow={"md"}
        p={2}
        rounded={"xl"}
        fontWeight={"semibold"}
      >
        <strong>Nome</strong> <br />
        {detalhesLeads?.nome}
      </Text>
      <Text
        mb={2}
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
        mb={2}
        boxShadow={"md"}
        p={2}
        rounded={"xl"}
        fontWeight={"semibold"}
      >
        <strong>CPF</strong> <br />
        {maskCPF(detalhesLeads?.cpf)}
      </Text>
      <Text
        mb={2}
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
        mb={2}
        boxShadow={"md"}
        p={2}
        rounded={"xl"}
        fontWeight={"semibold"}
      >
        <strong>Produto</strong> <br />
        {detalhesLeads?.produto}
      </Text>
      <Text boxShadow={"md"} p={2} rounded={"xl"} fontWeight={"semibold"}>
        <strong>Origem</strong> <br />
        {detalhesLeads?.origem}
      </Text>
    </Flex>
  );
}
