import {
  Button,
  Modal,
  Text,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Accordion,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useGetGruposAcesso } from "../hooks/useGetGruposAcesso";
import CardComponent from "./dialogGruposAcesso/card";
import CadastroComponent from "./dialogGruposAcesso/cadastro";

type Props = {
  idFerramenta: number;
  idPromotora: number;
  cnpj: string;
};

export default function DialogGruposAcessoComponent({
  idFerramenta,
  idPromotora,
  cnpj,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { useRequestGruposAcesso, data } = useGetGruposAcesso();

  useEffect(() => {
    if (isOpen) {
      useRequestGruposAcesso({ idFerramenta, idPromotora });
    }
  }, [isOpen]);

  const handleOpen = () => {
    onOpen();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Text flexGrow={"1"} p="6px 12px" onClick={handleOpen}>
        Grupos de Acesso
      </Text>
      <Modal size={"full"} isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY={"scroll"}>
            <CadastroComponent
              idPromotora={idPromotora}
              idProduto={idFerramenta}
            />
            <Accordion allowToggle>
              {data?.map((grupo) => (
                <CardComponent key={grupo.id} {...grupo} cnpj={cnpj} />
              ))}
            </Accordion>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
