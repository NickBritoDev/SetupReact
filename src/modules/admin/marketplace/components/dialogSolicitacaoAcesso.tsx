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
import { UsuariosType } from "../types/types";
import { usePostSolicitacaoAcesso } from "../hooks/usePostSolicitacaoAcesso";

export default function DialogSolicitacaoAcessoComponent({
  idFerramenta,
  idPromotora,
  filteredData,
}: any) {
  const toast = useToast();
  const { UseRequestSolicitacaoAcesso, isSuccess, isError } =
    usePostSolicitacaoAcesso();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const payload = selectedIds.map((idAcesso) => ({
    idAcesso,
    idProduto: idFerramenta,
    idPromotora,
  }));

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Solicitação criada com sucesso",
        description: "Em breve sua solicitação sera respondida",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }

    if (isError) {
      toast({
        title: "Erro ao criar solicitação",
        description: "Você pode tentar novamente em breve",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [isSuccess, isError]);

  const handleCheckboxChange = (idAcesso: number) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds?.includes(idAcesso)
        ? prevSelectedIds.filter((id) => id !== idAcesso)
        : [...prevSelectedIds, idAcesso],
    );
  };

  const handleOpen = () => {
    onOpen();
  };

  const handleClose = () => {
    onClose();
  };

  const listaUsuarios = filteredData
    .filter(
      (user: UsuariosType) =>
        !["Pendente", "Liberado", "Bloqueado"]?.includes(user.status),
    )
    .reduce((unique: UsuariosType[], user: UsuariosType) => {
      if (!unique.some((u) => u.idAcesso === user.idAcesso)) {
        unique.push(user);
      }
      return unique;
    }, []);

  return (
    <>
      <Text flexGrow={"1"} p="6px 12px" onClick={handleOpen}>
        Solicitar acessos
      </Text>

      <Modal size={"2xl"} isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Solicitar Acessos</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxH={"450px"} overflowY={"scroll"}>
            {listaUsuarios.map((user: UsuariosType) => (
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
                <Text>Sem usuários para Solicitação</Text>
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
                  UseRequestSolicitacaoAcesso({ payload });
                  handleClose();
                }}
                colorScheme="green"
              >
                Finalizar solicitação
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
