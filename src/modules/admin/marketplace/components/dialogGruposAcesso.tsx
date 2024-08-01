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
import { useEffect, useState, useCallback } from "react";
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
  const [grupoAtivo, setGrupoAtivo] = useState<boolean>(true);

  const { useRequestGruposAcesso, data } = useGetGruposAcesso();

  const refetch = () => {
    useRequestGruposAcesso({ idFerramenta, idPromotora, ativo: grupoAtivo });
  };

  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen, grupoAtivo]);

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
              refetch={refetch}
            />
            <Button
              mb="3"
              ml="3"
              onClick={() => setGrupoAtivo((isAtivo) => !isAtivo)}
              colorScheme={grupoAtivo ? "red" : "green"}
            >
              {grupoAtivo ? "Exibir Inativos" : "Exibir Ativos"}
            </Button>
            <Accordion allowToggle>
              {data?.map((grupo) => (
                <CardComponent
                  key={grupo.id}
                  {...grupo}
                  cnpj={cnpj}
                  refetch={refetch}
                />
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
