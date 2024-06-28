import {
  Button,
  Text,
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
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { UsuariosType } from "../types/types";
import { useGetUsuarios } from "../hooks/useGetUsuarios";
import { useGetMinhaConta } from "../../../../hooks/useGetMinhaConta";
import { formatCNPJ } from "../../../../utils/mask/mascaras";
import { usePostSolicitacaoAcesso } from "../hooks/usePostSolicitacaoAcesso";

export default function DialogSolicitacaoAcessoComponent({
  idFerramenta,
  idPromotora,
}: any) {
  const toast = useToast();
  const { UseRequestSolicitacaoAcesso, isSuccess, isError } =
    usePostSolicitacaoAcesso();
  const { data: minhaConta } = useGetMinhaConta();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cnpj, setCnpj] = useState("");
  const { data: listaUsuarios } = useGetUsuarios({ cnpjMatriz: cnpj });
  const [cnpjValido, setCnpjValido] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const payload = selectedIds.map((idAcesso) => ({
    idAcesso,
    idProduto: idFerramenta,
    idPromotora,
  }));

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Solicitação criada com sucesso",
        description: "Em breve sua solicitação sera respondida",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }

    if (isError) {
      toast({
        title: "Erro ao criar solicitação",
        description: "Você pode tentar novamente em breve",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (listaUsuarios?.length > 0) {
      const isCnpjValido = listaUsuarios.some(
        (user: any) =>
          user.superintendente === minhaConta.nome ||
          user.gerente === minhaConta.nome ||
          user.supervisor === minhaConta.nome,
      );
      setCnpjValido(isCnpjValido);
      setLoading(false);
    } else {
      setLoading(false);
      setCnpjValido(false);
    }

    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, [listaUsuarios, minhaConta]);

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCnpj = formatCNPJ(e.target.value);
    if (formattedCnpj.length > 17) {
      setCnpj(formattedCnpj);
    }
  };

  const handleCheckboxChange = (idAcesso: number) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(idAcesso)
        ? prevSelectedIds.filter((id) => id !== idAcesso)
        : [...prevSelectedIds, idAcesso],
    );
  };

  const handleOpen = () => {
    setCnpj("");
    onOpen();
    setCnpjValido(true);
  };

  const handleClose = () => {
    setCnpj("");
    onClose();
    setCnpjValido(true);
  };

  return (
    <>
      <Text onClick={handleOpen}>Solicitar acessos</Text>

      <Modal size={"2xl"} isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar grupos de usuários</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxH={"450px"} overflowY={"scroll"}>
            <Flex mb={4} gap={2}>
              <Input
                maxLength={18}
                placeholder="Digite o CNPJ"
                value={cnpj}
                onChange={handleCnpjChange}
              />
              <Button
                onClick={() => {
                  setLoading(true);
                }}
                colorScheme="green"
                isDisabled={cnpj.length !== 18}
              >
                Pesquisar
              </Button>
            </Flex>
            {!loading &&
              cnpjValido &&
              listaUsuarios?.map((user: UsuariosType) => (
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
                    onChange={() => handleCheckboxChange(user.id_acesso)}
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

            {!loading && !cnpjValido && (
              <Text>
                O CNPJ digitado não pertence a um usuário abaixo de sua gestão
                ou está incorreto.
                <br />
                Revise o CNPJ digitado e tente novamente.
              </Text>
            )}

            {loading && (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="green.500"
                size="xl"
              />
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                UseRequestSolicitacaoAcesso({ payload });
                handleClose();
              }}
              colorScheme="green"
            >
              Finalizar solicitação
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
