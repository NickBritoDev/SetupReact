import connectApi from "@api/connect";
import { useKey } from "@context/auth/token-login/authContext";
import { useMutation } from "react-query";
import { IGruposAcesso } from "../types/types";

const usePutGrupoAcesso = () => {
  const { token } = useKey();

  const grupoAcesso = async (payload: IGruposAcesso) => {
    const response = await connectApi.put(
      `/v1/promotoras/grupos/${payload.id}`,
      {
        nome: payload.nome,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  };

  const {mutate, mutateAsync, ...mutation} = useMutation(grupoAcesso);

  const useRequestPutGrupoAcesso = (payload: IGruposAcesso) => {
    mutate(payload);
  };
  return {
    useRequestPutGrupoAcesso,
    ...mutation,
  };
};

export { usePutGrupoAcesso };
