import { RouteObject, useRoutes } from "react-router-dom";
import { lazy } from "react";
import AuthProtectedRoute from "@/app/routes/auth-protected-route";
import MainLayout from "@/ui/layout/MainLayout";
import CreatePassport from "@/ui/pages/createPassport";
import Passports from "@/ui/pages/passports/Passports";
import PassportDetail from "@/ui/pages/passportDetail";

const Login = lazy(() => import("@/ui/pages/login/Login"));

const AppRoutes = () => {
  const routesConfig: RouteObject[] = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      element: <AuthProtectedRoute />,
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              path: "/passports",
              children: [
                {
                  index: true,
                  element: <Passports />,
                },
                {
                  path: "create",
                  element: <CreatePassport />,
                },
                {
                  path: ":id/update",
                  element: <CreatePassport />,
                },
                {
                  path: ":id/view",
                  element: <PassportDetail />,
                },
              ],
            },
            {
              path: "*",
              element: <Passports />,
            },
          ],
        },
      ],
    },
  ];

  const routes = useRoutes(routesConfig);

  return routes;
};

export default AppRoutes;
