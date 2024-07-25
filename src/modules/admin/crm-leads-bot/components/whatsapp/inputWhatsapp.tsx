import { Button, Flex, Input, Spinner } from "@chakra-ui/react";
import { LuSendHorizonal } from "react-icons/lu";
import EnviarArquivosComponents from "./enviarArquivos";
import GravarAudioComponent from "./gravarAudio";

export default function InputWhatsappConponent({
  telefone,
  idLead,
  mensagemOut,
  setMensagemOut,
  isLoading,
  enviarMensagem,
}: any) {
  return (
    <Flex
      borderRadius={"10px 10px 0 0"}
      gap={2}
      align={"center"}
      justifyContent={"center"}
      pos={"fixed"}
      bottom={0}
      right={0}
      w={"100%"}
      p={2}
      zIndex={99}
      bg={"white"}
    >
      <EnviarArquivosComponents telefone={telefone} idLead={idLead} />
      <Input
        value={mensagemOut}
        onChange={(e) => {
          setMensagemOut(e.target.value);
        }}
        rounded={"2xl"}
        bg={"gray.200"}
        variant={"ghost"}
        placeholder="Digite a sua mensagem..."
      />
      <Button
        onClick={enviarMensagem}
        colorScheme="none"
        _hover={{ bg: "gray.300" }}
        borderRadius={"50%"}
        w={"50px"}
        h={"50px"}
        bg={"gray.200"}
      >
        {isLoading ? (
          <Spinner size={"sm"} color="green" />
        ) : (
          <LuSendHorizonal color="gray" size={32} />
        )}
      </Button>
      <GravarAudioComponent telefone={telefone} idLead={idLead} />
    </Flex>
  );
}
