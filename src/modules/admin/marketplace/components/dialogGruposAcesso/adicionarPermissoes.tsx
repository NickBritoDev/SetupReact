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
import { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useGetPermissoes } from "../../hooks/useGetPermissoes";
import { usePostPermissoesGrupo } from "../../hooks/usePostPermissoesGrupo";

type Props = IGruposAcesso & { refetch: () => void };

export default function AdicionarPermissoesComponent(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { useRequestGetPermissoes, data } = useGetPermissoes();
  const {
    useRequestPostPermissoesGrupo,
    isLoading,
    data: postData,
  } = usePostPermissoesGrupo();

  const handleOpen = () => {
    onOpen();
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      useRequestGetPermissoes(props.id_produto);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isLoading && postData) {
      props.refetch();
    }
  }, [isLoading, postData]);

  const handleSubmit = (body: { chaves: string[] }) => {
    const payload = body.chaves.map((chave) => ({
      chave_permissao: chave,
      id_grupo: props.id,
    }));

    useRequestPostPermissoesGrupo(payload);
    formik.resetForm();
    handleClose();
  };

  const formik = useFormik<{ chaves: string[] }>({
    initialValues: {
      chaves: [],
    },
    onSubmit: handleSubmit,
  });

  const filtered =
    data?.filter(
      (chave) => !props.permissoes?.some((perm) => perm.chave === chave.chave),
    ) ?? [];

  return (
    <>
      <Button colorScheme="green" onClick={handleOpen} rightIcon={<FaPlus />}>
        Adicionar
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Permissões</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY={"scroll"}>
            <Box as="form" onSubmit={formik.handleSubmit} h="100%" w="100%">
              <Flex>
                {filtered.map((chave) => (
                  <Box>
                    <FormLabel htmlFor={chave.chave}>
                      <Checkbox
                        name="chaves"
                        id={chave.chave}
                        value={chave.chave}
                        onChange={formik.handleChange}
                      >
                        {chave.nome}
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
