import { useQuery } from "react-query";
import { useAutocontratacao } from "../context/context";
import connectSimulador from "@api/connectSimulador";
import { ICadastroSimulacao } from "../types/hooks";

const usePostCadastrarProposta = (enabled: boolean) => {
  const {
    state: { cpf, parcelasSelecionadasSaque, dadosPessoais },
  } = useAutocontratacao();
  return useQuery(
    ["usePostCadastrarProposta", cpf],
    async ({ signal }) => {
      const uri = "/v1/autocontratacao/fgts/saque-aniversario";
      const { data: cadastroSimulacao } =
        await connectSimulador.post<ICadastroSimulacao>(
          `${uri}/cadastrar-simulacao`,
          parcelasSelecionadasSaque,
          { signal },
        );

      const { data: cadastroDadosPessoais } = await connectSimulador.post(
        `${uri}/dados-pessoais`,
        { ...dadosPessoais, id_simulador: cadastroSimulacao.simulacao_fgts },
        { signal },
      );

      const { data: cadastroProposta } = await connectSimulador.post(
        `${uri}/proposta`,
        {
          codigo_cliente: cadastroDadosPessoais.codigo_cliente,
          id_simulador: cadastroSimulacao.simulacao_fgts,
        },
        { signal },
      );

      const { data: envioFormalizacao } = await connectSimulador.post(
        `${uri}/formalizacao`,
        { codigo_af: cadastroProposta.codigo_af, tipo_envio: "sms" },
        { signal },
      );

      return true;
    },
    {
      enabled,
      retry: false,
      refetchOnMount: false,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  );
};

export { usePostCadastrarProposta };
