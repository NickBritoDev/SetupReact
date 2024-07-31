import { useKey } from "../../../../../context/auth/token-login/authContext";
import { useState } from "react";
import { connectCrm } from "../../../../../api/crm/connect";

const usePostRelatoriosFinalizados = () => {
  const { token } = useKey();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const buscaLeadsFinalizados = async (payload: any) => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      const response = await connectCrm.post(
        "/relatorios/leads-finalizados",
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
      console.error("Error fetching leads finalizados:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const useRequestPostRelatoriosFinalizados = async (payload: any) => {
    const result = await buscaLeadsFinalizados(payload);
    return result;
  };

  return {
    useRequestPostRelatoriosFinalizados,
    isLoading,
    isError,
    isSuccess,
  };
};

export { usePostRelatoriosFinalizados };
