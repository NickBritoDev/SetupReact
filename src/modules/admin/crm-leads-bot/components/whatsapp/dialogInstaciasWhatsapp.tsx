import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import Instancias from "../instancias";

export default function DialogInstaciasWhatsappComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip hasArrow placement="left" label="Configurar instancias">
        <Button ml={2} onClick={onOpen}>
          <MdOutlineSettingsSuggest size={52} />
        </Button>
      </Tooltip>

      <Modal size={"6xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody py={10}>
            <Instancias />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
