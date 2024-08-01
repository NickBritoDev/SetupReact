import { useEffect, useRef } from "react";
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

type Props = IGruposAcesso & { refetch: () => void };

export default function ExcluirComponent({ nome, id, ativo, refetch }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  const { useRequestDeleteGrupoAcesso, isLoading, isSuccess } =
    useDeleteGrupoAcesso();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      refetch();
    }
  }, [isLoading, isSuccess]);

  const handleExcluir = () => {
    useRequestDeleteGrupoAcesso({ idGrupo: id, forceDelete: !ativo });
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
              Você tem certeza?{" "}
              {ativo
                ? "Você pode Ativar o Grupo mais tarde."
                : "Não é Possível desfazer após a exclusão"}
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
