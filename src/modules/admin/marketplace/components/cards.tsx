import { useState, useEffect, Key } from "react";
import {
  Avatar,
  AvatarGroup,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Grid,
  Tooltip,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Heading,
} from "@chakra-ui/react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { useMobile } from "../../../../helpers/responsividade/useMediaQuery";
import logo from "../images/logo.png";
import { CardType, FiltrosType } from "../types/types";
import { useGetProdutos } from "../hooks/useGetProdutos";
import DialogSolicitacaoAcessoComponent from "./dialogSolicitacaoAcesso";
import { useGetMinhaConta } from "../../../../hooks/useGetMinhaConta";
import { FaSearch } from "react-icons/fa";
import { formatCNPJ } from "../../../../utils/mask/mascaras";
import solicitacaoAcesso from "../images/solicitacaoAcesso.png";

export default function CardsComponent({ filters }: FiltrosType) {
  const [cnpj, setCnpj] = useState("");
  const { data, isLoading, refetch } = useGetProdutos(cnpj);
  const [filteredData, setFilteredData] = useState<CardType[]>([]);
  const [showNoRequestsMessage, setShowNoRequestsMessage] = useState(false);
  const isMobile = useMobile();
  const { data: minhaConta } = useGetMinhaConta();

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCnpj = formatCNPJ(e.target.value);
    setCnpj(formattedCnpj);
  };

  useEffect(() => {
    if (!isLoading && data) {
      let newFilteredData: CardType[] = [...data];

      if (filters.ferramentas.length > 0) {
        newFilteredData = newFilteredData.filter((f: CardType) =>
          filters.ferramentas?.includes(f.ferramenta),
        );
      }
      if (filters.status.length > 0) {
        newFilteredData = newFilteredData.filter((f: CardType) => {
          const status = f.ativo ? "Ativos" : "Inativos";
          return filters.status?.includes(status);
        });
      }
      if (filters.grupos.length > 0) {
        newFilteredData = newFilteredData.filter((f: CardType) => {
          const grupo =
            f.grupo.length > 0
              ? "Com grupo de confiança"
              : "Sem grupo de confiança";
          return filters.grupos?.includes(grupo);
        });
      }

      setFilteredData(newFilteredData);
    }
  }, [filters, data, isLoading]);

  useEffect(() => {
    const hasValidGroup = filteredData.some((card) =>
      card.grupo.some((grupo) => grupo.status === "Pendente"),
    );
    setShowNoRequestsMessage(!hasValidGroup);
  }, [filteredData]);

  return (
    <>
      <Flex
        w={"100%"}
        direction="column"
        align="flex-start"
        justifyContent={"flex-start"}
      >
        <Flex
          alignItems={"center"}
          justifyContent={"flex-start"}
          pos={"absolute"}
          top={20}
          mb={4}
        >
          <Input
            placeholder="Digite o CNPJ"
            value={cnpj}
            onChange={handleCnpjChange}
            mr={2}
          />
          <Button
            onClick={() => {
              refetch();
            }}
          >
            <FaSearch size={30} />
          </Button>
        </Flex>

        <Grid
          w={"100%"}
          templateColumns={isMobile ? "repeat(1, 1fr)" : "repeat(4, 1fr)"}
          gap={6}
        >
          {filteredData.map((card: CardType, index: Key | null | undefined) => (
            <Flex
              h={"max-content"}
              mt={-4}
              key={index}
              boxShadow={"lg"}
              p={4}
              rounded={"xl"}
              border={"1px solid #229544"}
              w={"100%"}
              flexDir={"column"}
            >
              <Flex
                pos={"relative"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Text fontWeight={"semibold"}>{card.ferramenta}</Text>
                <Flex>
                  <Menu>
                    <Tooltip
                      mb={-4}
                      ml={-4}
                      placement="top"
                      hasArrow
                      label={"Exibir opções"}
                    >
                      <MenuButton
                        top={-2}
                        right={-6}
                        pos={"absolute"}
                        as={IconButton}
                        aria-label="Options"
                        icon={<BsThreeDots size={22} />}
                        variant="unstyled"
                      />
                    </Tooltip>
                    <MenuList mt={-4}>
                      <MenuItem>Solicitar cancelamento</MenuItem>
                      <MenuItem>Solicitar renovação</MenuItem>
                      <MenuItem>
                        <DialogSolicitacaoAcessoComponent
                          filteredData={card.grupo}
                          idPromotora={minhaConta.idPromotora}
                          idFerramenta={card.idFerramenta}
                        />
                      </MenuItem>
                      <MenuItem>Editar acessos</MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </Flex>

              <Flex
                w={"100%"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Flex
                  mt={4}
                  gap={4}
                  w={"100%"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                >
                  <Image
                    rounded={"xl"}
                    w={"50px"}
                    src={logo}
                    alt="logo mais valor"
                  />
                  <FaArrowRightArrowLeft color="gray" size={30} />
                  <Image
                    rounded={"xl"}
                    w={"50px"}
                    src={
                      card.foto !== null
                        ? `https://appbancos.s3.amazonaws.com/${card.foto}`
                        : "https://img.freepik.com/vetores-premium/design-de-logotipo-de-produtos-originais-e-icone-de-vetor-original-design-de-cracha-de-confianca_526569-594.jpg"
                    }
                    alt="logo mais valor"
                  />
                </Flex>

                <Flex
                  display={
                    card.grupo.some((grupo) => grupo.status === "Pendente")
                      ? "flex"
                      : "none"
                  }
                  alignItems={"center"}
                  justifyContent={"center"}
                  mb={-3}
                >
                  <AvatarGroup size="sm" max={2}>
                    {card.grupo.map(
                      (member, memberIndex) =>
                        member.status === "Pendente" && (
                          <Avatar
                            key={memberIndex}
                            name={member.nome}
                            src={`https://appbancos.s3.amazonaws.com/${member.foto}`}
                          />
                        ),
                    )}
                  </AvatarGroup>
                </Flex>
              </Flex>
            </Flex>
          ))}
        </Grid>

        {data && showNoRequestsMessage && (
          <Text fontSize={"18"} fontWeight={"semibold"} ml={2} mt={4} mb={4}>
            Nenhuma solicitação para essa ferramenta.
          </Text>
        )}

        {!showNoRequestsMessage && (
          <>
            <Text fontSize={"22"} fontWeight={"semibold"} ml={2} mt={4} mb={4}>
              Acompanhamento Solicitações
            </Text>
            <TableContainer
              boxShadow={"xl"}
              rounded={"2xl"}
              maxH={"380px"}
              overflowY={"scroll"}
              w={"100%"}
            >
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th textAlign={"center"}>Ferramenta</Th>
                    <Th isNumeric pr={8}>
                      Status
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredData.map(
                    (card: CardType, cardIndex: Key | null | undefined) =>
                      card.grupo.map(
                        (grupo, grupoIndex) =>
                          grupo.status === "Pendente" && (
                            <Tr key={`${cardIndex}-${grupoIndex}`}>
                              <Td>{grupo.nome}</Td>
                              <Td textAlign={"center"}>{card.ferramenta}</Td>
                              <Td isNumeric>
                                <Badge
                                  colorScheme={
                                    grupo.status === "Pendente"
                                      ? "orange"
                                      : grupo.status === "Liberado"
                                        ? "green"
                                        : grupo.status === "Recusado"
                                          ? "red"
                                          : "black"
                                  }
                                >
                                  {grupo.status}
                                </Badge>
                              </Td>
                            </Tr>
                          ),
                      ),
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </>
        )}
      </Flex>
      <Flex
        display={!data ? "flex" : "none"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDir={"column"}
        pos={"absolute"}
        bottom={20}
        w={"100%"}
      >
        <Image src={solicitacaoAcesso} w={"750px"} />
        <Heading size={"md"}>
          Digite o CNPJ do seu parceiro para solicitar o uso de ferramentas
          incriveis!!!
        </Heading>
      </Flex>
    </>
  );
}
