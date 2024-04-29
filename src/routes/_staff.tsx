import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { Route as LoginRoute } from "@/routes/login";
import { checkAuthToken, saveAuthToken } from "@/lib/authUtils";
import NotFound from "@/pages/NotFound";
import AppLayout from "@/pages/AppLayout";
import StaffLayout from "@/pages/StaffLayout";

export const Route = createFileRoute("/_staff")({
  notFoundComponent: NotFound,
  component: StaffLayout,
  beforeLoad: ({ context, location, search, navigate }) => {
    const jwtToken = localStorage.getItem("token") || search?.authToken;
    if (jwtToken) {
      const { isValid, token } = checkAuthToken(jwtToken);
      if (isValid) {
        context.auth.setUser(token);
        if (search?.authToken) saveAuthToken(jwtToken);
      } else {
        context.auth.setUser(null);
        localStorage.removeItem("token");
        navigate({ to: LoginRoute.fullPath, search: { redirect: "/" } });
      }
    } else if (
      !context.auth.isAuthenticated &&
      location.pathname !== LoginRoute.fullPath
    ) {
      throw redirect({
        to: LoginRoute.fullPath,
        search: { redirect: location.href },
      });
    }
  },
  validateSearch: z.object({
    authToken: z.string().optional().catch("/"),
  }),
});
