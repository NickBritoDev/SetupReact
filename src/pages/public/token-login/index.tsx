import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useKey } from "../../../context/auth/token-login/authContext";
import { useQuery } from "../../../context/auth/token-login/useQuery";
import { useGetValidacaoToken } from "./hooks/getValidacaoToken";
import LoadingComponent from "./components/loading";

export default function TokenLogin() {
  const { updateKeyStatus } = useKey();
  const query = useQuery();
  const tokenFromUrl = query.get("TK");
  const navigate = useNavigate();
  const toast = useToast();
  const [toastShown, setToastShown] = useState(false);
  const { data, isLoading, isError } = useGetValidacaoToken(tokenFromUrl);

  useEffect(() => {
    if (data) {
      if (!toastShown) {
        updateKeyStatus(true, tokenFromUrl);
        toast({
          title: "Bem Vindo(a)",
          description: "Você acessou um serviço Mais Valor",
          status: "success",
          duration: 5000,
          position: 'top-right',
          isClosable: true,
        });
        navigate("/admin/home");
        setToastShown(true);
      }
    }
  }, [data, toastShown, updateKeyStatus, toast, navigate, tokenFromUrl]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Mais Valor Informa",
        description:
          "Poxa seu token não é mais valido, acesse o portal e tente novamente!",
        status: "info",
        duration: 5000,
        position: 'top-right',
        isClosable: true,
      });
      updateKeyStatus(false, null);
      navigate("/public/nao-autorizado");
      setToastShown(true);
    }
  }, [isError, toast, updateKeyStatus, navigate]);

  return isLoading && <LoadingComponent />
}
