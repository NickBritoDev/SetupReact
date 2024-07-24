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
  Tooltip,
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
import { FaQrcode } from "react-icons/fa";
import { useGetMinhaConta } from "../../../../hooks/useGetMinhaConta";

const ModalComponent: React.FC = () => {
  const { data: minhaConta } = useGetMinhaConta();
  const { data: contatos } = useGetLeads();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [detalhesLeads, setDetalhesLeads] = useState<Contato | null>(null);
  const [hideRecepcao, setHideRecepcao] = useState(false);

  const [filterScore, setFilterScore] = useState<{ [key: string]: boolean }>({
    Frio: true,
    Médio: true,
    Quente: true,
  });

  const [filterStatus, setFilterStatus] = useState<{
    [key: string]: boolean;
  }>({
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
    const aDate = new Date(a.logs[0]?.data_atualizacao || 0);
    const bDate = new Date(b.logs[0]?.data_atualizacao || 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (aDate >= today && bDate < today) {
      return -1;
    } else if (aDate < today && bDate >= today) {
      return 1;
    }

    if (aDate.getTime() !== bDate.getTime()) {
      return bDate.getTime() - aDate.getTime();
    }

    if (statusPriority[a.status!] !== statusPriority[b.status!]) {
      return statusPriority[a.status!] - statusPriority[b.status!];
    }

    return scorePriority[a.score!] - scorePriority[b.score!];
  };


  const contatosOrdenados = contatos
    ? contatos.slice().sort(compareContacts)
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

  const openDetailsLeads = (contato: Contato) => {
    setDetalhesLeads(contato);
    setHideRecepcao(true);
  };

  return (
    <>
      <Flex gap={2} mt={-4}>
        <Tooltip
          hasArrow
          placement="left"
          label="Gerenciador de Instâncias 64x"
        >
          <Button
            display={minhaConta.nome === 'LEANDRO DA SILVA SANTOS / X-PARCEIRO RC CRED' ? 'flex' : 'none'}
            colorScheme="green"
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
            onClick={() => {
              const link = document.createElement('a');
              link.href = "https://appbancos.s3.sa-east-1.amazonaws.com/whadesk-2.0.0-setup.exe";
              link.download = "whadesk-2.0.0-64xsetup.exe";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            <FaQrcode size={22} />
            <Text>Gerenciador de Instâncias 64x</Text>
          </Button>
        </Tooltip>
        <Tooltip
          hasArrow
          placement="left"
          label="Gerenciador de Instâncias 32x"
        >
          <Button
            display={minhaConta.nome === 'ANNA CAROLINA BIGARELLI DE PAIVA / X-PARCEIRO RC CRED' ? 'flex' : 'none'}
            colorScheme="yellow"
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
            onClick={() => {
              const link = document.createElement('a');
              link.href = "https://appbancos.s3.sa-east-1.amazonaws.com/whadesk-2.0.0-32x-setup.exe";
              link.download = "whadesk-2.0.0-32xsetup.exe";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            <FaQrcode size={22} />
            <Text>Gerenciador de Instâncias 32x</Text>
          </Button>
        </Tooltip>
        <Button
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
          mr={2}
          colorScheme="blue"
          onClick={onOpen}
        >
          <Text>Gerenciamento de leads</Text>
          <RiUserSettingsLine size={22} />
        </Button>
      </Flex>

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
