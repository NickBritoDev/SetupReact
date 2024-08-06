import { Button, Flex } from "@chakra-ui/react";
import { usePostRelatoriosPorUsuario } from "./hooks/usePostRelatoriosPorUsuario";

export default function RelatoriosPorUsuarioCrm() {
  const { useRequestPostRelatoriosPorUsuario } = usePostRelatoriosPorUsuario();

  const buscaDadosRelatorio = async () => {
    const payload = {
      "produto": [
        "Auxilio Brasil",
        "CP Brasil"
      ],
      "origem": [
        "Instagram",
        "LP - Bolsa Familia"
      ]
    }

    try {
      const resultado = await useRequestPostRelatoriosPorUsuario(payload);
      console.log(resultado)
    } catch (error) {
      console.error("Erro ao buscar dados do relatório:", error);
    }
  };



  return (
    <Flex w={'100%'}>
      <Button onClick={buscaDadosRelatorio}>buscar</Button>
    </Flex>
  )
}
