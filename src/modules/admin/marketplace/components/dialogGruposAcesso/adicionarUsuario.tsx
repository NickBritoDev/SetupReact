import { IGruposAcesso } from "../../types/types";
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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { FaPlus } from "react-icons/fa";
import { useGetUsuarios } from "../../hooks/useGetUsuarios";

type Props = IGruposAcesso & { cnpj: string };

export default function AdicionarUsuarioComponent(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  const handleClose = () => {
    onClose();
  };

  const { data } = useGetUsuarios({ cnpjMatriz: props.cnpj });

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
    console.log(payload);
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
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Usuários</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY={"scroll"}>
            <Box as="form" onSubmit={formik.handleSubmit} h="100%" w="100%">
              <Flex>
                {filteredData.map((usuario) => (
                  <Box>
                    <FormLabel htmlFor={`id-${usuario.id_acesso}`}>
                      <Checkbox
                        name="ids"
                        value={usuario.id_acesso}
                        onChange={formik.handleChange}
                      >
                        {usuario.nome}
                      </Checkbox>
                    </FormLabel>
                  </Box>
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
