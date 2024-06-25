import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  Text,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useRef } from "react";

export default function DialogAgendaComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  return (
    <>
      <Button colorScheme="green" onClick={onOpen}>
        Adcionar evento
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Criação de agendamento
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text fontWeight={"semibold"}>Data de agendamento</Text>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
              />

              <Text fontWeight={"semibold"} mt={4}>
                Motivo do agendamento
              </Text>
              <Textarea />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="red" ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="green" onClick={onClose} ml={3}>
                Salvar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
