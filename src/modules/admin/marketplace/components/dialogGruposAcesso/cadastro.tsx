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
import { useFormik } from "formik";
import * as yup from "yup";
import { usePostGrupo } from "../../hooks/usePostGrupo";
import { useEffect } from "react";

type Props = {
  idPromotora: number;
  idProduto: number;
  refetch: () => void;
};

type Form = {
  nome: string;
  id_produto: number;
};

export default function CadastroComponent(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { useRequestPostGrupo, isLoading, data } = usePostGrupo();

  const handleOpen = () => {
    onOpen();
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (!isLoading && data) {
      props.refetch();
    }
  }, [isLoading, data]);

  const handleSubmit = (data: Form) => {
    useRequestPostGrupo(data);
    handleClose();
  };

  const formik = useFormik<Form>({
    initialValues: {
      nome: "",
      id_produto: props.idProduto,
    },
    onSubmit: handleSubmit,
    validateOnBlur: true,
    validationSchema: yup.object({
      nome: yup.string().min(1).required("Nome é necessário"),
      id_produto: yup.number().min(1).required(),
    }),
  });

  return (
    <>
      <Button colorScheme="green" mb="3" onClick={handleOpen}>
        Cadastrar Grupo
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastrar Grupo</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY={"scroll"}>
            <Box as="form" onSubmit={formik.handleSubmit}>
              <FormControl
                isInvalid={formik.touched.nome && Boolean(formik.errors.nome)}
              >
                <FormLabel htmlFor="cadastro-nome-grupo">Nome</FormLabel>
                <Input
                  name="nome"
                  id="cadastro-nome-grupo"
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>{formik.errors.nome}</FormErrorMessage>
              </FormControl>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={handleClose}>
              Cancelar
            </Button>
            <Button colorScheme="green" onClick={formik.submitForm}>
              Cadastrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
