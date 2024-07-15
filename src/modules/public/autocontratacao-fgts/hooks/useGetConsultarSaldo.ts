import { useQuery } from "react-query";
import { StepsAutocontratacao } from "../helpers/config";
import { maskCPF } from "@utils/mask/mascaras";
import connectSimulador, { IErroApiSimulador } from "@api/connectSimulador";
import { IBodyConsultaSaque } from "../types/hooks";
import { AxiosError, HttpStatusCode } from "axios";
import { useAutocontratacao } from "../context/context";

const useGetConsultarSaldo = (cpf: string, currentIndex: number) => {
  const maskedCpf = maskCPF(cpf);
  const {
    state: { isAppError },
    dispatch: { definirAppError },
  } = useAutocontratacao();
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
      onError: (error) => {
        if (error.status === HttpStatusCode.BadRequest) {
          return;
        }

        definirAppError(
          true,
          error.response?.data?.message ?? "Ocorreu um erro inesperado",
          error.status !== HttpStatusCode.Forbidden,
        );
      },
      enabled:
        cpf !== "00000000000" &&
        currentIndex === StepsAutocontratacao.SELECAO_SAQUE &&
        !isAppError,
      retry: 4,
      retryDelay: (attemptIndex, error) => {
        console.log(error.response?.data?.message);

        return Math.min(5000 * 2 ** attemptIndex, 30000);
      },
      refetchOnMount: false,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  );
};

export { useGetConsultarSaldo };
