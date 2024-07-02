import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
  Tooltip,
  Text,
  Flex,
  Image,
  Spinner,
  Select,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { useGetMensagensWhatsApp } from "../../hooks/useGetMensagensWhatsApp";
import { usePostMensagensWhatsApp } from "../../hooks/usePostMensagensWhatsApp";
import MensagensWhatsappComponent from "./mensagensWhatsapp";
import back from "../../images/back-wpp.jpg";
import user from "../../images/user.png";
import InputWhatsappConponent from "./inputWhatsapp";
import { useGetMinhaConta } from "../../../../../hooks/useGetMinhaConta";
import { useGetInstanciasWhatsApp } from "../../hooks/useGetInstanciasWhatsApp";

export default function DialogWhatsappComponent({
  nome,
  idLead,
  telefone,
}: any) {
  const { data: minhaConta } = useGetMinhaConta();
  const [mensagemOut, setMensagemOut] = useState("");
  const [instanciaOut, setInstanciaOut] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [carregamentoMsgs, setCarregamentoMsgs] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const { data, isSuccess } = useGetMensagensWhatsApp(idLead, instanciaOut);
  const { data: instancias } = useGetInstanciasWhatsApp();
  const blocoDeMensagens = data || [];
  const { UseRequestPostMensagensWhatsApp } = usePostMensagensWhatsApp();

  const enviarMensagem = () => {
    setIsLoading(true);
    const payload = {
      id_acesso: minhaConta?.idAcesso,
      idLead: idLead,
      instance: instanciaOut,
      body: mensagemOut,
      chatId: telefone,
    };
    UseRequestPostMensagensWhatsApp(payload);
    setMensagemOut("");

    if (isSuccess) {
      setTimeout(() => {
        setIsLoading(false);
      }, 5000);
    }
  };

  return (
    <>
      <Tooltip hasArrow placement="top" label="Enviar whatsapp">
        <Button
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
          onClick={() => {
            setCarregamentoMsgs(true);
            onOpen();
            setTimeout(() => {
              setCarregamentoMsgs(false);
            }, 2500);
          }}
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
            justifyContent={"space-between"}
            pos={"fixed"}
            top={0}
            left={0}
            bg={"white"}
            w={"100%"}
            p={2}
          >
            <Flex
              w={"100%"}
              alignItems={"center"}
              justifyContent={"flex-start"}
            >
              <Image mb={-2} alt="imagem do usuario" src={user} w={50} />
              <Text fontWeight={"semibold"} fontSize={22}>
                {nome}
              </Text>
            </Flex>

            <Select
              w={"550px"}
              placeholder="Selecione a instancia a ser trabalhada..."
              onChange={(e) => {
                setInstanciaOut(e.target.value);
                setCarregamentoMsgs(true);
                setTimeout(() => {
                  setCarregamentoMsgs(false);
                }, 5000);
              }}
            >
              {instancias &&
                instancias.map((instances: any, index: any) => (
                  <option key={index} value={instances.instance}>
                    {instances.instance.replaceAll("-", " ")}
                  </option>
                ))}
            </Select>
          </Flex>

          <DrawerBody py={20} w={"100%"} pos={"relative"}>
            {carregamentoMsgs ? (
              <Flex alignItems={"center"} justifyContent={"center"} mt={"35%"}>
                <Spinner size={"xl"} color="white" />
              </Flex>
            ) : (
              blocoDeMensagens.map((dataMsg: any) => (
                <MensagensWhatsappComponent
                  key={dataMsg.id}
                  dataMsg={dataMsg}
                />
              ))
            )}

            <InputWhatsappConponent
              enviarMensagem={enviarMensagem}
              isLoading={isLoading}
              mensagemOut={mensagemOut}
              setMensagemOut={setMensagemOut}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
