import { Flex, Image, Text } from "@chakra-ui/react";
import oraculo from "./image/oraculo.png";

export default function LoadingOraculoComponent({ loading }: any) {
  return (
    <>
      {loading && (
        <Flex
          h={"100%"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Image w={"200px"} src={oraculo} alt="oraculo mais valor" />
          <Text fontSize={18} mt={2} fontWeight={"semibold"}>
            Consultando...
          </Text>
        </Flex>
      )}
    </>
  );
}
