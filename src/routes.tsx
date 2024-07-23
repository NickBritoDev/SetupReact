import React, { useEffect } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { useKey } from "./context/auth/token-login/authContext";

import LayoutAdmin from "./layout/admin";
import LayoutPublic from "./layout/public";

import Home from "./pages/admin/home";
import Perfil from "./pages/admin/perfil";

import TokenLogin from "./pages/public/token-login";
import NaoLocalizado404 from "./pages/public/nao-localizado";
import NaoAutorizado401 from "./pages/public/nao-autorizado";
import Login from "./pages/public/login";

import CrmLeadsBot from "./modules/admin/crm-leads-bot";
import Marketplace from "./modules/admin/marketplace";
import { useAuthHelpers } from "./helpers/conta/permissao";
import AutocontratacaoFgts from "./modules/public/autocontratacao-fgts";
import { useToast } from "@chakra-ui/react";

const Routes: React.FC = () => {
  const toast = useToast()
  const { keyStatus } = useKey();
  const { isAdmin, temPermissao, isMatriz, isLoading } = useAuthHelpers();

  useEffect(() => {
    if(keyStatus) return

    const intervalId = setInterval(() => {
      if (!keyStatus) {
        toast({
          title: 'INFORMAÇÃO.',
          description: "Sua sessão expirou, faça login novamente.",
          status: 'info',
          duration: 9000,
          isClosable: true,
        })
        setTimeout(() => {
          window.location.href = '/public/login';
        }, 1500);
      }
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, [keyStatus]);

  const routing = useRoutes([
    {
      path: "/admin",
      element: keyStatus ? (
        <LayoutAdmin />
      ) : (
        <Navigate to="/public/login" replace />
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
        { path: "login", element: <Login /> },
        { path: "token/login", element: <TokenLogin /> },
        { path: "nao-localizado", element: <NaoLocalizado404 /> },
        { path: "nao-autorizado", element: <NaoAutorizado401 /> },
        { path: "autocontratacao-fgts", element: <AutocontratacaoFgts /> },
      ],
    },
    { path: "*", element: <Navigate to="/public/nao-localizado" replace /> },
    {
      path: "/",
      element: keyStatus ? (
        <Navigate to="/admin/home" replace />
      ) : (
        <Navigate to="/public/login" replace />
      ),
    },
  ]);

  return routing;
};

export default Routes;
