import {
  Button, Flex,
  Stack,
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
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { usePostRelatoriosPorUsuario } from "./hooks/usePostRelatoriosPorUsuario";
import TableComponent from "./components/table";
import { useEffect, useRef, useState } from "react";
import { useGetFiltros } from "./hooks/useGetFiltros";
import CardsComponent from "./components/card";
import SkeletonComponent from "./components/skeleton";

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

        setTop3(result?.slice(0, 3));

        setBottom3(result?.slice(-3));

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


  return (
    <>
      {isLoading ? (
        <SkeletonComponent />
      ) : (
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

          </Flex >

          <CardsComponent bottom3={bottom3} top3={top3} total={total} />
          <TableComponent dados={dados} />
        </Flex >
      )
      }
    </>

  )
}
