import { Button, Flex, Spinner, Textarea } from "@chakra-ui/react";
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
  const handleKeyUp = (e: {
    [x: string]: any;
    key: string;
    shiftKey: boolean;
  }) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviarMensagem();
    }
  };

  return (
    <Flex
      borderRadius={"10px 10px 0 0"}
      gap={2}
      align={"center"}
      justifyContent={"center"}
      pos={"fixed"}
      bottom={-1}
      right={0}
      w={"100%"}
      p={2}
      zIndex={99}
      bg={"white"}
    >
      <Textarea
        onKeyDown={handleKeyUp}
        maxH={"1px"}
        resize={"none"}
        value={mensagemOut}
        onChange={(e) => {
          setMensagemOut(e.target.value);
        }}
        rounded={"2xl"}
        bg={"gray.200"}
        variant={"ghost"}
        placeholder="Digite a sua mensagem..."
      />
      <Flex flexDir={"column"} gap={1}>
        <EnviarArquivosComponents telefone={telefone} idLead={idLead} />
        <Button
          onClick={enviarMensagem}
          colorScheme="green"
          w={"45px"}
          h={"40px"}
        >
          {isLoading ? (
            <Spinner size={"sm"} color="green" />
          ) : (
            <LuSendHorizonal size={42} />
          )}
        </Button>
      </Flex>
      <GravarAudioComponent telefone={telefone} idLead={idLead} />
    </Flex>
  );
}
