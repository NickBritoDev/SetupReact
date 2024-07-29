import { FaInfoCircle, FaMinus } from "react-icons/fa";
import { IPermissao } from "../../types/types";
import {
  Box,
  Tooltip,
  Text,
  Button,
  useDisclosure,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialog,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDeletePermissaoGrupo } from "../../hooks/useDeletePermissaoGrupo";

type Props = IPermissao & { idGrupo: number };

export default function CardPermissaoComponent(permissao: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  const { useRequestDeletePermissaoGrupo } = useDeletePermissaoGrupo();

  const handleExcluir = () => {
    useRequestDeletePermissaoGrupo({
      chave: permissao.chave,
      idGrupo: permissao.idGrupo,
    });
    onClose();
  };

  return (
    <Box display={"flex"} gap="5">
      <Tooltip label={permissao.descricao} hasArrow>
        <Box display={"flex"} alignItems={"center"} gap="1" cursor={"help"}>
          <Text>{permissao.nome}</Text>
          <FaInfoCircle />
        </Box>
      </Tooltip>

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
              Remover {permissao.nome}?
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
    </Box>
  );
}
