import {
  Text,
  Flex,
  Divider,
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { BsInfoCircleFill } from "react-icons/bs";
import { formatDataHora, maskCPF } from "../../../../utils/mask/mascaras";
import DialogStatusComponent from "./dialogStatus";
import DialogObservacoesComponent from "./dialogObservacoes";
import OraculoComponent from "./oraculo/oraculo";
import { Key, useRef } from "react";
import FormAlterarLeadComponent from "./form-alterar-lead";

export default function InfosComponent({
  detalhesLeads,
  isNovo,
  telefone,
  email,
}: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  return (
    <Flex p={2} flexDir={"column"} w={"40%"} rounded={"2xl"} boxShadow={"lg"}>
      <Flex display={"none"} flexDir={"column"} mb={2} gap={1} w={"100%"}>
        <DialogStatusComponent detalhesLeads={detalhesLeads} />
        <DialogObservacoesComponent />
        <OraculoComponent />
      </Flex>

      <Flex mb={2} gap={1} w={"100%"}>
        <DialogStatusComponent detalhesLeads={detalhesLeads} />
        <OraculoComponent detalhesLeads={detalhesLeads} />
      </Flex>

      <Divider mb={2} />
      <Flex
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        gap={2}
      >
        <>
          <Button
            mt={-3}
            ref={btnRef}
            onClick={onOpen}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            w={"100%"}
            gap={4}
          >
            Mais Informações
            <BsInfoCircleFill color="#44B3CF" size={24} />
          </Button>
          <Drawer
            size={"lg"}
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent p={4}>
              <DrawerCloseButton />
              <DrawerHeader ml={-4}>Mais informações</DrawerHeader>
              {detalhesLeads?.display?.map(
                (props: any, index: Key | null | undefined) => (
                  <Flex
                    cursor={"not-allowed"}
                    _hover={{ bg: "#229544", color: "white" }}
                    p={2}
                    rounded={"2xl"}
                    boxShadow={"lg"}
                    flexDir={"column"}
                    alignItems={"flex-start"}
                    justifyContent={"flex-start"}
                    mt={2}
                    key={index}
                  >
                    <Text
                      mb={2}
                      textTransform={"uppercase"}
                      fontSize={18}
                      fontWeight={"bold"}
                    >
                      {props.label}
                    </Text>
                    <Text fontWeight="semibold">
                      {props.tipos === "data"
                        ? formatDataHora(props.campos)
                        : props.campos === null || props.campos === ""
                          ? "Nenhum valor para ser exibido"
                          : props.campos}
                    </Text>
                  </Flex>
                ),
              )}

              <DrawerBody></DrawerBody>
            </DrawerContent>
          </Drawer>
        </>

        <FormAlterarLeadComponent detalhesLeads={detalhesLeads} />
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
