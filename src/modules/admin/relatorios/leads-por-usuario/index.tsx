import {
  Button, Flex,
  Stack,
  Switch,
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
  Heading,
  useDisclosure,
  Text,
  Skeleton,
} from "@chakra-ui/react";
import { usePostRelatoriosPorUsuario } from "./hooks/usePostRelatoriosPorUsuario";
import TableComponent from "./components/table";
import { useEffect, useRef, useState } from "react";
import { useGetFiltros } from "./hooks/useGetFiltros";
import CardsComponent from "./components/card";

export default function RelatoriosPorUsuarioCrm() {
  const { useRequestPostRelatoriosPorUsuario, isLoading } = usePostRelatoriosPorUsuario();
  const filtros = useGetFiltros();

  const [dados, setDados] = useState<any>(null)
  const [top3, setTop3] = useState<any>(null)
  const [bottom3, setBottom3] = useState<any>(null)
  const [total, setTotais] = useState<any>(null)
  const [produtosSelecionados, setProdutosSelecionados] = useState<string[]>([],);
  const [origensSelecionadas, setOrigensSelecionadas] = useState<string[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  const buscaDadosRelatorio = async () => {
    const payload = {
      produto: produtosSelecionados,
      origem: origensSelecionadas
    };

    try {
      const resultado = await useRequestPostRelatoriosPorUsuario(payload);
      setDados(resultado.resultado)
    } catch (error) {
      console.error("Erro ao buscar dados do relatório:", error);
    }
  };

  const convertToNumber = (entry: { qtde_concluido: number; }) => ({
    ...entry,
    qtde_concluido: Number(entry.qtde_concluido)
  });

  const somarTotais = (resultado: any[]) => {
    return resultado.reduce((acc: { qtde_novos: number; qtde_pendente: number; qtde_emAberto: number; qtde_concluido: number; }, curr: { qtde_novos: any; qtde_pendente: any; qtde_emAberto: any; qtde_concluido: any; }) => {
      acc.qtde_novos += Number(curr.qtde_novos);
      acc.qtde_pendente += Number(curr.qtde_pendente);
      acc.qtde_emAberto += Number(curr.qtde_emAberto);
      acc.qtde_concluido += Number(curr.qtde_concluido);
      return acc;
    }, {
      qtde_novos: 0,
      qtde_pendente: 0,
      qtde_emAberto: 0,
      qtde_concluido: 0
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setProdutosSelecionados([...filtros?.data?.listaProdutos]);
      setOrigensSelecionadas([...filtros?.data?.listaOrigens]);
      const payload = {
        produto: [...filtros?.data?.listaProdutos],
        origem: [...filtros?.data?.listaOrigens]
      };

      try {
        const resultado = await useRequestPostRelatoriosPorUsuario(payload);
        setDados(resultado.resultado);

        const result = resultado?.resultado?.map(convertToNumber);

        result?.sort((a: { qtde_concluido: number; }, b: { qtde_concluido: number; }) => b.qtde_concluido - a.qtde_concluido);

        setTop3(result.slice(0, 3));

        const filteredBottom3 = result
          .filter((item: { qtde_concluido: number; }) => item.qtde_concluido > 0)
          .sort((a: { qtde_concluido: number; }, b: { qtde_concluido: number; }) => a.qtde_concluido - b.qtde_concluido)
          .slice(0, 3);

        setBottom3(filteredBottom3);

        const totais = somarTotais(result);
        setTotais(totais);
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
  }, [produtosSelecionados, origensSelecionadas]);



  return (
    <>
      <Flex w={'100%'} flexDir={"column"}>
        <Flex mt={-2} mb={2} alignItems={"center"} justifyContent={"space-between"}>
          <Heading size={'md'}>Relatorios de Leads Por Usuario: CRM</Heading>

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
                                    e.stopPropagation();
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
                              <Flex key={index} justifyContent="space-between" alignItems="center">
                                <Text>{data}</Text>
                                <Switch
                                  isChecked={origensSelecionadas.includes(data)}
                                  isDisabled={origensSelecionadas.includes(data) && origensSelecionadas.length === 1}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    const value = data;
                                    setOrigensSelecionadas((prev) =>
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
                </DrawerBody>

                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancelar
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </>

        </Flex >


        {isLoading ? (
          <Stack>
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
          </Stack>
        ) : (
          <CardsComponent bottom3={bottom3} top3={top3} total={total} />
        )}
        
        {isLoading ? (
          <Stack>
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
          </Stack>
        ) : (
          <TableComponent dados={dados} />
        )}
      </Flex >
    </>

  )
}
