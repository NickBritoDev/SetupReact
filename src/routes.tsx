import { Navigate, useRoutes } from "react-router-dom";
import LayoutAdmin from "./layout/admin";
import LayoutPublic from "./layout/public";
import Home from "./pages/admin/home";
import NaoAutorizado401 from "./pages/public/nao-autorizado";
import NaoLocalizado404 from "./pages/public/nao-localizado";

export default function Routes() {
  const auth = false;
  const routing = useRoutes([
    {
      path: "/admin",
      element: <LayoutAdmin />,
      children: [
        {
          path: "home",
          element: auth ? <Home /> : <NaoAutorizado401 />,
        },
      ],
    },
    {
      path: "/public",
      element: <LayoutPublic />,
      children: [{ path: "nao-localizado", element: <NaoLocalizado404 /> }],
    },
    { path: "*", element: <Navigate to="/public/nao-localizado" replace /> },
    { path: "/", element: <Navigate to="/admin/home" replace /> },
  ]);

  return routing;
}
