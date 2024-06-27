import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
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
  Textarea,
  Flex,
  AlertDialogCloseButton,
  Input,
  Select,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaUserClock } from "react-icons/fa6";
import observacoes from "../../../../json/crm/data3.json";

export default function DialogObservacoesComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const [exibeCampoInclusao, setExibeCampoInclusao] = useState(false);

  return (
    <>
      <Tooltip
        hasArrow
        placement="left"
        label="Incluir/Visualizar observações do lead"
      >
        <Button
          onClick={() => {
            onOpen();
            setExibeCampoInclusao(false);
          }}
          colorScheme="orange"
          w={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={2}
        >
          <Text>Observações</Text>
          <FaUserClock size={22} />
        </Button>
      </Tooltip>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        size={"full"}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Visualizar/Incluir observações
            </AlertDialogHeader>
            <AlertDialogCloseButton />

            <AlertDialogBody>
              <TableContainer>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Data</Th>
                      <Th textAlign={"center"}>Hora</Th>
                      <Th textAlign={"center"}>Meio de contato</Th>
                      <Th isNumeric>Observações</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {observacoes[0].observacoes.map((obs) => (
                      <Tr key={obs.hora}>
                        <Td>{obs.data}</Td>
                        <Td textAlign={"center"}>{obs.hora}</Td>
                        <Td textAlign={"center"}>{obs.metodo_contato}</Td>
                        <Td isNumeric>{obs.nota}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>

              {exibeCampoInclusao && (
                <>
                  <Text mt={4} fontWeight={"semibold"} fontSize={20}>
                    Selecione o meio de contato
                  </Text>
                  <Select placeholder="Meios de contatos...">
                    <option value="Whatsapp">Whatsapp</option>
                    <option value="Telefone">Telefone</option>
                    <option value="Email">Email</option>
                    <option value="Sms">Sms</option>
                  </Select>

                  <Text mt={4} fontWeight={"semibold"} fontSize={20}>
                    Selecione a data
                  </Text>
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="datetime-local"
                  />

                  <Text mt={4} fontWeight={"semibold"} fontSize={20}>
                    Incluir nova observação
                  </Text>
                  <Textarea placeholder="Inclua sua observação..." />
                </>
              )}
            </AlertDialogBody>

            <AlertDialogFooter display={"flex"}>
              {exibeCampoInclusao ? (
                <Flex>
                  <Button
                    colorScheme="red"
                    ref={cancelRef}
                    onClick={() => {
                      setExibeCampoInclusao(false);
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button colorScheme="green" onClick={onClose} ml={3}>
                    Incluir
                  </Button>
                </Flex>
              ) : (
                <Flex gap={2} flexDir={"row"}>
                  <Button onClick={onClose} colorScheme="red">
                    Fechar observações
                  </Button>
                  <Button
                    onClick={() => {
                      setExibeCampoInclusao(true);
                    }}
                    colorScheme="green"
                  >
                    Incluir nova observação
                  </Button>
                </Flex>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
