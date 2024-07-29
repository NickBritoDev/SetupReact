import { useQuery } from "react-query";
import connectApi from "../../../../api/connect";
import { useKey } from "../../../../context/auth/token-login/authContext";

type Payload = { cnpjMatriz: string };
type ResponseGetUsuarios = {
  cnpj_matriz: string;
  foto: string;
  gerente: string;
  id_acesso: number;
  nome: string;
  perfil: string;
  superintendente: string;
  supervisor: string;
}[];

const useGetUsuarios = ({ cnpjMatriz }: Payload) => {
  const { token } = useKey();

  return useQuery(
    ["useGetUsuarios", cnpjMatriz],
    async () => {
      const response = await connectApi.get<ResponseGetUsuarios>(
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
