import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { IGruposAcesso } from "../../types/types";
import { useFormik } from "formik";
import { usePutGrupoAcesso } from "../../hooks/usePutGruposAcesso";
import { useEffect } from "react";

type Props = IGruposAcesso & { refetch: () => void };

export default function EditarComponent(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  const handleClose = () => {
    onClose();
  };

  const { useRequestPutGrupoAcesso, isLoading, data } = usePutGrupoAcesso();

  useEffect(() => {
    if (data && !isLoading) {
      props.refetch();
    }
  }, [data, isLoading]);

  const handleSubmit = (data: Props) => {
    useRequestPutGrupoAcesso(data);
    formik.resetForm();
    handleClose();
  };

  const formik = useFormik<Props>({
    initialValues: props,
    onSubmit: handleSubmit,
  });

  const ativarGrupo = () => {
    formik.setFieldValue("ativo", true);

    formik.submitForm();
  };

  return (
    <>
      <Button colorScheme="blue" mr="2" onClick={handleOpen}>
        Editar
      </Button>
      {!props.ativo && (
        <Button colorScheme="green" mr="2" onClick={ativarGrupo}>
          Ativar Grupo
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Grupo {props.nome}</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY={"scroll"}>
            <Box as="form" onSubmit={formik.handleSubmit}>
              <FormControl
                isInvalid={formik.touched.nome && Boolean(formik.errors.nome)}
              >
                <FormLabel>Nome</FormLabel>
                <Input
                  name="nome"
                  value={formik.values.nome}
                  onChange={formik.handleChange}
                  type="text"
                />
                <FormErrorMessage>{formik.errors.nome}</FormErrorMessage>
              </FormControl>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={handleClose}>
              Cancelar
            </Button>
            <Button colorScheme="green" onClick={formik.submitForm} mr="3">
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
