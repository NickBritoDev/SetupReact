import { useState, useEffect, Key } from "react";
import {
  Avatar,
  AvatarGroup,
  Badge,
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
} from "@chakra-ui/react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { useMobile } from "../../../../helpers/responsividade/useMediaQuery";
import logo from "../images/logo.png";
import { CardType, FiltrosType } from "../types/types";
import { useGetProdutos } from "../hooks/useGetProdutos";
import DialogSolicitacaoAcessoComponent from "./dialogSolicitacaoAcesso";
import { useGetMinhaConta } from "../../../../hooks/useGetMinhaConta";

export default function CardsComponent({ filters }: FiltrosType) {
  const { data, isLoading } = useGetProdutos();
  const [filteredData, setFilteredData] = useState<CardType[]>([]);
  const isMobile = useMobile();
  const { data: minhaConta } = useGetMinhaConta();

  useEffect(() => {
    if (!isLoading && data) {
      let newFilteredData: CardType[] = [...data];

      if (filters.ferramentas.length > 0) {
        newFilteredData = newFilteredData.filter((f: CardType) =>
          filters.ferramentas.includes(f.ferramenta),
        );
      }
      if (filters.status.length > 0) {
        newFilteredData = newFilteredData.filter((f: CardType) => {
          const status = f.ativo ? "Ativos" : "Inativos";
          return filters.status.includes(status);
        });
      }
      if (filters.grupos.length > 0) {
        newFilteredData = newFilteredData.filter((f: CardType) => {
          const grupo =
            f.grupo.length > 0
              ? "Com grupo de confiança"
              : "Sem grupo de confiança";
          return filters.grupos.includes(grupo);
        });
      }

      setFilteredData(newFilteredData);
    }
  }, [filters, data, isLoading]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Grid
      h={"100vh"}
      templateColumns={isMobile ? "repeat(1, 1fr)" : "repeat(4, 1fr)"} // Use a variável isMobile aqui
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
              <Badge
                top={1}
                right={6}
                pos={"absolute"}
                colorScheme={
                  card.status === "Liberado"
                    ? "green"
                    : card.status === "Não Solicitado"
                      ? "orange"
                      : "red"
                }
              >
                {card.status}
              </Badge>
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
              display={card.grupo.length > 3 ? "flex" : "none"}
              alignItems={"center"}
              justifyContent={"center"}
              mb={-3}
            >
              <AvatarGroup size="sm" max={2}>
                {card.grupo.map((member, index) => (
                  <Avatar
                    key={index}
                    name={member.nome}
                    src={`https://appbancos.s3.amazonaws.com/${member.foto}`}
                  />
                ))}
              </AvatarGroup>
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Grid>
  );
}
