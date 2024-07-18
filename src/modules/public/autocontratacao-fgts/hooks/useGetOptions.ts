import { useQuery } from "react-query";
import connectSimulador, {
  type IErroApiSimulador,
} from "@api/connectSimulador";
import { type IConsultaOption } from "../types/hooks";
import { AxiosError } from "axios";

const useGetOptions = (
  optionName: string,
  queryParams?: Record<string, string>,
) => {
  let params = "";

  if (queryParams) {
    params = "?" + new URLSearchParams(queryParams).toString();
  }

  return useQuery<Array<IConsultaOption>, AxiosError<IErroApiSimulador>>(
    ["useGetConsultarAutocontratacaoOptions", optionName, params],
    async ({ signal }) => {
      const { data } = await connectSimulador.get<Array<IConsultaOption>>(
        `/v1/autocontratacao/options/${optionName}${params}`,
        { signal },
      );
      return data;
    },
    {
      retry: 3,
      retryDelay: 3000,
      refetchOnMount: false,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  );
};

export { useGetOptions };
