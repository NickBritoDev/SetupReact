import { useMutation } from "react-query";
import connectApi from "../../../../api/connect";
import { useKey } from "../../../../context/auth/token-login/authContext";

const usePostLogin = () => {
  const { updateKeyStatus } = useKey();
  const login = async (payload: any) => {
    const response = await connectApi.post("/v1/usuarios/auth/login", payload);
    await updateKeyStatus(true, response.data.token);
    return response.data;
  };

  const mutation = useMutation(login);

  const UseRequestLogin = (payload: any) => {
    mutation.mutate(payload);
  };
  return {
    UseRequestLogin,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};

export { usePostLogin };
