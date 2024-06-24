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
          onClick={onOpen}
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

              <Flex gap={2} mt={10} flexDir={"column"}>
                <Button
                  display={exibeCampoInclusao ? "none" : ""}
                  onClick={() => {
                    setExibeCampoInclusao(true);
                  }}
                  w={"100%"}
                  colorScheme="green"
                >
                  Incluir nova observação
                </Button>
                <Button
                  display={exibeCampoInclusao ? "none" : ""}
                  onClick={onClose}
                  w={"100%"}
                  colorScheme="red"
                >
                  Fechar observações
                </Button>
              </Flex>

              {exibeCampoInclusao && (
                <>
                  <Text mt={4} fontWeight={"semibold"} fontSize={20}>
                    Incluir nova observação
                  </Text>
                  <Textarea />
                </>
              )}
            </AlertDialogBody>

            <AlertDialogFooter display={exibeCampoInclusao ? "flex" : "none"}>
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
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
