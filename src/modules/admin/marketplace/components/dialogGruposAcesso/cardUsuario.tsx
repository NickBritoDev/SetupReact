import {
  Avatar,
  Flex,
  Text,
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { IUsuarioGrupoAcesso } from "../../types/types";
import { FaMinus } from "react-icons/fa";
import { useRef } from "react";
import { useDeleteUsuarioGrupo } from "../../hooks/useDeleteUsuarioGrupo";

type Props = IUsuarioGrupoAcesso & { idGrupo: number };

export default function CardUsuarioComponent(usuario: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  const foto = "https://appbancos.s3.amazonaws.com/" + usuario.foto;
  const { useRequestDeleteUsuarioGrupo } = useDeleteUsuarioGrupo();

  const handleExcluir = () => {
    useRequestDeleteUsuarioGrupo({
      idAcesso: usuario.id_acesso,
      idGrupo: usuario.idGrupo,
    });
    onClose();
  };

  return (
    <Flex
      border={"1px solid gray"}
      rounded={"13px"}
      key={usuario.id_acesso}
      p={"3"}
      alignItems={"center"}
      gap="2"
    >
      <Avatar size="sm" name={usuario.nome} src={foto} />
      <Text>{usuario.nome}</Text>
      <Button
        rounded="full"
        colorScheme="red"
        size={"xs"}
        cursor={"pointer"}
        onClick={onOpen}
      >
        <FaMinus size="8" />
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remover {usuario.nome}?
            </AlertDialogHeader>

            <AlertDialogBody>Você tem certeza?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleExcluir} ml={3}>
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
}
