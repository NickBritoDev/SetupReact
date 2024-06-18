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

const ferramentas = [
  {
    ferramenta: "Simulador",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL7rqz8ic1a_VrB6RflA2i39AKcJtvEAwwhg&s",
    descricao:
      "Software de comunicação interna entre colaboradores, com diversar ferramentas",
    ativo: false,
    grupo: [],
  },
  {
    ferramenta: "Chatbot",
    foto: "https://img.freepik.com/vetores-gratis/letra-colorida-um-design-de-logotipo-gradiente_474888-2309.jpg",
    descricao:
      "Software de comunicação interna entre colaboradores, com diversar ferramentas",
    ativo: true,
    grupo: [
      {
        nome: "Nicolas Brito da Cruz",
        foto: "https://bit.ly/ryan-florence",
        idUsuario: 6810,
        ativo: true,
      },
      {
        nome: "Caio Emidio Daniel",
        foto: "https://bit.ly/sage-adebayo",
        idUsuario: 5776,
        ativo: true,
      },
      {
        nome: "Danillo Raimundo",
        foto: "https://bit.ly/kent-c-dodds",
        idUsuario: 6810,
        ativo: true,
      },
    ],
  },
  {
    ferramenta: "Disparador de Vagas",
    foto: "https://img.freepik.com/vetores-premium/elemento-de-design-de-lindo-beija-flor-de-vetor-livre-para-banners-cartazes-folhetos-e-folhetos_1009653-1.jpg",
    descricao:
      "Software de comunicação interna entre colaboradores, com diversar ferramentas",
    ativo: true,
    grupo: [
      {
        nome: "Nicolas Brito da Cruz",
        foto: "https://bit.ly/ryan-florence",
        idUsuario: 6810,
        ativo: true,
      },
      {
        nome: "Caio Emidio Daniel",
        foto: "https://bit.ly/sage-adebayo",
        idUsuario: 5776,
        ativo: true,
      },
      {
        nome: "Danillo Raimundo",
        foto: "https://bit.ly/kent-c-dodds",
        idUsuario: 6810,
        ativo: true,
      },
    ],
  },
  {
    ferramenta: "Confirmação de Propostas",
    foto: "https://png.pngtree.com/png-vector/20190225/ourmid/pngtree-circuit-logo-template-vector-png-image_704226.jpg",
    descricao:
      "Software de comunicação interna entre colaboradores, com diversar ferramentas",
    ativo: true,
    grupo: [
      {
        nome: "Nicolas Brito da Cruz",
        foto: "https://bit.ly/ryan-florence",
        idUsuario: 6810,
        ativo: true,
      },
      {
        nome: "Caio Emidio Daniel",
        foto: "https://bit.ly/sage-adebayo",
        idUsuario: 5776,
        ativo: true,
      },
      {
        nome: "Danillo Raimundo",
        foto: "https://bit.ly/kent-c-dodds",
        idUsuario: 6810,
        ativo: true,
      },
    ],
  },
];

export default function CardsComponent() {
  return (
    <Grid
      templateColumns={useMobile() ? "repeat(1, 1fr)" : "repeat(4, 1fr)"}
      gap={6}
    >
      {ferramentas.map((card, index) => (
        <Flex
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
                    <ModalComponent descricao={card.descricao} />
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
