import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

type Props = {
  idPromotora: number;
  idProduto: number;
};

export default function CadastroComponent({}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Button colorScheme="green" mb="3" onClick={handleOpen}>
        Cadastrar Grupo
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastrar Grupo</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY={"scroll"}></ModalBody>
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
