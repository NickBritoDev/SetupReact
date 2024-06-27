import { useGetMinhaConta } from "../../hooks/useGetMinhaConta";

export const useAuthHelpers = () => {
  const { data, isLoading } = useGetMinhaConta();
  const funcionalidades = isLoading ? true : data?.funcionalidades;

  const isAdmin = isLoading ? true : data?.isAdministradorPromotora;

  const temPermissao = (funcionalidade: string | number) => {
    return funcionalidades && funcionalidades[funcionalidade];
  };

  return {
    isAdmin,
    temPermissao,
    isLoading,
  };
};
