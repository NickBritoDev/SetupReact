import { useKey } from "../../../../../context/auth/token-login/authContext";
import { useState } from "react";
import { connectCrm } from "../../../../../api/crm/connect";

const usePostRelatoriosRecebidos = () => {
  const { token } = useKey();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const buscaLeadsRecebidos = async (payload: any) => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      const response = await connectCrm.post(
        "/relatorios/leads-recebidos",
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
      console.error("Error fetching leads recebidos:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const useRequestPostRelatoriosRecebidos = async (payload: any) => {
    const result = await buscaLeadsRecebidos(payload);
    return result;
  };

  return {
    useRequestPostRelatoriosRecebidos,
    isLoading,
    isError,
    isSuccess,
  };
};

export { usePostRelatoriosRecebidos };
