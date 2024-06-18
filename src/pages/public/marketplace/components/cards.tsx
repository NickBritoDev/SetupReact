import { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { useMobile } from "../../../../helpers/responsividade/useMediaQuery";
import logo from "../images/logo.png";
import ModalComponent from "./modal";
import simuladorProposta from "../images/simuladorProposta.png";
import chatbot from "../images/chatbot.png";
import confirmacaowpp from "../images/confirmacaowpp.png";
import disparador from "../images/disparador.png";
import ferramentasData from "../../../../json/marketplace/data.json";
import { FiltrosType } from "../types/types";

const bannerImages: Record<string, string> = {
  simuladorProposta,
  chatbot,
  confirmacaowpp,
  disparador,
};

export default function CardsComponent({ filters }: FiltrosType) {
  const [filteredData, setFilteredData] = useState(ferramentasData);

  useEffect(() => {
    let newFilteredData = ferramentasData;

    if (filters.ferramentas.length > 0) {
      newFilteredData = newFilteredData.filter((f) =>
        filters.ferramentas.includes(f.ferramenta),
      );
    }
    if (filters.status.length > 0) {
      newFilteredData = newFilteredData.filter((f) => {
        const status = f.ativo ? "Ativos" : "Inativos";
        return filters.status.includes(status);
      });
    }
    if (filters.grupos.length > 0) {
      newFilteredData = newFilteredData.filter((f) => {
        const grupo =
          f.grupo.length > 0
            ? "Com grupo de confiança"
            : "Sem grupo de confiança";
        return filters.grupos.includes(grupo);
      });
    }

    setFilteredData(newFilteredData);
  }, [filters]);

  return (
    <Grid
      templateColumns={useMobile() ? "repeat(1, 1fr)" : "repeat(4, 1fr)"}
      gap={6}
    >
      {filteredData.map((card, index) => (
        <Flex
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
                colorScheme={card.ativo ? "green" : "red"}
              >
                {card.ativo ? "Ativo" : "Inativo"}
              </Badge>
              <Menu>
                <MenuButton
                  top={-2}
                  right={-6}
                  pos={"absolute"}
                  as={IconButton}
                  aria-label="Options"
                  icon={<BsThreeDots size={22} />}
                  variant="unstyled"
                />
                <MenuList mt={-4}>
                  <MenuItem>Solicitar cancelamento</MenuItem>
                  <MenuItem>Solicitar renovação</MenuItem>
                  <MenuItem>Solicitar acessos</MenuItem>
                  <MenuItem>Editar acessos</MenuItem>
                  <MenuItem>
                    <ModalComponent
                      banner={bannerImages[card.banner]}
                      descricao={card.descricao}
                      ferramenta={card.ferramenta}
                    />
                  </MenuItem>
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
                ml={-4}
                rounded={"xl"}
                w={"50px"}
                src={card.foto}
                alt="logo mais valor"
              />
            </Flex>

            <Flex alignItems={"center"} justifyContent={"center"} mb={-3}>
              <AvatarGroup size="sm" max={2}>
                {card.grupo.map((member) => (
                  <Avatar
                    key={member.idUsuario}
                    name={member.nome}
                    src={member.foto}
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
