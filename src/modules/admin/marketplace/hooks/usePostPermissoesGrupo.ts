import connectApi from "@api/connect";
import { useKey } from "@context/auth/token-login/authContext";
import { useMutation } from "react-query";
import { IPermissaoGrupo } from "../types/types";

const usePostPermissoesGrupo = () => {
  const { token } = useKey();

  const permissoesGrupo = async (payload: IPermissaoGrupo[]) => {
    const response = await connectApi.post(
      `/v1/promotoras/permissoes-grupo`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  };

  const { mutate, mutateAsync, ...mutation } = useMutation(permissoesGrupo);

  const useRequestPostPermissoesGrupo = (payload: IPermissaoGrupo[]) => {
    mutate(payload);
  };
  return {
    useRequestPostPermissoesGrupo,
    ...mutation,
  };
};

export { usePostPermissoesGrupo };
