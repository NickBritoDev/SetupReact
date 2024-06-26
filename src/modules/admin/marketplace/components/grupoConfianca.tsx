import {
  Button,
  Text,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Image,
  Checkbox,
} from "@chakra-ui/react";
import { useMobile } from "../../../../helpers/responsividade/useMediaQuery";
import { FcGoodDecision } from "react-icons/fc";
import { useGetUsuarios } from "../hooks/useGetUsuarios";
import { UsuariosType } from "../types/types";

export default function GrupoConfiancaComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: listaUsuarios } = useGetUsuarios();

  return (
    <>
      <Tooltip placement="left" hasArrow label={"Criar grupos de permissões"}>
        <Button
          onClick={onOpen}
          _hover={{ backgroundColor: "gray.600", color: "white" }}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
        >
          <Text display={useMobile() ? "none" : ""}>Grupo de confiança</Text>
          <FcGoodDecision size={22} />
        </Button>
      </Tooltip>
      <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar grupos de usúarios</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxH={"450px"} overflowY={"scroll"}>
            {listaUsuarios?.map((user: UsuariosType) => (
              <Flex
                boxShadow={"lg"}
                p={2}
                rounded={"2xl"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                gap={2}
                key={user.id_acesso}
              >
                <Checkbox
                  rounded={"md"}
                  border={"solid 0px black"}
                  colorScheme="green"
                />
                <Image
                  ml={2}
                  w={30}
                  borderRadius={"50%"}
                  src={`https://appbancos.s3.amazonaws.com/${user.foto}`}
                />
                <Flex
                  flexDir={"column"}
                  alignItems={"flex-start"}
                  justifyContent={"center"}
                >
                  <Text fontSize={14} fontWeight={"semibold"}>
                    <strong>NOME: </strong>
                    {user.nome}
                  </Text>
                  <Text fontSize={14} fontWeight={"semibold"}>
                    <strong>PERFIL: </strong>
                    {user.perfil}
                  </Text>
                </Flex>
              </Flex>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="green">Selecionar ferramenta</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
