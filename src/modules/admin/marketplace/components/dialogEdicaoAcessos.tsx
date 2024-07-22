import {
  Button,
  Image,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Flex,
  useToast,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import { CardTypeGrupo, UsuariosTypeStatus } from "../types/types";
import { useEffect, useState } from "react";
import { usePutSolicitacaoAdmins } from "../hooks/usePutSolicitacaoAdmins";

interface DialogUsuarioProps extends CardTypeGrupo {
  idFerramenta: number;
}

function DialogEdicaoUsuarioComponent({
  idAcesso,
  nome,
  isAdmin: isAdminProps,
  idFerramenta,
}: DialogUsuarioProps) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAdmin, setIsAdmin] = useState(isAdminProps);
  const { UseRequestSolicitacaoAdmins, isError, isLoading, isSuccess } =
    usePutSolicitacaoAdmins();

  const handleOpen = () => {
    onOpen();
  };

  const handleClose = () => {
    onClose();
  };

  function handleCheckbox() {
    setIsAdmin((is) => !is);
  }

  useEffect(() => {
    if (isLoading) {
      return () => {};
    }

    if (isSuccess) {
      toast({
        title: nome + " editado com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      handleClose();
    }

    if (isError) {
      toast({
        title: "Erro ao editar " + nome,
        description: "Você pode tentar novamente em breve",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      handleClose();
    }
  }, [isError, isLoading, isSuccess]);

  function salvar() {
    UseRequestSolicitacaoAdmins([
      {
        id_produto: idFerramenta,
        id_acesso: idAcesso,
        is_admin: isAdmin,
      },
    ]);
  }

  const switchId = "switch-edicao-admin-" + idAcesso;

  return (
    <>
      <Button onClick={handleOpen}>Editar</Button>
      <Modal size={"2xl"} isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar {nome}</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxH={"450px"} overflowY={"scroll"}>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor={switchId} mb="0">
                É Administrador do Produto?
              </FormLabel>
              <Switch
                colorScheme="green"
                id={switchId}
                defaultChecked={isAdmin}
                onChange={handleCheckbox}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleClose}>
              Cancelar
            </Button>
            <Button colorScheme="green" mr={3} onClick={salvar}>
              Salvar Alterações
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

interface Props {
  idFerramenta: number;
  filteredData: CardTypeGrupo[];
}

export default function DialogEdicaoAcessosComponent({
  idFerramenta,
  filteredData,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  const handleClose = () => {
    onClose();
  };

  const usuariosFiltrados = filteredData.filter(
    (usuario) => usuario.status === UsuariosTypeStatus.Liberado,
  );

  return (
    <>
      <Text onClick={handleOpen}>Editar Acessos</Text>

      <Modal size={"2xl"} isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Acessos</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxH={"450px"} overflowY={"scroll"}></ModalBody>

          {usuariosFiltrados.map((user) => (
            <Flex
              boxShadow={"lg"}
              p={2}
              rounded={"2xl"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              gap={2}
              key={user.idAcesso}
            >
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
                fontSize={14}
                fontWeight={"semibold"}
                flexGrow={"1"}
              >
                {user.nome}
              </Flex>
              <DialogEdicaoUsuarioComponent
                {...user}
                idFerramenta={idFerramenta}
              />
            </Flex>
          ))}
          {usuariosFiltrados.length === 0 && (
            <>
              <Text>Sem usuários para Editar</Text>
            </>
          )}
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
