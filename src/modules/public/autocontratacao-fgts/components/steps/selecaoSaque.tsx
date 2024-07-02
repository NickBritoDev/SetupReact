import { Box, Text } from "@chakra-ui/react";
import { IStepProps } from "../../types/steps";
import { useGetConsultarSaldo } from "../../hooks/useGetConsultarSaldo";

export default function SelecaoSaqueComponent(props: IStepProps) {
  const { data, isLoading } = useGetConsultarSaldo("123", props.currentIndex);
  console.log({ data, isLoading });
  return (
    <Box w="100%" h="100%">
      <Text>Seleção de Saque</Text>
      {isLoading && <Text>Carregando...</Text>}
    </Box>
  );
}
