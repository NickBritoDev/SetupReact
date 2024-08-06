import {
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
  Button,
  Flex,
  Heading,
  useDisclosure
} from "@chakra-ui/react";
import { usePostRelatoriosRecebidos } from "./hooks/usePostRelatoriosRecebidos";
import { useEffect, useRef, useState } from "react";
import CardsTotaisComponent from "./components/cards.totais";
import { useGetFiltros } from "./hooks/useGetFiltros";
import TableComponent from "./components/table";
import SkeletonComponent from "./components/skeleton";

export default function RelatoriosRecebidosCrm() {
  const mes = new Date().getMonth() + 1
  const filtros = useGetFiltros();

  const [rangeData, setRangeData] = useState<any>(mes < 10 ? `0${mes}` : `${mes}`);
  const [agrupamento, setAgrupamento] = useState<string>("data");
  const [produtosSelecionados, setProdutosSelecionados] = useState<string[]>(
    [],
  );
  const [origensSelecionadas, setOrigensSelecionadas] = useState<string[]>([]);
  const [dataRelatorio, setDataRelatorio] = useState<any>(null)

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  const { useRequestPostRelatoriosRecebidos, isLoading } = usePostRelatoriosRecebidos();

  const buscaDadosRelatorio = async () => {
    const payload = {
      produto: produtosSelecionados,
      origem: origensSelecionadas,
      "mes": rangeData,
      "agrupar": agrupamento
    };

    try {
      const resultado = await useRequestPostRelatoriosRecebidos(payload);
      setDataRelatorio(resultado)
    } catch (error) {
      console.error("Erro ao buscar dados do relatório:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setProdutosSelecionados([...filtros?.data?.listaProdutos]);
      setOrigensSelecionadas([...filtros?.data?.listaOrigens]);
      const payload = {
        produto: [...filtros?.data?.listaProdutos],
        origem: [...filtros?.data?.listaOrigens],
        "mes": rangeData,
        "agrupar": agrupamento
      };

      try {
        const resultado = await useRequestPostRelatoriosRecebidos(payload);
        setDataRelatorio(resultado);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    if (filtros.status === "success" && dataRelatorio === null) {
      fetchData();
    }
  }, [filtros]);

  return (
    <>
      {
        isLoading ? (
          <SkeletonComponent />
        ) : (
          <Flex w={'100%'} flexDir={"column"}>
            <Flex mt={-2} mb={2} alignItems={"center"} justifyContent={"space-between"}>
              <Heading size={'md'}>Relatorios de Leads Recebidos: CRM</Heading>

              <>
                <Button ref={btnRef} colorScheme="green" onClick={onOpen}>
                  Filtros
                </Button>
                <Drawer
                  size={"lg"}
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
                      <Accordion
                        w={"100%"}
                        defaultIndex={[0]}
                        allowMultiple
                        allowToggle
                      >
                        <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box as="span" flex="1" textAlign="left">
                                Meses
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            <RadioGroup onChange={setRangeData} value={rangeData}>
                              <Stack direction="column">
                                {filtros?.data?.meses?.map(
                                  (data: any, index: number) => (
                                    <Radio key={index} value={data.cod}>
                                      {data.mes}
                                    </Radio>
                                  ),
                                )}
                              </Stack>
                            </RadioGroup>
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>

                      <Accordion
                        w={"100%"}
                        defaultIndex={[0]}
                        allowMultiple
                        allowToggle
                      >
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
                              {filtros?.data?.listaProdutos?.map(
                                (data: any, index: number) => (
                                  <Checkbox
                                    defaultChecked
                                    key={index}
                                    value={data}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      setProdutosSelecionados((prev) =>
                                        e.target.checked
                                          ? [...prev, value]
                                          : prev.filter((item) => item !== value),
                                      );
                                    }}
                                  >
                                    {data}
                                  </Checkbox>
                                ),
                              )}
                            </Stack>
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>

                      <Accordion
                        w={"100%"}
                        defaultIndex={[0]}
                        allowMultiple
                        allowToggle
                      >
                        <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box as="span" flex="1" textAlign="left">
                                Origem
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            <Stack direction="column">
                              {filtros?.data?.listaOrigens?.map(
                                (data: any, index: number) => (
                                  <Checkbox
                                    key={index}
                                    value={data}
                                    defaultChecked
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      setOrigensSelecionadas((prev) =>
                                        e.target.checked
                                          ? [...prev, value]
                                          : prev.filter((item) => item !== value),
                                      );
                                    }}
                                  >
                                    {data}
                                  </Checkbox>
                                ),
                              )}
                            </Stack>
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>

                      <Accordion
                        w={"100%"}
                        defaultIndex={[0]}
                        allowMultiple
                        allowToggle>
                        <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box as="span" flex="1" textAlign="left">
                                Agrupamento
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            <RadioGroup onChange={setAgrupamento} value={agrupamento}>
                              <Stack direction="column">
                                <Radio value="data">Mês</Radio>
                                <Radio value="usuario">Usuário</Radio>
                              </Stack>
                            </RadioGroup>
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                    </DrawerBody>

                    <DrawerFooter>
                      <Button colorScheme="red" mr={3} onClick={onClose}>
                        Cancelar
                      </Button>
                      <Button onClick={buscaDadosRelatorio} colorScheme="green">
                        Salvar
                      </Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </>

            </Flex>
            <CardsTotaisComponent dataRelatorio={dataRelatorio} />
            <TableComponent dados={dataRelatorio} />
          </Flex>
        )
      }
    </>
  )
}
