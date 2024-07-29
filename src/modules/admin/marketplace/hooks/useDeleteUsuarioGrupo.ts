import connectApi from "@api/connect";
import { useKey } from "@context/auth/token-login/authContext";
import { useMutation } from "react-query";

type Payload = {
  idAcesso: number;
  idGrupo: number;
};

const useDeleteUsuarioGrupo = () => {
  const { token } = useKey();

  const usuariosGrupo = async (payload: Payload) => {
    const response = await connectApi.delete(
      `/v1/promotoras/usuarios-grupo/${payload.idAcesso}/${payload.idGrupo}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  };

  const { mutate, mutateAsync, ...mutation } = useMutation(usuariosGrupo);

  const useRequestDeleteUsuarioGrupo = (payload: Payload) => {
    mutate(payload);
  };
  return {
    useRequestDeleteUsuarioGrupo,
    ...mutation,
  };
};

export { useDeleteUsuarioGrupo };
