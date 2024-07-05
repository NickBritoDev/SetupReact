import { useQuery } from "react-query";
import { StepsAutocontratacao } from "../helpers/config";
import { maskCPF } from "@utils/mask/mascaras";
import connectSimulador, { IErroApiSimulador } from "@api/connectSimulador";
import { IBodyConsultaSaque } from "../types/hooks";
import { AxiosError } from "axios";

const useGetConsultarSaldo = (cpf: string, currentIndex: number) => {
  const maskedCpf = maskCPF(cpf);
  return useQuery<IBodyConsultaSaque, AxiosError<IErroApiSimulador>>(
    ["useGetConsultarSaldoAutocontratacaoFgts", cpf],
    async ({ signal }) => {
      const { data } = await connectSimulador.get<IBodyConsultaSaque>(
        `/v1/autocontratacao/fgts/saque-aniversario/${maskedCpf}`,
        { signal },
      );
      return data;
    },
    {
      enabled:
        cpf !== "00000000000" &&
        currentIndex === StepsAutocontratacao.SELECAO_SAQUE,
      retry: false,
      retryDelay: 3000,
    },
  );
};

export { useGetConsultarSaldo };
