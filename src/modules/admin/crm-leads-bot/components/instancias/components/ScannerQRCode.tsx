import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Tooltip,
  Image,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { IoQrCode } from "react-icons/io5";
import { useScannerQrCode } from "./hooks/useScannerQrCode";

export default function ScannerQRCode({
  instancia,
  liberadoBuscarQrCode,
  setLiberadoBuscarQrCode,
}: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { UseRequestScannerQrCode, qrCodeData, isSuccess } = useScannerQrCode();

  const buscarQrCode = () => {
    onOpen();
    UseRequestScannerQrCode({ instance: instancia });
  };

  const cancelarAsBuscar = () => {
    onClose();
    setLiberadoBuscarQrCode(false);
  };

  useEffect(() => {
    if (qrCodeData?.response?.length !== 0) return;

    if (qrCodeData?.response?.length === 0) {
      setInterval(() => {
        UseRequestScannerQrCode({ instance: instancia });
      }, 10000);
    }
  }, [isSuccess, onOpen]);

  return (
    <>
      <Tooltip
        hasArrow
        label={
          liberadoBuscarQrCode
            ? "Escanear QR-CODE da Instância"
            : 'Para escanear precisa primeiro dar "Play"'
        }
        placement="top"
      >
        <Button
          cursor={liberadoBuscarQrCode ? "pointer" : "not-allowed"}
          onClick={() => {
            liberadoBuscarQrCode ? buscarQrCode() : console.log("");
          }}
        >
          <IoQrCode />
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={cancelarAsBuscar}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>SCANNER QR-CODE</ModalHeader>
          <ModalCloseButton onClick={cancelarAsBuscar} />
          <ModalBody>
            {!qrCodeData?.response[0]?.qrcode && <Spinner size={"xl"} />}
            <Flex
              display={qrCodeData?.response[0]?.qrcode ? "flex" : "none"}
              boxShadow={"xl"}
              rounded={"xl"}
              h={"350px"}
              alignItems={"center"}
              justifyContent={"center"}
              w={"100%"}
            >
              <Image src={qrCodeData?.response[0]?.qrcode} />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
