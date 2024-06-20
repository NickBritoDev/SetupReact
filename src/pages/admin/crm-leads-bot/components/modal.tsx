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
  Image,
  Heading,
  Tooltip,
  Divider,
} from "@chakra-ui/react";
import contatos from "../../../../json/crm/data2.json";
import { RiUserSettingsLine } from "react-icons/ri";
import { ContactTypes } from "../types/types";
import user from "../images/user.png";
import back from "../images/back.png";
import FiltroComponent from "./filtro";
import RecepcaoComponent from "./recepcao";
import SidebarComponent from "./sidebar";
import { LuPhoneOutgoing } from "react-icons/lu";
import { TfiEmail } from "react-icons/tfi";
import { SiWhatsapp } from "react-icons/si";
import { BsInfoCircleFill } from "react-icons/bs";
import { maskCPF, maskPhone } from "../../../../utils/mask/mascaras";

const ModalComponent: React.FC<{ contatos: ContactTypes[] }> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [detalhesLeads, setDetalhesLeads] = useState({} as ContactTypes);
  const [hideRecepcao, setHideRecepcao] = useState(false);

  const [filterScore, setFilterScore] = useState<{ [key: string]: boolean }>({
    FRIO: true,
    MEDIO: true,
    QUENTE: true,
  });

  const [filterStatus, setFilterStatus] = useState<{ [key: string]: boolean }>({
    NOVO: true,
    CONTATO: true,
    NEGOCIANDO: true,
    FINALIZADO: true,
  });

  const scorePriority: { [key: string]: number } = {
    QUENTE: 1,
    MEDIO: 2,
    FRIO: 3,
  };
  const statusPriority: { [key: string]: number } = {
    NOVO: 1,
    CONTATO: 2,
    NEGOCIANDO: 3,
    FINALIZADO: 4,
  };

  const compareContacts = (a: ContactTypes, b: ContactTypes): number => {
    if (statusPriority[a.status!] !== statusPriority[b.status!]) {
      return statusPriority[a.status!] - statusPriority[b.status!];
    }
    return scorePriority[a.score!] - scorePriority[b.score!];
  };

  const contatosOrdenados = contatos
    .slice()
    .sort(compareContacts as (a: any, b: any) => number);

  const filteredContatos = contatosOrdenados.filter(
    (contato) => filterScore[contato.score!] && filterStatus[contato.status!],
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
                {hideRecepcao ? (
                  <Flex gap={10} w={"100%"}>
                    <Flex
                      w={"60%"}
                      flexDir={"column"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Image
                        w={"150px"}
                        src={user}
                        alt="foto do usuario card"
                      />
                      <Heading mt={-4}>{detalhesLeads.nome}</Heading>
                      <Text fontWeight={"semibold"}>{detalhesLeads.email}</Text>

                      <Flex gap={6} mt={4}>
                        <Tooltip
                          hasArrow
                          placement="bottom"
                          label="Ir para discadora"
                        >
                          <Button
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            gap={2}
                          >
                            <Text>Discadora</Text>
                            <LuPhoneOutgoing size={22} />
                          </Button>
                        </Tooltip>

                        <Tooltip
                          hasArrow
                          placement="bottom"
                          label="Ir para o email"
                        >
                          <Button
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            gap={2}
                          >
                            <Text>Email</Text>
                            <TfiEmail size={22} />
                          </Button>
                        </Tooltip>

                        <Tooltip
                          hasArrow
                          placement="bottom"
                          label="Ir para o whatsapp"
                        >
                          <Button
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            gap={2}
                          >
                            <Text>WhatsApp</Text>
                            <SiWhatsapp size={22} />
                          </Button>
                        </Tooltip>
                      </Flex>
                    </Flex>

                    <Flex
                      p={2}
                      flexDir={"column"}
                      w={"40%"}
                      borderLeft={"solid 1px gray"}
                    >
                      <Flex
                        alignItems={"center"}
                        justifyContent={"flex-start"}
                        gap={2}
                      >
                        <BsInfoCircleFill color="#44B3CF" size={24} />
                        <Heading mt={-0.5} size={"md"}>
                          MAIS INFORMAÇÕES
                        </Heading>
                      </Flex>
                      <Divider mt={2} />
                      <Text
                        boxShadow={"md"}
                        p={2}
                        rounded={"xl"}
                        fontWeight={"semibold"}
                      >
                        <strong>Nome: </strong>
                        {detalhesLeads.nome}
                      </Text>
                      <Text
                        boxShadow={"md"}
                        p={2}
                        rounded={"xl"}
                        fontWeight={"semibold"}
                      >
                        <strong>Email: </strong>
                        {detalhesLeads.email}
                      </Text>
                      <Text
                        boxShadow={"md"}
                        p={2}
                        rounded={"xl"}
                        fontWeight={"semibold"}
                      >
                        <strong>CPF: </strong>
                        {maskCPF(detalhesLeads.cpf)}
                      </Text>
                      <Text
                        boxShadow={"md"}
                        p={2}
                        rounded={"xl"}
                        fontWeight={"semibold"}
                      >
                        <strong>Telefone: </strong>
                        {maskPhone(detalhesLeads.telefone)}
                      </Text>
                      <Text
                        boxShadow={"md"}
                        p={2}
                        rounded={"xl"}
                        fontWeight={"semibold"}
                      >
                        <strong>Produto: </strong>
                        {detalhesLeads.produto}
                      </Text>
                      <Text
                        boxShadow={"md"}
                        p={2}
                        rounded={"xl"}
                        fontWeight={"semibold"}
                      >
                        <strong>Origem: </strong>
                        {detalhesLeads.origem}
                      </Text>
                    </Flex>
                  </Flex>
                ) : (
                  <RecepcaoComponent back={back} />
                )}
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComponent;
