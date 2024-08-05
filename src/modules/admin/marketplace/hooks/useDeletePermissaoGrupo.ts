import connectApi from "@api/connect";
import { useKey } from "@context/auth/token-login/authContext";
import { useMutation } from "react-query";

type Payload = {
  chave: string;
  idGrupo: number;
};

const useDeletePermissaoGrupo = () => {
  const { token } = useKey();

  const permissoesGrupo = async (payload: Payload) => {
    const response = await connectApi.delete(
      `/v1/promotoras/permissoes-grupo/${payload.chave}/${payload.idGrupo}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  };

  const { mutate, mutateAsync, ...mutation } = useMutation(permissoesGrupo);

  const useRequestDeletePermissaoGrupo = (payload: Payload) => {
    mutate(payload);
  };

  return {
    useRequestDeletePermissaoGrupo,
    ...mutation,
  };
};

export { useDeletePermissaoGrupo };
