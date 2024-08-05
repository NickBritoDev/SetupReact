import connectApi from "@api/connect";
import { useKey } from "@context/auth/token-login/authContext";
import { useMutation } from "react-query";
import { IPermissao } from "../types/types";

const useGetPermissoes = () => {
  const { token } = useKey();

  const permissoes = async (idProduto: number): Promise<IPermissao[]> => {
    const response = await connectApi.get(
      `/v1/produtos/permissoes?where={'id_produto': ${idProduto}}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  };

  const { mutate, mutateAsync, ...mutation } = useMutation(permissoes);

  const useRequestGetPermissoes = (idProduto: number) => {
    mutate(idProduto);
  };
  return {
    useRequestGetPermissoes,
    ...mutation,
  };
};

export { useGetPermissoes };
