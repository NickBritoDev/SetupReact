import { useRef, useState } from "react";
import {
  Flex,
  Heading,
  RadioGroup,
  Stack,
  Radio,
  Checkbox,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import TableComponent from "./components/table";
import dados from "../../../../json/crm/data5.json";

export default function RelatoriosCrm() {
  const [rangeData, setRangeData] = useState("1");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  return (
    <Flex w={"100%"} flexDir={"column"}>
      <Flex
        w={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
        mb={2}
        mt={-2}
      >
        <Heading size={"md"}>Relatorios de Tabulação: CRM</Heading>

        <Flex
          pos={"relative"}
          gap={2}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <>
            <Button ref={btnRef} colorScheme="green" onClick={onOpen}>
              Filtros
            </Button>
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Modificar Filtros</DrawerHeader>

                <DrawerBody>
                  <Accordion allowMultiple allowToggle>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            Periodo
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <RadioGroup onChange={setRangeData} value={rangeData}>
                          <Stack direction="column">
                            <Radio value="1">DIA</Radio>
                            <Radio value="2">MÊS</Radio>
                            <Radio value="3">ANO</Radio>
                          </Stack>
                        </RadioGroup>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                  <Accordion allowMultiple allowToggle>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            Produto
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Stack direction="column">
                          <Checkbox value="1">Bolsa Familia</Checkbox>
                          <Checkbox value="2">CP Baixa Renda</Checkbox>
                        </Stack>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                  <Accordion allowMultiple allowToggle>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            Score
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Stack direction="column">
                          <Checkbox value="1">Quente</Checkbox>
                          <Checkbox value="2">Médio</Checkbox>
                          <Checkbox value="3">Frio</Checkbox>
                        </Stack>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                  <Accordion allowMultiple allowToggle>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            Score
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Stack direction="column">
                          <Checkbox value="1">Landing Page</Checkbox>
                          <Checkbox value="2">Instagram</Checkbox>
                        </Stack>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </DrawerBody>

                <DrawerFooter>
                  <Button colorScheme="red" mr={3} onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button colorScheme="green">Salvar</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </>
        </Flex>
      </Flex>

      <Flex gap={2}>
        <Flex w={"100%"} h={"100px"} rounded={"2xl"} boxShadow={"lg"}></Flex>
        <Flex w={"100%"} h={"100px"} rounded={"2xl"} boxShadow={"lg"}></Flex>
        <Flex w={"100%"} h={"100px"} rounded={"2xl"} boxShadow={"lg"}></Flex>
        <Flex w={"100%"} h={"100px"} rounded={"2xl"} boxShadow={"lg"}></Flex>
      </Flex>

      <Flex mt={4} gap={2}>
        <Flex w={"100%"}>
          {/* <TableContainer overflowY={'scroll'} maxH={'430px'}>
            <Table size='sm'>
              <Thead>
                <Tr>
                  <Th>Operador</Th>
                  <Th>Produto</Th>
                  <Th>Contratos <br /> Fechados</Th>
                  <Th>Parou de<br /> Interagir</Th>
                  <Th>Sem <br /> Interesse</Th>
                  <Th>Possui <br /> Emprestimo</Th>
                  <Th>Regra de <br /> Negocios</Th>
                  <Th>Politicas <br /> Internas</Th>
                  <Th>Quantidade</Th>
                  <Th>Percentual  <br /> Contratos <br /> Fechados</Th>
                </Tr>
              </Thead>
              <Tbody >
                {dados?.map((operador, index) => (
                  <Tr key={index}>
                    <Td>{operador.usuario}</Td>
                    <Td>{operador.produto}</Td>
                    <Td>{operador.contrato_fechado}</Td>
                    <Td>{operador.parou_de_interagir}</Td>
                    <Td>{operador.sem_interesse}</Td>
                    <Td>{operador.ja_possui_emprestimo}</Td>
                    <Td>{operador.sem_regra_negocio}</Td>
                    <Td>{operador.reprovado_politica_interna}</Td>
                    <Td>{operador.qtde}</Td>
                    <Td>{operador.percentual_contrato_fechado}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer> */}
          <TableComponent dados={dados} />
        </Flex>
      </Flex>
    </Flex>
  );
}
