import connectApi from "@api/connect";
import { useKey } from "@context/auth/token-login/authContext";
import { useMutation } from "react-query";

type Payload = {
  id_acesso: number;
  id_grupo: number;
}[];

const usePostUsuariosGrupo = () => {
  const { token } = useKey();

  const usuariosGrupo = async (payload: Payload) => {
    const response = await connectApi.post(
      `/v1/promotoras/usuarios-grupo`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  };

  const { mutate, mutateAsync, ...mutation } = useMutation(usuariosGrupo);

  const useRequestPostUsuarioGrupo = (payload: Payload) => {
    mutate(payload);
  };

  return {
    useRequestPostUsuarioGrupo,
    ...mutation,
  };
};

export { usePostUsuariosGrupo };
