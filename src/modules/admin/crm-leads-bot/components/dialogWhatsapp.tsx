import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
  Tooltip,
  Text,
  Box,
  Flex,
  Input,
  Image,
} from "@chakra-ui/react";
import { useRef } from "react";
import { SiWhatsapp } from "react-icons/si";
import { useGetMensagensWhatsApp } from "../hooks/useGetMensagensWhatsApp";
import { LuCheck, LuCheckCheck, LuSendHorizonal } from "react-icons/lu";
import back from "../images/back-wpp.jpg";
import user from "../images/user.png";
import { formatDataHora } from "../../../../utils/mask/mascaras";

export default function DialogWhatsappComponent({ nome }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const { data } = useGetMensagensWhatsApp();
  const blocoDeMensagens = data || [];
  console.log(blocoDeMensagens);

  return (
    <>
      <Tooltip hasArrow placement="top" label="Enviar whatsapp">
        <Button
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
          onClick={onOpen}
          ref={btnRef}
        >
          <Text>WhatsApp</Text>
          <SiWhatsapp size={22} />
        </Button>
      </Tooltip>
      <Drawer
        size={"xl"}
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          bgImage={`url(${back})`}
          bgSize="cover"
          bgPosition="center"
        >
          <Flex
            zIndex={99}
            borderRadius={"0 0 10px 10px"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            pos={"fixed"}
            top={0}
            left={0}
            bg={"white"}
            w={"100%"}
            p={2}
          >
            <Image mb={-2} alt="imagem do usuario" src={user} w={50} />
            <Text fontWeight={"semibold"} fontSize={22}>
              {nome}
            </Text>
          </Flex>

          <DrawerBody py={20} w={"100%"} pos={"relative"}>
            {blocoDeMensagens.map((dataMsg: any) => (
              <Flex
                zIndex={1}
                alignItems={"center"}
                w={"100%"}
                justifyContent={
                  dataMsg?.direction === "in" ? "flex-start" : "flex-end"
                }
                key={dataMsg?.idMensagem}
              >
                <Box
                  zIndex={2}
                  mb={2}
                  borderRadius={
                    dataMsg?.direction === "in"
                      ? "0 14px 14px 14px"
                      : "14px 0 14px 14px"
                  }
                  p={2}
                  maxW={"450px"}
                  color={dataMsg?.direction === "in" ? "white" : "black"}
                  bg={dataMsg?.direction === "in" ? "#229544" : "gray.200"}
                >
                  {/* respondeu em cima de texto */}
                  <Text
                    border={
                      dataMsg?.direction === "in"
                        ? "1px solid white"
                        : "1px solid black"
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
                  <Text
                    mt={2}
                    display={dataMsg?.type !== "text" ? "none" : "flex"}
                  >
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
                  <Box
                    display={
                      dataMsg?.mimetype?.includes("audio") ? "flex" : "none"
                    }
                  >
                    <audio controls>
                      <source
                        src={dataMsg?.mensagem}
                        type={dataMsg?.mimetype}
                      />
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
                        {dataMsg?.status === "Recebida" ? (
                          <LuCheck size={22} />
                        ) : (
                          <LuCheckCheck size={22} color="blue" />
                        )}
                      </>
                    )}
                  </Flex>
                </Box>
              </Flex>
            ))}

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
              <Input
                rounded={"2xl"}
                bg={"gray.200"}
                variant={"ghost"}
                placeholder="Digite a sua mensagem..."
              />
              <Button
                colorScheme="none"
                _hover={{ bg: "gray.300" }}
                borderRadius={"50%"}
                w={"50px"}
                h={"50px"}
                bg={"gray.200"}
              >
                <LuSendHorizonal color="gray" size={32} />
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
