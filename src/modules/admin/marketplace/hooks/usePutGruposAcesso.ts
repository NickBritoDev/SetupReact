import connectApi from "@api/connect";
import { useKey } from "@context/auth/token-login/authContext";
import { useMutation } from "react-query";
import { IGruposAcesso } from "../types/types";

const usePutGrupoAcesso = () => {
  const { token } = useKey();

  const grupoAcesso = async (payload: IGruposAcesso) => {
    const response = await connectApi.put(
      `/v1/promotoras/grupos/${payload.id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  };

  const mutation = useMutation(grupoAcesso);

  const useRequestPutGrupoAcesso = (payload: IGruposAcesso) => {
    mutation.mutate(payload);
  };
  return {
    useRequestPutGrupoAcesso,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};

export { usePutGrupoAcesso };
