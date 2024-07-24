import { useMutation } from "react-query";
import connectApi from "../../../../api/connect";
import { useKey } from "../../../../context/auth/token-login/authContext";
import { BodyPutSolicitacaoAcesso } from "../types/types";

const usePutSolicitacaoAcesso = () => {
  const { token } = useKey();

  const solicitacaoAcesso = async (payload: BodyPutSolicitacaoAcesso[]) => {
    const response = await connectApi.put(
      "/v1/produtos/solicitacoes",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  };

  const mutation = useMutation(solicitacaoAcesso);

  const UseRequestSolicitacaoAcesso = (payload: BodyPutSolicitacaoAcesso[]) => {
    mutation.mutate(payload);
  };
  return {
    UseRequestSolicitacaoAcesso,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};

export { usePutSolicitacaoAcesso };
