import { Navigate, useRoutes } from "react-router-dom";
import { useKey } from "./context/auth/token-login/authContext";
import LayoutAdmin from "./layout/admin";
import LayoutPublic from "./layout/public";
import Home from "./pages/admin/home";
import Perfil from "./pages/admin/perfil";
import TokenLogin from "./pages/public/token-login";
import NaoLocalizado404 from "./pages/public/nao-localizado";
import NaoAutorizado401 from "./pages/public/nao-autorizado";
import Marketplace from "./pages/public/marketplace";

const Routes: React.FC = () => {
  const { keyStatus } = useKey();

  const routing = useRoutes([
    {
      path: "/",
      element: <LayoutAdmin />,
      children: [
        {
          path: "home",
          element: keyStatus ? (
            <Home />
          ) : (
            <Navigate to="/nao-autorizado" replace />
          ),
        },
        {
          path: "perfil",
          element: keyStatus ? (
            <Perfil />
          ) : (
            <Navigate to="/nao-autorizado" replace />
          ),
        },
      ],
    },
    {
      path: "/",
      element: <LayoutPublic />,
      children: [
        { path: "token/login", element: <TokenLogin /> },
        { path: "nao-localizado", element: <NaoLocalizado404 /> },
        { path: "nao-autorizado", element: <NaoAutorizado401 /> },
        { path: "marketplace", element: <Marketplace /> },
      ],
    },
    { path: "*", element: <Navigate to="/nao-localizado" replace /> },
    { path: "/", element: <Navigate to="/home" replace /> },
  ]);

  return routing;
};

export default Routes;
