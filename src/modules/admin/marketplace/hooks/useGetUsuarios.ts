import { useQuery } from "react-query";
import connectApi from "../../../../api/connect";
import { useKey } from "../../../../context/auth/token-login/authContext";

const useGetUsuarios = ({ cnpjMatriz }: any) => {
  const { token } = useKey();

  return useQuery(
    "useGetUsuarios",
    async () => {
      const response = await connectApi.get(
        `/v1/usuarios?where={"cnpj_matriz": "${cnpjMatriz}"}&select=["id_acesso", "perfil", "nome", "cnpj_matriz", "foto", "supervisor", "gerente", "superintendente" ]`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    },
    {
      refetchOnWindowFocus: true,
      staleTime: 5000,
      refetchInterval: 5000,
    },
  );
};

export { useGetUsuarios };
