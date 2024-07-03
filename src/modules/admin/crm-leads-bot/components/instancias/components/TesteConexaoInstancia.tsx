import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Tooltip,
  Input,
  useToast,
} from "@chakra-ui/react";
import { TbPlugConnected } from "react-icons/tb";
import { useTesteInstancia } from "./hooks/useTesteInstancia";

export default function TesteConexaoInstancia({ instancia }: any) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { UseRequestTesteInstancia, instanceTeste } =
    useTesteInstancia(instancia);

  const [numero, setNumero] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!instanceTeste) return;
    if (instanceTeste.status) {
      toast({
        title: instancia,
        description: "Teste realizado com sucesso!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: instancia,
        description: "Falha ao realizar teste!",
        status: "info",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [instanceTeste, toast, instancia]);

  return (
    <>
      <Tooltip
        hasArrow
        label="Testar Conexão da Instância"
        bg="blue"
        placement="top"
      >
        <Button colorScheme="blue" onClick={onOpen}>
          <TbPlugConnected size={20} />
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Teste de Conexão</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={msg}
              onChange={(e) => {
                setMsg(e.target.value);
              }}
              variant={"flushed"}
              placeholder="Digite sua mensagem de teste"
              mt={4}
            />
            <Input
              value={numero}
              onChange={(e) => {
                setNumero(e.target.value);
              }}
              variant={"flushed"}
              placeholder="Digite o número para teste"
              mt={4}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                UseRequestTesteInstancia({
                  chatId: `55${numero}@c.us`,
                  body: msg,
                });
                setMsg("");
                setNumero("");
              }}
            >
              Enviar Teste
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
