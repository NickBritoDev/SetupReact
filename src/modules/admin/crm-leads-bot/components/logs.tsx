import { ReactNode } from "react";
import { Text, Flex, Badge } from "@chakra-ui/react";
import { formatDataHora } from "../../../../utils/mask/mascaras";

export default function LogsComponent({ detalhesLeads }: any) {
  return (
    <Flex
      display={"none"}
      gap={2}
      rounded={"xl"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      flexDir={"column"}
      bg={"gray.100"}
      w={"100%"}
      mt={6}
      ml={10}
      p={2}
      maxH={"300px"}
      overflowY={"scroll"}
    >
      {detalhesLeads?.logs?.map(
        (log: {
          data_atualizacao: any;
          status: ReactNode;
          responsavel: ReactNode;
        }) => (
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            w={"100%"}
            key={log.data_atualizacao}
            gap={4}
            bg={"white"}
            p={2}
            rounded={"xl"}
            boxShadow={"lg"}
          >
            <Text w={"100%"}>
              <strong>Responsavel</strong> <br />
              {log.responsavel}
            </Text>
            <Text w={"100%"} textAlign={"center"}>
              <strong>Data</strong> <br />
              {formatDataHora(log.data_atualizacao)}
            </Text>
            <Text w={"100%"} textAlign={"right"}>
              <strong>Status</strong> <br />
              <Badge
                variant={"solid"}
                bg={
                  log.status === "Novo"
                    ? "#44B3CF"
                    : log.status === "Contato"
                      ? "#F4B61D"
                      : log.status === "Negociando"
                        ? "#F44B1D"
                        : log.status === "Finalizado"
                          ? "#229544"
                          : "black"
                }
              >
                {log.status}
              </Badge>
            </Text>
          </Flex>
        ),
      )}
    </Flex>
  );
}
