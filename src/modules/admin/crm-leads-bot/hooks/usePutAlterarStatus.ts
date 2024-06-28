import { useMutation } from "react-query";
import { connectCrm } from "../../../../api/crm/connect";
import { useKey } from "../../../../context/auth/token-login/authContext";

const usePutAlterarStatus = () => {
  const { token } = useKey();

  const alterarStatus = async (payload: any) => {
    const response = await connectCrm.put("/leads/alterar-status", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      alert("alteroou");
    }
  };

  const mutation = useMutation(alterarStatus);

  const UseRequestAlterarStatus = (payload: any) => {
    mutation.mutate(payload);
  };
  return {
    UseRequestAlterarStatus,
    isLoading: mutation.isLoading,
  };
};

export { usePutAlterarStatus };
