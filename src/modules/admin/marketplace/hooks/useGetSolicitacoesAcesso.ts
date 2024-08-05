import connectApi from "@api/connect";
import { useKey } from "@context/auth/token-login/authContext";
import { useMutation } from "react-query";
import { IQueryFilter, ISolicitacaoAcesso } from "../types/types";
import { queryFilterToURLParams } from "@helpers/api/geral";

type Payload = IQueryFilter<ISolicitacaoAcesso>;
type Retorno = ISolicitacaoAcesso & { foto: string; nome: string };

const useGetSolicitacoesAcesso = () => {
  const { token } = useKey();

  const solicitacoes = async (payload: Payload) => {
    const params = queryFilterToURLParams(payload);

    const response = await connectApi.get<Retorno[]>(
      `/v1/produtos/solicitacoes?${params}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  };

  const { mutate, mutateAsync, ...mutation } = useMutation(solicitacoes);

  const useRequestGetSolicitacoesAcesso = (payload: Payload) => {
    mutate(payload);
  };

  return {
    useRequestGetSolicitacoesAcesso,
    ...mutation,
  };
};

export { useGetSolicitacoesAcesso };
