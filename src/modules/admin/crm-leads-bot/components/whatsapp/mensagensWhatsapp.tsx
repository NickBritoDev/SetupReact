import { LuCheck, LuCheckCheck } from "react-icons/lu";
import { formatDataHora } from "../../../../../utils/mask/mascaras";
import { Text, Box, Flex, Image } from "@chakra-ui/react";

export default function MensagensWhatsappComponent({ dataMsg }: any) {
  return (
    <Flex
      zIndex={1}
      alignItems={"center"}
      w={"100%"}
      justifyContent={dataMsg?.direction === "in" ? "flex-start" : "flex-end"}
      key={dataMsg?.idMensagem}
    >
      <Box
        display={dataMsg?.type === "e2e_notification" ? "none" : "block"}
        zIndex={2}
        mb={2}
        borderRadius={
          dataMsg?.direction === "in" ? "0 14px 14px 14px" : "14px 0 14px 14px"
        }
        p={2}
        maxW={"450px"}
        color={dataMsg?.direction === "in" ? "white" : "black"}
        bg={dataMsg?.direction === "in" ? "#229544" : "gray.200"}
      >
        {/* respondeu em cima de texto */}
        <Text
          border={
            dataMsg?.direction === "in" ? "1px solid white" : "1px solid black"
          }
          p={2}
          rounded={"lg"}
          bg={dataMsg?.direction === "in" ? "green" : "gray.400"}
          display={
            dataMsg?.quotedMsgId !== null &&
            !dataMsg?.mensagemRespondida?.message.includes("http") &&
            dataMsg?.mensagemRespondida?.message
              ? "flex"
              : "none"
          }
        >
          {dataMsg?.mensagemRespondida?.message}
        </Text>
        {/* texto */}
        <Text mt={2} display={dataMsg?.type !== "text" ? "none" : "flex"}>
          {dataMsg?.mensagem}
        </Text>
        {/* imagem */}
        <Image
          maxW={"350px"}
          maxH={"400px"}
          src={dataMsg?.mensagem}
          display={dataMsg?.type === "image" ? "flex" : "none"}
        />
        {/* audio */}
        <Box display={dataMsg?.mimetype?.includes("audio") ? "flex" : "none"}>
          <audio controls>
            <source src={dataMsg?.mensagem} type={dataMsg?.mimetype} />
          </audio>
        </Box>
        <Flex
          gap={2}
          mt={2}
          pt={1}
          borderTop={"1px solid"}
          fontWeight={"semibold"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          {dataMsg?.direction === "in" ? (
            <>
              {dataMsg?.status === "Recebida" ? (
                <LuCheck size={22} />
              ) : (
                <LuCheckCheck size={22} color="blue" />
              )}
              {formatDataHora(dataMsg?.dataMensagem).slice(11, 17)}
            </>
          ) : (
            <>
              {formatDataHora(dataMsg?.dataMensagem).slice(11, 17)}
              {dataMsg?.status === "Entregue" ? (
                <LuCheck size={22} />
              ) : (
                <LuCheckCheck size={22} color="blue" />
              )}
            </>
          )}
        </Flex>
      </Box>
    </Flex>
  );
}
