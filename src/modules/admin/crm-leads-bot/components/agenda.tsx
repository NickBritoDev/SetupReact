import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Tooltip,
  Text,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { LuBookPlus } from "react-icons/lu";
import agenda from "../../../../json/crm/data4.json";
import DialogAgendaComponent from "./dialogAgenda";
import { FcAbout, FcAlarmClock, FcCalendar } from "react-icons/fc";

export default function AgendaComponent({ detalhesLeads }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip hasArrow placement="top" label="Marcar retorno">
        <Button
          onClick={onOpen}
          display={detalhesLeads?.status !== "Finalizado" ? "flex" : "none"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
        >
          <Text>Agenda</Text>
          <LuBookPlus size={22} />
        </Button>
      </Tooltip>

      <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agenda - {detalhesLeads?.nome}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>
                      <Text gap={2} display={"flex"} alignItems={"center"}>
                        Data <FcCalendar size={22} />
                      </Text>
                    </Th>
                    <Th textAlign={"center"}>
                      <Text
                        gap={2}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        Horario <FcAlarmClock size={22} />
                      </Text>
                    </Th>
                    <Th isNumeric>
                      <Text
                        gap={2}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"flex-end"}
                      >
                        Motivo <FcAbout size={22} />
                      </Text>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {agenda[0].agenda.map((evento) => (
                    <Tr key={evento.horario}>
                      <Td>{evento.data}</Td>
                      <Td textAlign={"center"}>{evento.horario}</Td>
                      <Td isNumeric>{evento.assunto}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Fechar
            </Button>
            <DialogAgendaComponent />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
