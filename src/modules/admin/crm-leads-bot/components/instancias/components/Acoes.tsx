import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Tooltip,
  Text,
  Flex,
} from "@chakra-ui/react";
import { MdSettings } from "react-icons/md";
import { VscDebugStart } from "react-icons/vsc";
import { IoQrCode } from "react-icons/io5";
import { useStartInstancia } from "./hooks/useStartInstancia";
import ScannerQRCode from "./ScannerQRCode";
import TesteConexaoInstancia from "./TesteConexaoInstancia";
import { TbPlugConnected } from "react-icons/tb";
import { useState } from "react";

export default function Acoes({ instancia }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { UseRequestStartInstancia } = useStartInstancia();
  const [liberadoBuscarQrCode, setLiberadoBuscarQrCode] = useState(false);

  const cancelarAsBuscar = () => {
    onClose();
    setLiberadoBuscarQrCode(false);
  };

  return (
    <>
      <Tooltip hasArrow label="Gerenciar Instância" placement="left-start">
        <Button onClick={onOpen}>
          <MdSettings />
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={cancelarAsBuscar}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            mt={4}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text textTransform={"uppercase"}>
              {instancia?.replaceAll("-", " ")}
            </Text>
          </ModalHeader>
          <ModalCloseButton onClick={cancelarAsBuscar} />
          <ModalBody>
            <Flex alignItems={"center"} justifyContent={"flex-start"} gap={2}>
              <VscDebugStart size={22} />
              <Text>Você pode iniciar a instância</Text>
            </Flex>
            <Flex
              alignItems={"center"}
              justifyContent={"flex-start"}
              gap={2}
              ml={1}
            >
              <IoQrCode size={18} />
              <Text>Você pode escanear o QR-CODE da instância</Text>
            </Flex>
            <Flex alignItems={"center"} justifyContent={"flex-start"} gap={2}>
              <TbPlugConnected size={22} />
              <Text>Você pode testar o disparo com a instância</Text>
            </Flex>
          </ModalBody>

          <ModalFooter gap={4}>
            <Tooltip
              hasArrow
              label="Iniciar Instância"
              bg="green"
              placement="top"
            >
              <Button
                colorScheme="green"
                onClick={() => {
                  setLiberadoBuscarQrCode(true);
                  UseRequestStartInstancia({ instance: instancia });
                }}
              >
                <VscDebugStart />
              </Button>
            </Tooltip>
            <ScannerQRCode
              setLiberadoBuscarQrCode={setLiberadoBuscarQrCode}
              liberadoBuscarQrCode={liberadoBuscarQrCode}
              instancia={instancia}
            />
            <TesteConexaoInstancia instancia={instancia} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
