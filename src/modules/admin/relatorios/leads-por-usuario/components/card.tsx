import { Flex, Text } from "@chakra-ui/react";
import GraphComponent from "./grafico";

export default function CardsComponent({ top3, bottom3, total }: any) {
  return (
    <Flex gap={2} mb={2} alignItems={"center"} justifyContent={"space-between"}>
      <Flex
        color={"white"}
        bg={"green.500"}
        flexDir={"column"}
        w={"100%"}
        p={2}
        boxShadow={"2xl"}
        rounded={"2xl"}
      >
        <Text
          mb={2}
          bg={"white"}
          color={"green.500"}
          rounded={"xl"}
          pl={2}
          fontWeight={"semibold"}
          textTransform={"uppercase"}
        >
          Maiores status <strong>Concluidos</strong> ✔
        </Text>
        {top3?.map((user: { data: any; qtde_concluido: number }) => (
          <Flex
            borderBottom={"1px solid"}
            alignItems={"center"}
            justifyContent={"space-between"}
            key={user.data}
          >
            <Text fontWeight={"semibold"} fontSize={18}>
              {user.data}
            </Text>
            <Text fontWeight={"bold"} fontSize={18}>
              {user.qtde_concluido}
            </Text>
          </Flex>
        ))}
      </Flex>
      <Flex
        color={"white"}
        bg={"red.500"}
        flexDir={"column"}
        w={"100%"}
        p={2}
        boxShadow={"2xl"}
        rounded={"2xl"}
      >
        <Text
          mb={2}
          bg={"white"}
          color={"red.500"}
          rounded={"xl"}
          pl={2}
          fontWeight={"semibold"}
          textTransform={"uppercase"}
        >
          Menores status <strong>Concluidos</strong> ❌
        </Text>
        {bottom3?.map((user: { data: any; qtde_concluido: number }) => (
          <Flex
            borderBottom={"1px solid"}
            alignItems={"center"}
            justifyContent={"space-between"}
            key={user.data}
          >
            <Text fontWeight={"semibold"} fontSize={18}>
              {user.data}
            </Text>
            <Text fontWeight={"bold"} fontSize={18}>
              {user.qtde_concluido}
            </Text>
          </Flex>
        ))}
      </Flex>
      <Flex boxShadow={"2xl"} rounded={"2xl"}>
        <GraphComponent totais={total} />
      </Flex>
    </Flex>
  );
}
