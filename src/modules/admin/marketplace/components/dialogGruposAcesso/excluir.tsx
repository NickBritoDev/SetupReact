import { useRef } from "react";
import { IGruposAcesso } from "../../types/types";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useDeleteGrupoAcesso } from "../../hooks/useDeleteGruposAcesso";

type Props = IGruposAcesso;

export default function ExcluirComponent({ nome, id }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  const { useRequestDeleteGrupoAcesso } = useDeleteGrupoAcesso();

  const handleExcluir = () => {
    useRequestDeleteGrupoAcesso(id);
    onClose();
  };
  return (
    <>
      <Button colorScheme="red" mr="2" onClick={onOpen}>
        Excluir
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remover Grupo {nome}
            </AlertDialogHeader>

            <AlertDialogBody>
              Você tem certeza? Não é Possível desfazer após a exclusão.
            </AlertDialogBody>

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
    </>
  );
}
