import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { maskCPF } from "../../../../../utils/mask/mascaras";
import { IStepProps } from "../../types/steps";
import { useState } from "react";

export default function ConsultaSaldoComponent(props: IStepProps) {
  const [cpf, setCpf] = useState("");
  function consultarSaldo() {
    props.goToNext();
  }
  return (
    <Flex
      flexDir={"column"}
      justify={"center"}
      gap={"5rem"}
      w={"100%"}
      h={"100%"}
      paddingX={"8rem"}
    >
      <Box>
        <label htmlFor="cpf">Digite o CPF</label>
        <Input
          id="cpf"
          value={cpf}
          aria-type="numeric"
          onChange={(e) => {
            setCpf(maskCPF(e.target.value));
          }}
          size={"lg"}
        />
      </Box>
      <Button colorScheme="green" onClick={consultarSaldo}>
        Consultar
      </Button>
    </Flex>
  );
}
