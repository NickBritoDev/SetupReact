import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Acoes from "./Acoes";
import { useGetInstancias } from "./hooks/useGetInstancias";

export default function BuscarTodasAsInstancias() {
  const { data } = useGetInstancias("");

  return (
    <Flex flexDir={"column"} p={4}>
      <TableContainer p={4} bg={"white"} rounded={"xl"} boxShadow={"xl"}>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Instâncias</Th>
              <Th textAlign={"center"}>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data.map((instancias: any, index: any) => (
                <Tr key={index}>
                  <Td fontWeight={"bold"}>
                    <Flex cursor={"pointer"} gap={2}>
                      <Text textTransform={"uppercase"} fontWeight={"bold"}>
                        {instancias.instance?.replaceAll("-", " ")}{" "}
                      </Text>
                    </Flex>
                    <Flex cursor={"pointer"} gap={2}>
                      <Text fontWeight={"bold"}>{instancias.hooks} </Text>
                    </Flex>
                  </Td>
                  <Td fontWeight={"bold"} textAlign={"center"}>
                    <Acoes instancia={instancias.instance} />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}
