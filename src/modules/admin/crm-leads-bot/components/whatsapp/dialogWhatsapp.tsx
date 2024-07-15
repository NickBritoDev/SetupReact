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
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { useGetMensagensWhatsApp } from "../../hooks/whatsapp/useGetMensagensWhatsApp";
import { usePostMensagensWhatsApp } from "../../hooks/whatsapp/usePostMensagensWhatsApp";
import { useGetInstanciasWhatsApp } from "../../hooks/whatsapp/useGetInstanciasWhatsApp";
import MensagensWhatsappComponent from "./mensagensWhatsapp";
import back from "../../images/back-wpp.jpg";
import user from "../../images/user.png";
import InputWhatsappConponent from "./inputWhatsapp";
import { useGetMinhaConta } from "../../../../../hooks/useGetMinhaConta";

export default function DialogWhatsappComponent({
  produto,
  nome,
  idLead,
  telefone,
}: any) {
  const { data: minhaConta } = useGetMinhaConta();
  const [mensagemOut, setMensagemOut] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [carregamentoMsgs, setCarregamentoMsgs] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const { data: instancias } = useGetInstanciasWhatsApp();
  const minhaInstancia =
    instancias && instancias[0] ? instancias[0].instance : null;
  const { data, isSuccess } = useGetMensagensWhatsApp(idLead, minhaInstancia);
  const blocoDeMensagens = data || [];
  const { UseRequestPostMensagensWhatsApp } = usePostMensagensWhatsApp();

  let nomeFormatado = minhaConta?.nome?.toLowerCase()
    .replace(/(?:^|\s)\S/g, function(a: string) { return a.toUpperCase(); });

  const enviarMensagem = () => {
    setIsLoading(true);
    const payload = {
      id_acesso: minhaConta?.idAcesso,
      idLead: idLead,
      instance: minhaInstancia,
      body: mensagemOut,
      chatId: telefone,
    };
    UseRequestPostMensagensWhatsApp(payload);
    setMensagemOut("");

    if (isSuccess) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2500);
    }
  };

  return (
    <>
      <Tooltip hasArrow placement="top" label="Enviar whatsapp">
        <Button
          w={'100%'}
          colorScheme="green"
          display={"none"}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={2}
          onClick={() => {
            setCarregamentoMsgs(true);
            onOpen();
            setTimeout(() => {
              setCarregamentoMsgs(false);
            }, 10000);
          }}
          ref={btnRef}
        >
          <Text>Abrir WhatsApp</Text>
          <SiWhatsapp size={22} />
        </Button>
      </Tooltip>
      <Tooltip hasArrow placement="top" label="Enviar whatsapp">
        <Button
         as="a"
         href={`https://api.whatsapp.com/send?phone=+55${telefone}&text=Olá, ${nome}, me chamo ${nomeFormatado} e vim pelo seu interesse em contratar ${produto} e gostaria de te ajudar a escolher a melhor opção, podemos conversar?`}
         target="_blank"
         rel="noopener noreferrer"
          w={'100%'}
          colorScheme="green"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={2}
          ref={btnRef}
        >
          <Text>Abrir WhatsApp</Text>
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
