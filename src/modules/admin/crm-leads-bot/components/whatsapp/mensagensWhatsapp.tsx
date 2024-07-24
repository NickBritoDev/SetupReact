import { LuCheck, LuCheckCheck, LuX, LuDownload, LuClock } from "react-icons/lu";
import { formatDataHora } from "../../../../../utils/mask/mascaras";
import { Text, Box, Flex, Image, Link } from "@chakra-ui/react";
import excelIMG from '../../images/excel-logo.png'
import wordIMG from '../../images/word-logo.png'
import pdfIMG from '../../images/pdf-logo.jpg'

export default function MensagensWhatsappComponent({ dataMsg }: any) {
  const renderDownloadIcon = (url: any) => {
    const fileTypes = ["pdf", "xlsx", "docx", "txt"];
    const fileExtension = url?.split('.').pop();
    if (fileTypes?.includes(fileExtension)) {
      return (
        <Link display={"flex"} flexDir={"column"} alignItems={"flex-start"} justifyContent={"space-between"} gap={10} href={url} isExternal>
          {fileExtension === 'xlsx' &&
            <Image boxShadow={'2xl'} w={'250px'} rounded={'2xl'} bg={'white'} src={excelIMG} alt="excel logo" />
          }
          {fileExtension === 'docx' &&
            <Image boxShadow={'2xl'} w={'250px'} rounded={'2xl'} bg={'white'} src={wordIMG} alt="excel logo" />
          }
          {fileExtension === 'pdf' &&
            <Image boxShadow={'2xl'} w={'250px'} rounded={'2xl'} bg={'white'} src={pdfIMG} alt="excel logo" />
          }
          <Flex rounded={'2xl'} p={2} bg={'white'} color={"green"} alignItems={"center"} justifyContent={"center"} gap={4}>
            <Text>Clique para fazer download</Text>
            <LuDownload size={30} />
          </Flex>
        </Link>
      );
    }
    return null;
  };

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
        color={dataMsg?.direction === "in" ? "black" : "black"}
        bg={dataMsg?.direction === "in" ? "#C5F1AE" : "whitesmoke"}
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
              !dataMsg?.mensagemRespondida?.message?.includes("http") &&
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
          boxShadow={'2xl'}
          rounded={'2xl'}
          maxW={"350px"}
          maxH={"400px"}
          src={dataMsg?.mensagem}
          display={dataMsg?.type === 'image' || dataMsg?.mensagem?.includes('image') || dataMsg?.mensagem?.includes('webp') || dataMsg?.mensagem?.includes('jpeg') || dataMsg?.mensagem?.includes('png') || dataMsg?.mensagem?.includes('jpg ') ? "flex" : "none"}
        />
        {/* video  */}
        <Box display={dataMsg?.mensagem?.includes('video') || dataMsg?.mensagem?.includes('mp4') ? "" : "none"}
          maxW="250px" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <video width="100%" controls>
            <source src={dataMsg?.mensagem} type="video/mp4" />
            Seu navegador não suporta a tag de vídeo.
          </video>
        </Box>
        {/* audio */}
        <Box w={'100%'} display={dataMsg?.mensagem?.includes("audio") || dataMsg?.mensagem?.includes("oga") || dataMsg?.mensagem?.includes("mp3") || dataMsg?.mensagem?.includes("wav") || dataMsg?.mensagem?.includes("webm") ? "flex" : "none"}>
          <audio controls>
            <source src={dataMsg?.mensagem} type={dataMsg?.mimetype} />
          </audio>
        </Box>
        {/* download */}
        <Box mt={2} display={dataMsg?.type === "document" ? "flex" : "none"}>
          {renderDownloadIcon(dataMsg?.mensagem)}
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
          {dataMsg?.direction === "out" ? (

            <>
              {formatDataHora(dataMsg?.dataMensagem).slice(11, 17)}
              {dataMsg?.status === "Entregue" || dataMsg?.status === "Recebida" ? (
                <LuCheck size={22} />
              ) : dataMsg?.status === "Erro" ? (
                <LuX size={22} color="red" />
              ) : dataMsg?.status === "Lida" ? (
                <LuCheckCheck size={22} color="blue" />
              ) : dataMsg?.status === "Enviado" ? (
                <LuClock size={22} color="gray" />
              ) : null}
            </>
          ) : (
            formatDataHora(dataMsg?.dataMensagem).slice(11, 17)
          )}
        </Flex>
      </Box>
    </Flex>
  );
}
