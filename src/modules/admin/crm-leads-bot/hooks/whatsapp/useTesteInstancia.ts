import { useMutation } from "react-query";
import { useState } from "react";
import { testInstance } from "../../../../../api/crm/connect";

interface InstanceTeste {
  status: boolean;
}

const useTesteInstancia = (instancia: any) => {
  const [instanceTeste, setInstanceTeste] = useState<InstanceTeste | null>(
    null,
  );

  const testeInstancia = async (payload: any) => {
    const response = await testInstance.post(
      `/api/${instancia}/sendMessage`,
      payload,
    );
    return response.data;
  };

  const mutation = useMutation(testeInstancia, {
    onSuccess: (data) => {
      setInstanceTeste(data);
    },
    onError: (error) => {
      console.error("onError:", error);
    },
  });

  const UseRequestTesteInstancia = (payload: any) => {
    mutation.mutate(payload);
  };

  return {
    UseRequestTesteInstancia,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    instanceTeste,
  };
};

export { useTesteInstancia };
