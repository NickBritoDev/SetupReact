import { useMutation } from "react-query";
import connectApi from "../../../../api/connect";
import { useKey } from "../../../../context/auth/token-login/authContext";
import { BodyPutSolicitacaoAdmins } from "../types/types";

const usePutSolicitacaoAdmins = () => {
  const { token } = useKey();

  const solicitacaoAcesso = async (payload: BodyPutSolicitacaoAdmins[]) => {
    const response = await connectApi.put(
      "/v1/produtos/solicitacoes/admins",
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

  const UseRequestSolicitacaoAdmins = (payload: BodyPutSolicitacaoAdmins[]) => {
    mutation.mutate(payload);
  };
  return {
    UseRequestSolicitacaoAdmins,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};

export { usePutSolicitacaoAdmins };
