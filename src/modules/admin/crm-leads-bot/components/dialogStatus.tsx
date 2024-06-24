import { useRef } from "react";
import { Button, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { PiFlowArrowDuotone } from "react-icons/pi";

export default function DialogStatusComponent({ detalhesLeads }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  return (
    <>
      <Tooltip hasArrow placement="left" label="Alterar etapa do lead">
        <Button
          onClick={onOpen}
          colorScheme="blue"
          w={"100%"}
          display={detalhesLeads.status !== "FINALIZADO" ? "flex" : "none"}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={2}
        >
          <Text>Alterar Status</Text>
          <PiFlowArrowDuotone size={22} />
        </Button>
      </Tooltip>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Alteração de status
            </AlertDialogHeader>

            <AlertDialogBody fontWeight={"semibold"} fontSize={18}>
              Você realmente deseja mudar o status?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="red" ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="green" onClick={onClose} ml={3}>
                Sim, alterar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
