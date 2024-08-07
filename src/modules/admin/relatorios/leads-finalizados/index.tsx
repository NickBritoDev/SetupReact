import { useEffect, useRef, useState } from "react";
import {
  Flex,
  Heading,
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
  useDisclosure,
  Button,
  Text,
  Spinner,
  Skeleton,
  Switch,
} from "@chakra-ui/react";
import TableComponent from "./components/table";
import GraphComponent from "./components/grafico";
import { GiRibbonMedal } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi2";
import { useGetFiltros } from "./hooks/useGetFiltros";
import { usePostRelatoriosFinalizados } from "./hooks/usePostRelatoriosFinalizados";

export default function RelatoriosFinalizadosCrm() {
  const filtros = useGetFiltros();
  const [loadinItems, setLoadingItems] = useState(true);

  const [rangeData, setRangeData] = useState<string>("dia");
  const [produtosSelecionados, setProdutosSelecionados] = useState<string[]>(
    [],
  );
  const [origensSelecionadas, setOrigensSelecionadas] = useState<string[]>([]);
  const [scoresSelecionados, setScoresSelecionados] = useState<string[]>([]);

  const [dados, setDados] = useState<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  const { useRequestPostRelatoriosFinalizados, isLoading } = usePostRelatoriosFinalizados();

  const buscaDadosRelatorio = async () => {
    const payload = {
      periodo: rangeData,
      produto: produtosSelecionados,
      origem: origensSelecionadas,
      score: scoresSelecionados,
    };

    try {
      const resultado = await useRequestPostRelatoriosFinalizados(payload);
      setDados(resultado);
      setLoadingItems(false);
    } catch (error) {
      console.error("Erro ao buscar dados do relatório:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setProdutosSelecionados([...filtros?.data?.listaProdutos]);
      setOrigensSelecionadas([...filtros?.data?.listaOrigens]);
      setScoresSelecionados([...filtros?.data?.listaScore]);
      const payload = {
        periodo: "dia",
        produto: [...filtros?.data?.listaProdutos],
        origem: [...filtros?.data?.listaOrigens],
        score: [...filtros?.data?.listaScore],
      };

      try {
        const resultado = await useRequestPostRelatoriosFinalizados(payload);
        setDados(resultado);
        setLoadingItems(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    if (filtros.status === "success" && dados === null) {
      fetchData();
    }
  }, [filtros]);

  useEffect(() => {
    buscaDadosRelatorio();
  }, [rangeData, produtosSelecionados, origensSelecionadas, scoresSelecionados]);

  function somarCampos(dados: any[]) {
    let totalContratoFechado = 0;
    let totalSemRegraNegocio = 0;
    let totalSemInteresse = 0;
    let totalReprovadoPoliticaInterna = 0;
    let totalParouDeInteragir = 0;
    let totalJaPossuiEmprestimo = 0;
    let totalQtde = 0;

    dados?.forEach((item) => {
      totalContratoFechado += parseInt(item.contrato_fechado, 10);
      totalSemRegraNegocio += parseInt(item.sem_regra_negocio, 10);
      totalSemInteresse += parseInt(item.sem_interesse, 10);
      totalReprovadoPoliticaInterna += parseInt(
        item.reprovado_politica_interna,
        10,
      );
      totalParouDeInteragir += parseInt(item.parou_de_interagir, 10);
      totalJaPossuiEmprestimo += parseInt(item.ja_possui_emprestimo, 10);
      totalQtde += parseInt(item.qtde, 10);
    });

    return {
      totalContratoFechado,
      totalSemRegraNegocio,
      totalSemInteresse,
      totalReprovadoPoliticaInterna,
      totalParouDeInteragir,
      totalJaPossuiEmprestimo,
      totalQtde,
    };
  }

  function getTop3Usuarios(usuarios: any[]) {
    const usuariosComPercentual = usuarios?.map((user) => {
      return {
        usuario: user.usuario,
        percentual: parseFloat(
          user.percentual_contrato_fechado.replace("%", ""),
        ),
      };
    });

    const usuariosOrdenados = usuariosComPercentual?.sort(
      (a, b) => b.percentual - a.percentual,
    );

    const top3Usuarios = usuariosOrdenados?.slice(0, 3);

    return top3Usuarios;
  }

  const top3 = getTop3Usuarios(dados?.resultado);
  const totais = somarCampos(dados?.resultado);

  return (
    <Flex w={"100%"} flexDir={"column"}>
      <Flex
        w={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
        mb={2}
        mt={-2}
      >
        <Box>
          <Heading size={"md"}>Relatorios de Tabulação: CRM</Heading>
          <Text
            fontWeight={"semibold"}
            textTransform={"uppercase"}
            color={"gray.600"}
          >
            Filtro: {dados?.filtro}
          </Text>
        </Box>

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
                  <Flex flexDir={"column"} w={"100%"}>
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
                              Período
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <Stack direction="column">
                            {filtros?.data?.periodo?.map((data: any, index: number) => (
                              <Flex key={index} justifyContent="space-between" alignItems="center">
                                <Text>{data}</Text>
                                <Switch
                                  isChecked={rangeData === data}
                                  onChange={() => setRangeData(data)}
                                />
                              </Flex>
                            ))}
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
                                <Flex key={index} justifyContent="space-between" alignItems="center">
                                  <Text>{data}</Text>
                                  <Switch
                                    isChecked={produtosSelecionados.includes(data)}
                                    isDisabled={produtosSelecionados.includes(data) && produtosSelecionados.length === 1}
                                    onChange={(e) => {
                                      const value = data;
                                      setProdutosSelecionados((prev) =>
                                        e.target.checked
                                          ? [...prev, value]
                                          : prev.length > 1
                                            ? prev.filter((item) => item !== value)
                                            : prev
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
                  </Flex>

                  <Flex flexDir={"column"} w={"100%"}>
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
                              Score
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <Stack direction="column">
                            {filtros?.data?.listaScore?.map(
                              (data: any, index: number) => (
                                <Flex
                                  key={index}
                                  justifyContent="space-between"
                                  alignItems="center"
                                >
                                  <Text>{data}</Text>
                                  <Switch
                                    isDisabled={scoresSelecionados.includes(data) && scoresSelecionados.length === 1}
                                    isChecked={scoresSelecionados.includes(
                                      data,
                                    )}
                                    onChange={(e) => {
                                      const value = data;
                                      setScoresSelecionados((prev) =>
                                        e.target.checked
                                          ? [...prev, value]
                                          : prev.filter(
                                            (item) => item !== value,
                                          ),
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
                                    isDisabled={origensSelecionadas.includes(data) && origensSelecionadas.length === 1}
                                    isChecked={origensSelecionadas.includes(
                                      data,
                                    )}
                                    onChange={(e) => {
                                      const value = data;
                                      setOrigensSelecionadas((prev) =>
                                        e.target.checked
                                          ? [...prev, value]
                                          : prev.filter(
                                            (item) => item !== value,
                                          ),
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
                  </Flex>
                </DrawerBody>

                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancelar
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </>
        </Flex>
      </Flex>

      <Flex gap={2}>
        <Flex
          p={2}
          color={"white"}
          bg={"#3ab8b6"}
          flexDir={"column"}
          w={"100%"}
          h={"120px"}
          rounded={"2xl"}
          boxShadow={"lg"}
        >
          <Text mb={2} pl={2} rounded={"2xl"} color={"#3ab8b6"} bg={"white"}>
            TOP 3 Contratos Fechados
          </Text>
          {loadinItems ? (
            <Stack w={"100%"}>
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </Stack>
          ) : (
            top3?.map((user, index) => (
              <Flex
                px={2}
                alignItems={"center"}
                justifyContent={"space-between"}
                key={index}
                w="100%"
                h="auto"
              >
                <Text fontWeight="semibold">{user.usuario}</Text>
                <Text fontWeight="bold">{user.percentual}%</Text>
              </Flex>
            ))
          )}
        </Flex>

        <Flex
          color={"white"}
          bg={"#229544"}
          flexDir={"column"}
          p={2}
          w={"100%"}
          h={"120px"}
          rounded={"2xl"}
          boxShadow={"lg"}
        >
          <Text mb={2} pl={2} rounded={"2xl"} color={"#229544"} bg={"white"}>
            Leads Finalizados
          </Text>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            {loadinItems ? (
              <Spinner />
            ) : (
              <Text fontSize={30}>{totais.totalQtde}</Text>
            )}
            <HiUserGroup size={42} />
          </Flex>
        </Flex>

        <Flex
          color={"white"}
          bg={"#eb6e21"}
          flexDir={"column"}
          p={2}
          w={"100%"}
          h={"120px"}
          rounded={"2xl"}
          boxShadow={"lg"}
        >
          <Text mb={2} pl={2} rounded={"2xl"} color={"#eb6e21"} bg={"white"}>
            Contratos Fechados
          </Text>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            {loadinItems ? (
              <Spinner />
            ) : (
              <Text fontSize={30}>{totais.totalContratoFechado}</Text>
            )}
            <GiRibbonMedal size={62} />
          </Flex>
        </Flex>

        <Flex pr={2} w={"100%"} h={"120px"} rounded={"2xl"} boxShadow={"lg"}>
          <Box w={"100%"} ml={-4}>
            {loadinItems ? (
              <Stack p={4} ml={4} w={"100%"}>
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
              </Stack>
            ) : (
              <GraphComponent totais={totais} />
            )}
          </Box>
        </Flex>
      </Flex>

      {isLoading ? (
        <Stack>
          <Skeleton height='20px' />
          <Skeleton height='20px' />
          <Skeleton height='20px' />
        </Stack>
      ) : (
        <Flex mt={4} gap={2}>
          <Flex w={"100%"}>
            <TableComponent dados={dados?.resultado} />
          </Flex>
        </Flex>
      )}

    </Flex>
  );
}
