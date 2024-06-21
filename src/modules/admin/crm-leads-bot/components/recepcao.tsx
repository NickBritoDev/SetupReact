import { Flex, Heading, Image, Text } from "@chakra-ui/react";

export default function RecepcaoComponent({ back }: any) {
  return (
    <Flex
      w={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
      <Heading>Bem-vindos à esteira de leads</Heading>
      <Text fontWeight={"semibold"} w={"50%"} textAlign={"center"}>
        Para começarmos, selecione um contato à esquerda da tela para obter mais
        informações, meios de contato e muito mais!
      </Text>
      <Image
        src={back}
        alt="Bem-vindo à tela de seleção de leads com maior valor"
      />
    </Flex>
  );
}
