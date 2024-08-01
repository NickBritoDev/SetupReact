import connectApi from "@api/connect";
import { useKey } from "@context/auth/token-login/authContext";
import { useMutation } from "react-query";

type Payload = {
  nome: string;
  id_produto: number;
};

const usePostGrupo = () => {
  const { token } = useKey();

  const grupo = async (payload: Payload) => {
    const response = await connectApi.post(`/v1/promotoras/grupos`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const { mutate, mutateAsync, ...mutation } = useMutation(grupo);

  const useRequestPostGrupo = (payload: Payload) => {
    mutate(payload);
  };

  return {
    useRequestPostGrupo,
    ...mutation,
  };
};

export { usePostGrupo };
