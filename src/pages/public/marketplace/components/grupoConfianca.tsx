import {
  Button,
  Text,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useMobile } from "../../../../helpers/responsividade/useMediaQuery";
import { FcGoodDecision } from "react-icons/fc";

export default function GrupoConfiancaComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip
        placement="left"
        hasArrow
        label={"Criar/Editar grupos de permissões"}
      >
        <Button
          onClick={onOpen}
          _hover={{ backgroundColor: "gray.600", color: "white" }}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
        >
          <Text display={useMobile() ? "none" : ""}>Grupo de confiança</Text>
          <FcGoodDecision size={22} />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar/Criar grupos de usúarios</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="green">Salvar grupo</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
