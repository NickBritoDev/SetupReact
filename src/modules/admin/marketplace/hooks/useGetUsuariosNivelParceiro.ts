import { useQuery } from "react-query";
import connectApi from "../../../../api/connect";
import { useKey } from "../../../../context/auth/token-login/authContext";

const useGetUsuariosNivelParceiro = ({ cnpj_matriz }: any) => {
  const { token } = useKey();

  return useQuery(
    "useGetUsuariosNivelParceiro",
    async () => {
      const response = await connectApi.get(
        `/v1/usuarios?where={"cnpj_matriz": "${cnpj_matriz}"}&select=["id_acesso", "perfil", "nome", "cnpj_matriz", "foto"]`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    },
    {
      enabled: !!cnpj_matriz,
      refetchOnWindowFocus: false,
      // staleTime: 500,
      refetchInterval: 0,
    },
  );
};

export { useGetUsuariosNivelParceiro };
