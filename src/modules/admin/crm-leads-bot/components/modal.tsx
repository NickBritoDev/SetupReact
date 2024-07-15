import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import { RiUserSettingsLine } from "react-icons/ri";
import user from "../images/user.png";
import back from "../images/back.png";
import FiltroComponent from "./filtro";
import RecepcaoComponent from "./recepcao";
import SidebarComponent from "./sidebar";
import InteracaoComponent from "./interacao";
import { Contato } from "../types/types";
import { useGetLeads } from "../hooks/useGetLeads";

const ModalComponent: React.FC = () => {
  const { data: contatos } = useGetLeads();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [detalhesLeads, setDetalhesLeads] = useState(contatos as Contato);
  const [hideRecepcao, setHideRecepcao] = useState(false);

  const [filterScore, setFilterScore] = useState<{ [key: string]: boolean }>({
    Frio: true,
    Médio: true,
    Quente: true,
  });

  const [filterStatus, setFilterStatus] = useState<{ [key: string]: boolean }>({
    Novo: true,
    Contato: true,
    Negociando: true,
    Finalizado: true,
  });

  const scorePriority: { [key: string]: number } = {
    Quente: 1,
    Médio: 2,
    Frio: 3,
  };
  const statusPriority: { [key: string]: number } = {
    Novo: 1,
    Contato: 2,
    Negociando: 3,
    Finalizado: 4,
  };

  const compareContacts = (a: Contato, b: Contato): number => {
    if (statusPriority[a.status!] !== statusPriority[b.status!]) {
      return statusPriority[a.status!] - statusPriority[b.status!];
    }
    return scorePriority[a.score!] - scorePriority[b.score!];
  };

  const contatosOrdenados = contatos
    ? contatos.slice().sort(compareContacts as (a: any, b: any) => number)
    : [];

  const filteredContatos = contatosOrdenados.filter(
    (contato: Contato) =>
      filterScore[contato.score!] && filterStatus[contato.status!],
  );

  const toggleFilterScore = (score: string) => {
    setFilterScore((prev) => ({ ...prev, [score]: !prev[score] }));
  };

  const toggleFilterStatus = (status: string) => {
    setFilterStatus((prev) => ({ ...prev, [status]: !prev[status] }));
  };

  const openDetailsLeads = (contato: any) => {
    setDetalhesLeads(contato);
    setHideRecepcao(true);
  };

  return (
    <>
      <Button
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
        mt={-4}
        mr={2}
        colorScheme="blue"
        onClick={onOpen}
      >
        <Text>Gerenciamento de leads</Text>
        <RiUserSettingsLine size={22} />
      </Button>

      <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody pos={"relative"}>
            <Flex>
              <FiltroComponent
                detalhesLeads={detalhesLeads}
                filterStatus={filterStatus}
                toggleFilterStatus={toggleFilterStatus}
                filterScore={filterScore}
                onClose={onClose}
                toggleFilterScore={toggleFilterScore}
              />

              <SidebarComponent
                detalhesLeads={detalhesLeads}
                filteredContatos={filteredContatos}
                openDetailsLeads={openDetailsLeads}
              />

              <Flex
                alignItems={hideRecepcao ? "flex-start" : "center"}
                justifyContent={"center"}
                pos={"absolute"}
                right={0}
                bottom={0}
                h={"90vh"}
                w={"75%"}
              >
                {hideRecepcao && (
                  <InteracaoComponent
                    detalhesLeads={detalhesLeads}
                    user={user}
                  />
                )}
                {!hideRecepcao && <RecepcaoComponent back={back} />}
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComponent;
