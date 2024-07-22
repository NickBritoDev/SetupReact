import {
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Image,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  BodyPutSolicitacaoAcesso,
  CardTypeGrupo,
  UsuariosTypeStatus,
} from "../types/types";
import { usePutSolicitacaoAcesso } from "../hooks/usePutSolicitacaoAcesso";

interface Props {
  idFerramenta: number;
  filteredData: CardTypeGrupo[];
}
export default function DialogSolicitacaoRenovacaoComponent({
  idFerramenta,
  filteredData,
}: Props) {
  const toast = useToast();
  const { UseRequestSolicitacaoAcesso, isSuccess, isError } =
    usePutSolicitacaoAcesso();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const handleCheckboxChange = (idAcesso: number) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(idAcesso)
        ? prevSelectedIds.filter((id) => id !== idAcesso)
        : [...prevSelectedIds, idAcesso],
    );
  };

  const payload: BodyPutSolicitacaoAcesso[] = selectedIds.map((idAcesso) => ({
    id_acesso: idAcesso,
    id_produto: idFerramenta,
    status: "Pendente",
  }));

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Renovação solicitada com sucesso!",
        description: "Em breve sua solicitação será respondida",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }

    if (isError) {
      toast({
        title: "Erro ao criar solicitação de renovação",
        description: "Você pode tentar novamente em breve",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [isSuccess, isError]);

  const handleOpen = () => {
    onOpen();
  };

  const handleClose = () => {
    onClose();
  };

  const statusLiberacao = [
    UsuariosTypeStatus.Expirado,
    UsuariosTypeStatus.Bloqueado,
  ];

  const listaUsuarios = filteredData
    .filter((user) => statusLiberacao.includes(user.status))
    .reduce((unique: CardTypeGrupo[], user) => {
      if (!unique.some((u) => u.idAcesso === user.idAcesso)) {
        unique.push(user);
      }
      return unique;
    }, []);

  return (
    <>
      <Text onClick={handleOpen}>Solicitar Renovação</Text>

      <Modal size={"2xl"} isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Selecionar Usuários</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxH={"450px"} overflowY={"scroll"}>
            {listaUsuarios.map((user) => (
              <Flex
                boxShadow={"lg"}
                p={2}
                rounded={"2xl"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                gap={2}
                key={user.idAcesso}
              >
                <Checkbox
                  rounded={"md"}
                  border={"solid 0px black"}
                  colorScheme="green"
                  onChange={() => handleCheckboxChange(user.idAcesso)}
                />
                <Image
                  ml={2}
                  w={30}
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
                </Flex>
              </Flex>
            ))}

            {listaUsuarios.length === 0 && (
              <>
                <Text>Sem usuários para Renovação</Text>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleClose}>
              Cancelar
            </Button>
            {listaUsuarios.length > 0 && (
              <Button
                onClick={() => {
                  UseRequestSolicitacaoAcesso(payload);
                  handleClose();
                }}
                colorScheme="green"
              >
                Enviar solicitação
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
