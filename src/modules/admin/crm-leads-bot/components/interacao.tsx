import { Button, Text, Flex, Image, Heading, Tooltip } from "@chakra-ui/react";
import { LuPhoneOutgoing } from "react-icons/lu";
import { maskPhone } from "../../../../utils/mask/mascaras";
import { MdOutlineTextsms } from "react-icons/md";
import InfosComponent from "./infos";
import LogsComponent from "./logs";
import AgendaComponent from "./agenda";
import DialogEmailComponent from "./dialogEmail";
import DialogWhatsappComponent from "./whatsapp/dialogWhatsapp";
import { FaQrcode } from "react-icons/fa";

export default function InteracaoComponent({ user, detalhesLeads }: any) {
  const isNovo = detalhesLeads?.status === "Novo";
  const telefone = isNovo
    ? "(**) *********"
    : maskPhone(detalhesLeads?.telefone);
  const email = isNovo ? "email@exemple.com" : detalhesLeads?.email;
  const telefoneFormatado = "380" + detalhesLeads?.telefone;

  return (
    <Flex gap={10} w={"100%"}>
      <Flex
        w={"60%"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Image w={"150px"} src={user} alt="foto do usuario card" />
        <Heading mt={-4}>{detalhesLeads?.nome}</Heading>
        <Text
          sx={isNovo ? { filter: "blur(5px)" } : {}}
          fontWeight={"semibold"}
        >
          {email}
        </Text>

        <Flex
          flexDir={'column'}
          w={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
          ml={8}
          gap={2}
          mt={4}
        >
          <Tooltip
            hasArrow
            placement="top"
            label="Baixar gerenciado de instâncias"
          >
            <Button
              display={"none"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={2}
              onClick={() => {
                window.open(
                  "https://drive.google.com/file/d/10z9mE3cTBXvjTX6Vz2-Pz8oElJlv8a9g/view?usp=sharing",
                  "_blank",
                );
              }}
            >
              <FaQrcode size={22} />
            </Button>
          </Tooltip>

          <Tooltip hasArrow placement="top" label="Ligar para o cliente">
            <Button
              w={'100%'}
              colorScheme="orange"
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={2}
              onClick={() => {
                window.location.href = `zoiper:${telefoneFormatado}`;
              }}
            >
              <Text>Abir Discadora</Text>
              <LuPhoneOutgoing size={22} />
            </Button>
          </Tooltip>

          <Tooltip hasArrow placement="top" label="Enviar SMS">
            <Button
              display={"none"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={2}
            >
              <MdOutlineTextsms size={22} />
            </Button>
          </Tooltip>

          <DialogEmailComponent
            produto={detalhesLeads?.produto}
            email={detalhesLeads?.email}
          />

          <DialogWhatsappComponent
              produto={detalhesLeads?.produto}
            telefone={detalhesLeads.telefone}
            idLead={detalhesLeads.idLead}
            nome={detalhesLeads?.nome}
          />

          <AgendaComponent detalhesLeads={detalhesLeads} />
        </Flex>

        <LogsComponent detalhesLeads={detalhesLeads} />
      </Flex>

      <InfosComponent
        detalhesLeads={detalhesLeads}
        email={email}
        isNovo={isNovo}
        telefone={telefone}
      />
    </Flex>
  );
}
