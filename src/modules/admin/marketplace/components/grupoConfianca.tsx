import { useState } from "react";
import {
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Flex,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
  Checkbox,
} from "@chakra-ui/react";
import { UsuariosType } from "../types/types";

import { useGetUsuariosNivelSuperintendente } from "../hooks/useGetUsuariosNivelSuperintendente";
import { useGetUsuariosNivelGerente } from "../hooks/useGetUsuariosNivelGerente";
import { useGetUsuariosNivelSupervisor } from "../hooks/useGetUsuariosNivelSupervisor";
import { useGetUsuariosNivelParceiro } from "../hooks/useGetUsuariosNivelParceiro";

export default function GrupoConfiancaComponent({ idFerramenta }: any) {
  console.log(idFerramenta);
  const [avancarEscolhas, setAvancarEscolhas] = useState("gerentes");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nomeGerente, setNomeGerente] = useState(null);
  const [perfilGerente, setPerfilGerente] = useState(null);

  const [nomeSupervisor, setNomeSupervisor] = useState(null);
  const [perfilSupervisor, setPerfilSupervisor] = useState(null);

  const [cnpjParceiro, setCnpjParceiro] = useState(null);

  const { data: gerentes } = useGetUsuariosNivelSuperintendente();

  const { data: supervisores } = useGetUsuariosNivelGerente({
    perfil: perfilGerente,
    nome: nomeGerente,
  });

  const { data: parceiros } = useGetUsuariosNivelSupervisor({
    perfil: perfilSupervisor,
    nome: nomeSupervisor,
  });

  const { data: sub_acesso } = useGetUsuariosNivelParceiro({
    cnpj_matriz: cnpjParceiro,
  });

  const buscaSupervisoresDoGerenteSelecionado = (user: any) => {
    setNomeGerente(user.nome);
    setPerfilGerente(user.perfil);
    setAvancarEscolhas("supervisores");
  };

  const buscaParceirosDoSupervisorSelecionado = (user: any) => {
    setNomeSupervisor(user.nome);
    setPerfilSupervisor(user.perfil);
    setAvancarEscolhas("parceiros");
  };

  const buscaSubAcessoDoParceiroSelecionado = (user: any) => {
    setCnpjParceiro(user.cnpj_matriz);
    setAvancarEscolhas("sub_acessos");
  };

  return (
    <>
      <Text onClick={onOpen}>Solicitar acessos</Text>

      <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar grupos de usuários</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxH={"450px"} overflowY={"scroll"}>
            <Button
              width={"100%"}
              display={avancarEscolhas === "supervisores" ? "" : "none"}
              onClick={() => {
                setAvancarEscolhas("gerentes");
              }}
              bg={"gray.200"}
            >
              Voltar
            </Button>
            <Button
              width={"100%"}
              display={avancarEscolhas === "parceiros" ? "" : "none"}
              onClick={() => {
                setAvancarEscolhas("supervisores");
              }}
              bg={"gray.200"}
            >
              Voltar
            </Button>
            <Button
              width={"100%"}
              display={avancarEscolhas === "sub_acessos" ? "" : "none"}
              onClick={() => {
                setAvancarEscolhas("parceiros");
              }}
              bg={"gray.200"}
            >
              Voltar
            </Button>

            {avancarEscolhas === "gerentes" &&
              gerentes?.map((user: UsuariosType) => (
                <Flex
                  cursor={"pointer"}
                  onClick={() => buscaSupervisoresDoGerenteSelecionado(user)}
                  boxShadow={"lg"}
                  p={2}
                  rounded={"2xl"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={2}
                  key={user.id_acesso}
                >
                  <Image
                    ml={2}
                    w={30}
                    h={30}
                    borderRadius={"50%"}
                    src={`https://appbancos.s3.amazonaws.com/${user.foto}`}
                  />
                  <Flex
                    flexDir={"column"}
                    alignItems={"flex-start"}
                    justifyContent={"center"}
                  >
                    <Text fontSize={14} fontWeight={"semibold"}>
                      <strong>NOME: </strong>
                      {user.nome}
                    </Text>
                    <Text fontSize={14} fontWeight={"semibold"}>
                      <strong>PERFIL: </strong>
                      {user.perfil}
                    </Text>
                  </Flex>
                </Flex>
              ))}

            {avancarEscolhas === "supervisores" &&
              supervisores?.map((user: UsuariosType) => (
                <Flex
                  cursor={"pointer"}
                  onClick={() => buscaParceirosDoSupervisorSelecionado(user)}
                  boxShadow={"lg"}
                  p={2}
                  rounded={"2xl"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={2}
                  key={user.id_acesso}
                >
                  <Image
                    ml={2}
                    w={30}
                    h={30}
                    borderRadius={"50%"}
                    src={`https://appbancos.s3.amazonaws.com/${user.foto}`}
                  />
                  <Flex
                    flexDir={"column"}
                    alignItems={"flex-start"}
                    justifyContent={"center"}
                  >
                    <Text fontSize={14} fontWeight={"semibold"}>
                      <strong>NOME: </strong>
                      {user.nome}
                    </Text>
                    <Text fontSize={14} fontWeight={"semibold"}>
                      <strong>PERFIL: </strong>
                      {user.perfil}
                    </Text>
                  </Flex>
                </Flex>
              ))}

            {avancarEscolhas === "parceiros" &&
              parceiros?.map((user: UsuariosType) => (
                <Flex
                  cursor={"pointer"}
                  onClick={() => buscaSubAcessoDoParceiroSelecionado(user)}
                  boxShadow={"lg"}
                  p={2}
                  rounded={"2xl"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={2}
                  key={user.id_acesso}
                >
                  <Image
                    ml={2}
                    w={30}
                    h={30}
                    borderRadius={"50%"}
                    src={`https://appbancos.s3.amazonaws.com/${user.foto}`}
                  />
                  <Flex
                    flexDir={"column"}
                    alignItems={"flex-start"}
                    justifyContent={"center"}
                  >
                    <Text fontSize={14} fontWeight={"semibold"}>
                      <strong>NOME: </strong>
                      {user.nome}
                    </Text>
                    <Text fontSize={14} fontWeight={"semibold"}>
                      <strong>PERFIL: </strong>
                      {user.perfil}
                    </Text>
                  </Flex>
                </Flex>
              ))}

            {avancarEscolhas === "sub_acessos" &&
              sub_acesso?.map((user: UsuariosType) => (
                <Flex
                  cursor={"pointer"}
                  boxShadow={"lg"}
                  p={2}
                  rounded={"2xl"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={2}
                  key={user.id_acesso}
                >
                  <Checkbox
                    rounded={"md"}
                    border={"solid 0px black"}
                    colorScheme="green"
                  />
                  <Image
                    ml={2}
                    w={30}
                    h={30}
                    borderRadius={"50%"}
                    src={`https://appbancos.s3.amazonaws.com/${user.foto}`}
                  />
                  <Flex
                    flexDir={"column"}
                    alignItems={"flex-start"}
                    justifyContent={"center"}
                  >
                    <Text fontSize={14} fontWeight={"semibold"}>
                      <strong>NOME: </strong>
                      {user.nome}
                    </Text>
                    <Text fontSize={14} fontWeight={"semibold"}>
                      <strong>PERFIL: </strong>
                      {user.perfil}
                    </Text>
                  </Flex>
                </Flex>
              ))}
          </ModalBody>
          <ModalFooter
            display={avancarEscolhas === "sub_acessos" ? "flex" : "none"}
          >
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="green">Selecionar ferramenta</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
