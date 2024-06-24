import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import { LuBookPlus } from "react-icons/lu";

export default function AgendaComponent({ detalhesLeads }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip hasArrow placement="top" label="Marcar retorno">
        <Button
          onClick={onOpen}
          display={detalhesLeads.status !== "FINALIZADO" ? "flex" : "none"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
        >
          <Text>Agenda</Text>
          <LuBookPlus size={22} />
        </Button>
      </Tooltip>

      <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agenda - {detalhesLeads.nome}</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button colorScheme="green">Adicionar evento</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
