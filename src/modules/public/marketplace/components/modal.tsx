import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ModalType } from "../types/types";
import { TfiReload } from "react-icons/tfi";
import { MdCancel, MdScheduleSend } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

export default function ModalComponent({
  descricao,
  ferramenta,
  banner,
}: ModalType) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Text w={"100%"} onClick={onOpen}>
        Ver mais
      </Text>

      <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{ferramenta}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDir={"column"}
          >
            <Text>{descricao}</Text>
            <Image
              w={"350px"}
              src={banner}
              alt="banner marketplace mais valor"
            />
          </ModalBody>

          <ModalFooter gap={2} w={"100%"} display={"flex"} flexDir={"column"}>
            <Button
              alignItems={"center"}
              justifyContent={"space-between"}
              textTransform={"uppercase"}
              w={"100%"}
              colorScheme="green"
            >
              <Text>Renovar</Text>
              <TfiReload size={22} />
            </Button>
            <Button
              alignItems={"center"}
              justifyContent={"space-between"}
              textTransform={"uppercase"}
              w={"100%"}
              colorScheme="orange"
            >
              <Text>Solicitar</Text>
              <MdScheduleSend size={22} />
            </Button>
            <Button
              alignItems={"center"}
              justifyContent={"space-between"}
              textTransform={"uppercase"}
              w={"100%"}
              colorScheme="yellow"
            >
              <Text>Editar</Text>
              <RiEdit2Fill color="white" size={22} />
            </Button>
            <Button
              alignItems={"center"}
              justifyContent={"space-between"}
              textTransform={"uppercase"}
              w={"100%"}
              colorScheme="red"
            >
              <Text>Cancelar</Text>
              <MdCancel size={22} />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
