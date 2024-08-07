import {
  Switch,
  Stack,
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
  useDisclosure,
  Text,
  Skeleton,
} from "@chakra-ui/react";
import { usePostRelatoriosRecebidos } from "./hooks/usePostRelatoriosRecebidos";
import { useEffect, useRef, useState } from "react";
import CardsTotaisComponent from "./components/cards.totais";
import { useGetFiltros } from "./hooks/useGetFiltros";
import TableComponent from "./components/table";

export default function RelatoriosRecebidosCrm() {
  const mes = new Date().getMonth() + 1;
  const filtros = useGetFiltros();

  const [rangeData, setRangeData] = useState<string>(
    mes < 10 ? `0${mes}` : `${mes}`,
  );
  const [agrupamento, setAgrupamento] = useState<string>("data");
  const [produtosSelecionados, setProdutosSelecionados] = useState<string[]>(
    [],
  );
  const [origensSelecionadas, setOrigensSelecionadas] = useState<string[]>([]);
  const [dataRelatorio, setDataRelatorio] = useState<any>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  const { useRequestPostRelatoriosRecebidos, isLoading } =
    usePostRelatoriosRecebidos();

  const buscaDadosRelatorio = async () => {
    const payload = {
      produto: produtosSelecionados,
      origem: origensSelecionadas,
      mes: rangeData,
      agrupar: agrupamento,
    };

    try {
      const resultado = await useRequestPostRelatoriosRecebidos(payload);
      setDataRelatorio(resultado);
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
        mes: rangeData,
        agrupar: agrupamento,
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
  }, [
    filtros,
    dataRelatorio,
    rangeData,
    agrupamento,
    produtosSelecionados,
    origensSelecionadas,
  ]);

  useEffect(() => {
    buscaDadosRelatorio();
  }, [rangeData, produtosSelecionados, origensSelecionadas, agrupamento]);

  return (
    <>
      <Flex w={"100%"} flexDir={"column"}>
        <Flex
          mt={-2}
          mb={2}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Heading size={"md"}>Relatórios de Leads Recebidos: CRM</Heading>

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
                        <Stack direction="column">
                          {filtros?.data?.meses?.map(
                            (data: any, index: number) => (
                              <Flex
                                key={index}
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Text>{data.mes}</Text>
                                <Switch
                                  isChecked={rangeData === data.cod}
                                  onChange={(e) => {
                                    const value = data.cod;
                                    if (e.target.checked) {
                                      setRangeData(value);
                                    } else {
                                      // Prevent unchecking the only selected month
                                      if (rangeData === value) {
                                        return;
                                      }
                                    }
                                  }}
                                />
                              </Flex>
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
                            Produto
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Stack direction="column">
                          {filtros?.data?.listaProdutos?.map(
                            (data: any, index: number) => (
                              <Flex
                                key={index}
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Text>{data}</Text>
                                <Switch
                                  isChecked={produtosSelecionados.includes(
                                    data,
                                  )}
                                  isDisabled={
                                    produtosSelecionados.length === 1 &&
                                    produtosSelecionados.includes(data)
                                  }
                                  onChange={(e) => {
                                    const value = data;
                                    setProdutosSelecionados((prev) =>
                                      e.target.checked
                                        ? [...prev, value]
                                        : prev.length > 1
                                          ? prev.filter(
                                              (item) => item !== value,
                                            )
                                          : prev,
                                    );
                                  }}
                                />
                              </Flex>
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
                              <Flex
                                key={index}
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Text>{data}</Text>
                                <Switch
                                  isChecked={origensSelecionadas.includes(data)}
                                  isDisabled={
                                    origensSelecionadas.length === 1 &&
                                    origensSelecionadas.includes(data)
                                  }
                                  onChange={(e) => {
                                    const value = data;
                                    setOrigensSelecionadas((prev) =>
                                      e.target.checked
                                        ? [...prev, value]
                                        : prev.length > 1
                                          ? prev.filter(
                                              (item) => item !== value,
                                            )
                                          : prev,
                                    );
                                  }}
                                />
                              </Flex>
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
                            Agrupamento
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Stack direction="column">
                          <Flex
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Text>Mês</Text>
                            <Switch
                              isChecked={agrupamento === "data"}
                              onChange={() => {
                                setAgrupamento("data");
                              }}
                            />
                          </Flex>
                          <Flex
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Text>Usuário</Text>
                            <Switch
                              isChecked={agrupamento === "usuario"}
                              onChange={() => {
                                setAgrupamento("usuario");
                              }}
                            />
                          </Flex>
                        </Stack>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </DrawerBody>

                <DrawerFooter>
                  <Button variant={"outline"} mr={3} onClick={onClose}>
                    Cancelar
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </>
        </Flex>

        {isLoading ? (
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        ) : (
          <CardsTotaisComponent dataRelatorio={dataRelatorio} />
        )}

        {isLoading ? (
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        ) : (
          <TableComponent dados={dataRelatorio} />
        )}
      </Flex>
    </>
  );
}
