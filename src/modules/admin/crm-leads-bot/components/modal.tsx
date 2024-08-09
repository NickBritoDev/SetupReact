import { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Button,
  Text,
  Flex,
  Tooltip,
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
  Switch,
  Wrap,
  WrapItem,
  Avatar,
  Input,
} from "@chakra-ui/react";
import { RiUserSettingsLine } from "react-icons/ri";
import user from "../images/user.png";
import back from "../images/back.png";
import RecepcaoComponent from "./recepcao";
import SidebarComponent from "./sidebar";
import InteracaoComponent from "./interacao";
import { Contato } from "../types/types";
import { useGetLeads } from "../hooks/useGetLeads";
import { FaQrcode } from "react-icons/fa";
import { useGetMinhaConta } from "../../../../hooks/useGetMinhaConta";
import { useGetFiltros } from "../hooks/useGetFiltros";
import { MdLogout } from "react-icons/md";
import { useMobile } from "@helpers/responsividade/useMediaQuery";
import { FcFilledFilter } from "react-icons/fc";

const ModalComponent: React.FC = () => {
  const [rangeData, setRangeData] = useState<string>("");
  const [produtosSelecionados, setProdutosSelecionados] = useState<string[]>(
    [],
  );
  const [origensSelecionadas, setOrigensSelecionadas] = useState<string[]>([]);
  const [statusSelecionados, setStatusSelecionados] = useState<string[]>(["1"]);
  const [subStatusSelecionados, setSubStatusSelecionados] = useState<string[]>(
    [],
  );

  const payload = {
    periodo: rangeData,
    produto: produtosSelecionados,
    origem: origensSelecionadas,
    status: statusSelecionados,
    subStatus: subStatusSelecionados,
  };

  const filtros = useGetFiltros();
  const { data: minhaConta } = useGetMinhaConta();
  const { data: contatos } = useGetLeads(payload);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenFiltros,
    onOpen: onOpenFiltros,
    onClose: onCloseFiltros,
  } = useDisclosure();
  const btnRef = useRef(null);

  const [detalhesLeads, setDetalhesLeads] = useState<Contato | any>(contatos);
  const [hideRecepcao, setHideRecepcao] = useState(false);

  const openDetailsLeads = (contato: Contato) => {
    setDetalhesLeads(contato);
    setHideRecepcao(true);
  };

  const buscaDadosRelatorio = async () => {
    const payload = {
      periodo: rangeData,
      produto: produtosSelecionados,
      origem: origensSelecionadas,
      status: statusSelecionados,
      subStatus: subStatusSelecionados,
    };

    try {
      console.log("buscou na funcao");
      const resultado = await useGetLeads(payload);
      setDetalhesLeads(resultado);
    } catch (error) {
      console.error("Erro ao buscar dados do relatório:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setProdutosSelecionados([...filtros?.data?.listaProdutos]);
      setOrigensSelecionadas([...filtros?.data?.listaOrigens]);
      setStatusSelecionados([...filtros?.data?.listaStatus]);

      const payload = {
        periodo: rangeData,
        produto: [...filtros?.data?.listaProdutos],
        origem: [...filtros?.data?.listaOrigens],
        status: [...filtros?.data?.listaStatus],
        subStatus: subStatusSelecionados,
      };

      console.log("buscou no  useeffect");
      const resultado = await useGetLeads(payload);
      setDetalhesLeads(resultado);
    };

    if (filtros.status === "success" && detalhesLeads === null) {
      fetchData();
    }
  }, [filtros]);

  useEffect(() => {
    buscaDadosRelatorio();
  }, [
    rangeData,
    produtosSelecionados,
    origensSelecionadas,
    statusSelecionados,
    subStatusSelecionados,
  ]);

  return (
    <>
      <Flex gap={2} mt={-4}>
        <Tooltip
          hasArrow
          placement="left"
          label="Gerenciador de Instâncias 64x"
        >
          <Button
            display={
              minhaConta.nome === "BRUNO CEZAR PEREIRA DE SOUZA" ||
              minhaConta.nome ===
                "ANNA CAROLINA BIGARELLI DE PAIVA / X-PARCEIRO RC CRED" ||
              minhaConta.nome ===
                "CAIO CASTRO PORFIRO DE ALMEIDA /X-PARCEIRO RC CRED" ||
              minhaConta.nome === "RAFAEL PEREIRA DOS SANTOS"
                ? "flex"
                : "none"
            }
            colorScheme="green"
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
            onClick={() => {
              const link = document.createElement("a");
              link.href =
                "https://appbancos.s3.sa-east-1.amazonaws.com/whadesk-3.0.0-setup+(1).exe";
              link.download = "whadesk-3.0.0-64xsetup.exe";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            <FaQrcode size={22} />
            <Text>Gerenciador de Instâncias 64x</Text>
          </Button>
        </Tooltip>
        <Button
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
          mr={2}
          colorScheme="blue"
          onClick={onOpen}
        >
          <Text>Gerenciamento de leads</Text>
          <RiUserSettingsLine size={22} />
        </Button>
      </Flex>

      <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody pos={"relative"}>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <>
                <Flex
                  pos={"absolute"}
                  top={0}
                  bg={"#229544"}
                  pl={4}
                  py={1}
                  boxShadow={"xl"}
                  borderRadius={"0 0 10px 10px"}
                  w={"100%"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Button
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    ref={btnRef}
                    bg={"white"}
                    color={"#229544"}
                    onClick={onOpenFiltros}
                  >
                    <Text>ABRIR FILTROS</Text> <FcFilledFilter size={22} />
                  </Button>

                  <Box mr={4} color={"white"}>
                    <Wrap>
                      <WrapItem
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        gap={2}
                      >
                        <Avatar
                          size={"sm"}
                          name={minhaConta?.nome}
                          src={minhaConta?.foto}
                        />

                        <Flex
                          display={useMobile() ? "none" : "flex"}
                          flexDir={"column"}
                          alignItems={"flex-end"}
                          justifyContent={"center"}
                        >
                          <Text fontWeight={"semibold"}>
                            {minhaConta?.nome}
                          </Text>
                          <Text
                            color={"brand.invert_color_subtitle"}
                            fontWeight={"semibold"}
                            fontSize={14}
                            mt={-2}
                          >
                            {minhaConta?.cnpjMatriz}
                          </Text>
                        </Flex>

                        <Tooltip hasArrow label="Sair" placement="left">
                          <Button
                            color={"brand.invert_colors"}
                            _hover={{ transform: "translateX(5px)" }}
                            colorScheme="transparent"
                            bg={"none"}
                            onClick={onClose}
                          >
                            <MdLogout size={24} />
                          </Button>
                        </Tooltip>
                      </WrapItem>
                    </Wrap>
                  </Box>
                </Flex>

                <Drawer
                  size={"sm"}
                  isOpen={isOpenFiltros}
                  placement="right"
                  onClose={onCloseFiltros}
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
                                  Data
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                              <Stack direction="column">
                                <Input
                                  type="date"
                                  value={rangeData}
                                  onChange={(e) => setRangeData(e.target.value)}
                                />
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
                                  (data: any, index: any) => (
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
                                        onChange={(e) => {
                                          setProdutosSelecionados(
                                            e.target.checked ? [data] : [],
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
                                  Status
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                              <Stack direction="column">
                                {filtros?.data?.listaStatus?.map(
                                  (statusData: any, index: any) => (
                                    <Flex key={index} flexDir="column">
                                      <Flex
                                        justifyContent="space-between"
                                        alignItems="center"
                                      >
                                        <Text>{statusData.status}</Text>
                                        <Switch
                                          isChecked={statusSelecionados.includes(
                                            statusData.id_status,
                                          )}
                                          onChange={(e) => {
                                            setStatusSelecionados(
                                              e.target.checked
                                                ? [statusData.id_status]
                                                : [],
                                            );
                                            setSubStatusSelecionados([]);
                                          }}
                                        />
                                      </Flex>
                                      {statusSelecionados.includes(
                                        statusData.id_status,
                                      ) &&
                                        statusData.subStatus.length > 0 && (
                                          <Stack px={6} mt={2}>
                                            {statusData.subStatus.map(
                                              (
                                                subStatus: any,
                                                subIndex: any,
                                              ) => (
                                                <Flex
                                                  key={subIndex}
                                                  justifyContent="space-between"
                                                  alignItems="center"
                                                >
                                                  <Text
                                                    fontWeight={"semibold"}
                                                    fontSize={14}
                                                  >
                                                    {subStatus.subStatus}
                                                  </Text>
                                                  <Switch
                                                    isChecked={subStatusSelecionados.includes(
                                                      subStatus.id_substatus,
                                                    )}
                                                    onChange={(e) => {
                                                      setSubStatusSelecionados(
                                                        e.target.checked
                                                          ? [
                                                              subStatus.id_substatus,
                                                            ]
                                                          : [],
                                                      );
                                                    }}
                                                  />
                                                </Flex>
                                              ),
                                            )}
                                          </Stack>
                                        )}
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
                                  (data: any, index: any) => (
                                    <Flex
                                      key={index}
                                      justifyContent="space-between"
                                      alignItems="center"
                                    >
                                      <Text>{data}</Text>
                                      <Switch
                                        isChecked={origensSelecionadas.includes(
                                          data,
                                        )}
                                        onChange={(e) => {
                                          setOrigensSelecionadas(
                                            e.target.checked ? [data] : [],
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
                      <Button variant="outline" mr={3} onClick={onCloseFiltros}>
                        Cancelar
                      </Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </>

              <SidebarComponent
                payload={payload}
                detalhesLeads={detalhesLeads}
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
                {hideRecepcao && (
                  <InteracaoComponent
                    detalhesLeads={detalhesLeads}
                    user={user}
                  />
                )}
                {!hideRecepcao && <RecepcaoComponent back={back} />}
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComponent;
