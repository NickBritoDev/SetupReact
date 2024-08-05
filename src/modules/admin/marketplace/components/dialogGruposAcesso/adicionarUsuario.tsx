import { IGruposAcesso, UsuariosTypeStatus } from "../../types/types";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  useDisclosure,
  Flex,
  Box,
  FormLabel,
  Checkbox,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { FaPlus } from "react-icons/fa";
import { usePostUsuariosGrupo } from "../../hooks/usePostUsuarioGrupo";
import { useEffect } from "react";
import { useGetSolicitacoesAcesso } from "../../hooks/useGetSolicitacoesAcesso";
import { getSrcImageURL } from "@helpers/conta/imagem";
import { useGetMinhaConta } from "../../../../../hooks/useGetMinhaConta";

type Props = IGruposAcesso & { cnpj: string; refetch: () => void };

export default function AdicionarUsuarioComponent(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { useRequestPostUsuarioGrupo, isLoading, isSuccess } =
    usePostUsuariosGrupo();
  const { data: minhaConta, isSuccess: minhaContaSuccess } = useGetMinhaConta();

  const handleOpen = () => {
    onOpen();
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (isOpen && minhaConta) {
      useRequestGetSolicitacoesAcesso({
        where: {
          status: UsuariosTypeStatus.Liberado,
          id_produto: props.id_produto,
          id_promotora: props.id_promotora,
        },
        whereNot: {
          id_acesso: minhaConta.idAcesso,
        },
      });
    }
  }, [isOpen, minhaConta]);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      props.refetch();
    }
  }, [isLoading, isSuccess]);

  const { data, useRequestGetSolicitacoesAcesso } = useGetSolicitacoesAcesso();

  const filteredData =
    data?.filter(
      (usuario) =>
        !props.usuarios?.some((usr) => usuario.id_acesso === usr.id_acesso),
    ) ?? [];

  const handleSubmit = (body: { ids: string[] }) => {
    const payload = body.ids.map((id) => ({
      id_acesso: Number(id),
      id_grupo: props.id,
    }));
    useRequestPostUsuarioGrupo(payload);
    formik.resetForm();
    handleClose();
  };

  const formik = useFormik<{ ids: string[] }>({
    initialValues: {
      ids: [],
    },
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Button colorScheme="green" onClick={handleOpen} rightIcon={<FaPlus />}>
        Adicionar
      </Button>
      <Modal size={"5xl"} isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Usuários</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY={"scroll"}>
            <Box as="form" onSubmit={formik.handleSubmit} h="100%" w="100%">
              <Flex flexWrap={"wrap"} gap={5}>
                {filteredData.map((usuario) => (
                  <FormLabel
                    htmlFor={`id-${usuario.id_acesso}`}
                    key={usuario.id_acesso}
                    bg={
                      formik.values.ids.includes(String(usuario.id_acesso))
                        ? "green"
                        : "transparent"
                    }
                    cursor={"pointer"}
                    display={"flex"}
                    alignItems={"center"}
                    maxW={"30%"}
                    gap={2}
                    rounded={"xl"}
                    p={2}
                    border={"1px solid #eee"}
                  >
                    <Checkbox
                      name="ids"
                      id={`id-${usuario.id_acesso}`}
                      value={usuario.id_acesso}
                      onChange={formik.handleChange}
                      display={"none"}
                    />
                    <Avatar
                      name={usuario.nome}
                      src={getSrcImageURL(usuario.foto)}
                    />
                    <Text>{usuario.nome}</Text>
                  </FormLabel>
                ))}
              </Flex>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={handleClose}>
              Cancelar
            </Button>
            <Button colorScheme="green" mr={3} onClick={formik.submitForm}>
              Adicionar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
