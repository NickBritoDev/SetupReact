import { ReactNode } from "react";
import { Text, Flex, Badge, Divider } from "@chakra-ui/react";
import { formatDataHora } from "../../../../utils/mask/mascaras";

export default function LogsComponent({ detalhesLeads }: any) {
  return (
    <Flex
      gap={2}
      borderRadius={"20px 20px 0 0"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      flexDir={"column"}
      bg={"gray.100"}
      w={"104%"}
      mt={2}
      ml={10}
      p={2}
      maxH={"355px"}
      overflowY={"scroll"}
    >
      {detalhesLeads?.logs?.map(
        (log: {
          justificativa: string;
          acao: any;
          data_atualizacao: any;
          status: ReactNode;
          responsavel: string;
        }) => (
          <Flex
            key={log?.data_atualizacao}
            p={2}
            rounded={"xl"}
            boxShadow={"lg"}
            bg={"white"}
            w={"100%"}
            flexDir={"column"}
          >
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              w={"100%"}
              gap={4}
            >
              <Text w={"100%"}>
                <strong>Responsavel</strong> <br />
                {log?.responsavel?.split(" ")[0]}
              </Text>
              <Text w={"100%"} textAlign={"center"}>
                <strong>Data</strong> <br />
                {formatDataHora(log?.data_atualizacao)}
              </Text>
              <Text w={"100%"} textAlign={"right"}>
                <strong>Status</strong> <br />
                <Badge
                  variant={"solid"}
                  bg={
                    log?.status === "Novo"
                      ? "#44B3CF"
                      : log?.status === "Contato"
                        ? "#F4B61D"
                        : log?.status === "Negociando"
                          ? "#F44B1D"
                          : log?.status === "Finalizado"
                            ? "#229544"
                            : "black"
                  }
                >
                  {log?.status}
                </Badge>
              </Text>
            </Flex>
            <Divider my={1} />
            <Text w={"100%"} textAlign={"left"}>
              <strong>Ação</strong> <br />
              {log?.acao}
            </Text>
            {log?.justificativa && (
              <Text w={"100%"} textAlign={"left"}>
                <strong>Justificativa</strong> <br />
                {log?.justificativa}
              </Text>
            )}
          </Flex>
        ),
      )}
    </Flex>
  );
}
