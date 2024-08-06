import { useKey } from "../../../../../context/auth/token-login/authContext";
import { useState } from "react";
import { connectCrm } from "../../../../../api/crm/connect";

const usePostRelatoriosPorUsuario = () => {
  const { token } = useKey();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const buscaLeadsPorUsuario = async (payload: any) => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      const response = await connectCrm.post(
        "/relatorios/leads-por-usuarios",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setIsSuccess(true);
      return response.data;
    } catch (error) {
      setIsError(true);
      console.error("Error fetching leads por usuario:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const useRequestPostRelatoriosPorUsuario = async (payload: any) => {
    const result = await buscaLeadsPorUsuario(payload);
    return result;
  };

  return {
    useRequestPostRelatoriosPorUsuario,
    isLoading,
    isError,
    isSuccess,
  };
};

export { usePostRelatoriosPorUsuario };
