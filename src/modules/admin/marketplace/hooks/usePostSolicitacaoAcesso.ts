import { useMutation } from "react-query";
import connectApi from "../../../../api/connect";
import { useKey } from "../../../../context/auth/token-login/authContext";

const usePostSolicitacaoAcesso = () => {
  const { token } = useKey();

  const solicitacaoAcesso = async (payload: any) => {
    const response = await connectApi.post(
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

  const UseRequestSolicitacaoAcesso = (payload: any) => {
    mutation.mutate(payload.payload);
  };
  return {
    UseRequestSolicitacaoAcesso,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};

export { usePostSolicitacaoAcesso };
