import React, { useEffect } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
import { useKey } from "./context/auth/token-login/authContext";
import { useGetValidacaoToken } from "@pages/public/token-login/hooks/getValidacaoToken";

import LayoutAdmin from "./layout/admin";
import LayoutPublic from "./layout/public";

import Home from "./pages/admin/home";
import Perfil from "./pages/admin/perfil";
import TokenLogin from "./pages/public/token-login";
import NaoLocalizado404 from "./pages/public/nao-localizado";
import NaoAutorizado401 from "./pages/public/nao-autorizado";

import CrmLeadsBot from "./modules/admin/crm-leads-bot";
import Marketplace from "./modules/admin/marketplace";
import { useAuthHelpers } from "./helpers/conta/permissao";
import AutocontratacaoFgts from "./modules/public/autocontratacao-fgts";
import { useToast } from "@chakra-ui/react";
import RelatoriosFinalizadosCrm from "@modules/admin/relatorios/leads-finalizados";
import RelatoriosPorUsuarioCrm from "@modules/admin/relatorios/leads-por-usuario";
import RelatoriosRecebidosCrm from "@modules/admin/relatorios/leads-recebidos";

const Routes: React.FC = () => {
  const { updateKeyStatus } = useKey();
  const location = useLocation();
  const toast = useToast();
  const { keyStatus } = useKey();
  const { isAdmin, temPermissao, isMatriz, isLoading } = useAuthHelpers();
  const query = new URLSearchParams(location.search);
  const tokenFromUrl = query.get("TK");
  const { data, isError } = useGetValidacaoToken(tokenFromUrl);

  useEffect(() => {
    if (data) {
      updateKeyStatus(true, data);
      toast({
        title: "Bem Vindo(a)",
        description: "Você acessou um serviço Mais Valor",
        status: "success",
        duration: 5000,
        position: "top-right",
        isClosable: true,
      });
      window.location.href = `/admin/crm`;
    }
  }, [data, tokenFromUrl, updateKeyStatus, toast, query]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Mais Valor Informa",
        description:
          "Poxa seu token não é mais valido, acesse o portal e tente novamente!",
        status: "info",
        duration: 5000,
        position: "top-right",
        isClosable: true,
      });
      updateKeyStatus(false, null);
    }
  }, [isError, toast, updateKeyStatus]);

  useEffect(() => {
    if (keyStatus) return;

    const intervalId = setInterval(() => {
      if (!keyStatus) {
        toast({
          title: "INFORMAÇÃO.",
          description: "Sua sessão expirou, faça login novamente.",
          status: "info",
          duration: 9000,
          isClosable: true,
        });
        setTimeout(() => {
          window.location.href =
            "https://www.portalmaisvalor.com/paginas/login.html";
        }, 1500);
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, [keyStatus, toast]);

  const routing = useRoutes([
    {
      path: "/admin",
      element: keyStatus ? (
        <LayoutAdmin />
      ) : (
        (window.location.href =
          "https://www.portalmaisvalor.com/paginas/login.html")
      ),
      children: [
        {
          path: "home",
          element: keyStatus ? (
            <Home />
          ) : (
            <Navigate to="/public/nao-autorizado" replace />
          ),
        },
        {
          path: "perfil",
          element: keyStatus ? (
            <Perfil />
          ) : (
            <Navigate to="/public/nao-autorizado" replace />
          ),
        },
        {
          path: "crm",
          element: isLoading ? (
            true
          ) : keyStatus && temPermissao("CRM") ? (
            <CrmLeadsBot />
          ) : (
            <Navigate to="/public/nao-autorizado" replace />
          ),
        },
        {
          path: "relatorios-finalizados/crm",
          element: isLoading ? (
            true
          ) : keyStatus && temPermissao("CRM") ? (
            <RelatoriosFinalizadosCrm />
          ) : (
            <Navigate to="/public/nao-autorizado" replace />
          ),
        },
        {
          path: "relatorios-por-usuario/crm",
          element: isLoading ? (
            true
          ) : keyStatus && temPermissao("CRM") ? (
            <RelatoriosPorUsuarioCrm />
          ) : (
            <Navigate to="/public/nao-autorizado" replace />
          ),
        },
        {
          path: "relatorios-recebidos/crm",
          element: isLoading ? (
            true
          ) : keyStatus && temPermissao("CRM") ? (
            <RelatoriosRecebidosCrm />
          ) : (
            <Navigate to="/public/nao-autorizado" replace />
          ),
        },
        {
          path: "marketplace",
          element: isLoading ? (
            true
          ) : keyStatus && (isAdmin || isMatriz) ? (
            <Marketplace />
          ) : (
            <Navigate to="/public/nao-autorizado" replace />
          ),
        },
      ],
    },
    {
      path: "/public",
      element: <LayoutPublic />,
      children: [
        { path: "token/login", element: <TokenLogin /> },
        { path: "nao-localizado", element: <NaoLocalizado404 /> },
        { path: "nao-autorizado", element: <NaoAutorizado401 /> },
        {
          path: "autocontratacao-fgts",
          element: <AutocontratacaoFgts />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/public/nao-localizado" replace />,
    },
    {
      path: "/",
      element: keyStatus ? (
        <Navigate to="/admin/crm" replace />
      ) : (
        (window.location.href =
          "https://www.portalmaisvalor.com/paginas/login.html")
      ),
    },
  ]);

  return routing;
};

export default Routes;
