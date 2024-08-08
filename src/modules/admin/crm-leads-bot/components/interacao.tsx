import { Button, Text, Flex, Image, Heading, Tooltip } from "@chakra-ui/react";
import { LuPhoneOutgoing } from "react-icons/lu";
import { maskPhone, removePrefix } from "../../../../utils/mask/mascaras";
import { MdOutlineTextsms } from "react-icons/md";
import InfosComponent from "./infos";
import LogsComponent from "./logs";
// import AgendaComponent from "./agenda";
import DialogEmailComponent from "./dialogEmail";
import { useGetMinhaConta } from "../../../../hooks/useGetMinhaConta";
import DialogWhatsappComponent from "./whatsapp/dialogWhatsapp";
import { SiWhatsapp } from "react-icons/si";

export default function InteracaoComponent({ user, detalhesLeads }: any) {
  const { data: minhaConta } = useGetMinhaConta();
  const isNovo = detalhesLeads?.status === "Novo";
  const telefone = isNovo
    ? "(**) *********"
    : maskPhone(detalhesLeads?.telefone);
  const email = isNovo ? "email@exemple.com" : detalhesLeads?.email;
  const telefoneFormatado = "380" + detalhesLeads?.telefone;
  let nomeFormatado = minhaConta?.nome
    ?.toLowerCase()
    .replace(/(?:^|\s)\S/g, function (a: string) {
      return a.toUpperCase();
    });

  return (
    <Flex gap={10} w={"100%"}>
      <Flex
        mt={-6}
        w={"60%"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Image w={"130px"} src={user} alt="foto do usuario card" />
        <Heading textAlign={"center"} mt={-4}>
          {detalhesLeads?.nome}
        </Heading>
        <Text
          sx={isNovo ? { filter: "blur(5px)" } : {}}
          fontWeight={"semibold"}
        >
          {email}
        </Text>

        <Flex
          w={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
          ml={8}
          gap={2}
          mt={4}
        >
          <Tooltip hasArrow placement="top" label="Ligar para o cliente">
            <Button
              w={"100%"}
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
          {minhaConta.nome === "BRUNO CEZAR PEREIRA DE SOUZA" ||
          minhaConta.nome ===
            "ANNA CAROLINA BIGARELLI DE PAIVA / X-PARCEIRO RC CRED" ? (
            <>
              <DialogWhatsappComponent
                produto={detalhesLeads?.produto}
                telefone={removePrefix(detalhesLeads.telefone)}
                idLead={detalhesLeads.idLead}
                nome={detalhesLeads?.nome}
              />
            </>
          ) : (
            <Tooltip hasArrow placement="top" label="Enviar whatsapp">
              <Button
                as="a"
                href={`https://api.whatsapp.com/send?phone=+55${removePrefix(detalhesLeads.telefone)}&text=Olá, ${detalhesLeads.nome}, me chamo ${nomeFormatado} e vim pelo seu interesse em contratar ${detalhesLeads.produto} e gostaria de te ajudar a escolher a melhor opção, podemos conversar?`}
                target="_blank"
                rel="noopener noreferrer"
                w={"100%"}
                colorScheme="green"
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={2}
              >
                <Text>Abrir WhatsApp</Text>
                <SiWhatsapp size={22} />
              </Button>
            </Tooltip>
          )}
        </Flex>
        {/* // <AgendaComponent detalhesLeads={detalhesLeads} /> */}

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
