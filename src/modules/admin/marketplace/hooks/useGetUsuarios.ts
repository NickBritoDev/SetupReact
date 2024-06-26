import { useQuery } from "react-query";
import connectApi from "../../../../api/connect";
import { useKey } from "../../../../context/auth/token-login/authContext";
import { useGetMinhaConta } from "../../../../hooks/useGetMinhaConta";

const useGetUsuarios = () => {
  const { token } = useKey();
  const { data } = useGetMinhaConta();

  return useQuery(
    "useGetUsuarios",
    async () => {
      const response = await connectApi.get(
        `/v1/usuarios?where={'supervisor': '${data?.nome}'}&select=['id_acesso', 'perfil', 'nome', 'cnpj_matriz', 'foto']`,
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
